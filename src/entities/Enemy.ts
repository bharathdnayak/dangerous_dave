import Phaser from 'phaser';
import { SoundManager } from '../utils/SoundManager';

export type EnemyType = 'spider' | 'ufo' | 'sun';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
    public enemyType: EnemyType;
    private initialX: number;
    private initialY: number;
    private moveTimer: number = 0;
    private speed: number = 60;
    private direction: number = 1;

    constructor(scene: Phaser.Scene, x: number, y: number, type: EnemyType) {
        let texture = 'enemy-spider';
        if (type === 'ufo') texture = 'enemy-ufo';
        if (type === 'sun') texture = 'enemy-sun';

        super(scene, x, y, texture);
        this.enemyType = type;
        this.initialX = x;
        this.initialY = y;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setAllowGravity(false);
        body.setImmovable(true);

        // Forgiving hitbox calibrated for 40px scale
        if (type === 'spider') {
            body.setSize(24, 24);
        } else if (type === 'ufo') {
            body.setSize(30, 20);
        } else if (type === 'sun') {
            body.setSize(24, 24);
        }
    }

    public updateEnemy(_delta: number, time: number) {
        if (!this.active) return;
        const body = this.body as Phaser.Physics.Arcade.Body;

        if (this.enemyType === 'spider') {
            // Patrol up and down
            const range = 60;
            this.y = this.initialY + Math.sin(time * 0.003) * range;
        } else if (this.enemyType === 'ufo') {
            // Patrol horizontally with wavy altitude
            const rangeX = 100;
            this.x = this.initialX + Math.sin(time * 0.002) * rangeX;
            this.y = this.initialY + Math.cos(time * 0.004) * 16;
            body.velocity.x = Math.cos(time * 0.002) > 0 ? 40 : -40;
            this.setFlipX(body.velocity.x < 0);
        } else if (this.enemyType === 'sun') {
            // Rotating fireball moving horizontally
            this.angle += 4;
            this.x = this.initialX + Math.sin(time * 0.0025) * 80;
        }
    }

    public destroyWithEffect() {
        SoundManager.playExplode();

        // Create particle explosion
        for (let i = 0; i < 8; i++) {
            const spark = this.scene.add.sprite(this.x, this.y, 'particle-sparkle');
            const angle = (i / 8) * Math.PI * 2;
            const dist = 30 + Math.random() * 20;
            this.scene.tweens.add({
                targets: spark,
                x: this.x + Math.cos(angle) * dist,
                y: this.y + Math.sin(angle) * dist,
                alpha: 0,
                scale: 0.2,
                duration: 400,
                ease: 'Power2',
                onComplete: () => spark.destroy()
            });
        }

        // Floating score popup
        const scoreText = this.scene.add.text(this.x, this.y - 10, '+300', {
            fontFamily: '"Press Start 2P"',
            fontSize: '10px',
            color: '#FFDD00',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: scoreText,
            y: scoreText.y - 24,
            alpha: 0,
            duration: 800,
            onComplete: () => scoreText.destroy()
        });

        this.destroy();
    }
}
