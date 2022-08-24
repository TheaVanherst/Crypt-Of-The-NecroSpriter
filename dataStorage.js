
const songList = [
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
        ["BOSS // Death Metal"]]; //175

const dir = "characters/", //directory where all the character files are saved.
    characterFrames = [
    //        Name          WID/HIG/ROW/COL/HDP/BDP/File ID
        [   ["Base Game"], //HDP: head displacement, BPD: body displacement
            ["Cadence P1",  24, 24, 14, 16, 0, 0, "player1"],
            ["Melody",      24, 24, 14, 16, 0, 0, "char1"],
            ["Aria",        24, 24, 14, 16, 0, 0, "char2"],
            ["Dorian",      33, 32, 1 , 16, 1, 4, "char3"],
            ["Eli",         32, 28, 14, 16, -0.3, 0, "char4"], // TODO: FIX THIS
            ["Monk",        24, 24, 14, 16, 0, 0, "char5"],
            ["Dove",        24, 24, 14, 16, 4, 0, "char6"],
            ["Coda",        33, 30, 14, 16, 0, 0, "char7"],
            ["Bolt",        24, 24, 14, 16, 0, 0, "char8"],
            ["Bard",        24, 24, 14, 16, 0, 0, "char9"]
        ],[ ["Amplified"],
            ["Nocturna",    25, 27, 15, 16, 0, 0, "char10"],
            ["Diamond",     24, 24, 14, 16, 1, 0, "char11"],
            ["Mary",        24, 24, 14, 16, 0, 0, "char12"],
            ["Tempo",       24, 24, 14, 16, 1, 0, "char13"]
        ],[ ["Synchrony"],
            ["Suzu",        25, 28, 14, 16, 0, 0, "Suzu"],
            ["Chaunter",    27, 26, 1 , 9 , 0, 0, "Chaunter"],
            ["Klarinetta",  26, 30, 1 , 32, 0, 1, "Klarinetta"]]]

const floorTileSets = [
    [["zone1"], ["zone2"], ["zone3_1","zone3_2"]],
    [["zone4"], ["zone5"], ["boss_1","boss_2"]]];

// default settings

let currentCharacter = "Nocturna", //default character to select on load.
    clothingCurrent = 0, //default clothing active on startup
    framePushType = false, // How the debug menu outputs by default. 0-30 / 1-4
    ampBool = false, // Amplified default setting. On/off
    floorMultiplier = false,
    currentFloor = 3;

// system settings

let clothingData = [16,8], //amount of clothing / how many on each coloumn.
    bpm = 130 //default BPM setting