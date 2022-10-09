
let framePushType = false, // How the debug menu outputs by default. 0-30 / 1-4
    danceMode = [["danceButton", false],["multiplierButton", true]], //types of dance floors, name and bool assignment.
    playTog = false, // enables the animation by default.
    frame = 0, //default starting frame
    bpm = 130, //default BPM setting for the BPM slider.

    defaultCharacter = 8,
    characterClass = new characterRefactor(false, 4, defaultCharacter), //AMP mode / clothing set / def char
    shieldData = new shieldRefactor("right", false), //default position of the shield / enabled by default
    specialItem = new specialRefactor(defaultCharacter, frame); //don't touch this

    $("render").style.backgroundColor = "darkslategray"; //background colour.
    frameTypeToggle(true);
    foregroundToggle(true);
    backgroundToggle(true);

const floorTileSets = [
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_1"]]],
    overlayTileSets = [
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_3"]]];
let currentFloor = 5;

const songList = [
        ["Tombtorial"], //100
        ["N/a"], ["N/a"], //105, 110
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
        ["N/a"], ["N/a"], //165, 170
        ["BOSS // Death Metal"], //175
        ["N/a"], ["N/a"], ["N/a"],]; //180 185 190