export interface CharacterConfig {
    id: string;
    name: string;
    tagline: string;
    description: string;
    themeColor: string;
    trailParticleColor: number;
    accentColorHex: string;
}

export const CHARACTERS: CharacterConfig[] = [
    {
        id: 'cyber-dave',
        name: 'CYBER DAVE',
        tagline: 'Gen Z Pro Streamer',
        description: 'Equipped with RGB gaming headphones, neon visor, and high-top sneakers. Fast & stylish.',
        themeColor: '#00FFFF',
        trailParticleColor: 0x00FFFF,
        accentColorHex: 'from-cyan-500 to-blue-600'
    },
    {
        id: 'daisy-hacker',
        name: 'DAISY VEX',
        tagline: 'Cyberpunk Hacker',
        description: 'Neon magenta undercut, cybernetic arm, and holographic glasses. Stealthy and agile.',
        themeColor: '#FF007F',
        trailParticleColor: 0xFF007F,
        accentColorHex: 'from-pink-500 to-purple-600'
    },
    {
        id: 'classic-dave',
        name: 'CLASSIC DAVE',
        tagline: '1988 Remastered',
        description: 'The legendary red-cap daredevil, completely overhauled with crisp 2026 HD pixel art.',
        themeColor: '#FFCC00',
        trailParticleColor: 0xFFCC00,
        accentColorHex: 'from-amber-500 to-red-600'
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
