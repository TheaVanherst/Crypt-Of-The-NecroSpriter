
document.addEventListener('DOMContentLoaded', () => {
    aniArrLength = aniOffsets[0].length;

    bpmUpdate(); scaleUpdate();
    playTog ? buttonTog($("#play")) : null;
    multiplierFlip(danceMode[0][0],danceMode[0][1]);
    multiplierFlip(danceMode[1][0],danceMode[1][1]);

    $("#bpmSlider").oninput = () => bpmUpdate();
    $("#scaleSlider").oninput = () => scaleUpdate();
    $all("#urlData input").forEach((e) => {e.onkeydown = (a) => { search(a,e); };});

    const c = currentFloor - 1,
        v = c > 2 ? 1 : 0,
        h = c > 2 ? c - 3 : c; //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]; //sets current floor automatically
    backgroundUpdate($('#floor'),v,h);
    $("#foreground").src = "UI_Libraries/" + overlayTileSets[v][h][0] + "_Overlay.png";

    $('#' + overlayTileSets[v][h][0]).classList.add('inv');
    $("#floorDebug").textContent = danceMode[0][1] + " / " + danceMode[1][1] + " : ";
    $("#flipDebug").textContent = floorFlipper ? 1 : 2;

    // todo: EQUIPMENT SETTINGS

    for (let key in itemData) {
        const itemName = "#" + itemData[key].name;

        !itemData[key].bool ?
            $(itemName).classList.add("invisible") :
            itemToggle($(itemName + "Button"));
        $(itemName + "Button").onclick = () => {
            itemToggle($(itemName + "Button"));}

        if (itemData[key].url !== undefined) {
            if (!itemData[key].consumable && itemData[key].name !== "shield") {
                itemArray[key] = new itemRefactor(key, defaultCharacter, frame)}
            else if (itemData[key].consumable) {
                consumableList.push(key)}}
        else {
            $(itemName + "Url").placeholder = "No Startup URL"}}

    for (let key in consumableList) {
        consumableItems[key] = new consumableRefactor(consumableList[key], floatInt)}

    itemData = [];
    document.removeEventListener('DOMContentLoaded', () => {});
}, false);