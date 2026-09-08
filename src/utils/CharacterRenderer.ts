export type Pose = 'idle' | 'walk0' | 'walk1' | 'walk2' | 'walk3' | 'jump' | 'shoot';

export function drawHDCharacter(
    ctx: CanvasRenderingContext2D,
    charId: string,
    pose: Pose,
    hasGun: boolean,
    hasJetpack: boolean,
    isJetpacking: boolean,
    headBobOverride?: number
) {
    ctx.clearRect(0, 0, 48, 62);

    const cx = 24; // Character horizontal center

    // Dynamic head / body bob for responsive walking feel
    let headBob = headBobOverride ?? 0;
    if (headBobOverride === undefined) {
        if (pose === 'walk0' || pose === 'walk2') headBob = 1;      // Downbeat of stride
        if (pose === 'walk1' || pose === 'walk3') headBob = -1;     // Upbeat / passing step
        if (pose === 'jump') headBob = -2;                         // Extended in air
    }

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
            ctx.roundRect(12, 49, 9, 6, [2, 2, 0, 0]);  // Back shoe
            ctx.fill();
            ctx.fillStyle = shoeSole;
            ctx.fillRect(27, 55, 10, 2); ctx.fillRect(12, 53, 9, 2);

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
        ctx.roundRect(24, 25 + headBob, 18, 7, 2);
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
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.moveTo(46, 28.5 + headBob);
        ctx.lineTo(54, 26 + headBob);
        ctx.lineTo(49, 28.5 + headBob);
        ctx.lineTo(55, 32 + headBob);
        ctx.closePath();
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
        let leftArmY = 26 + headBob;
        let rightArmY = 26 + headBob;
        let leftArmX = 11;
        let rightArmX = 31;

        if (pose === 'walk0') {
            leftArmX = 9; leftArmY = 27 + headBob;
            rightArmX = 33; rightArmY = 27 + headBob;
        } else if (pose === 'walk2') {
            leftArmX = 13; leftArmY = 27 + headBob;
            rightArmX = 29; rightArmY = 27 + headBob;
        } else if (pose === 'jump') {
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
}

/**
 * Renders a full Subway Surfers / Hero Select style showcase podium & animated character.
 */
export function renderCharacterShowcase(
    canvas: HTMLCanvasElement,
    charId: string,
    animTime: number,
    isSelected: boolean
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const themeHex = charId === 'cyber-dave' ? '#00ffff' : charId === 'daisy-hacker' ? '#ff007f' : '#f59e0b';

    // 1. Background Ambient Radial Spotlight
    const cx = w / 2;
    const cy = h / 2;
    const bgGlow = ctx.createRadialGradient(cx, cy + 10, 10, cx, cy + 10, w * 0.65);
    bgGlow.addColorStop(0, isSelected ? `${themeHex}33` : `${themeHex}18`);
    bgGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = bgGlow;
    ctx.fillRect(0, 0, w, h);

    // 2. Futuristic Subway Surfers Style Podium / Pedestal
    const stageY = h - 28;
    ctx.save();
    
    // Stage Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(cx, stageY + 6, 46, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Stage Base
    const stageGrad = ctx.createLinearGradient(0, stageY - 6, 0, stageY + 10);
    stageGrad.addColorStop(0, '#1e293b');
    stageGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = stageGrad;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, stageY, 44, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Neon Glowing Edge Ring on Stage
    ctx.strokeStyle = themeHex;
    ctx.lineWidth = isSelected ? 3 : 1.5;
    ctx.shadowColor = themeHex;
    ctx.shadowBlur = isSelected ? 14 : 6;
    ctx.beginPath();
    ctx.ellipse(cx, stageY - 1, 40, 9, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Character Ground Shadow on Stage
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.beginPath();
    ctx.ellipse(cx, stageY - 1, 18, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 3. Render Animated Hero Sprite
    // Living breathing bounce: gentle sine wave
    const breathBob = Math.sin(animTime * 0.0035) * 2;
    
    // Offscreen 48x62 buffer
    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 48;
    spriteCanvas.height = 62;
    const sCtx = spriteCanvas.getContext('2d')!;

    // Draw full hero with weapon slung over shoulder
    drawHDCharacter(sCtx, charId, 'idle', true, false, false, Math.round(breathBob * 0.5));

    // Render scaled up on the stage (2x scale: 96x124)
    const scale = 2.0;
    const drawW = 48 * scale;
    const drawH = 62 * scale;
    const drawX = cx - drawW / 2;
    const drawY = stageY - drawH + 4 + breathBob;

    ctx.drawImage(spriteCanvas, drawX, drawY, drawW, drawH);

    // 4. Floating Hero Aura Sparks (when active / hovered)
    if (isSelected) {
        ctx.save();
        ctx.fillStyle = themeHex;
        ctx.shadowColor = themeHex;
        ctx.shadowBlur = 8;
        for (let i = 0; i < 4; i++) {
            const pTime = (animTime * 0.0012 + i * 1.5) % 3;
            const px = cx + Math.sin(pTime * 2 + i) * 32;
            const py = stageY - pTime * 35;
            const pSize = Math.max(0.5, 2.5 * (1 - pTime / 3));
            ctx.beginPath();
            ctx.arc(px, py, pSize, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}
