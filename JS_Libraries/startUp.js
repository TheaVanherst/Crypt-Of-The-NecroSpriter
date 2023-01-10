
$("render").style.backgroundColor = "darkslategray"; //background colour.
let currentCharacter, shieldData, specialData, floorData;

document.addEventListener('DOMContentLoaded', () => {
    let defaultCharacter = 0; // TODO: This will initate as the default character.

    currentCharacter = new characterRefactor(false, 4, defaultCharacter); //AMP mode / clothing set / def char
    shieldData = new shieldRefactor("right", false); //default position of the shield / enabled by default
    specialData = new specialRefactor(defaultCharacter, frame); //don't touch this

    $("#bpmSlider").oninput = () => bpmUpdate();
    $("#scaleSlider").oninput = () => scaleUpdate();
    $all("#urlData input").forEach((e) => {e.onkeydown = (a) => search(a,e);});
    bpmUpdate(); scaleUpdate();

    playTog ? buttonTog($("#play")) : null;

    for (let key in itemData) {
        const itemName = "#" + itemData[key].name;

        if (itemData[key].url !== undefined) {
            if (itemData[key].type === "equipment"){
                itemArray[key] = new itemRefactor(key, defaultCharacter, frame);
            } else if (itemData[key].type === "consumable") {
                consumableList.push(key);
            }
        } else {
            $(itemName + "Url").placeholder = "No Startup URL"}}

    for (let key in consumableList) {
        consumableData[key] = new consumableRefactor(consumableList[key], floatInt)}

    floorData = new floorRefactor();

    $("#barDebug").textContent = floatInt;
    $("#beatDebug").textContent = frame;
    $("#elapsedDebug").textContent = elapsed;

    itemData = [];
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
