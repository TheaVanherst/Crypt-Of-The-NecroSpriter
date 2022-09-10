
// .dP"Y8 888888 888888 888888 88 88b 88  dP""b8 .dP"Y8        dP      dP"Yb  88""Yb 888888 88  dP"Yb  88b 88 .dP"Y8
// `Ybo." 88__     88     88   88 88Yb88 dP   `" `Ybo."       dP      dP   Yb 88__dP   88   88 dP   Yb 88Yb88 `Ybo."
// o.`Y8b 88""     88     88   88 88 Y88 Yb  "88 o.`Y8b      dP       Yb   dP 88"""    88   88 Yb   dP 88 Y88 o.`Y8b
// 8bodP' 888888   88     88   88 88  Y8  YboodP 8bodP'     dP         YbodP  88       88   88  YbodP  88  Y8 8bodP'

// TODO: DEFAULT SETTINGS

let framePushType = false, // How the debug menu outputs by default. 0-30 / 1-4
    ampBool = false, // Amplified default setting. On/off
    danceMode = [["danceButton", false],["multiplierButton", true]], //types of dance floors, name and bool assignment.
    forceRefresh = false, // This forces a URL refresh every few seconds with a live timestamp
    foregroundBool = true, // displays the foreground environment
    playTog = true; // enables the animation by default

// TODO: CLOTHING // CHARACTERS

let clothingData = [16,8], //max amount of clothing / how many clothing articles per row
    defaultCharacter = "Nocturna", //default character to select on load.
    clothingCurrent = 4; //default clothing active on startup
// amount of clothing / how many on each column. This is just a hardcoded setting for changing the amount
// of columns and rows I want to impliment in the UI. I would avoid touching this unless you want to add extra sets of clothing.

const dir = "characters/";  //directory where all the character files are saved.

// TODO: FLOOR TYPES

const floorTileSets = [ //these store the type of floor tiles needed to be displayed
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_1"]]],
    // if you want extra backgrounds which will be toggled between, change and add to these.
    // and once the subcatagory is selected, just click again to cycle around the array.

    overlayTileSets = [ //these store the names for the individual overlays
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_3"]]];
    // this works similar to how the floorTileSets works, but these display the forgrounds.
    // just change the name of the foreground you want here.

// for each floorTileSet you use, you'll need a overlayTileSet to work alongside it, otherwise the carousel will go out
// of sync of one another, unless you want that. Upto you.

let currentFloor = 5; // The default floor you want to be active, you can't select a subfloor, it only selects the button you want, aka. the first of each type.

// TODO: ANIMATION DATA

const aniOffsets = [[1,1,1,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4],[1,2,3,4]],
    shovelOffsets = [-1,0,1,0],
    equipmentOffsets = [[0,1,1,2,1,1], [1,2,2,1,0,1], [1,0,1,2,2,1]];

// this is the array that stores horiztonal displayment multipliers for the animation to take place on which frame.
//      this is toggled by the [ANIMATION TYPE] button in the render UI, and switches between the ingame animation, and regular linear animation.

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