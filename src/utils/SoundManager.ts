// Retro Web Audio Synthesizer for Dangerous Dave
// Generates crisp, lag-free sound effects without external audio files

class RetroSoundManager {
    private ctx: AudioContext | null = null;
    private isMuted: boolean = false;
    private jetpackOsc: OscillatorNode | null = null;
    private jetpackGain: GainNode | null = null;

    constructor() {
        // AudioContext initialized on first user interaction
    }

    private initContext() {
        if (!this.ctx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            this.ctx = new AudioContextClass();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    public toggleMute(): boolean {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.jetpackGain) {
            this.jetpackGain.gain.setValueAtTime(0, this.ctx ? this.ctx.currentTime : 0);
        }
        return this.isMuted;
    }

    // Jump sound: smooth upward frequency sweep
    public playJump() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // Gem / Score item: sparkling high arpeggio
    public playGem() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [587.33, 880, 1174.66]; // D5, A5, D6
        notes.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            const noteTime = now + idx * 0.04;
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.2, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.01, noteTime + 0.1);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + 0.1);
        });
    }

    // Trophy collection: triumphant fanfare
    public playTrophy() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            const noteTime = now + idx * 0.08;
            osc.frequency.setValueAtTime(freq, noteTime);

            gain.gain.setValueAtTime(0.25, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.01, noteTime + (idx === 3 ? 0.35 : 0.15));

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(noteTime);
            osc.stop(noteTime + (idx === 3 ? 0.4 : 0.18));
        });
    }

    // Gun laser / shot: fast downward pitch sweep
    public playShoot() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }

    // Enemy explosion: retro crunchy white noise
    public playExplode() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.25);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
    }

    // Death sound: descending warble
    public playDie() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.linearRampToValueAtTime(70, now + 0.6);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.6);
    }

    // Door enter: warp chord
    public playLevelComplete() {
        if (this.isMuted) return;
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const freqs = [392.00, 523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, i) => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            const t = now + i * 0.08;
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.25);
        });
    }

    // Continuous Jetpack Thruster Sound
    public setJetpackThruster(active: boolean) {
        if (this.isMuted || !active) {
            if (this.jetpackGain && this.ctx) {
                this.jetpackGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03);
            }
            return;
        }

        this.initContext();
        if (!this.ctx) return;

        if (!this.jetpackOsc) {
            this.jetpackOsc = this.ctx.createOscillator();
            this.jetpackOsc.type = 'triangle';
            this.jetpackOsc.frequency.setValueAtTime(110, this.ctx.currentTime);

            this.jetpackGain = this.ctx.createGain();
            this.jetpackGain.gain.setValueAtTime(0, this.ctx.currentTime);

            this.jetpackOsc.connect(this.jetpackGain);
            this.jetpackGain.connect(this.ctx.destination);
            this.jetpackOsc.start();
        }

        if (this.jetpackGain) {
            this.jetpackGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 0.03);
        }
    }
}

export const SoundManager = new RetroSoundManager();
