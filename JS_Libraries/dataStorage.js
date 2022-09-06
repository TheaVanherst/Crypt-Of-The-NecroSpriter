
// .dP"Y8 888888 888888 888888 88 88b 88  dP""b8 .dP"Y8        dP      dP"Yb  88""Yb 888888 88  dP"Yb  88b 88 .dP"Y8
// `Ybo." 88__     88     88   88 88Yb88 dP   `" `Ybo."       dP      dP   Yb 88__dP   88   88 dP   Yb 88Yb88 `Ybo."
// o.`Y8b 88""     88     88   88 88 Y88 Yb  "88 o.`Y8b      dP       Yb   dP 88"""    88   88 Yb   dP 88 Y88 o.`Y8b
// 8bodP' 888888   88     88   88 88  Y8  YboodP 8bodP'     dP         YbodP  88       88   88  YbodP  88  Y8 8bodP'

// TODO: DEFAULT SETTINGS

let framePushType = false, // How the debug menu outputs by default. 0-30 / 1-4
    ampBool = false, // Amplified default setting. On/off
    danceMode = [["danceButton", false],["multiplierButton", true]], //types of dance floors, name and bool assignment.

    forceRefresh = false, // This forces a URL refresh every few seconds with a live timestamp
    // THIS IS A BETA FEATURE and can cause cache issues alongside a few ms of the item being invisible.

    foregroundBool = true, // displays the foreground environment
    playTog = false; // enables the animation by default

// TODO: CLOTHING // CHARACTERS

let clothingData = [16,8];
// amount of clothing / how many on each column. This is just a hardcoded setting for changing the amount
// of columns and rows I want to impliment in the UI. I would avoid touching this unless you want to add extra sets of clothing.

let calls = [["hat", false],["weapon", false],["ring", false],["boots", false],["charm", false],["shovel", false],["torch", false],["hip", false],["special", false]],
    miscCalls = [["spell", false],["equipment", false],["item", false]]
// these store the names to be called when updating url data, and refer to the table below in the order displayed below.

let callsUrl = ["hat","weapon","ring","boots","charm","shovel","torch","hip","special"],
    miscCallsUrl = ["spell","equipment","item"]
// these store the default URLS on page load, change these and these will load based on directory.

// anyway, just change the boolean to false or true depending on if you want it displayed on page load.

const dir = "characters/",  //directory where all the character files are saved.
    characterFrames = [
//           Name         //RESOLUTION       DISPLACEMENT              HAT                           WEAPON         RING           BOOTS          CHARM                         SHOVEL         TORCH                                HIP            SPECIAL                      HEAD?
        [   ["Base Game"],//WID HIG   ROW COl   HDP BDP  File ID       BOOL   V  H  OFFSET           BOOL   V  H    BOOL   V  H    BOOL   V  H    BOOL   V  H  OFFSET           BOOL   V  H    BOOL   V  H   OFFSET        FLIP     BOOL   V  H    BOOL   WID HIG ROW COl                BOOL
            ["Cadence P1",  [24, 24], [14, 16], [0, 0], "player1",    [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 1], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Melody",      [24, 24], [14, 16], [0, 0], "char1",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [false, 0, 0], [true , 0, 4], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 3, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Aria",        [24, 24], [14, 16], [0, 0], "char2",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Dorian",      [33, 32], [1 , 16], [1, 4], "char3",      [true , 0, 4, [0 ,0 ,0 ,0 ]], [true , 0, 0], [true , 3, 4], [true , 4, 4], [true , 1, 4, [2 ,1 ,1 ,1 ]], [true , 2, 3], [true , 4, 3, [2 ,3 ,4 ,1 ], false], [true , 0, 0], [false], true ],
            ["Eli",         [33, 28], [14, 16], [0, 0], "char4",      [false, 0, 3, [1 ,2 ,3 ,4 ]], [false, 0, 0], [true , 3, 4], [true , 4, 4], [true , 0, 0, [1 ,2 ,3 ,2 ]], [false, 0, 0], [true , 2, 6, [1 ,2 ,3 ,4 ], true ], [true , 0, 0], [false], true ],
            ["Monk",        [24, 24], [14, 16], [0, 0], "char5",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Dove",        [24, 24], [14, 16], [4, 0], "char6",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Coda",        [33, 30], [14, 16], [0, 0], "char7",      [false, 0, 0, [1 ,2 ,3 ,4 ]], [false, 0, 0], [true , 4, 4], [true , 6, 4], [true , 2, 4, [2 ,0 ,-2,-1]], [true , 4, 4], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Bolt",        [24, 24], [14, 16], [0, 0], "char8",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Bard",        [24, 24], [14, 16], [0, 0], "char9",      [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ]
        ],[ ["Amplified"],
            ["Nocturna",    [25, 27], [15, 16], [0, 0], "char10",     [true , 2, 2, [1 ,2 ,3 ,4 ]], [true , 3, 3], [true , 2, 2], [true , 3, 1], [true , 2, 2, [1 ,2 ,3 ,2 ]], [true , 3, 1], [true , 3, 2, [1 ,2 ,3 ,4 ], false], [true , 2, 2], [false], true ],
            ["Diamond",     [24, 24], [14, 16], [1, 0], "char11",     [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [false, 0, 0], [false], true ],
            ["Mary",        [24, 24], [14, 16], [0, 0], "char12",     [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ],
            ["Tempo",       [24, 24], [14, 16], [1, 0], "char13",     [true , 0, 0, [1 ,2 ,3 ,4 ]], [true , 0, 0], [true , 0, 0], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 0], [false], true ]
        ],[ ["Synchrony"],
            ["Suzu",        [25, 28], [14, 16], [0, 0], "Suzu",       [true , 2, 2, [1 ,2 ,3 ,4 ]], [false, 3, 3], [true , 2, 2], [true , 4, 1], [true , 3, 2, [1 ,2 ,3 ,2 ]], [true , 3, 1], [true , 4, 2, [1 ,2 ,3 ,4 ], false], [true , 2, 2], [true , [24,24], [2 , 2 ], [0,0,0,0], [4,3,2,1], "weapon_lance"     ,0  ], true ],
            ["Chaunter",    [27, 26], [1 , 9 ], [0, 0], "Chaunter",   [false, 0, 0, [1 ,2 ,3 ,4 ]], [false, 0, 0], [false, 0, 0], [false, 0, 0], [false, 0, 0, [1 ,2 ,3 ,2 ]], [false, 0, 0], [false, 0, 0, [1 ,2 ,3 ,4 ], false], [false, 0, 1], [true , [27,26], [0 , 0 ], [0,0,0,0], [1,2,3,4], "chaunter_lantern" ,0  ], false],
            ["Klarinetta",  [26, 30], [1 , 32], [0, 1], "Klarinetta", [true , 1, 1, [1 ,2 ,3 ,4 ]], [false, 0, 0], [true , 3, 2], [true , 5, 1], [true , 2, 1, [1 ,1 ,2 ,2 ]], [true , 3, 1], [true , 8, 4, [1 ,4 ,3 ,2 ], false], [false, 0, 0], [true , [28,28], [19, 13], [1,1,1,2], [1,1,1,1], "weapon_greatsword",180], true ],
            ["CUSTOM",      [0 , 0 ], [0 , 0 ], [0, 0], "Custom",     [true , 0, 0, [1 ,2 ,3 ,4 ]], [false, 0, 0], [true , 0, 4], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,2 ]], [true , 0, 0], [true , 0, 0, [1 ,2 ,3 ,4 ], false], [true , 0, 1], [false], true ]
        ]]

// The data above is fully editable if you want to use custom sprites.

// WID is the sprite width, HIG is the sprite height. Change this to your sprite resolution.
// COL is the amount of columns your sprite sheet has, and ROW is the amount of rows your spritesheet has. Pretty self explanitory,

// HDP: head displacement,
// BPD: body displacement, adjust these to compensate for vertical height offsets your spritesheet may have.

// File ID: this is the file name, all of these work as expected for the base game and 1st DLC, just change the name to *insert name here*_armor.png
//      Chaunter and Klarinetta I would highly advise to avoid modding too much if you then want to use it here.
//      Nocturna has a 15th article of clothing which disables her head, so keep that in mind whene designing sprites.

// all of these settings should allow you to design most of the sprites you want.

let currentCharacter = "Nocturna", //default character to select on load.
    clothingCurrent = 0; //default clothing active on startup

let KlarinettaMulti = 1; // please don't change this, it's a horizontal offset for karinetta to be added and used with the multiplier.

// TODO: FLOOR TYPES

const floorTileSets = [ //these store the type of floor tiles needed to be displayed
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5","zone5"], ["boss_1","boss_2"]]],
    // if you want extra backgrounds which will be toggled between, change and add to these.
    // and once the subcatagory is selected, just click again to cycle around the array.

    overlayTileSets = [ //these store the names for the individual overlays
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5","zone5_Amp"], ["boss_1","boss_2"]]];
    // this works similar to how the floorTileSets works, but these display the forgrounds.
    // just change the name of the foreground you want here.

// for each floorTileSet you use, you'll need a overlayTileSet to work alongside it, otherwise the carousel will go out
// of sync of one another, unless you want that. Upto you.

let currentFloor = 5; // The default floor you want to be active, you can't select a subfloor, it only selects the button you want, aka. the first of each type.

// TODO: ANIMATION DATA

const aniOffsets = [[1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4],[1,2,3,4]],
    shovelOffsets = [-1,0,1,0],
    equipmentOffsets = [[0,1,1,2,1,1],
                        [1,2,2,1,0,1],
                        [1,0,1,2,2,1]];

// this is the array that stores horiztonal displayment multipliers for the animation to take place on which frame.
//      this is toggled by the [ANIMATION TYPE] button in the render UI, and switches between the ingame animation, and regular linear animation.

let activeRows, framesize; //these are just here to setup arrays to store data for character selection

// TODO: MUSIC

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
// These will be displayed as compatible tracks, not much need to edit them, but if you do want to edit them-
// keep the amount of songs per array to 5, as that's the max the UI is designed for.

let bpm = 130; //default BPM setting for the BPM slider.