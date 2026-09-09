export interface LevelData {
    id: number;
    title: string;
    hint: string;
    width: number;
    height: number;
    grid: string[];
}

export const LEVELS: LevelData[] = [
    {
        id: 1,
        title: "LEVEL 1: THE ENTRY",
        hint: "Single tap [SPACE] for small hop, double tap [SPACE] for BIG jump! Hop up the stairs to the TROPHY!",
        width: 44,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                          B",
            "B                   T                      B",
            "B               BBBBBBBBB                  B",
            "B             BBBBBBBBBBBBB                B",
            "B           BBBBBBBBBBBBBBBBB   R          B",
            "B         BBBBBBBBBBBBBBBBBBBBB   S        B",
            "B       BBBBBBBBBBBBBBBBBBBBBBBBB   E      B",
            "B     BBBBBBBBBBBBBBBBBBBBBBBBBBBBB   C    B",
            "B   BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB    D B",
            "B @ BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 2,
        title: "LEVEL 2: WATER PIT & GUN",
        hint: "Grab the GUN! Leap across the stone pillars over water. Use double jump for extra height!",
        width: 52,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                  B",
            "B                                                  B",
            "B   G                                    T         B",
            "BBBBBBB                                BBBBBB      B",
            "B                                                  B",
            "B        BBBB   R       1       S            BBBBB B",
            "B             BBBBB   BBBBB   BBBBB     BBBB       B",
            "B                                                  B",
            "B @          R       S       E       C           D B",
            "BBBBBBBWWBBBBBWWBBBBBWWBBBBBWWBBBBBWWBBBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 3,
        title: "LEVEL 3: JETPACK FLIGHT",
        hint: "Pick up the JETPACK! Press [J] or click HUD button to toggle flight on/off.",
        width: 55,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                     B",
            "B                                    C        T       B",
            "B                                  BBBBBB   BBBBBB    B",
            "B                                                     B",
            "B          R         S                                B",
            "B        BBBBBB    BBBBBB                             B",
            "B                                                     B",
            "B   J                         BBBB                  D B",
            "B @ B                       BBBBBB               BBBBBB",
            "BBBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 4,
        title: "LEVEL 4: SPIDER CAVERN",
        hint: "Grab the gun on the ledge! Blast the spiders and leap across pillars.",
        width: 52,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                  B",
            "B                                        T         B",
            "B                                      BBBBBB      B",
            "B   G               1           1    BBBBBB        B",
            "BBBBBBB           BBBBB       BBBBB                B",
            "B        BBBBB                                     B",
            "B      BBBB     R       S               C        D B",
            "B @    BBBB   BBBB  BBBB  BBBB  BBBB  BBBB   BBBBBBB",
            "BBBBBBBBBBB   BBBB  BBBB  BBBB  BBBB  BBBB   BBBBBBB",
            "BBBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 5,
        title: "LEVEL 5: SOLAR FLARE",
        hint: "Fireballs circle the upper sky. Use the stair pillars to cross the water.",
        width: 55,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                     B",
            "B                           3                         B",
            "B                                          T          B",
            "B                                        BBBBBB       B",
            "B       R          S                   BBBBBB         B",
            "B     BBBBB      BBBBB                                B",
            "B                                            BBBBB    B",
            "B                                                     B",
            "B @          R       S       E       C              D B",
            "BBBBBBBWWBBBBBWWBBBBBWWBBBBBWWBBBBBWWBBBBBWWBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 6,
        title: "LEVEL 6: THE PIPELINE MAZE",
        hint: "Follow the stepped staircase directly up to the TROPHY and GUN! Press [W]/[S] to climb pipes.",
        width: 55,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                     B",
            "B                 T                                   B",
            "B               BBBBB       G                         B",
            "B             BBBBB       BBBBB                       B",
            "B           BBBBB       BBBBB         1               B",
            "B         BBBBB       BBBBB         BBBBB       C     B",
            "B                     P           BBBBB       BBBBB   B",
            "B    R                P                               B",
            "B  BBBBB              P                             D B",
            "B @BBBBB              P                           BBBBB",
            "BBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBB"
        ]
    },
    {
        id: 7,
        title: "LEVEL 7: ALIEN INVASION",
        hint: "Grab the gun on the first step and blast the flying UFOs before leaping across!",
        width: 55,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                     B",
            "B                                                     B",
            "B                              BBBBB  BBBBB  T BBBBB  B",
            "B                         BBBB             BBBBBBBB   B",
            "B                    BBBB                             B",
            "B               BBBB                                  B",
            "B         BBBB                                        B",
            "B               R     S     E     C                 D B",
            "B @  G        BBBB  BBBB  BBBB  BBBB  BBBB  BBBB  BBBBB",
            "BBBBBBBBBBBBWWBBBBWWBBBBWWBBBBWWBBBBWWBBBBWWBBBBWWBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 8,
        title: "LEVEL 8: JETPACK GAUNTLET",
        hint: "Equip your jetpack at spawn! Press [J] to toggle hover, and glide through the open fire corridors.",
        width: 60,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                          B",
            "B               F         F         F            T         B",
            "B               F    C    F    C    F          BBBBB       B",
            "B               F         F         F                      B",
            "B                                                          B",
            "B                                                          B",
            "B                                                          B",
            "B   J           F         F         F                    D B",
            "B @ B         BBBBB     BBBBB     BBBBB                BBBBB",
            "BBBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 9,
        title: "LEVEL 9: THE GAUNTLET",
        hint: "Spiders and UFOs patrol together. Hop up the battlements and use your gun!",
        width: 60,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                          B",
            "B                                                T         B",
            "B   G                                          BBBBBB      B",
            "BBBBBBB  BBBBB  BBBBB  BBBBB  BBBBB  BBBBB  BBBBBBBBBBBBBBBB",
            "B                 1             2                          B",
            "B                                                          B",
            "B   BBBBB                                                  B",
            "B @ BBBBB                                        C       D B",
            "BBBBBBBBB                                      BBBBBBBBBBBBB",
            "BBBBBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    },
    {
        id: 10,
        title: "LEVEL 10: DAVE'S FINAL TRIUMPH",
        hint: "Both Gun and Jetpack at your command! Conquer the ultimate fortress.",
        width: 65,
        height: 12,
        grid: [
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
            "B                                                               B",
            "B                      2                 1           T          B",
            "B                                                  BBBBB        B",
            "B                    BBBBBBB           BBBBBBB                  B",
            "B                                3                              B",
            "B             BBBBB                                             B",
            "B @ G   J                                    C                  B",
            "BBBBBBBBBBB             R          S       BBBBB              D B",
            "BBBBBBBBBBB           BBBBB      BBBBB                      BBBBB",
            "BBBBBBBBBBBFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBBBBBBBBBBBBBB",
            "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        ]
    }
];
