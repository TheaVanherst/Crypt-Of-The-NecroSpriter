const
    settings = {
        // environment settings
        defaultFloor:       0,
            //floor you want [0-5], dance mode [0-2], true or false for visibility states.
            // floor types [0-5] : Zone 1, Zone 2, Zone 3 (COLD), Zone 4, Zone 5, Boss (1)
        foregroundVisible:  true,
        backgroundVisible:  true,
        danceFloorVisible:  true,
        multiplierMode:     false,
        backgroundColor:    "darkslategray",
            //background colour visible when disabling floor visibility.

        // character settings
        defaultCharacter:   18,
        defaultClothing:    0,
        amplifiedSetting:   false,
        headVisibility:     true,
            // character amplification toggle on start-up.

        // general settings
        defaultBPM:     130,
            // start-up bpm (Animation speed)
        defaultScale:   4,
            // start-up scale (zoom)

        // shield settings
        shieldPosition:     "right",
        shieldVisibility:   false,

        // advanced render settings
        dynamicRenderDefault: false,
            // renders according to in-game speed if true
    }

const aniOffsets =
        [ // animation frame offsets
            [   // default frame type [linear]
                // (better to test animations with, and runs on the current beat)
                1, 2, 3, 4,
            ], [
                // alternate frame type
                // (test what frame rendering looks like in game)
                1,1,1,
                2,2,2,2,2,2,2,
                3,3,3,3,3,3,3,3,3,
                4,4,4,4,4,4,
            ]
        ],
        floatOffsets =
            [ // preset character float offsets
                8,9,10,11,10,9
            ];

const songList =
    [
        ["Tombtorial"], //100
        ["N/a"], //105
        ["N/a"], //110
        ["1-1 // Disco Descent"], //115
        ["BOSS // Deep Blues [123]", "BOSS // King Conga", "BOSS // Golden Lute", "TRAINING // Watch Your Step","1-1m // Too Real [118]",], //120
        ["BOSS // Coral Riff [126]", "BOSS // Frankensteinway", "LOBBY // Rhythmortis","1-2m // Wonder Style [128]","2-1m // Ten Thousand Stars [128]","3-1m // Highlight","4-1m // MikuFiesta [128]"], //125
        ["LOBBY // Rhythmortis","1-2 // Crypteque","1-2m // Wonder Style [128]","2-1 // Fungal Funk","2-1m // Ten Thousand Stars [128]","3-1m // Highlight","4-1 // Styx and Stones","4-1m // MikuFiesta [128]","5-1 // Voltzwaltz"], //130
        ["3-1 // Stone Cold (cold)"," 3-1 // Igneous Rock (hot)"], //135
        ["BOSS // Necrodancer Phase 1","BOSS // Dead Ringer","1-3 // Mausoleum Mash","2-2 // Grave Throbbing","2-2m // Lucky Orb [138]","3-2m // Intergalactic Bound","5-1m // Sweety Glitch [138]","5-2 // Power Cords",], //140
        ["3-2 // Dance of the Decorous (cold)","3-2 March of the Profane (hot)","4-2 // Heart of the Crypt", "BOSS // Conductor"], //145
        ["BOSS // FortissiMole","1-3m // SURVIVE","2-3 // Portabellohead","2-3m // UNDERWATER","5-2m // Thousand Little Voices"], //150
        ["3-3 // A Cold sweat (cold)","3-3 // A Hot Mess (hot)","5-3 // Six Feet Thunder","5-3m // My One and Oni"], //155
        ["3-3m // Hello Builder","4-3 // The Wight To Remain","BOSS // Necrodancer Phase 2"], //160
        ["4-2m // Can't Make A Song!!"], //165
        ["4-3m // Be Furious [172]"], //170
        ["BOSS // Death Metal"], //175
        ["N/a"], //180
        ["N/a"], //185
        ["LOBBYM // Groove Prayer"] //190
    ];