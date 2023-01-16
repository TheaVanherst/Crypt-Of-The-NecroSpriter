
let currentCharacter, shieldData, specialData, floorData, itemArray = [];

document.addEventListener('DOMContentLoaded', () => {
    $("render").style.backgroundColor = "darkslategray"; //background colour.

    let defaultCharacter = 11; // This will initate as the default character.
    // - 11 is my demo of Vahn, a sprite designed with Crypt of the Necrospriter.

    currentCharacter = new characterRefactor(false, 4, defaultCharacter); //AMP mode / clothing set / def char

    let foreFloorArr = [true, true] // change these for the default start-up settings of the floor / foreground.
    // first setting is the floor, second is the foreground.

    if (foreFloorArr[0] === true){
            $("#backgroundButton").classList.add("inv");}
    else {  $("#floor").classList.add('invisible');
            $("#danceFloor").classList.add('invisible');}
    if (foreFloorArr[1] === true){
            $("#foregroundButton").classList.add("inv");}
    else {  $("#foreground").classList.add('invisible');}

    floorData = new floorRefactor(0,1); //floor you want [0-5] & dance mode [0-2]
    // floor types [0-5] : Zone 1, Zone 2, Zone 3 (COLD), Zone 4, Zone 5, Boss (1)

    $("#bpmSlider").oninput = () => bpmUpdate();
    $all("#urlData input").forEach((e) => {e.onkeydown = (a) => search(a,e);});
    bpmUpdate();

    scaleRes = 4; // default scale multiplier
    $('#scale').textContent = "1:" + scaleRes;

    playTog ? buttonTog($("#play")) : null;

    for (let key in itemData) {
        if (itemData[key].type === "equipment") {
            itemArray[key] = new itemRefactor(key, defaultCharacter);
        } else if (itemData[key].type === "consumable") {
            consumableData[key] = new consumableRefactor(key);
        } else if (itemData[key].type === "shield") {
            shieldData = new shieldRefactor("right", false);
        } else if (itemData[key].type === "special") {
            specialData = new specialRefactor(defaultCharacter); //don't touch this
        }

        let urlCheck = new Image()
        urlCheck.src = itemData[key].url + ".png";
        urlCheck.onerror = () => {
            let urlbar = $(`#${itemData[key].name}Url`)
            urlbar.classList.add("invalid");
            urlbar.value = "";
            urlbar.placeholder = "Invalid itemsData.js URL";
            setTimeout(() => {
                $(`#${itemData[key].name}Url`).classList.remove("invalid");
            }, 2000);
        };
    }
    delete itemData;

    $("#barDebug").textContent = floatInt;
    $("#beatDebug").textContent = frame;
    $("#elapsedDebug").textContent = elapsed;

    document.removeEventListener('DOMContentLoaded', () => {});
}, false);

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
    ["N/a"], ["N/a"], ["N/a"]]; //180 185 190
