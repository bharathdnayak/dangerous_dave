# 🎮 The Shadow Escape: 2026 Modern HD Edition
### 7th Semester UI/UX Project

A feature-complete, modern web platformer **The Shadow Escape**, completely designed with high-definition illustrated graphics, character selection, modern game-feel physics, responsive controls, procedural Web Audio, and an intuitive UI layer.

---

## 🚀 Key Modernizations & Innovations Over Classic Retro Platformers

| Classic Flaw | Our 2026 Modern Solution |
| :--- | :--- |
| **Chunky Pixel Blocks & 16-Color CGA/EGA** | **High-Definition Illustrated HD 2D Assets**: Procedural anti-aliased canvas rendering, animated 5-frame bezier fire with glowing embers, photorealistic golden chalice trophy, 2026 Sci-Fi Plasma Blaster, and Titanium Ion Jetpack. |
| **Single Character Locked** | **Character Selection Roster**: Choose between **Cyber Shadow** (Gen Z cyber infiltrator with RGB headset & streetwear hoodie), **Daisy Vex** (Cyberpunk hacker with neon bob & cyber visor), and **Classic Shadow** (Remastered red cap & blue polo). Switchable anytime from HUD or pause menu. |
| **Rigid, Unforgiving Jumping & Wall Clumping** | **Calibrated Physics & Jump Arc**: Step heights limited to $\le 2$ tiles with smooth jump clearance, **Coyote Time** (120ms window to jump after leaving ledges), **Jump Buffering** (120ms queue before landing), and **Variable Jump Height**. |
| **Unfair 1-Pixel Death Hitboxes** | Hazards (fire, water) and enemy hitboxes are tuned with fair, generous padding inside visual boundaries for satisfying, tight gameplay. |
| **Clunky Jetpack & Fast Fuel Depletion** | **Hover Jetpack with Dedicated Toggle**: Press `J` or tap HUD button to toggle flight mode, offering smooth 4-way omnidirectional thruster control and 25–50 seconds of generous fuel capacity. |
| **No Backwards Exploration** | **Level Traversal**: Walk through the left border of any level to return to previous levels and grab forgotten gems and points. |
| **Fixed 320x200 Display** | 16:9 854x480 High-Definition viewport with smooth camera tracking, **Full Screen Mode** (`F`), and **Multi-Scale Zoom** (`Z` / 1.0x, 0.82x, 1.2x). |
| **Harsh PC Speaker Audio** | Zero-dependency, low-latency **Procedural Web Audio Synthesizer** generating authentic retro sound effects (jumps, laser blast, gem sparkles, fanfare, jetpack engine) with a live SFX toggle. |

---

## 🕹️ Controls

| Action | Primary Key | Alternative Key | Mobile / Touch |
| :--- | :--- | :--- | :--- |
| **Move Left / Right** | `A` / `D` | `←` / `→` | Left / Right On-Screen Buttons |
| **Jump** | `SPACE` | `W` / `↑` | Red "JUMP" Button |
| **Shoot Gun** | `SHIFT` | - | Yellow "GUN" Button |
| **Jetpack Flight** | Hold `SPACE` | Hold `W` / `↑` | Hold "JUMP" Button |
| **Menu / Pause** | In-Game Button | - | "MENU" Header Button |

---

## 🏆 Levels & Progression (All 10 Levels)

1. **Level 1: The Entry** — Basic jumping, gems, trophy introduction, exit door.
2. **Level 2: Water Pit & Gun** — Water hazards, gun pickup, first spider encounter.
3. **Level 3: Jetpack Flight** — Jetpack flight, fuel management over fire pits.
4. **Level 4: Spider Cavern** — Vertical patrolling spiders and narrow ledge timing.
5. **Level 5: Solar Flare** — Weaving fireball entities across water hazards.
6. **Level 6: Pipeline Maze** — Industrial pipe choke points and precision platforming.
7. **Level 7: Alien Invasion** — Fast sinusoidal UFO saucers.
8. **Level 8: Jetpack Gauntlet** — Narrow vertical fire corridors testing fuel efficiency.
9. **Level 9: The Gauntlet** — Combined UFO and spider patrols.
10. **Level 10: The Final Escape** — The ultimate challenge combining all mechanics.

---

## 🛠️ Technology Stack

- **Game Engine**: [Phaser 3 / 4](https://phaser.io/) (Arcade Physics, Tile management, Camera lerping, Sprite animation)
- **UI Framework**: Modern HTML5 / Tailwind CSS overlay layer
- **Audio**: Web Audio API (Procedural sound synthesis, zero external MP3 assets)
- **Language**: TypeScript + Vite

---

## 💻 How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
3. Open the provided `http://localhost:5173` URL in your browser.

4. To build for production submission:
   ```bash
   npm run build
   npm run preview
   ```
