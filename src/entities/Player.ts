import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';
import { CharacterManager } from '../utils/CharacterManager';

export class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private jumpKey: Phaser.Input.Keyboard.Key;
    private shootKey: Phaser.Input.Keyboard.Key;
    private jetpackKey: Phaser.Input.Keyboard.Key;
    private altKeys: { [key: string]: Phaser.Input.Keyboard.Key } = {};
    
    // Character selection
    public characterId: string = 'cyber-dave';

    // Modern platformer feel variables
    private jumpBufferCounter = 0;
    private readonly jumpBufferTime = 120; // ms
    private coyoteCounter = 0;
    private readonly coyoteTime = 120; // ms
    public isGrounded = false;
    
    // Movement parameters (Calibrated for HD 40px grid)
    private readonly walkSpeed = 230;
    private readonly jumpVelocity = -480;
    private readonly flySpeedX = 210;
    private readonly flySpeedY = 210;
    private readonly climbSpeed = 180;
    
    // Power-up & state flags
    public hasGun = false;
    public hasJetpack = false;
    public isJetpackActive = false;
    public isTouchingPipe = false;
    public isClimbing = false;
    public jetpackFuel = 100; // 0 to 100
    public isDead = false;

    // Animation & weapon timers
    private shootTimer = 0;
    private walkTimer = 0;
    private walkFrame = 0;
    public facingRight = true;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        const char = CharacterManager.getSelected();
        super(scene, x, y, `${char.id}-idle`);
        this.characterId = char.id;
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        // Fair, forgiving HD hitbox calibrated for 48x62 sprite
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(22, 48);
        body.setOffset(13, 12);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
            this.jumpKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.shootKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
            this.jetpackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);

            // WASD support
            this.altKeys = {
                W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
                D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            };
        } else {
            throw new Error('Keyboard plugin not found');
        }
    }

    public updatePlayer(delta: number, onShootBullet?: (x: number, y: number, dir: number) => void) {
        if (this.isDead) return;

        const body = this.body as Phaser.Physics.Arcade.Body;
        this.isGrounded = body.blocked.down || body.touching.down;

        // Input checks (Arrows or WASD)
        const leftDown = this.cursors.left.isDown || this.altKeys.A?.isDown;
        const rightDown = this.cursors.right.isDown || this.altKeys.D?.isDown;
        const upDown = this.cursors.up.isDown || this.altKeys.W?.isDown;
        const downDown = this.cursors.down.isDown || this.altKeys.S?.isDown;
        const jumpDown = this.jumpKey.isDown;
        const jumpJustPressed = Phaser.Input.Keyboard.JustDown(this.jumpKey) || 
                               Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
                               Phaser.Input.Keyboard.JustDown(this.altKeys.W);
        const jetpackTogglePressed = Phaser.Input.Keyboard.JustDown(this.jetpackKey);

        // Toggle Jetpack mode with 'J' key
        if (jetpackTogglePressed && this.hasJetpack && this.jetpackFuel > 0) {
            this.toggleJetpack();
        }

        if (this.jetpackFuel <= 0 && this.isJetpackActive) {
            this.isJetpackActive = false;
            SoundManager.setJetpackThruster(false);
        }

        // --- PIPE CLIMBING LOGIC ---
        if (this.isTouchingPipe && !this.isJetpackActive) {
            if (upDown || downDown) {
                this.isClimbing = true;
            }
        } else {
            this.isClimbing = false;
        }

        if (this.isClimbing && this.isTouchingPipe && !this.isJetpackActive) {
            body.setAllowGravity(false);
            if (upDown) {
                body.setVelocityY(-this.climbSpeed);
            } else if (downDown) {
                body.setVelocityY(this.climbSpeed);
            } else {
                body.setVelocityY(0);
            }

            if (leftDown) {
                body.setVelocityX(-this.walkSpeed * 0.7);
                this.setFlipX(true);
            } else if (rightDown) {
                body.setVelocityX(this.walkSpeed * 0.7);
                this.setFlipX(false);
            } else {
                body.setVelocityX(0);
            }

            // Jump off pipe
            if (jumpJustPressed) {
                this.isClimbing = false;
                body.setAllowGravity(true);
                body.setVelocityY(this.jumpVelocity * 0.9);
                SoundManager.playJump();
            }
        } else if (this.isJetpackActive && this.hasJetpack && this.jetpackFuel > 0) {
            // Cancel regular gravity while hovering for tight, smooth control!
            body.setAllowGravity(false);
            const isMoving = upDown || downDown || leftDown || rightDown || jumpDown;
            const burnRate = isMoving ? 0.004 : 0.002; // Lasts 25 to 50 seconds of flight!
            this.jetpackFuel = Math.max(0, this.jetpackFuel - delta * burnRate);
            SoundManager.setJetpackThruster(true);
            this.setTexture('dave-jetpack');

            // 4-Way Omnidirectional Flight
            if (upDown || jumpDown) {
                body.setVelocityY(-this.flySpeedY);
            } else if (downDown) {
                body.setVelocityY(this.flySpeedY);
            } else {
                body.setVelocityY(0); // Stable hover
            }

            if (leftDown) {
                body.setVelocityX(-this.flySpeedX);
                this.setFlipX(true);
                this.facingRight = false;
            } else if (rightDown) {
                body.setVelocityX(this.flySpeedX);
                this.setFlipX(false);
                this.facingRight = true;
            } else {
                body.setVelocityX(0);
            }

            // Emit thruster smoke particles
            if (Math.random() < 0.35) {
                const smoke = this.scene.add.sprite(
                    this.facingRight ? this.x - 5 : this.x + 5,
                    this.y + 8,
                    'particle-smoke'
                );
                smoke.setScale(0.7);
                this.scene.tweens.add({
                    targets: smoke,
                    y: smoke.y + 12,
                    alpha: 0,
                    scale: 0.1,
                    duration: 300,
                    onComplete: () => smoke.destroy()
                });
            }
        } else {
            // Normal gravity restored
            body.setAllowGravity(true);
            SoundManager.setJetpackThruster(false);

            // --- HORIZONTAL MOVEMENT WITH AIR INERTIA ---
            if (leftDown) {
                body.setVelocityX(-this.walkSpeed);
                this.setFlipX(true);
                this.facingRight = false;
            } else if (rightDown) {
                body.setVelocityX(this.walkSpeed);
                this.setFlipX(false);
                this.facingRight = true;
            } else {
                if (this.isGrounded) {
                    body.setVelocityX(0); // Crisp stop on ground
                } else {
                    body.setVelocityX(body.velocity.x * 0.96); // Preserves forward jump momentum in air
                }
            }

            // --- JUMPING PHYSICS (Coyote Time & Jump Buffering) ---
            if (this.isGrounded) {
                this.coyoteCounter = this.coyoteTime;
            } else {
                this.coyoteCounter -= delta;
            }

            if (jumpJustPressed) {
                this.jumpBufferCounter = this.jumpBufferTime;
            } else {
                this.jumpBufferCounter -= delta;
            }

            // Normal jumping works always when grounded
            if (this.jumpBufferCounter > 0 && this.coyoteCounter > 0) {
                body.setVelocityY(this.jumpVelocity);
                this.jumpBufferCounter = 0;
                this.coyoteCounter = 0;
                SoundManager.playJump();

                // Create little jump dust puff
                const dust = this.scene.add.sprite(this.x, this.y + 10, 'particle-smoke');
                dust.setScale(0.6);
                this.scene.tweens.add({
                    targets: dust,
                    alpha: 0,
                    scale: 1.2,
                    duration: 250,
                    onComplete: () => dust.destroy()
                });
            }

            // Variable Jump Height: forgiving threshold so light taps still clear 3-4 tiles
            if (!jumpDown && !upDown && body.velocity.y < -140) {
                body.setVelocityY(body.velocity.y * 0.75);
            }
        }

        // --- SHOOTING ---
        if (this.hasGun && Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            SoundManager.playShoot();
            this.shootTimer = 220; // 220ms forward firing stance with weapon drawn & muzzle flare
            const spawnX = this.facingRight ? this.x + 22 : this.x - 22;
            const dir = this.facingRight ? 1 : -1;
            if (onShootBullet) {
                onShootBullet(spawnX, this.y - 1, dir);
            }

            // High-energy muzzle flash particle flare
            const flash = this.scene.add.sprite(spawnX, this.y - 1, 'particle-sparkle');
            flash.setScale(1.2);
            flash.setTint(0x00ffff);
            this.scene.tweens.add({
                targets: flash,
                scale: 0.1,
                alpha: 0,
                duration: 150,
                onComplete: () => flash.destroy()
            });
        }

        if (this.shootTimer > 0) {
            this.shootTimer -= delta;
        }

        // --- ANIMATIONS (4-Frame Stride Cycle: Stride Left, Pass, Stride Right, Pass) ---
        if (body.velocity.x !== 0 && this.isGrounded) {
            this.walkTimer += delta;
            if (this.walkTimer > 95) { // ~10.5 fps fluid walking animation
                this.walkTimer = 0;
                this.walkFrame = (this.walkFrame + 1) % 4;
            }
        } else {
            this.walkTimer = 0;
            this.walkFrame = 0;
        }

        const textureKey = this.computeTextureKey();
        if (this.texture.key !== textureKey && this.scene.textures.exists(textureKey)) {
            this.setTexture(textureKey);
        }
    }

    public computeTextureKey(): string {
        const id = this.characterId;
        const g = this.hasGun;
        const j = this.hasJetpack;
        const gear = (g && j) ? 'gunjet' : g ? 'gun' : j ? 'jet' : '';
        const tag = gear ? `-${gear}` : '';

        // Active Jetpack flight thrusters
        if (this.isJetpackActive && j && this.jetpackFuel > 0) {
            return `${id}${tag}-flight`;
        }
        // Firing weapon stance (plasma rifle extended forward with muzzle flare)
        if (this.shootTimer > 0 && g) {
            return `${id}${tag}-shoot`;
        }
        // In air / jumping
        if (!this.isGrounded) {
            return `${id}${tag}-jump`;
        }
        // Walking on ground (4-frame cycle with arm swings and head bob)
        if (Math.abs(this.body.velocity.x) > 10) {
            return `${id}${tag}-walk${this.walkFrame}`;
        }
        // Standing idle (with weapon slung over shoulder if hasGun)
        return `${id}${tag}-idle`;
    }

    public die() {
        if (this.isDead) return;
        this.isDead = true;
        this.isJetpackActive = false;
        SoundManager.setJetpackThruster(false);
        SoundManager.playDie();

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(true);
        body.setVelocity(-50 * (this.facingRight ? 1 : -1), -280);
        body.setCollideWorldBounds(false);
        body.checkCollision.none = true;
        this.setTint(0xff2222);

        this.scene.tweens.add({
            targets: this,
            angle: 720,
            duration: 1100,
            ease: 'Power1'
        });
    }

    public setCharacter(charId: string) {
        this.characterId = charId;
        const key = this.computeTextureKey();
        if (this.scene.textures.exists(key)) {
            this.setTexture(key);
        }
    }

    public toggleJetpack(): boolean {
        if (!this.hasJetpack || this.jetpackFuel <= 0) return false;
        this.isJetpackActive = !this.isJetpackActive;
        SoundManager.playGem();
        this.updateJetpackUI();
        return this.isJetpackActive;
    }

    public updateJetpackUI() {
        const btnJetToggle = document.getElementById('btn-jetpack-toggle');
        const jetStatusText = document.getElementById('jetpack-status-text');
        if (btnJetToggle) {
            btnJetToggle.innerText = this.isJetpackActive ? '🚀 JET: ON (J)' : '🚀 JET: OFF (J)';
            btnJetToggle.classList.toggle('bg-cyan-600', this.isJetpackActive);
            btnJetToggle.classList.toggle('bg-black/75', !this.isJetpackActive);
            btnJetToggle.classList.toggle('text-white', this.isJetpackActive);
        }
        if (jetStatusText) {
            jetStatusText.innerText = this.isJetpackActive ? 'ON' : 'OFF';
            jetStatusText.className = this.isJetpackActive ? 'text-green-400 font-bold' : 'text-gray-400';
        }
    }

    public refuel(amount: number = 100) {
        this.jetpackFuel = Math.min(100, this.jetpackFuel + amount);
        this.updateJetpackUI();
    }
}
