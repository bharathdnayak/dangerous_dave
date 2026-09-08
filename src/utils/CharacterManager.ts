export interface CharacterConfig {
    id: string;
    name: string;
    tagline: string;
    description: string;
    themeColor: string;
    trailParticleColor: number;
    accentColorHex: string;
    badge: string;
    perk: string;
    stats: { speed: number; jump: number; style: number };
}

export const CHARACTERS: CharacterConfig[] = [
    {
        id: 'cyber-dave',
        name: 'CYBER DAVE',
        tagline: 'Gen Z Pro Streamer',
        description: 'RGB headphones, dual-tone cyber visor, oversized hoodie, and neon kicks.',
        themeColor: '#00FFFF',
        trailParticleColor: 0x00FFFF,
        accentColorHex: 'from-cyan-500 to-blue-600',
        badge: 'CYBER PRO',
        perk: 'RGB Streamer Aura',
        stats: { speed: 96, jump: 92, style: 100 }
    },
    {
        id: 'daisy-hacker',
        name: 'DAISY VEX',
        tagline: 'Cyberpunk Hacker',
        description: 'Neon magenta undercut, AR targeting monocular, and chrome bionic arm.',
        themeColor: '#FF007F',
        trailParticleColor: 0xFF007F,
        accentColorHex: 'from-pink-500 to-purple-600',
        badge: 'AGILE HACKER',
        perk: 'EMP Reflex Dash',
        stats: { speed: 100, jump: 95, style: 94 }
    },
    {
        id: 'classic-dave',
        name: 'CLASSIC DAVE',
        tagline: '1988 Remastered',
        description: 'The legendary red snapback hero, remastered in crisp 2026 illustrated vector art.',
        themeColor: '#F59E0B',
        trailParticleColor: 0xF59E0B,
        accentColorHex: 'from-amber-500 to-red-600',
        badge: 'RETRO LEGEND',
        perk: 'Gold Trophy Master',
        stats: { speed: 92, jump: 98, style: 96 }
    }
];

class CharacterSelectionManager {
    private selectedId: string = 'cyber-dave';

    constructor() {
        const saved = localStorage.getItem('dave_selected_character');
        if (saved && CHARACTERS.some(c => c.id === saved)) {
            this.selectedId = saved;
        }
    }

    public getSelected(): CharacterConfig {
        return CHARACTERS.find(c => c.id === this.selectedId) || CHARACTERS[0];
    }

    public setSelected(id: string) {
        if (CHARACTERS.some(c => c.id === id)) {
            this.selectedId = id;
            localStorage.setItem('dave_selected_character', id);
        }
    }
}

export const CharacterManager = new CharacterSelectionManager();
