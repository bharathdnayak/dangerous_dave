import Phaser from 'phaser';

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
        // High-definition animated realistic fire
        this.anims.create({
            key: 'fire-burn',
            frames: [
                { key: 'fire-0' },
                { key: 'fire-1' },
                { key: 'fire-2' },
                { key: 'fire-3' },
                { key: 'fire-4' }
            ],
            frameRate: 12,
            repeat: -1
        });
    }

    private generateModernHDAssets() {
        // ==========================================
        // 1. HIGH-DEFINITION REALISTIC FIRE (5 Frames)
        // 40x40 Smooth Bezier Flame Rendering
        // ==========================================
        for (let f = 0; f < 5; f++) {
            const c = document.createElement('canvas'); c.width = 40; c.height = 40;
            const ctx = c.getContext('2d')!;

            // Molten magma base
            const baseGrad = ctx.createLinearGradient(0, 32, 0, 40);
            baseGrad.addColorStop(0, '#ff3300');
            baseGrad.addColorStop(1, '#660000');
            ctx.fillStyle = baseGrad;
            ctx.beginPath();
            ctx.roundRect(0, 34, 40, 6, [2, 2, 0, 0]);
            ctx.fill();

            // Flame peaks with smooth animated swaying
            const sway1 = Math.sin(f * 1.25) * 3;
            const sway2 = Math.cos(f * 1.5) * 4;
            const sway3 = Math.sin(f * 1.8 + 1) * 3;

            // Outer Crimson / Orange Flame (Smooth Bezier curves)
            const outerGrad = ctx.createLinearGradient(0, 40, 0, 4);
            outerGrad.addColorStop(0, '#ff1a00');
            outerGrad.addColorStop(0.6, '#ff6600');
            outerGrad.addColorStop(1, 'rgba(255, 140, 0, 0)');
            ctx.fillStyle = outerGrad;
            ctx.beginPath();
            ctx.moveTo(2, 40);
            ctx.bezierCurveTo(4, 28, 8 + sway1, 14, 10 + sway1, 6);
            ctx.bezierCurveTo(14 + sway1, 16, 17, 24, 20 + sway2, 4);
            ctx.bezierCurveTo(24 + sway2, 14, 28, 20, 30 + sway3, 8);
            ctx.bezierCurveTo(34, 18, 38, 28, 38, 40);
            ctx.closePath();
            ctx.fill();

            // Mid Golden / Yellow Flame
            const midGrad = ctx.createLinearGradient(0, 40, 0, 10);
            midGrad.addColorStop(0, '#ff8800');
            midGrad.addColorStop(0.7, '#ffcc00');
            midGrad.addColorStop(1, 'rgba(255, 240, 100, 0)');
            ctx.fillStyle = midGrad;
            ctx.beginPath();
            ctx.moveTo(6, 40);
            ctx.bezierCurveTo(8, 28, 12 + sway1, 18, 14 + sway1, 12);
            ctx.bezierCurveTo(18, 20, 20 + sway2, 16, 22 + sway2, 10);
            ctx.bezierCurveTo(26, 18, 30 + sway3, 22, 32, 26);
            ctx.bezierCurveTo(34, 32, 34, 36, 34, 40);
            ctx.closePath();
            ctx.fill();

            // Searing White Core (Intense Heat)
            const coreGrad = ctx.createRadialGradient(20, 34, 2, 20, 34, 12);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.5, '#ffffaa');
            coreGrad.addColorStop(1, 'rgba(255, 200, 0, 0)');
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.ellipse(20 + sway2 * 0.5, 32, 10, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Glowing Floating Embers
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(10 + (f * 5) % 20, 10 + (f * 4) % 15, 1.5, 0, Math.PI * 2);
            ctx.arc(22 + (f * 3) % 16, 6 + (f * 6) % 12, 1.2, 0, Math.PI * 2);
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
    }

    private generateHDCharacter(charId: string) {
        // Generates High-Resolution Smooth Illustrated Character (36x58)
        const drawHD = (ctx: CanvasRenderingContext2D, legState: number, isJumping: boolean, isJetpacking: boolean) => {
            ctx.clearRect(0, 0, 36, 58);

            if (charId === 'cyber-dave') {
                // ==============================================
                // CYBER DAVE (Modern Gen Z Streamer / Gamer)
                // RGB Headset, backward cap, hoodie, high-tops
                // ==============================================
                // Head / Face
                ctx.fillStyle = '#f6d5be';
                ctx.beginPath(); ctx.ellipse(18, 18, 9, 10, 0, 0, Math.PI * 2); ctx.fill();

                // Backward Streetwear Cap (Charcoal & Cyan)
                ctx.fillStyle = '#0f172a';
                ctx.beginPath(); ctx.roundRect(8, 7, 20, 9, [6, 6, 2, 2]); ctx.fill();
                ctx.fillStyle = '#00ffff';
                ctx.beginPath(); ctx.roundRect(4, 12, 6, 3, 2); ctx.fill(); // Backward visor bill

                // RGB Gaming Headphones
                ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.arc(18, 12, 11, Math.PI, 0); ctx.stroke();
                // Earcups with glowing neon LEDs
                ctx.fillStyle = '#ff0077'; ctx.shadowColor = '#ff0077'; ctx.shadowBlur = 6;
                ctx.beginPath(); ctx.roundRect(6, 12, 4, 9, 2); ctx.roundRect(26, 12, 4, 9, 2); ctx.fill();
                ctx.shadowBlur = 0;

                // Dark Cyber Sunglasses
                ctx.fillStyle = '#020617';
                ctx.beginPath(); ctx.roundRect(11, 16, 14, 4, 2); ctx.fill();
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(13, 17, 8, 1); // Visor reflection

                // Streetwear Hoodie (Deep Purple / Neon Cyan Accents)
                const hoodieGrad = ctx.createLinearGradient(0, 24, 0, 42);
                hoodieGrad.addColorStop(0, '#3b0764'); hoodieGrad.addColorStop(1, '#2e0854');
                ctx.fillStyle = hoodieGrad;
                ctx.beginPath(); ctx.roundRect(9, 24, 18, 17, [4, 4, 2, 2]); ctx.fill();
                // Neon drawstring
                ctx.fillStyle = '#00ffff'; ctx.fillRect(16, 26, 1.5, 9); ctx.fillRect(19, 26, 1.5, 9);

                // Arms / Gloves
                ctx.fillStyle = '#3b0764';
                ctx.fillRect(5, 26, 4, 10); ctx.fillRect(27, 26, 4, 10);
                ctx.fillStyle = '#0f172a'; // Black gaming gloves
                ctx.fillRect(5, 36, 4, 5); ctx.fillRect(27, 36, 4, 5);

                // Jogger Pants
                ctx.fillStyle = '#1e293b';
                if (isJumping) {
                    ctx.fillRect(8, 41, 7, 7); ctx.fillRect(21, 41, 7, 7);
                    // High-top Neon Sneakers
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath(); ctx.roundRect(6, 48, 9, 6, [2, 2, 0, 0]); ctx.roundRect(21, 48, 9, 6, [2, 2, 0, 0]); ctx.fill();
                    ctx.fillStyle = '#ffffff'; ctx.fillRect(6, 52, 9, 2); ctx.fillRect(21, 52, 9, 2);
                } else if (legState === 1) {
                    ctx.fillRect(7, 41, 7, 8); ctx.fillRect(22, 41, 7, 5);
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath(); ctx.roundRect(5, 49, 9, 6, [2, 2, 0, 0]); ctx.roundRect(22, 46, 9, 6, [2, 2, 0, 0]); ctx.fill();
                } else if (legState === 2) {
                    ctx.fillRect(8, 41, 7, 5); ctx.fillRect(21, 41, 7, 8);
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath(); ctx.roundRect(8, 46, 9, 6, [2, 2, 0, 0]); ctx.roundRect(21, 49, 9, 6, [2, 2, 0, 0]); ctx.fill();
                } else {
                    ctx.fillRect(9, 41, 7, 7); ctx.fillRect(20, 41, 7, 7);
                    ctx.fillStyle = '#00ffff';
                    ctx.beginPath(); ctx.roundRect(7, 48, 9, 6, [2, 2, 0, 0]); ctx.roundRect(20, 48, 9, 6, [2, 2, 0, 0]); ctx.fill();
                    ctx.fillStyle = '#ffffff'; ctx.fillRect(7, 52, 9, 2); ctx.fillRect(20, 52, 9, 2);
                }

            } else if (charId === 'daisy-hacker') {
                // ==============================================
                // DAISY VEX (Cyberpunk Tech Hacker)
                // Neon Pink Undercut, Visor, Chrome Cyber Arm
                // ==============================================
                // Head
                ctx.fillStyle = '#f6d5be';
                ctx.beginPath(); ctx.ellipse(18, 17, 8, 9, 0, 0, Math.PI * 2); ctx.fill();

                // Neon Magenta Undercut Hairstyle
                ctx.fillStyle = '#18181b'; ctx.fillRect(9, 8, 6, 9); // Shaved side
                ctx.fillStyle = '#ff0077';
                ctx.beginPath();
                ctx.moveTo(12, 7); ctx.bezierCurveTo(20, 2, 28, 6, 28, 16); ctx.lineTo(26, 24); ctx.lineTo(20, 16);
                ctx.closePath();
                ctx.fill();

                // Holographic AR Eyepiece
                ctx.fillStyle = '#00ffcc'; ctx.shadowColor = '#00ffcc'; ctx.shadowBlur = 6;
                ctx.beginPath(); ctx.roundRect(16, 15, 9, 4, 2); ctx.fill(); ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff'; ctx.fillRect(18, 16, 4, 1.5);

                // High-Tech Cyber Suit (Obsidian + Pink Neon Lines)
                ctx.fillStyle = '#18181b';
                ctx.beginPath(); ctx.roundRect(10, 24, 16, 17, 3); ctx.fill();
                ctx.fillStyle = '#ff0077'; ctx.fillRect(17, 25, 2, 15);

                // Cybernetic Left Arm (Chrome + Cyan Circuit lines)
                ctx.fillStyle = '#cbd5e1'; ctx.fillRect(5, 26, 4, 12);
                ctx.fillStyle = '#00ffff'; ctx.fillRect(6, 30, 2, 4);
                // Right Arm
                ctx.fillStyle = '#f6d5be'; ctx.fillRect(27, 26, 4, 12);

                // Combat Boots
                ctx.fillStyle = '#27272a';
                if (isJumping) {
                    ctx.fillRect(9, 41, 6, 7); ctx.fillRect(21, 41, 6, 7);
                    ctx.fillStyle = '#ff0077'; ctx.fillRect(7, 48, 8, 6); ctx.fillRect(21, 48, 8, 6);
                } else if (legState === 1) {
                    ctx.fillRect(8, 41, 6, 8); ctx.fillRect(22, 41, 6, 5);
                    ctx.fillStyle = '#ff0077'; ctx.fillRect(6, 49, 8, 6); ctx.fillRect(22, 46, 8, 6);
                } else {
                    ctx.fillRect(10, 41, 6, 7); ctx.fillRect(20, 41, 6, 7);
                    ctx.fillStyle = '#ff0077'; ctx.fillRect(8, 48, 8, 6); ctx.fillRect(20, 48, 8, 6);
                }

            } else {
                // ==============================================
                // CLASSIC DAVE (Remastered Illustrated Edition)
                // Red Cap, Blue Jacket, White Belt, Boots
                // ==============================================
                // Head
                ctx.fillStyle = '#f6d5be';
                ctx.beginPath(); ctx.ellipse(18, 18, 8, 9, 0, 0, Math.PI * 2); ctx.fill();

                // Red Baseball Cap
                ctx.fillStyle = '#dc2626';
                ctx.beginPath(); ctx.roundRect(9, 8, 18, 8, [6, 6, 2, 2]); ctx.fill();
                ctx.fillRect(14, 14, 12, 3); // Cap bill
                ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(17, 12, 2.5, 0, Math.PI*2); ctx.fill();

                // Hair & Eye
                ctx.fillStyle = '#451a03'; ctx.fillRect(10, 14, 4, 5);
                ctx.fillStyle = '#0f172a'; ctx.fillRect(21, 16, 3, 3);

                // Blue Jacket & Belt
                ctx.fillStyle = '#2563eb';
                ctx.beginPath(); ctx.roundRect(10, 24, 16, 17, 3); ctx.fill();
                ctx.fillStyle = '#ffffff'; ctx.fillRect(10, 36, 16, 3); // Belt
                ctx.fillStyle = '#eab308'; ctx.fillRect(16, 36, 4, 3); // Buckle

                // Arms
                ctx.fillStyle = '#2563eb'; ctx.fillRect(6, 25, 4, 11); ctx.fillRect(26, 25, 4, 11);
                ctx.fillStyle = '#f6d5be'; ctx.fillRect(6, 36, 4, 4); ctx.fillRect(26, 36, 4, 4);

                // Jeans & Leather Boots
                ctx.fillStyle = '#1e3a8a';
                if (isJumping) {
                    ctx.fillRect(9, 41, 6, 7); ctx.fillRect(21, 41, 6, 7);
                    ctx.fillStyle = '#78350f'; ctx.fillRect(7, 48, 8, 6); ctx.fillRect(21, 48, 8, 6);
                } else if (legState === 1) {
                    ctx.fillRect(8, 41, 6, 8); ctx.fillRect(22, 41, 6, 5);
                    ctx.fillStyle = '#78350f'; ctx.fillRect(6, 49, 8, 6); ctx.fillRect(22, 46, 8, 6);
                } else {
                    ctx.fillRect(10, 41, 6, 7); ctx.fillRect(20, 41, 6, 7);
                    ctx.fillStyle = '#78350f'; ctx.fillRect(8, 48, 8, 6); ctx.fillRect(20, 48, 8, 6);
                }
            }

            // Ion Jetpack Flames when flying
            if (isJetpacking) {
                const jetGrad = ctx.createLinearGradient(0, 24, 0, 48);
                jetGrad.addColorStop(0, '#00ffff');
                jetGrad.addColorStop(0.5, '#0077ff');
                jetGrad.addColorStop(1, 'rgba(0, 150, 255, 0)');
                ctx.fillStyle = jetGrad;
                ctx.beginPath();
                ctx.ellipse(3, 40, 3.5, 9, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        // Render Idle, Walk1, Walk2, Jump, Jetpack in 36x58
        let c = document.createElement('canvas'); c.width = 36; c.height = 58;
        let ctx = c.getContext('2d')!;
        drawHD(ctx, 0, false, false);
        this.textures.addCanvas(`${charId}-idle`, c);

        c = document.createElement('canvas'); c.width = 36; c.height = 58; ctx = c.getContext('2d')!;
        drawHD(ctx, 1, false, false);
        this.textures.addCanvas(`${charId}-walk1`, c);

        c = document.createElement('canvas'); c.width = 36; c.height = 58; ctx = c.getContext('2d')!;
        drawHD(ctx, 2, false, false);
        this.textures.addCanvas(`${charId}-walk2`, c);

        c = document.createElement('canvas'); c.width = 36; c.height = 58; ctx = c.getContext('2d')!;
        drawHD(ctx, 0, true, false);
        this.textures.addCanvas(`${charId}-jump`, c);

        c = document.createElement('canvas'); c.width = 36; c.height = 58; ctx = c.getContext('2d')!;
        drawHD(ctx, 0, true, true);
        this.textures.addCanvas(`${charId}-jetpack`, c);
    }
}
