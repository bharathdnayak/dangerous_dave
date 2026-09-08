import Phaser from 'phaser';
import { drawHDCharacter, Pose } from '../utils/CharacterRenderer';

export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        this.generateModernHDAssets();
    }

    create() {
        this.createAnimations();
        console.log('Preloader completed: High-Definition Modern Assets loaded.');
    }

    private createAnimations() {
        // High-definition animated realistic fire (8-frame fluid combustion cycle)
        this.anims.create({
            key: 'fire-burn',
            frames: [
                { key: 'fire-0' },
                { key: 'fire-1' },
                { key: 'fire-2' },
                { key: 'fire-3' },
                { key: 'fire-4' },
                { key: 'fire-5' },
                { key: 'fire-6' },
                { key: 'fire-7' }
            ],
            frameRate: 14,
            repeat: -1
        });
    }

    private generateModernHDAssets() {
        // ==========================================
        // 1. HIGH-DEFINITION REALISTIC FIRE (8 Frames)
        // 40x40 Smooth Multi-Layered Bezier Flame with Lava Bed
        // ==========================================
        for (let f = 0; f < 8; f++) {
            const c = document.createElement('canvas'); c.width = 40; c.height = 40;
            const ctx = c.getContext('2d')!;

            // Molten magma base
            const baseGrad = ctx.createLinearGradient(0, 32, 0, 40);
            baseGrad.addColorStop(0, '#ff3300');
            baseGrad.addColorStop(0.5, '#cc1100');
            baseGrad.addColorStop(1, '#440000');
            ctx.fillStyle = baseGrad;
            ctx.beginPath();
            ctx.roundRect(0, 34, 40, 6, [3, 3, 0, 0]);
            ctx.fill();

            // Bubbling magma nodes
            const bubblePhase = (f / 8) * Math.PI * 2;
            ctx.fillStyle = '#ffaa00';
            ctx.beginPath();
            ctx.arc(8 + Math.sin(bubblePhase) * 2, 35 - Math.abs(Math.sin(bubblePhase)) * 2, 2.2, 0, Math.PI * 2);
            ctx.arc(28 + Math.cos(bubblePhase) * 2, 35 - Math.abs(Math.cos(bubblePhase)) * 2, 2.5, 0, Math.PI * 2);
            ctx.fill();

            // Flame peaks with smooth animated swaying
            const sway1 = Math.sin((f / 8) * Math.PI * 2) * 3.5;
            const sway2 = Math.cos((f / 8) * Math.PI * 2 + 0.8) * 4.5;
            const sway3 = Math.sin((f / 8) * Math.PI * 2 + 1.8) * 3.5;

            // Outer Crimson / Orange Flame (Smooth Bezier curves)
            const outerGrad = ctx.createLinearGradient(0, 40, 0, 2);
            outerGrad.addColorStop(0, '#ff1a00');
            outerGrad.addColorStop(0.5, '#ff5500');
            outerGrad.addColorStop(0.9, '#ff9900');
            outerGrad.addColorStop(1, 'rgba(255, 120, 0, 0)');
            ctx.fillStyle = outerGrad;
            ctx.beginPath();
            ctx.moveTo(2, 40);
            ctx.bezierCurveTo(4, 28, 8 + sway1, 14, 10 + sway1, 4);
            ctx.bezierCurveTo(14 + sway1, 16, 17, 24, 20 + sway2, 2);
            ctx.bezierCurveTo(24 + sway2, 14, 28, 20, 30 + sway3, 6);
            ctx.bezierCurveTo(34, 18, 38, 28, 38, 40);
            ctx.closePath();
            ctx.fill();

            // Mid Golden / Yellow Flame
            const midGrad = ctx.createLinearGradient(0, 40, 0, 8);
            midGrad.addColorStop(0, '#ff7700');
            midGrad.addColorStop(0.65, '#ffcc00');
            midGrad.addColorStop(1, 'rgba(255, 240, 100, 0)');
            ctx.fillStyle = midGrad;
            ctx.beginPath();
            ctx.moveTo(6, 40);
            ctx.bezierCurveTo(8, 28, 12 + sway1, 18, 14 + sway1, 10);
            ctx.bezierCurveTo(18, 20, 20 + sway2, 16, 22 + sway2, 8);
            ctx.bezierCurveTo(26, 18, 30 + sway3, 22, 32, 24);
            ctx.bezierCurveTo(34, 32, 34, 36, 34, 40);
            ctx.closePath();
            ctx.fill();

            // Searing White Core (Intense Heat)
            const coreGrad = ctx.createRadialGradient(20 + sway2 * 0.4, 32, 2, 20 + sway2 * 0.4, 32, 13);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.45, '#ffffaa');
            coreGrad.addColorStop(1, 'rgba(255, 180, 0, 0)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.ellipse(20 + sway2 * 0.4, 32, 11, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Glowing Floating Embers
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(8 + ((f * 6) % 24), 8 + ((f * 5) % 18), 1.6, 0, Math.PI * 2);
            ctx.arc(20 + ((f * 4) % 18), 5 + ((f * 7) % 15), 1.3, 0, Math.PI * 2);
            ctx.arc(28 + ((f * 5 + 3) % 10), 12 + ((f * 3) % 16), 1.4, 0, Math.PI * 2);
            ctx.fill();

            this.textures.addCanvas(`fire-${f}`, c);
        }

        // ==========================================
        // 2. MODERN HD STYLIZED PLATFORM (40x40)
        // High-end beveled obsidian stone with glowing cyan seams
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 40; c.height = 40;
            const ctx = c.getContext('2d')!;

            // Dark granite base
            const grad = ctx.createLinearGradient(0, 0, 40, 40);
            grad.addColorStop(0, '#2d1b22');
            grad.addColorStop(0.5, '#1e1217');
            grad.addColorStop(1, '#120a0e');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 40, 40);

            // Brick segments with smooth beveled borders
            ctx.strokeStyle = '#5a2533';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(1, 1, 38, 38);

            // Inner beveled highlight (top & left edges)
            ctx.strokeStyle = 'rgba(255, 120, 140, 0.45)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(2, 38); ctx.lineTo(2, 2); ctx.lineTo(38, 2);
            ctx.stroke();

            // Shadow on bottom & right
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.beginPath();
            ctx.moveTo(38, 2); ctx.lineTo(38, 38); ctx.lineTo(2, 38);
            ctx.stroke();

            // Subtle masonry brick seam
            ctx.strokeStyle = '#0a0507';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, 20); ctx.lineTo(40, 20);
            ctx.moveTo(20, 20); ctx.lineTo(20, 40);
            ctx.stroke();

            // Glowing tech-rune accent
            ctx.fillStyle = 'rgba(255, 60, 90, 0.3)';
            ctx.fillRect(18, 8, 4, 4);
            ctx.fillStyle = 'rgba(255, 100, 130, 0.6)';
            ctx.fillRect(19, 9, 2, 2);

            this.textures.addCanvas('brick', c);
        }

        // ==========================================
        // 3. MODERN HD CLIMBABLE PIPE / LADDER (40x40)
        // Titanium industrial conduit with neon power core
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 40; c.height = 40;
            const ctx = c.getContext('2d')!;

            // Metallic blue-gray cylinder
            const grad = ctx.createLinearGradient(8, 0, 32, 0);
            grad.addColorStop(0, '#102236');
            grad.addColorStop(0.3, '#336699');
            grad.addColorStop(0.6, '#66a3d2');
            grad.addColorStop(0.8, '#264d73');
            grad.addColorStop(1, '#0d1a29');
            ctx.fillStyle = grad;
            ctx.fillRect(10, 0, 20, 40);

            // Specular reflection stripe
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillRect(18, 0, 3, 40);

            // Outer brackets
            ctx.fillStyle = '#0a1420';
            ctx.fillRect(6, 4, 28, 4);
            ctx.fillRect(6, 32, 28, 4);
            ctx.fillStyle = '#4d88b8';
            ctx.fillRect(8, 5, 24, 2);
            ctx.fillRect(8, 33, 24, 2);

            // Glowing central energy conduit
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 6;
            ctx.fillRect(19, 8, 2, 24);
            ctx.shadowBlur = 0;

            this.textures.addCanvas('pipe', c);
        }

        // ==========================================
        // 4. PHOTOREALISTIC GOLD TROPHY (44x44)
        // High-res sculpted golden chalice with jewel and glint
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 44; c.height = 44;
            const ctx = c.getContext('2d')!;

            // Radial ambient golden bloom
            const bloom = ctx.createRadialGradient(22, 20, 4, 22, 20, 20);
            bloom.addColorStop(0, 'rgba(255, 215, 0, 0.4)');
            bloom.addColorStop(1, 'rgba(255, 180, 0, 0)');
            ctx.fillStyle = bloom;
            ctx.beginPath();
            ctx.arc(22, 20, 20, 0, Math.PI * 2);
            ctx.fill();

            // Gold metallic gradient
            const goldGrad = ctx.createLinearGradient(10, 0, 34, 0);
            goldGrad.addColorStop(0, '#784e00');
            goldGrad.addColorStop(0.25, '#d4a017');
            goldGrad.addColorStop(0.5, '#fff3a8');
            goldGrad.addColorStop(0.75, '#e0ab1e');
            goldGrad.addColorStop(1, '#573700');

            // Pedestal Base
            ctx.fillStyle = goldGrad;
            ctx.beginPath();
            ctx.roundRect(12, 34, 20, 6, [2, 2, 4, 4]);
            ctx.fill();

            // Stem
            ctx.fillStyle = goldGrad;
            ctx.fillRect(19, 23, 6, 12);
            ctx.fillStyle = '#fffae0';
            ctx.fillRect(21, 23, 2, 12); // shine on stem

            // Chalice Goblet Body (Smooth 3D curves)
            ctx.fillStyle = goldGrad;
            ctx.beginPath();
            ctx.moveTo(11, 8);
            ctx.lineTo(33, 8);
            ctx.bezierCurveTo(33, 20, 27, 24, 22, 24);
            ctx.bezierCurveTo(17, 24, 11, 20, 11, 8);
            ctx.closePath();
            ctx.fill();

            // Rim
            ctx.fillStyle = '#fff099';
            ctx.beginPath();
            ctx.ellipse(22, 8, 11, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#a67300';
            ctx.beginPath();
            ctx.ellipse(22, 8, 9, 2, 0, 0, Math.PI * 2);
            ctx.fill();

            // Left & Right Ornate Handles
            ctx.strokeStyle = '#e0ab1e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(10, 14, 5, Math.PI * 0.5, Math.PI * 1.5);
            ctx.arc(34, 14, 5, Math.PI * 1.5, Math.PI * 0.5);
            ctx.stroke();

            // Inlaid Radiant Ruby Gem
            ctx.fillStyle = '#ff0055';
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(22, 16, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(21, 14.5, 1.5, 1.5);

            // Sparkling Star Glint
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = 4;
            ctx.fillRect(30, 6, 2, 8);
            ctx.fillRect(27, 9, 8, 2);
            ctx.shadowBlur = 0;

            this.textures.addCanvas('trophy', c);
        }

        // ==========================================
        // 5. 2026 SCI-FI CYBER PLASMA BLASTER (Gun)
        // High-resolution illustrated plasma rifle (48x28)
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 48; c.height = 28;
            const ctx = c.getContext('2d')!;

            // Matte Tactical Frame
            const frameGrad = ctx.createLinearGradient(0, 6, 40, 20);
            frameGrad.addColorStop(0, '#2d3748');
            frameGrad.addColorStop(1, '#1a202c');
            ctx.fillStyle = frameGrad;
            ctx.beginPath();
            ctx.roundRect(6, 8, 32, 9, 2);
            ctx.fill();

            // Barrel & Laser Emitter
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(36, 10, 8, 5);
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 6;
            ctx.fillRect(43, 10.5, 3, 4); // Glowing tip
            ctx.shadowBlur = 0;

            // Glowing Cyan Plasma Chamber
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.roundRect(14, 10, 14, 5, 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(16, 11, 10, 2);

            // Ergonomic Pistol Grip & Trigger
            ctx.fillStyle = '#111827';
            ctx.beginPath();
            ctx.moveTo(10, 16); ctx.lineTo(16, 16); ctx.lineTo(13, 26); ctx.lineTo(8, 26);
            ctx.closePath();
            ctx.fill();

            // Holographic Sight
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(16, 3, 8, 4);
            ctx.fillStyle = '#00ff88';
            ctx.fillRect(19, 5, 2, 1);

            this.textures.addCanvas('gun-item', c);
        }

        // ==========================================
        // 6. 2026 HIGH-TECH PLASMA JETPACK (40x44)
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 40; c.height = 44;
            const ctx = c.getContext('2d')!;

            // Titanium Harness
            ctx.fillStyle = '#374151';
            ctx.beginPath();
            ctx.roundRect(6, 8, 28, 24, 4);
            ctx.fill();

            // Dual Ion Cylinders (Left & Right)
            const cylGrad = ctx.createLinearGradient(0, 6, 0, 32);
            cylGrad.addColorStop(0, '#00b4d8');
            cylGrad.addColorStop(0.5, '#0077b6');
            cylGrad.addColorStop(1, '#023e8a');
            ctx.fillStyle = cylGrad;
            ctx.beginPath();
            ctx.roundRect(6, 6, 10, 24, 3);
            ctx.roundRect(24, 6, 10, 24, 3);
            ctx.fill();

            // Plasma Level Indicators
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 6;
            ctx.fillRect(9, 10, 4, 16);
            ctx.fillRect(27, 10, 4, 16);
            ctx.shadowBlur = 0;

            // Thrust Nozzles
            ctx.fillStyle = '#111827';
            ctx.fillRect(7, 30, 8, 6);
            ctx.fillRect(25, 30, 8, 6);
            ctx.fillStyle = '#00ffff';
            ctx.fillRect(9, 34, 4, 3);
            ctx.fillRect(27, 34, 4, 3);

            this.textures.addCanvas('jetpack-item', c);
        }

        // ==========================================
        // 7. HIGH-RESOLUTION PLASMA LASER BOLT (24x8)
        // ==========================================
        {
            const c = document.createElement('canvas'); c.width = 24; c.height = 8;
            const ctx = c.getContext('2d')!;

            // Radiant Plasma Glow
            ctx.fillStyle = '#00ffff';
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.roundRect(2, 2, 20, 4, 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Core energy streak
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(6, 3, 14, 2);

            this.textures.addCanvas('bullet', c);
        }

        // ==========================================
        // 8. THREE HIGH-DEFINITION ILLUSTRATED CHARACTERS
        // Smoothly drawn at 36x58 with anti-aliasing & shading
        // ==========================================
        this.generateHDCharacter('cyber-dave');
        this.generateHDCharacter('daisy-hacker');
        this.generateHDCharacter('classic-dave');

        // ==========================================
        // 9. HIGH-RES GEMS, ENEMIES, & DOOR
        // ==========================================
        // Water
        let c = document.createElement('canvas'); c.width = 40; c.height = 40; let ctx = c.getContext('2d')!;
        const waterGrad = ctx.createLinearGradient(0, 0, 0, 40);
        waterGrad.addColorStop(0, '#0055cc');
        waterGrad.addColorStop(1, '#001a4d');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, 10, 40, 30);
        ctx.strokeStyle = '#66ccff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 12); ctx.bezierCurveTo(10, 8, 20, 14, 40, 10);
        ctx.stroke();
        this.textures.addCanvas('water', c);

        // Gems (Ruby, Sapphire, Emerald, Crown)
        const makeHDGem = (c1: string, c2: string, c3: string, key: string) => {
            const cv = document.createElement('canvas'); cv.width = 36; cv.height = 36;
            const cx = cv.getContext('2d')!;
            cx.fillStyle = c1;
            cx.beginPath(); cx.moveTo(18, 2); cx.lineTo(34, 16); cx.lineTo(18, 34); cx.lineTo(2, 16); cx.closePath(); cx.fill();
            cx.fillStyle = c2;
            cx.beginPath(); cx.moveTo(18, 4); cx.lineTo(30, 16); cx.lineTo(18, 30); cx.lineTo(6, 16); cx.closePath(); cx.fill();
            cx.fillStyle = c3;
            cx.beginPath(); cx.moveTo(18, 6); cx.lineTo(26, 16); cx.lineTo(18, 22); cx.lineTo(10, 16); cx.closePath(); cx.fill();
            cx.fillStyle = '#ffffff';
            cx.fillRect(16, 8, 4, 3);
            this.textures.addCanvas(key, cv);
        };
        makeHDGem('#550011', '#ee1133', '#ffaabb', 'gem-ruby');
        makeHDGem('#002277', '#0077ff', '#aaddff', 'gem-sapphire');
        makeHDGem('#004411', '#00dd44', '#aaffbb', 'gem-emerald');

        // Crown
        c = document.createElement('canvas'); c.width = 40; c.height = 36; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.moveTo(4, 28); ctx.lineTo(36, 28); ctx.lineTo(36, 10); ctx.lineTo(28, 18); ctx.lineTo(20, 8); ctx.lineTo(12, 18); ctx.lineTo(4, 10);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ff0055';
        ctx.beginPath(); ctx.arc(10, 24, 2.5, 0, Math.PI*2); ctx.arc(20, 24, 2.5, 0, Math.PI*2); ctx.arc(30, 24, 2.5, 0, Math.PI*2); ctx.fill();
        this.textures.addCanvas('crown', c);

        // High-Def Exit Door
        c = document.createElement('canvas'); c.width = 40; c.height = 64; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(0, 0, 40, 64, 4); ctx.fill();
        ctx.fillStyle = '#0f172a'; ctx.beginPath(); ctx.roundRect(4, 4, 32, 56, 2); ctx.fill();
        ctx.fillStyle = '#ff0055'; ctx.shadowColor = '#ff0055'; ctx.shadowBlur = 6;
        ctx.fillRect(16, 10, 8, 6); ctx.shadowBlur = 0;
        this.textures.addCanvas('door-closed', c);

        c = document.createElement('canvas'); c.width = 40; c.height = 64; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#1e293b'; ctx.beginPath(); ctx.roundRect(0, 0, 40, 64, 4); ctx.fill();
        ctx.fillStyle = '#00ff88'; ctx.shadowColor = '#00ff88'; ctx.shadowBlur = 12;
        ctx.beginPath(); ctx.roundRect(4, 4, 32, 56, 2); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff'; ctx.fillRect(10, 10, 20, 44);
        this.textures.addCanvas('door-open', c);

        // Enemies
        c = document.createElement('canvas'); c.width = 36; c.height = 36; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#880000'; ctx.beginPath(); ctx.ellipse(18, 18, 12, 10, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#00ffff'; ctx.fillRect(12, 14, 4, 4); ctx.fillRect(20, 14, 4, 4);
        ctx.strokeStyle = '#550000'; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(6, 12); ctx.lineTo(0, 6); ctx.moveTo(30, 12); ctx.lineTo(36, 6);
        ctx.moveTo(6, 24); ctx.lineTo(0, 30); ctx.moveTo(30, 24); ctx.lineTo(36, 30);
        ctx.stroke();
        this.textures.addCanvas('enemy-spider', c);

        c = document.createElement('canvas'); c.width = 44; c.height = 30; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#00ffff'; ctx.shadowColor = '#00ffff'; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(22, 12, 10, Math.PI, 0); ctx.fill(); ctx.shadowBlur = 0;
        ctx.fillStyle = '#334155'; ctx.beginPath(); ctx.ellipse(22, 18, 20, 6, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#ff0077'; ctx.beginPath(); ctx.arc(12, 18, 2.5, 0, Math.PI*2); ctx.arc(22, 18, 2.5, 0, Math.PI*2); ctx.arc(32, 18, 2.5, 0, Math.PI*2); ctx.fill();
        this.textures.addCanvas('enemy-ufo', c);

        c = document.createElement('canvas'); c.width = 36; c.height = 36; ctx = c.getContext('2d')!;
        const sunGrad = ctx.createRadialGradient(18, 18, 2, 18, 18, 16);
        sunGrad.addColorStop(0, '#ffffff'); sunGrad.addColorStop(0.3, '#ffcc00'); sunGrad.addColorStop(1, '#ff2200');
        ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(18, 18, 16, 0, Math.PI*2); ctx.fill();
        this.textures.addCanvas('enemy-sun', c);

        // Particles
        c = document.createElement('canvas'); c.width = 12; c.height = 12; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#00ffff'; ctx.fillRect(5, 0, 2, 12); ctx.fillRect(0, 5, 12, 2);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(4, 4, 4, 4);
        this.textures.addCanvas('particle-sparkle', c);

        c = document.createElement('canvas'); c.width = 10; c.height = 10; ctx = c.getContext('2d')!;
        ctx.fillStyle = '#00b4d8'; ctx.beginPath(); ctx.arc(5, 5, 5, 0, Math.PI*2); ctx.fill();
        this.textures.addCanvas('particle-smoke', c);
            ctx.fillStyle = '#00b4d8'; ctx.beginPath(); ctx.arc(5, 5, 5, 0, Math.PI*2); ctx.fill();
            this.textures.addCanvas('particle-smoke', c);
        }

    private generateHDCharacter(charId: string) {
        // High-Definition Smooth Illustrated Character (48x62 Canvas)
        // Supports full 4-frame animated walk cycle, shoulder-slung weapon, forward shooting stance, and active jetpack thrusters.
        type Pose = 'idle' | 'walk0' | 'walk1' | 'walk2' | 'walk3' | 'jump' | 'shoot';

        const drawHDCharacter = (
            ctx: CanvasRenderingContext2D,
            charId: string,
            pose: Pose,
            hasGun: boolean,
            hasJetpack: boolean,
            isJetpacking: boolean
        ) => {
            ctx.clearRect(0, 0, 48, 62);

            const cx = 24; // Character horizontal center

            // Dynamic head / body bob for responsive walking feel
            let headBob = 0;
            if (pose === 'walk0' || pose === 'walk2') headBob = 1;      // Downbeat of stride
            if (pose === 'walk1' || pose === 'walk3') headBob = -1;     // Upbeat / passing step
            if (pose === 'jump') headBob = -2;                         // Extended in air

            // -------------------------------------------------------------
            // LAYER 1: BACK ATTACHMENTS (Jetpack & Shoulder-Mounted Weapon)
            // -------------------------------------------------------------
            if (hasJetpack) {
                // Titanium Dual Ion Thruster Harness on back
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.roundRect(8, 24 + headBob, 9, 20, 3);
                ctx.fill();

                // Cyan Energy Level Cells
                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 4;
                ctx.fillRect(10, 27 + headBob, 5, 13);
                ctx.shadowBlur = 0;

                // Thruster Nozzle
                ctx.fillStyle = '#0f172a';
                ctx.fillRect(9, 44 + headBob, 7, 4);

                // Active Ion Thruster Flames when flying
                if (isJetpacking) {
                    const jetGrad = ctx.createLinearGradient(0, 48 + headBob, 0, 60 + headBob);
                    jetGrad.addColorStop(0, '#ffffff');
                    jetGrad.addColorStop(0.3, '#00ffff');
                    jetGrad.addColorStop(0.8, '#0055ff');
                    jetGrad.addColorStop(1, 'rgba(0, 100, 255, 0)');
                    ctx.fillStyle = jetGrad;
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 8;
                    ctx.beginPath();
                    ctx.moveTo(8, 48 + headBob);
                    ctx.lineTo(17, 48 + headBob);
                    ctx.lineTo(12.5, 60 + headBob);
                    ctx.closePath();
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            }

            // Weapon carried slung over shoulder (when player has gun and is NOT actively shooting)
            if (hasGun && pose !== 'shoot') {
                ctx.save();
                // Angled gun body resting over right shoulder
                ctx.translate(26, 26 + headBob);
                ctx.rotate(-0.55); // Angled upward behind shoulder

                // Gun stock and chassis
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.roundRect(-4, -18, 7, 24, 2);
                ctx.fill();

                // Glowing Cyan Plasma Chamber
                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 4;
                ctx.fillRect(-2, -14, 3, 10);
                ctx.shadowBlur = 0;

                // Holographic Sight
                ctx.fillStyle = '#00ff88';
                ctx.fillRect(3, -12, 3, 4);

                // Muzzle Emitter
                ctx.fillStyle = '#475569';
                ctx.fillRect(-3, -23, 5, 5);

                ctx.restore();
            }

            // -------------------------------------------------------------
            // LAYER 2: LEGS & FEET (4-Frame Stride Cycle)
            // -------------------------------------------------------------
            const drawLegs = () => {
                let pantColor = '#1e293b';
                let shoeColor = '#00ffff';
                let shoeSole = '#ffffff';

                if (charId === 'daisy-hacker') {
                    pantColor = '#18181b';
                    shoeColor = '#ff0077';
                    shoeSole = '#3f3f46';
                } else if (charId === 'classic-dave') {
                    pantColor = '#1e3a8a';
                    shoeColor = '#78350f';
                    shoeSole = '#292524';
                }

                ctx.fillStyle = pantColor;
                ctx.strokeStyle = '#050510';
                ctx.lineWidth = 1;

                if (pose === 'jump') {
                    // Tucked jumping knees
                    ctx.beginPath();
                    ctx.roundRect(16, 41, 6, 9, 2);
                    ctx.roundRect(26, 41, 6, 9, 2);
                    ctx.fill(); ctx.stroke();

                    // Shoes angled down
                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(14, 49, 9, 5, 2);
                    ctx.roundRect(26, 49, 9, 5, 2);
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(14, 53, 9, 2); ctx.fillRect(26, 53, 9, 2);

                } else if (pose === 'walk0') {
                    // Left leg forward stride, Right leg pushed back
                    ctx.beginPath();
                    ctx.roundRect(25, 41, 6, 11, 2); // Forward leg
                    ctx.roundRect(16, 41, 6, 9, 2);  // Back leg
                    ctx.fill(); ctx.stroke();

                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(27, 51, 10, 6, [2, 2, 0, 0]); // Forward shoe
                    ctx.roundRect(11, 49, 9, 6, [2, 2, 0, 0]);  // Back shoe (heel lifted)
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(27, 55, 10, 2); ctx.fillRect(11, 53, 9, 2);

                } else if (pose === 'walk1' || pose === 'walk3') {
                    // Passing midstep (legs centered, knees passing)
                    ctx.beginPath();
                    ctx.roundRect(19, 41, 5.5, 13, 2);
                    ctx.roundRect(24.5, 41, 5.5, 13, 2);
                    ctx.fill(); ctx.stroke();

                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(16, 53, 9, 6, [2, 2, 0, 0]);
                    ctx.roundRect(24, 53, 9, 6, [2, 2, 0, 0]);
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(16, 57, 9, 2); ctx.fillRect(24, 57, 9, 2);

                } else if (pose === 'walk2') {
                    // Right leg forward stride, Left leg pushed back
                    ctx.beginPath();
                    ctx.roundRect(17, 41, 6, 9, 2);  // Back leg
                    ctx.roundRect(25, 41, 6, 11, 2); // Forward leg
                    ctx.fill(); ctx.stroke();

                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(11, 49, 9, 6, [2, 2, 0, 0]);  // Back shoe
                    ctx.roundRect(27, 51, 10, 6, [2, 2, 0, 0]); // Forward shoe
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(11, 53, 9, 2); ctx.fillRect(27, 55, 10, 2);

                } else if (pose === 'shoot') {
                    // Wide stable shooting stance
                    ctx.beginPath();
                    ctx.roundRect(16, 41, 6, 13, 2);
                    ctx.roundRect(27, 41, 6, 13, 2);
                    ctx.fill(); ctx.stroke();

                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(13, 53, 10, 6, [2, 2, 0, 0]);
                    ctx.roundRect(27, 53, 10, 6, [2, 2, 0, 0]);
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(13, 57, 10, 2); ctx.fillRect(27, 57, 10, 2);

                } else {
                    // Idle standing
                    ctx.beginPath();
                    ctx.roundRect(18, 41, 6, 13, 2);
                    ctx.roundRect(25, 41, 6, 13, 2);
                    ctx.fill(); ctx.stroke();

                    ctx.fillStyle = shoeColor;
                    ctx.beginPath();
                    ctx.roundRect(15, 53, 9, 6, [2, 2, 0, 0]);
                    ctx.roundRect(25, 53, 9, 6, [2, 2, 0, 0]);
                    ctx.fill();
                    ctx.fillStyle = shoeSole;
                    ctx.fillRect(15, 57, 9, 2); ctx.fillRect(25, 57, 9, 2);
                }
            };
            drawLegs();

            // -------------------------------------------------------------
            // LAYER 3: TORSO & STREETWEAR / TECH CLOTHING
            // -------------------------------------------------------------
            ctx.save();
            ctx.strokeStyle = '#050510';
            ctx.lineWidth = 1;

            if (charId === 'cyber-dave') {
                // Streetwear Oversized Purple/Black Hoodie
                const hoodieGrad = ctx.createLinearGradient(0, 24 + headBob, 0, 42 + headBob);
                hoodieGrad.addColorStop(0, '#4c1d95');
                hoodieGrad.addColorStop(1, '#2e1065');
                ctx.fillStyle = hoodieGrad;
                ctx.beginPath();
                ctx.roundRect(15, 24 + headBob, 19, 18, 3);
                ctx.fill(); ctx.stroke();

                // Neon cyan chest graphic & drawstrings
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(22, 27 + headBob, 1.5, 9);
                ctx.fillRect(25, 27 + headBob, 1.5, 9);
                ctx.fillRect(21, 37 + headBob, 6, 1.5);

            } else if (charId === 'daisy-hacker') {
                // Obsidian Cyber-Suit with Neon Magenta Trims
                ctx.fillStyle = '#18181b';
                ctx.beginPath();
                ctx.roundRect(16, 24 + headBob, 17, 18, 3);
                ctx.fill(); ctx.stroke();

                ctx.fillStyle = '#ff0077';
                ctx.fillRect(23, 25 + headBob, 2, 16);
                ctx.fillRect(19, 32 + headBob, 11, 2);

            } else {
                // Classic Dave Blue Adventure Jacket & White Belt
                ctx.fillStyle = '#2563eb';
                ctx.beginPath();
                ctx.roundRect(15, 24 + headBob, 18, 18, 3);
                ctx.fill(); ctx.stroke();

                // White collar
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(21, 24 + headBob); ctx.lineTo(24, 28 + headBob); ctx.lineTo(27, 24 + headBob);
                ctx.fill();

                // White Belt & Gold Buckle
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(15, 38 + headBob, 18, 3);
                ctx.fillStyle = '#eab308';
                ctx.fillRect(22, 37.5 + headBob, 4, 4);
            }

            // Diagonal gun holster strap across chest (when carrying gun)
            if (hasGun && pose !== 'shoot') {
                ctx.strokeStyle = '#0f172a';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(17, 25 + headBob);
                ctx.lineTo(31, 41 + headBob);
                ctx.stroke();
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            ctx.restore();

            // -------------------------------------------------------------
            // LAYER 4: HEAD, FACE, EYEWEAR & HEADWEAR
            // -------------------------------------------------------------
            ctx.save();
            const headY = 16 + headBob;

            // 1. BASE FACE & ANATOMY
            const skinBase = charId === 'daisy-hacker' ? '#fde2d0' : '#fcd5ba';
            const skinShadow = charId === 'daisy-hacker' ? '#f0b89e' : '#e8a57e';

            // Head contour
            ctx.fillStyle = skinBase;
            ctx.strokeStyle = '#1e1b18';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(cx, headY, 8.5, 9.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Jawline & Chin warm shading
            ctx.fillStyle = skinShadow;
            ctx.beginPath();
            ctx.ellipse(cx + 1, headY + 5.5, 6.5, 3.5, 0, 0, Math.PI);
            ctx.fill();

            // Left Ear (visible in 3/4 profile)
            ctx.fillStyle = skinBase;
            ctx.strokeStyle = '#1e1b18';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.ellipse(15.5, headY + 1.2, 2.2, 3.2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Inner ear contour
            ctx.strokeStyle = skinShadow;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(15.8, headY + 1.2, 1.2, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();

            if (charId === 'cyber-dave') {
                // Backward Streetwear Cap (Charcoal with cyan backward bill)
                ctx.fillStyle = '#0f172a';
                ctx.strokeStyle = '#1e1b18';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(14.5, headY - 10.5, 19, 9.5, [5, 5, 2, 2]);
                ctx.fill();
                ctx.stroke();

                // Backward bill pointing left
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.roundRect(10.5, headY - 5.5, 5.5, 3.5, 2);
                ctx.fill();
                ctx.stroke();

                // Dark hair side-fade
                ctx.fillStyle = '#1e293b';
                ctx.fillRect(16, headY - 1, 3, 5);

                // RGB Gaming Headset arch over cap
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.arc(cx, headY - 4, 11, Math.PI, 0);
                ctx.stroke();

                // Neon LED Earcups
                ctx.fillStyle = '#ff0077';
                ctx.shadowColor = '#ff0077';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.roundRect(13, headY - 3, 3.5, 8, 2);
                ctx.roundRect(31, headY - 3, 3.5, 8, 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Headset Mic Boom
                ctx.strokeStyle = '#020617';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(14, headY + 3);
                ctx.quadraticCurveTo(20, headY + 7, 26, headY + 6);
                ctx.stroke();
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.arc(26.5, headY + 6, 1.2, 0, Math.PI * 2);
                ctx.fill();

                // Modern Wrap-Around Cyber Sunglasses
                ctx.fillStyle = '#020617';
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.roundRect(18.5, headY - 2.5, 13, 5, 2);
                ctx.fill();
                ctx.stroke();

                // Gradient Visor Lens (Cyan to Hot Purple)
                const lensGrad = ctx.createLinearGradient(19, headY - 2, 31, headY + 2);
                lensGrad.addColorStop(0, '#00f2fe');
                lensGrad.addColorStop(1, '#9d4edd');
                ctx.fillStyle = lensGrad;
                ctx.fillRect(19.5, headY - 1.8, 11, 3.5);

                // Specular diagonal white reflection streak
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.beginPath();
                ctx.moveTo(21, headY + 1.5);
                ctx.lineTo(24, headY - 1.8);
                ctx.lineTo(25.5, headY - 1.8);
                ctx.lineTo(22.5, headY + 1.5);
                ctx.closePath();
                ctx.fill();

                // Nose tip & bridge
                ctx.strokeStyle = '#c4784a';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(30, headY + 0.5);
                ctx.lineTo(31.8, headY + 1.8);
                ctx.lineTo(30.2, headY + 2.5);
                ctx.stroke();

                // Confident Gamer Smirk
                ctx.strokeStyle = '#852b12';
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(24.5, headY + 5.5);
                ctx.lineTo(29.5, headY + 4.8);
                ctx.stroke();

            } else if (charId === 'daisy-hacker') {
                // Neon Magenta Undercut Hairstyle
                ctx.fillStyle = '#18181b';
                ctx.fillRect(15, headY - 9, 6, 8); // Shaved side
                ctx.fillStyle = '#ff0077';
                ctx.beginPath();
                ctx.moveTo(16, headY - 10);
                ctx.bezierCurveTo(24, headY - 15, 33, headY - 8, 33, headY + 3);
                ctx.lineTo(29, headY + 9);
                ctx.lineTo(25, headY);
                ctx.closePath();
                ctx.fill();

                // Expressive Right Eye
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#1e1b18';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.ellipse(27, headY - 1.2, 2.6, 2.2, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Purple/Amethyst Iris
                ctx.fillStyle = '#a855f7';
                ctx.beginPath();
                ctx.arc(27.8, headY - 1.2, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Dark Pupil & Catchlight
                ctx.fillStyle = '#09090b';
                ctx.beginPath();
                ctx.arc(28, headY - 1.2, 0.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(27.2, headY - 2, 1, 1);

                // Winged Eyeliner
                ctx.strokeStyle = '#09090b';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(25, headY - 2.5);
                ctx.lineTo(29.8, headY - 2.8);
                ctx.lineTo(31, headY - 3.8);
                ctx.stroke();

                // Sleek Eyebrow
                ctx.strokeStyle = '#ec4899';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(24.5, headY - 4.5);
                ctx.lineTo(29.5, headY - 5);
                ctx.stroke();

                // Glowing Holographic Eye-Visor Monocular (Over left eye area)
                ctx.fillStyle = 'rgba(0, 255, 204, 0.35)';
                ctx.strokeStyle = '#00ffcc';
                ctx.lineWidth = 1.2;
                ctx.shadowColor = '#00ffcc';
                ctx.shadowBlur = 6;
                ctx.strokeRect(18.5, headY - 2.5, 6, 5);
                ctx.fillRect(18.5, headY - 2.5, 6, 5);
                ctx.shadowBlur = 0;
                // Reticle crosshair inside monocular
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(21, headY - 1, 1, 2);
                ctx.fillRect(20, headY - 0.2, 3, 1);

                // Elegant Nose Profile
                ctx.strokeStyle = '#c4784a';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(29.5, headY);
                ctx.lineTo(31.5, headY + 1.8);
                ctx.lineTo(30.2, headY + 2.4);
                ctx.stroke();

                // Dark Cherry / Magenta Lips & Smirk
                ctx.strokeStyle = '#9f1239';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(25, headY + 5.4);
                ctx.lineTo(29.5, headY + 4.8);
                ctx.stroke();
                ctx.fillStyle = '#e11d48';
                ctx.fillRect(26.5, headY + 5.8, 2, 0.8);

            } else {
                // =========================================================
                // CLASSIC DAVE REMASTERED: ICONIC RED CAP & EXPRESSIVE FACE
                // =========================================================
                // Hair: Dark chestnut curls at back of neck & sideburn
                ctx.fillStyle = '#3f1d0b';
                ctx.beginPath();
                ctx.ellipse(15.5, headY + 4, 3, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Sideburn in front of ear framing temple
                ctx.beginPath();
                ctx.moveTo(17, headY - 1);
                ctx.lineTo(19, headY - 1);
                ctx.lineTo(18, headY + 4);
                ctx.closePath();
                ctx.fill();

                // Cap Crown
                ctx.fillStyle = '#dc2626';
                ctx.strokeStyle = '#1e1b18';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(14.5, headY - 10.5, 18.5, 9.5, [7, 7, 2, 2]);
                ctx.fill();
                ctx.stroke();

                // Cap crown seam & highlight
                ctx.strokeStyle = '#ef4444';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(16, headY - 9);
                ctx.quadraticCurveTo(24, headY - 11, 31, headY - 9);
                ctx.stroke();

                // Cap button on top
                ctx.fillStyle = '#991b1b';
                ctx.beginPath();
                ctx.arc(23.5, headY - 10.5, 1.8, 0, Math.PI * 2);
                ctx.fill();

                // Cap Visor / Bill (projecting forward to the right over face)
                ctx.fillStyle = '#b91c1c';
                ctx.strokeStyle = '#1e1b18';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.roundRect(22, headY - 3.5, 12, 3.5, [2, 3, 2, 1]);
                ctx.fill();
                ctx.stroke();

                // Visor edge highlight
                ctx.fillStyle = '#ef4444';
                ctx.fillRect(23, headY - 3.5, 10, 1);

                // Embroidered White Cap Emblem with Dave 'D' Logo
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(21, headY - 6.5, 2.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#b91c1c';
                ctx.lineWidth = 0.8;
                ctx.stroke();
                ctx.fillStyle = '#2563eb';
                ctx.fillRect(20.2, headY - 7.5, 1.6, 2.2);

                // Ambient drop-shadow cast by the visor onto the forehead
                ctx.fillStyle = 'rgba(30, 27, 24, 0.25)';
                ctx.fillRect(19, headY - 3, 11, 2);

                // Bold Adventurer Eyebrow
                ctx.strokeStyle = '#2d1406';
                ctx.lineWidth = 1.8;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(23.5, headY - 3.2);
                ctx.lineTo(29.5, headY - 4.2);
                ctx.stroke();

                // Expressive Eye: Sclera (White of eye)
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#1e1b18';
                ctx.lineWidth = 0.8;
                ctx.beginPath();
                ctx.ellipse(27, headY - 1.2, 2.8, 2.1, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Bold Blue Hero Iris (Facing forward)
                ctx.fillStyle = '#2563eb';
                ctx.beginPath();
                ctx.ellipse(27.8, headY - 1.2, 1.7, 1.9, 0, 0, Math.PI * 2);
                ctx.fill();

                // Dark Pupil
                ctx.fillStyle = '#09090b';
                ctx.beginPath();
                ctx.arc(28.1, headY - 1.2, 1, 0, Math.PI * 2);
                ctx.fill();

                // Crisp Specular Glint (Catchlight bringing eyes to life!)
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(27.2, headY - 2.2, 1.1, 1.1);

                // Defined Adventurer Nose Bridge & Tip
                ctx.strokeStyle = '#c4784a';
                ctx.lineWidth = 1.3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.beginPath();
                ctx.moveTo(29, headY - 0.5);
                ctx.lineTo(31.8, headY + 1.2);
                ctx.lineTo(30, headY + 2.2);
                ctx.stroke();

                // Nostril shadow
                ctx.fillStyle = '#9c542b';
                ctx.fillRect(29.5, headY + 1.8, 1.2, 1);

                // Natural healthy cheek flush
                ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
                ctx.beginPath();
                ctx.ellipse(24.5, headY + 2.2, 2.5, 1.8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Confident Dave Smirk
                ctx.strokeStyle = '#852b12';
                ctx.lineWidth = 1.4;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(24.5, headY + 5.2);
                ctx.quadraticCurveTo(27.5, headY + 5.5, 29.5, headY + 4.2);
                ctx.stroke();

                // Lower lip warmth
                ctx.fillStyle = '#c77045';
                ctx.fillRect(26, headY + 6.2, 2.5, 0.8);
            }
            ctx.restore();

            // -------------------------------------------------------------
            // LAYER 5: ARMS, WEAPONS & FIRING STANCE
            // -------------------------------------------------------------
            ctx.save();
            let armSleeveColor = '#3b0764';
            let armHandColor = '#0f172a'; // Black gaming gloves

            if (charId === 'daisy-hacker') {
                armSleeveColor = '#18181b';
                armHandColor = '#cbd5e1'; // Chrome cyber hand
            } else if (charId === 'classic-dave') {
                armSleeveColor = '#2563eb';
                armHandColor = '#f6d5be'; // Natural hand
            }

            if (pose === 'shoot') {
                // =========================================================
                // FORWARD AIMING & SHOOTING STANCE WITH PLASMA RIFLE
                // =========================================================
                // Left Arm reaching forward under barrel
                ctx.fillStyle = armSleeveColor;
                ctx.beginPath();
                ctx.roundRect(19, 26 + headBob, 11, 5, 2);
                ctx.fill();
                ctx.fillStyle = armHandColor;
                ctx.beginPath();
                ctx.roundRect(28, 26 + headBob, 4, 5, 2);
                ctx.fill();

                // High-Tech Plasma Rifle (Extending forward)
                ctx.fillStyle = '#1e293b';
                ctx.beginPath();
                ctx.roundRect(24, 25 + headBob, 18, 7, 2); // Main receiver
                ctx.fill();

                // Glowing Cyan Plasma Chamber
                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 8;
                ctx.fillRect(28, 27 + headBob, 8, 3);
                ctx.shadowBlur = 0;

                // Holographic Sight
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(29, 21 + headBob, 6, 4);

                // Barrel & Laser Emitter tip
                ctx.fillStyle = '#475569';
                ctx.fillRect(41, 26.5 + headBob, 5, 4);

                // Energetic Muzzle Flash Flare
                ctx.fillStyle = '#00ffff';
                ctx.shadowColor = '#00ffff';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(46, 28.5 + headBob, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(46, 28.5 + headBob, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;

                // Right Hand gripping trigger
                ctx.fillStyle = armSleeveColor;
                ctx.beginPath();
                ctx.roundRect(17, 28 + headBob, 8, 5, 2);
                ctx.fill();
                ctx.fillStyle = armHandColor;
                ctx.beginPath();
                ctx.roundRect(23, 28 + headBob, 4, 5, 2);
                ctx.fill();

            } else {
                // =========================================================
                // DYNAMIC ARM SWING WITH WALKING CYCLE
                // =========================================================
                let leftArmY = 26 + headBob;
                let rightArmY = 26 + headBob;
                let leftArmX = 11;
                let rightArmX = 31;

                if (pose === 'walk0') {
                    // Left arm swings back, right arm swings forward
                    leftArmX = 9; leftArmY = 27 + headBob;
                    rightArmX = 33; rightArmY = 27 + headBob;
                } else if (pose === 'walk2') {
                    // Right arm swings back, left arm swings forward
                    leftArmX = 13; leftArmY = 27 + headBob;
                    rightArmX = 29; rightArmY = 27 + headBob;
                } else if (pose === 'jump') {
                    // Arms raised slightly for balance
                    leftArmX = 9; leftArmY = 23 + headBob;
                    rightArmX = 33; rightArmY = 23 + headBob;
                }

                // Left Arm (Back)
                ctx.fillStyle = armSleeveColor;
                ctx.beginPath();
                ctx.roundRect(leftArmX, leftArmY, 5, 11, 2);
                ctx.fill();
                ctx.fillStyle = armHandColor;
                ctx.beginPath();
                ctx.roundRect(leftArmX, leftArmY + 11, 5, 4, 2);
                ctx.fill();

                // Right Arm (Front)
                ctx.fillStyle = armSleeveColor;
                ctx.beginPath();
                ctx.roundRect(rightArmX, rightArmY, 5, 11, 2);
                ctx.fill();
                ctx.fillStyle = armHandColor;
                ctx.beginPath();
                ctx.roundRect(rightArmX, rightArmY + 11, 5, 4, 2);
                ctx.fill();
            }
            ctx.restore();
        };

        // Render all permutations of gear & animation states for this character (48x62)
        const gearTags: { tag: string; hasGun: boolean; hasJet: boolean }[] = [
            { tag: '', hasGun: false, hasJet: false },
            { tag: '-gun', hasGun: true, hasJet: false },
            { tag: '-jet', hasGun: false, hasJet: true },
            { tag: '-gunjet', hasGun: true, hasJet: true },
        ];

        const poses: Pose[] = ['idle', 'walk0', 'walk1', 'walk2', 'walk3', 'jump', 'shoot'];

        for (const gear of gearTags) {
            for (const p of poses) {
                // Skip shoot pose if player doesn't have gun
                if (p === 'shoot' && !gear.hasGun) continue;

                const c = document.createElement('canvas');
                c.width = 48;
                c.height = 62;
                const ctx = c.getContext('2d')!;
                drawHDCharacter(ctx, charId, p, gear.hasGun, gear.hasJet, false);

                const key = `${charId}${gear.tag}-${p}`;
                this.textures.addCanvas(key, c);
            }

            // If gear has jetpack, also generate the active thruster flight frame
            if (gear.hasJet) {
                const c = document.createElement('canvas');
                c.width = 48;
                c.height = 62;
                const ctx = c.getContext('2d')!;
                drawHDCharacter(ctx, charId, 'jump', gear.hasGun, true, true);
                this.textures.addCanvas(`${charId}${gear.tag}-flight`, c);
            }
        }

        // Backward-compatibility aliases for legacy scene calls
        const aliasMap: { [from: string]: string } = {
            [`${charId}-walk1`]: `${charId}-walk0`,
            [`${charId}-walk2`]: `${charId}-walk2`,
            [`${charId}-jetpack`]: `${charId}-jet-flight`
        };

        for (const [fromKey, toKey] of Object.entries(aliasMap)) {
            if (!this.textures.exists(fromKey) && this.textures.exists(toKey)) {
                const src = this.textures.get(toKey).getSourceImage() as HTMLCanvasElement;
                if (src) this.textures.addCanvas(fromKey, src);
            }
        }
    }
}
