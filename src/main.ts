import './style.css';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
import { GameScene } from './scenes/Game';
import { SoundManager } from './utils/SoundManager';
import { LEVELS } from './data/levels';
import { CharacterManager, CHARACTERS } from './utils/CharacterManager';

let currentGame: Phaser.Game;

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 854,
    height: 480,
    parent: 'game-container',
    pixelArt: false, // Smooth anti-aliased modern graphics
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1100, x: 0 },
            debug: false
        }
    },
    scene: [Preloader, GameScene]
};

function initUI(game: Phaser.Game) {
    const mainMenu = document.getElementById('main-menu');
    const hud = document.getElementById('hud');
    const levelSelectModal = document.getElementById('level-select-modal');
    const controlsModal = document.getElementById('controls-modal');
    const gameOverModal = document.getElementById('game-over-modal');
    const levelGrid = document.getElementById('level-buttons-grid');
    const crtOverlay = document.getElementById('crt-overlay');

    const btnPlay = document.getElementById('btn-play');
    const btnLevelSelect = document.getElementById('btn-level-select');
    const btnCloseLevelSelect = document.getElementById('btn-close-level-select');
    const btnControls = document.getElementById('btn-controls');
    const btnCloseControls = document.getElementById('btn-close-controls');
    const btnRestart = document.getElementById('btn-restart');
    const btnBackToMenu = document.getElementById('btn-back-to-menu');
    const btnMenuOpen = document.getElementById('btn-menu-open');
    const btnSoundToggle = document.getElementById('btn-sound-toggle');
    const btnCrtToggle = document.getElementById('btn-crt-toggle');
    const btnFullscreen = document.getElementById('btn-fullscreen');
    const btnMenuFullscreen = document.getElementById('btn-menu-fullscreen');
    const btnQuickPrev = document.getElementById('btn-quick-prev');
    const btnQuickNext = document.getElementById('btn-quick-next');

    // Character Selection elements
    const charSelectModal = document.getElementById('character-select-modal');
    const charCardsGrid = document.getElementById('character-cards-grid');
    const btnCharacterSelect = document.getElementById('btn-character-select');
    const btnHudChar = document.getElementById('btn-hud-char');
    const btnCloseCharSelect = document.getElementById('btn-close-character-select');

    // Populate Character Cards Grid
    const renderCharacterCards = () => {
        if (!charCardsGrid) return;
        charCardsGrid.innerHTML = '';
        const currentSelected = CharacterManager.getSelected();

        CHARACTERS.forEach((char) => {
            const isSelected = char.id === currentSelected.id;
            const card = document.createElement('div');
            card.className = `p-4 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105 flex flex-col items-center text-center ${
                isSelected ? 'border-cyan-400 bg-cyan-950/60 shadow-[0_0_15px_rgba(0,255,255,0.4)]' : 'border-gray-700 bg-gray-900/60 hover:border-gray-500'
            }`;

            card.innerHTML = `
                <div class="w-16 h-16 rounded-full bg-gradient-to-br ${char.accentColorHex} flex items-center justify-center mb-3 shadow-lg border-2 border-white/20">
                    <span class="text-2xl">${char.id === 'daisy-hacker' ? '⚡' : char.id === 'cyber-dave' ? '🎧' : '🧢'}</span>
                </div>
                <h3 class="text-xs font-bold text-white mb-1 tracking-wider">${char.name}</h3>
                <span class="text-[8px] font-bold text-cyan-400 mb-2 uppercase">${char.tagline}</span>
                <p class="text-[8px] text-gray-300 font-ui leading-tight mb-3">${char.description}</p>
                <div class="text-[9px] font-bold py-1 px-3 rounded-full ${isSelected ? 'bg-cyan-500 text-black' : 'bg-gray-800 text-gray-400'}">
                    ${isSelected ? '✓ ACTIVE' : 'SELECT'}
                </div>
            `;

            card.addEventListener('click', () => {
                CharacterManager.setSelected(char.id);
                renderCharacterCards();
                // If game is currently running, re-skin Dave immediately
                const activeGameScene = game.scene.getScene('GameScene') as GameScene;
                if (activeGameScene && activeGameScene.getPlayer()) {
                    activeGameScene.getPlayer().setCharacter(char.id);
                }
            });

            charCardsGrid.appendChild(card);
        });
    };

    renderCharacterCards();

    // Character Modal Toggles
    btnCharacterSelect?.addEventListener('click', () => {
        renderCharacterCards();
        charSelectModal?.classList.remove('hidden');
    });
    btnHudChar?.addEventListener('click', () => {
        renderCharacterCards();
        charSelectModal?.classList.remove('hidden');
    });
    btnCloseCharSelect?.addEventListener('click', () => {
        charSelectModal?.classList.add('hidden');
    });

    // Populate Level Select Grid (1 to 10)
    if (levelGrid) {
        levelGrid.innerHTML = '';
        LEVELS.forEach((lvl, idx) => {
            const btn = document.createElement('button');
            btn.className = 'py-3 bg-blue-900 hover:bg-blue-700 border-2 border-white rounded text-center text-xs transition-transform hover:scale-105';
            btn.innerText = `L${lvl.id}`;
            btn.addEventListener('click', () => {
                levelSelectModal?.classList.add('hidden');
                mainMenu?.classList.add('hidden');
                hud?.classList.remove('hidden');
                game.scene.start('GameScene', { levelIndex: idx, score: 0, lives: 3 });
            });
            levelGrid.appendChild(btn);
        });
    }

    // Play button
    btnPlay?.addEventListener('click', () => {
        mainMenu?.classList.add('hidden');
        hud?.classList.remove('hidden');
        game.scene.start('GameScene', { levelIndex: 0, score: 0, lives: 3 });
    });

    // Level Select Modal
    btnLevelSelect?.addEventListener('click', () => {
        levelSelectModal?.classList.remove('hidden');
    });
    btnCloseLevelSelect?.addEventListener('click', () => {
        levelSelectModal?.classList.add('hidden');
    });

    // Controls Modal
    btnControls?.addEventListener('click', () => {
        controlsModal?.classList.remove('hidden');
    });
    btnCloseControls?.addEventListener('click', () => {
        controlsModal?.classList.add('hidden');
    });

    // Pause / In-Game Menu button
    btnMenuOpen?.addEventListener('click', () => {
        mainMenu?.classList.remove('hidden');
    });

    // Quick Level Navigation (Prev / Next)
    btnQuickPrev?.addEventListener('click', () => {
        const activeGameScene = game.scene.getScene('GameScene') as GameScene;
        if (activeGameScene && activeGameScene.currentLevelIndex > 0) {
            activeGameScene.goToLevel(activeGameScene.currentLevelIndex - 1, false);
        }
    });

    btnQuickNext?.addEventListener('click', () => {
        const activeGameScene = game.scene.getScene('GameScene') as GameScene;
        if (activeGameScene && activeGameScene.currentLevelIndex < LEVELS.length - 1) {
            activeGameScene.goToLevel(activeGameScene.currentLevelIndex + 1, false);
        }
    });

    // Restart button
    btnRestart?.addEventListener('click', () => {
        gameOverModal?.classList.add('hidden');
        game.scene.start('GameScene', { levelIndex: 0, score: 0, lives: 3 });
    });

    // Back to menu button
    btnBackToMenu?.addEventListener('click', () => {
        gameOverModal?.classList.add('hidden');
        hud?.classList.add('hidden');
        mainMenu?.classList.remove('hidden');
    });

    // Fullscreen toggler
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit fullscreen: ${err.message}`);
            });
        }
    };
    btnFullscreen?.addEventListener('click', toggleFullscreen);
    btnMenuFullscreen?.addEventListener('click', toggleFullscreen);

    // Keyboard 'F' for fullscreen
    window.addEventListener('keydown', (e) => {
        if (e.key === 'f' || e.key === 'F') {
            if (document.activeElement?.tagName !== 'INPUT') {
                toggleFullscreen();
            }
        }
    });

    const btnZoomToggle = document.getElementById('btn-zoom-toggle');

    const btnJetpackToggle = document.getElementById('btn-jetpack-toggle');
    btnJetpackToggle?.addEventListener('click', () => {
        const activeGameScene = game.scene.getScene('GameScene') as GameScene;
        if (activeGameScene && activeGameScene.getPlayer()) {
            activeGameScene.getPlayer().toggleJetpack();
        }
    });

    // Zoom Level cycler
    const zoomLevels = [
        { label: 'ZOOM: 1x', value: 1.0 },
        { label: 'ZOOM: 0.8x', value: 0.82 },
        { label: 'ZOOM: 1.2x', value: 1.2 },
    ];
    let currentZoomIdx = 0;

    const applyZoom = () => {
        const activeGameScene = game.scene.getScene('GameScene') as GameScene;
        if (activeGameScene) {
            activeGameScene.setZoomLevel(zoomLevels[currentZoomIdx].value);
        }
        if (btnZoomToggle) {
            btnZoomToggle.innerText = zoomLevels[currentZoomIdx].label;
        }
    };

    btnZoomToggle?.addEventListener('click', () => {
        currentZoomIdx = (currentZoomIdx + 1) % zoomLevels.length;
        applyZoom();
    });

    // Keyboard 'Z' for zoom
    window.addEventListener('keydown', (e) => {
        if (e.key === 'z' || e.key === 'Z') {
            if (document.activeElement?.tagName !== 'INPUT') {
                currentZoomIdx = (currentZoomIdx + 1) % zoomLevels.length;
                applyZoom();
            }
        }
    });

    // Sound toggle
    btnSoundToggle?.addEventListener('click', () => {
        const isMuted = SoundManager.toggleMute();
        if (btnSoundToggle) {
            btnSoundToggle.innerText = isMuted ? 'SFX: OFF' : 'SFX: ON';
            btnSoundToggle.classList.toggle('text-red-400', isMuted);
            btnSoundToggle.classList.toggle('text-gray-200', !isMuted);
        }
    });

    // CRT effect toggle
    let crtEnabled = false;
    btnCrtToggle?.addEventListener('click', () => {
        crtEnabled = !crtEnabled;
        if (crtOverlay) {
            crtOverlay.classList.toggle('crt', crtEnabled);
        }
        if (btnCrtToggle) {
            btnCrtToggle.innerText = crtEnabled ? 'CRT: ON' : 'CRT: OFF';
            btnCrtToggle.classList.toggle('text-green-400', crtEnabled);
            btnCrtToggle.classList.toggle('text-gray-200', !crtEnabled);
        }
    });

    // Touch control simulator (for mobile/tablet touch)
    const dispatchKey = (code: string, type: 'keydown' | 'keyup') => {
        window.dispatchEvent(new KeyboardEvent(type, { code }));
    };

    const bindTouch = (id: string, code: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('touchstart', (e) => { e.preventDefault(); dispatchKey(code, 'keydown'); });
        el.addEventListener('touchend', (e) => { e.preventDefault(); dispatchKey(code, 'keyup'); });
        el.addEventListener('mousedown', () => dispatchKey(code, 'keydown'));
        el.addEventListener('mouseup', () => dispatchKey(code, 'keyup'));
    };

    bindTouch('touch-left', 'ArrowLeft');
    bindTouch('touch-right', 'ArrowRight');
    bindTouch('touch-jump', 'Space');
    bindTouch('touch-shoot', 'ShiftLeft');

    // Show touch controls if on touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        document.getElementById('touch-controls')?.classList.remove('hidden');
    }
}

// Global HUD callback
(window as any).updateHUD = (score: number, level: number, lives: number) => {
    const elScore = document.getElementById('score-val');
    const elLevel = document.getElementById('level-val');
    const elLives = document.getElementById('lives-container');

    if (elScore) elScore.innerText = score.toString();
    if (elLevel) elLevel.innerText = level.toString();
    if (elLives) {
        elLives.innerHTML = '';
        for (let i = 0; i < lives; i++) {
            elLives.innerHTML += '<span>&#10084;</span>';
        }
    }
};

// Global Game Over callback
(window as any).showGameOver = (score: number, isWin: boolean = false) => {
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScore = document.getElementById('final-score');
    const title = document.getElementById('game-over-title');

    if (gameOverModal && finalScore && title) {
        gameOverModal.classList.remove('hidden');
        finalScore.innerText = score.toString();
        title.innerText = isWin ? 'VICTORY!' : 'GAME OVER';
        title.className = isWin 
            ? 'text-3xl md:text-4xl text-green-400 mb-4 drop-shadow-[3px_3px_0px_#fff]'
            : 'text-3xl md:text-4xl text-red-500 mb-4 drop-shadow-[3px_3px_0px_#fff]';
    }
};

// Start Phaser Game
currentGame = new Phaser.Game(config);
initUI(currentGame);
