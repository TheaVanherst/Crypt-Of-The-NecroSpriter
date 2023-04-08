
    settings = {
        // environment settings
        defaultFloor:       0,
            //floor you want [0-5], dance mode [0-2], true or false for visibility states.
            // floor types [0-5] : Zone 1, Zone 2, Zone 3 (COLD), Zone 4, Zone 5, Boss (1)
        foregroundVisible:  true,
        backgroundVisible:  true,
        danceFloorVisible:  true,
        multiplierMode:     false,
        backgroundColor:    "darkslategray",        //background colour visible when disabling floor visibility.

        // character settings
        defaultCharacter:   0,
        defaultClothing:    4,
        amplifiedSetting:   false,                  // character amplification toggle on start-up.

        // general settings
        defaultBPM:     130,                        // start-up bpm (Animation speed)
        defaultScale:   4,                          // start-up scale (zoom)

        // shield settings
        shieldPosition:     "right",
        shieldVisibility:   false,
    }

const songList =
    [
        ["Tombtorial"], //100
        ["N/a"], //105
        ["N/a"], //110
        ["1-1 // Disco Descent"], //115
        ["BOSS // Deep Blues [123]", "BOSS // King Conga", "BOSS // Golden Lute", "TRAINING // Watch Your Step"], //120
        ["BOSS // Coral Riff [126]", "BOSS // Frankensteinway"], //125
        ["LOBBY // Rhythmortis","1-2 // Crypteque","2-1 // Fungal Funk","4-1 // Styx and Stones", "5-1 // Voltzwaltz"], //130
        ["3-1 // Stone Cold (cold)"," 3-1 // Igneous Rock (hot)"], //135
        ["1-3 // Mausoleum Mash","2-2 // Grave Throbbing","BOSS // Necrodancer Phase 1","BOSS // Dead Ringer","5-2 // Power Cords"], //140
        ["3-2 // Dance of the Decorous (cold)","3-2 March of the Profane (hot)","4-2 // Heart of the Crypt", "BOSS // Conductor"], //145
        ["2-3 // Portabellohead", "BOSS // FortissiMole"], //150
        ["3-3 // A Cold sweat (cold)","3-3 // A Hot Mess (hot)","5-3 // Six Feet Thunder"], //155
        ["4-3 // The Wight To Remain","BOSS // Necrodancer Phase 2"], //160
        ["N/a"], //165
        ["N/a"], //170
        ["BOSS // Death Metal"], //175
        ["N/a"], //180
        ["N/a"], //185
        ["N/a"] //190
    ];