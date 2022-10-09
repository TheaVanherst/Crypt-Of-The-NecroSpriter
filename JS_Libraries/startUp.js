
const backgroundUpdate = (obj,e,i) => obj?.setAttribute(
    "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')");

document.addEventListener('DOMContentLoaded', () => {
    for (let e = 0; e < floorTileSets.length; e++){
        $('#backgrounds').appendChild(createButton("div"));

        for (let i = 0; i < floorTileSets[0].length; i++) {
            const child = createButton("e",null,floorTileSets[e][i][[0]]);//generates a button
            child.appendChild(createButton("t",floorTileSets[e][i][[0]]));
            backgroundUpdate(child,e,i);

            $('#backgrounds').children[e].appendChild(child).onclick = function () {
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage) {
                    arrayShift(floorTileSets[e][i]);
                    arrayShift(overlayTileSets[e][i]);
                    backgroundUpdate(this,e,i);}

                $("#foreground").src = "UI_Libraries/" + overlayTileSets[e][i][0] + "_Overlay.png";

                currentFloor = floorTileSets[e][i][0];
                if (danceMode[0][1] || danceMode[1][1]) {
                    floorFlip();}

                if (e === 0 && i === 1) {
                    if (danceMode[0][1]) {
                        danceMode = [[danceMode[0][0],false], [danceMode[1][0],true]];
                        multiplierFlip($('#floorMultiBool'));}
                    $("#danceButton")?.classList?.add("deact");}
                else {
                    $("#danceButton")?.classList?.remove("deact");}

                $("#floor").style.backgroundImage = this.style.backgroundImage;
                this.children[0].textContent = overlayTileSets[e][i][[0]];

                $all('#backgrounds e').forEach(id => {
                    id.classList.remove("inv");});
                this?.classList?.add('inv');}}}

    $("#bpmSlider").oninput = () => bpmUpdate();
    $("#scaleSlider").oninput = () => scaleUpdate();
    $all("#urlData input").forEach((e) => {e.onkeydown = (a) => { search(a,e); };});

    aniArrLength = aniOffsets[0].length;

    bpmUpdate(); scaleUpdate();
    playTog ? buttonTog($("#play")) : null;
    multiplierFlip(danceMode[0][0],danceMode[0][1]);
    multiplierFlip(danceMode[1][0],danceMode[1][1]);

    const c = currentFloor - 1,
        v = c > 2 ? 1 : 0,
        h = c > 2 ? c - 3 : c; //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]; //sets current floor automatically
    backgroundUpdate($('#floor'),v,h);
    $("#foreground").src = "UI_Libraries/" + overlayTileSets[v][h][0] + "_Overlay.png";

    $('#' + overlayTileSets[v][h][0]).classList.add('inv');
    $("#floorDebug").textContent = danceMode[0][1] + " / " + danceMode[1][1] + " : ";
    $("#flipDebug").textContent = floorFlipper ? 1 : 2;

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