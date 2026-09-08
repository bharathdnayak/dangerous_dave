import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { Enemy, EnemyType } from '../entities/Enemy';
import { LEVELS, LevelData } from '../data/levels';
import { SoundManager } from '../utils/SoundManager';

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private pipes!: Phaser.Physics.Arcade.StaticGroup;
    private hazards!: Phaser.Physics.Arcade.StaticGroup;
    private items!: Phaser.Physics.Arcade.Group;
    private enemies: Enemy[] = [];
    private bullets!: Phaser.Physics.Arcade.Group;
    private door!: Phaser.Physics.Arcade.Sprite;

    public currentLevelIndex = 0;
    private score = 0;
    private lives = 3;
    private hasTrophy = false;
    private levelData!: LevelData;
    private isChangingLevel = false;
    private spawnAtExit = false;
    private lockedDoorAlertTimer = 0;
    private fireHazards: Phaser.Physics.Arcade.Sprite[] = [];
    private fireEmberTimer = 0;

    constructor() {
        super('GameScene');
    }

    init(data?: { levelIndex?: number; score?: number; lives?: number; spawnAtExit?: boolean }) {
        this.currentLevelIndex = data?.levelIndex ?? 0;
        this.score = data?.score ?? 0;
        this.lives = data?.lives ?? 3;
        this.spawnAtExit = data?.spawnAtExit ?? false;
        this.hasTrophy = false;
        this.isChangingLevel = false;
        this.enemies = [];
        this.fireHazards = [];
        this.fireEmberTimer = 0;
        this.lockedDoorAlertTimer = 0;
    }

    create() {
        this.levelData = LEVELS[this.currentLevelIndex] || LEVELS[0];

        // Configure world bounds calibrated for HD 40px tiles (12 rows * 40px = 480px)
        const TILE_SIZE = 40;
        const gridHeight = this.levelData.height * TILE_SIZE;
        const worldWidth = this.levelData.width * TILE_SIZE;
        const worldHeight = Math.max(gridHeight, 480);
        const yOffset = Math.floor((worldHeight - gridHeight) / 2);
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // Physics groups
        this.platforms = this.physics.add.staticGroup();
        this.pipes = this.physics.add.staticGroup();
        this.hazards = this.physics.add.staticGroup();
        this.items = this.physics.add.group({ allowGravity: false });
        this.bullets = this.physics.add.group({ allowGravity: false });

        // Hide Jetpack UI by default on level start unless player picks one up
        const jetUI = document.getElementById('jetpack-ui');
        if (jetUI) jetUI.classList.add('hidden');

        // Fill extra top/bottom boundary bricks to prevent any void
        for (let col = 0; col < this.levelData.width; col++) {
            const x = col * TILE_SIZE + TILE_SIZE / 2;
            // Extra top ceiling bricks if offset > 0
            for (let y = TILE_SIZE / 2; y < yOffset; y += TILE_SIZE) {
                this.platforms.create(x, y, 'brick');
            }
            // Extra bottom floor bricks
            for (let y = yOffset + gridHeight + TILE_SIZE / 2; y < worldHeight; y += TILE_SIZE) {
                this.platforms.create(x, y, 'brick');
            }
        }

        // Build the current level
        let defaultSpawnX = TILE_SIZE * 2;
        let defaultSpawnY = yOffset + gridHeight - TILE_SIZE * 2;
        let doorX = worldWidth - TILE_SIZE * 2;
        let doorY = yOffset + gridHeight - TILE_SIZE * 2;

        for (let row = 0; row < this.levelData.grid.length; row++) {
            const line = this.levelData.grid[row];
            for (let col = 0; col < line.length; col++) {
                const char = line[col];
                const x = col * TILE_SIZE + TILE_SIZE / 2;
                const y = yOffset + row * TILE_SIZE + TILE_SIZE / 2;

                if (char === 'B') {
                    this.platforms.create(x, y, 'brick');
                } else if (char === 'P') {
                    this.pipes.create(x, y, 'pipe');
                } else if (char === 'F') {
                    const fire = this.hazards.create(x, y, 'fire-0') as Phaser.Physics.Arcade.Sprite;
                    fire.play('fire-burn');
                    const b = fire.body as Phaser.Physics.Arcade.Body;
                    b.setSize(28, 22);
                    b.setOffset(6, 18);
                    this.fireHazards.push(fire);

                    // Dynamic warm pulsing ambient light
                    this.tweens.add({
                        targets: fire,
                        scaleX: 1.05,
                        scaleY: 1.06,
                        alpha: 0.93,
                        yoyo: true,
                        repeat: -1,
                        duration: 450 + Math.random() * 200,
                        ease: 'Sine.easeInOut'
                    });
                } else if (char === 'W') {
                    const water = this.hazards.create(x, y, 'water');
                    const b = water.body as Phaser.Physics.Arcade.Body;
                    b.setSize(36, 26);
                    b.setOffset(2, 14);
                } else if (char === 'T') {
                    const trophy = this.items.create(x, y, 'trophy');
                    trophy.setData('type', 'trophy');
                    trophy.setData('value', 1000);
                    this.tweens.add({
                        targets: trophy,
                        scaleX: 1.1,
                        scaleY: 1.1,
                        yoyo: true,
                        repeat: -1,
                        duration: 700,
                        ease: 'Sine.easeInOut'
                    });
                } else if (char === 'G') {
                    const gun = this.items.create(x, y, 'gun-item');
                    gun.setData('type', 'gun');
                    this.tweens.add({
                        targets: gun,
                        y: y - 6,
                        yoyo: true,
                        repeat: -1,
                        duration: 600,
                        ease: 'Sine.easeInOut'
                    });
                } else if (char === 'J') {
                    const jet = this.items.create(x, y, 'jetpack-item');
                    jet.setData('type', 'jetpack');
                    this.tweens.add({
                        targets: jet,
                        y: y - 6,
                        yoyo: true,
                        repeat: -1,
                        duration: 650,
                        ease: 'Sine.easeInOut'
                    });
                } else if (char === 'R') {
                    const ruby = this.items.create(x, y, 'gem-ruby');
                    ruby.setData('type', 'score');
                    ruby.setData('value', 100);
                } else if (char === 'S') {
                    const sapphire = this.items.create(x, y, 'gem-sapphire');
                    sapphire.setData('type', 'score');
                    sapphire.setData('value', 150);
                } else if (char === 'E') {
                    const emerald = this.items.create(x, y, 'gem-emerald');
                    emerald.setData('type', 'score');
                    emerald.setData('value', 200);
                } else if (char === 'C') {
                    const crown = this.items.create(x, y, 'crown');
                    crown.setData('type', 'score');
                    crown.setData('value', 500);
                } else if (char === 'D') {
                    doorX = x;
                    doorY = y - 12; // Base flush with platform top
                    this.door = this.physics.add.sprite(doorX, doorY, 'door-closed');
                    const b = this.door.body as Phaser.Physics.Arcade.Body;
                    b.setAllowGravity(false);
                    b.setImmovable(true);
                    b.setSize(32, 52);
                    b.setOffset(4, 12);
                } else if (char === '@') {
                    defaultSpawnX = x;
                    defaultSpawnY = y;
                } else if (char === '1' || char === '2' || char === '3') {
                    const type: EnemyType = char === '1' ? 'spider' : char === '2' ? 'ufo' : 'sun';
                    const enemy = new Enemy(this, x, y, type);
                    this.enemies.push(enemy);
                }
            }
        }

        // Spawn Dave: if coming back from the next level, spawn near the door
        const finalSpawnX = this.spawnAtExit ? Math.max(48, doorX - 48) : defaultSpawnX;
        const finalSpawnY = this.spawnAtExit ? doorY : defaultSpawnY;
        this.player = new Player(this, finalSpawnX, finalSpawnY);

        // Camera setup with smooth lerp
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Setup Collisions & Overlaps
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.hazards, this.handlePlayerDeath, undefined, this);
        this.physics.add.overlap(this.player, this.items, this.handleCollectItem, undefined, this);

        if (this.door) {
            this.physics.add.overlap(this.player, this.door, this.handleDoorEnter, undefined, this);
        }

        // Bullets collisions with platforms and hazards
        this.physics.add.collider(this.bullets, this.platforms, (bullet) => {
            bullet.destroy();
        });

        this.physics.add.overlap(this.bullets, this.hazards, (bullet) => {
            bullet.destroy();
        });

        // Update initial HUD and tutorial banner
        this.updateUI();
        this.showTutorialBanner(this.levelData.title, this.levelData.hint);
    }

    update(time: number, delta: number) {
        if (!this.player.isDead) {
            // Check pipe overlap for climb detection
            this.player.isTouchingPipe = this.physics.overlap(this.player, this.pipes);

            this.player.updatePlayer(delta, (bx, by, dir) => {
                this.spawnBullet(bx, by, dir);
            });

            // Check walking off left boundary to go back to previous level!
            if (this.player.x <= 20 && this.currentLevelIndex > 0 && !this.isChangingLevel) {
                this.goToLevel(this.currentLevelIndex - 1, true);
                return;
            }

            // Check out of bounds death
            if (this.player.y > this.physics.world.bounds.height + 20) {
                this.handlePlayerDeath();
            }

            // Update Jetpack HUD Fuel
            if (this.player.hasJetpack) {
                const fuelBar = document.getElementById('fuel-bar');
                if (fuelBar) {
                    fuelBar.style.width = `${this.player.jetpackFuel}%`;
                }
            }

            // Check Enemy collisions
            for (const enemy of this.enemies) {
                if (enemy.active) {
                    enemy.updateEnemy(delta, time);
                    // Check overlap with player
                    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
                        this.handlePlayerDeath();
                    }
                    // Check overlap with bullets
                    this.bullets.getChildren().forEach((bulletObj: any) => {
                        const b = bulletObj as Phaser.Physics.Arcade.Sprite;
                        if (b.active && Phaser.Geom.Intersects.RectangleToRectangle(b.getBounds(), enemy.getBounds())) {
                            b.destroy();
                            this.score += 300;
                            this.updateUI();
                            enemy.destroyWithEffect();
                        }
                    });
                }
            }
        }

        // Dynamic convective rising flame ember particles
        this.fireEmberTimer += delta;
        if (this.fireEmberTimer > 100) {
            this.fireEmberTimer = 0;
            for (const fire of this.fireHazards) {
                if (fire.active && Math.random() < 0.35) {
                    const ember = this.add.sprite(
                        fire.x + (Math.random() - 0.5) * 24,
                        fire.y - 10,
                        'particle-sparkle'
                    );
                    ember.setScale(0.55);
                    ember.setTint(0xffaa22);
                    this.tweens.add({
                        targets: ember,
                        y: ember.y - 28 - Math.random() * 16,
                        x: ember.x + (Math.random() - 0.5) * 16,
                        alpha: 0,
                        scale: 0.1,
                        duration: 650 + Math.random() * 250,
                        ease: 'Sine.easeOut',
                        onComplete: () => ember.destroy()
                    });
                }
            }
        }
    }

    public getPlayer(): Player {
        return this.player;
    }

    public setZoomLevel(zoom: number) {
        this.cameras.main.setZoom(zoom);
    }

    public goToLevel(index: number, spawnAtExit: boolean = false) {
        if (this.isChangingLevel) return;
        if (index < 0 || index >= LEVELS.length) return;

        this.isChangingLevel = true;
        this.cameras.main.fade(300, 0, 0, 0);
        this.time.delayedCall(320, () => {
            this.scene.restart({
                levelIndex: index,
                score: this.score,
                lives: this.lives,
                spawnAtExit: spawnAtExit
            });
        });
    }

    private spawnBullet(x: number, y: number, direction: number) {
        const bullet = this.bullets.create(x, y, 'bullet') as Phaser.Physics.Arcade.Sprite;
        bullet.setVelocityX(direction * 400);
        bullet.setFlipX(direction < 0);

        this.time.delayedCall(1500, () => {
            if (bullet.active) bullet.destroy();
        });
    }

    private handleCollectItem(_player: any, itemObj: any) {
        const item = itemObj as Phaser.Physics.Arcade.Sprite;
        const type = item.getData('type');

        if (type === 'trophy') {
            this.hasTrophy = true;
            this.score += item.getData('value') || 1000;
            SoundManager.playTrophy();

            // Transform door to glowing neon green
            if (this.door) {
                this.door.setTexture('door-open');
            }

            // Screen flash & alert
            this.cameras.main.flash(300, 255, 215, 0);
            this.showBannerAlert('GO THRU THE DOOR!', '#00FF66');
            this.createScorePopup(item.x, item.y, '+1000 TROPHY!');
        } else if (type === 'gun') {
            this.player.hasGun = true;
            this.score += 200;
            SoundManager.playGem();
            this.showBannerAlert('GUN EQUIPPED! PRESS [SHIFT] TO SHOOT', '#FFDD00');
            this.createScorePopup(item.x, item.y, 'GUN READY!');
        } else if (type === 'jetpack') {
            this.player.hasJetpack = true;
            this.player.refuel(100);
            this.score += 200;
            SoundManager.playGem();

            // Reveal Jetpack UI
            const jetUI = document.getElementById('jetpack-ui');
            if (jetUI) jetUI.classList.remove('hidden');

            this.showBannerAlert('JETPACK ON! [J] TO TOGGLE OR HOLD [SPACE]/[W] TO FLY', '#00DDFF');
            this.createScorePopup(item.x, item.y, 'JETPACK ON!');
        } else if (type === 'score') {
            const val = item.getData('value') || 100;
            this.score += val;
            SoundManager.playGem();
            this.createScorePopup(item.x, item.y, `+${val}`);
        }

        // Particle sparkles on pickup
        for (let i = 0; i < 6; i++) {
            const spark = this.add.sprite(item.x, item.y, 'particle-sparkle');
            this.tweens.add({
                targets: spark,
                x: item.x + (Math.random() - 0.5) * 30,
                y: item.y + (Math.random() - 0.5) * 30,
                alpha: 0,
                scale: 0.3,
                duration: 300,
                onComplete: () => spark.destroy()
            });
        }

        this.updateUI();
        item.destroy();
    }

    private handleDoorEnter(_player: any, _door: any) {
        if (this.isChangingLevel) return;

        if (!this.hasTrophy) {
            if (this.time.now > this.lockedDoorAlertTimer) {
                this.lockedDoorAlertTimer = this.time.now + 2500;
                this.showBannerAlert('DOOR IS LOCKED! COLLECT THE GOLD TROPHY FIRST!', '#FF4444');
            }
            return;
        }

        this.isChangingLevel = true;
        SoundManager.playLevelComplete();

        // Level Complete transition
        this.cameras.main.fade(500, 0, 0, 0);
        this.time.delayedCall(550, () => {
            const nextLevel = this.currentLevelIndex + 1;
            if (nextLevel < LEVELS.length) {
                this.scene.restart({
                    levelIndex: nextLevel,
                    score: this.score,
                    lives: this.lives,
                    spawnAtExit: false
                });
            } else {
                // Victory! All 10 levels completed!
                if ((window as any).showGameOver) {
                    (window as any).showGameOver(this.score, true);
                }
            }
        });
    }

    private handlePlayerDeath() {
        if (this.player.isDead || this.isChangingLevel) return;

        this.player.die();
        this.lives--;
        this.cameras.main.shake(300, 0.02);

        this.updateUI();

        this.time.delayedCall(1200, () => {
            if (this.lives > 0) {
                // Respawn at current level checkpoint
                this.scene.restart({
                    levelIndex: this.currentLevelIndex,
                    score: this.score,
                    lives: this.lives,
                    spawnAtExit: false
                });
            } else {
                // Game Over
                if ((window as any).showGameOver) {
                    (window as any).showGameOver(this.score, false);
                }
            }
        });
    }

    private createScorePopup(x: number, y: number, text: string) {
        const popup = this.add.text(x, y - 8, text, {
            fontFamily: '"Press Start 2P"',
            fontSize: '9px',
            color: '#FFFF55',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: popup,
            y: popup.y - 20,
            alpha: 0,
            duration: 700,
            onComplete: () => popup.destroy()
        });
    }

    private showBannerAlert(msg: string, color: string = '#FFFFFF') {
        const banner = document.getElementById('tutorial-banner');
        if (banner) {
            banner.innerHTML = `<span style="color:${color}">${msg}</span>`;
            banner.classList.remove('opacity-0');
            setTimeout(() => {
                if (banner) banner.classList.add('opacity-0');
            }, 3000);
        }
    }

    private showTutorialBanner(title: string, hint: string) {
        const banner = document.getElementById('tutorial-banner');
        if (banner) {
            banner.innerHTML = `<span class="text-yellow-400 font-bold">${title}:</span> ${hint}`;
            banner.classList.remove('opacity-0');
            setTimeout(() => {
                if (banner) banner.classList.add('opacity-0');
            }, 4000);
        }
    }

    private updateUI() {
        if ((window as any).updateHUD) {
            (window as any).updateHUD(this.score, this.currentLevelIndex + 1, this.lives);
        }
    }
}
