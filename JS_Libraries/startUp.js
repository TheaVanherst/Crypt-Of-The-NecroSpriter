
document.addEventListener('DOMContentLoaded', () => { // this just sets the boxes back to default settings
    aniArrLength = aniOffsets[0].length; // Updates the frame array to the default settings

    bpmUpdate(); // pushes the current slider status to the debug menu
    scaleUpdate(); // gets the scale for the slider ratio
    multiplierFlip();

    if(forceRefresh) {buttonTog($('#forceRefresh'));} //checks if force refresh is active by default

    // todo: RENDER SETTINGS

    playTog = danceMode[0] || danceMode[1] //enables play toggle if dance floor bools are enabled.
    buttonTog($("#play"))
    multiplierFlip(danceMode[0][0],danceMode[0][1])
    multiplierFlip(danceMode[1][0],danceMode[1][1])
    if(animationType === 1){frameTypeToggle($("#aniType"))}
    if(foregroundBool){buttonTog($('#foregroundButton'));}
    else {$('#foreground').classList.add("invisible");}

    const c=currentFloor-1,v=c>2?1:0,h=c>2?c-3:c; //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]; //sets current floor automatically
    floorDebug.textContent = danceMode[0][1] + " / " + danceMode[1][1] + " : "
    flipDebug.textContent = floorFlipper ? 1 : 2

    backgroundUpdate($('#floor'),v,h);
    foreground.src = "UI_Libraries/" + overlayTileSets[v][h][0] + "_Overlay.png";
    backgrounds.children[v].children[h].classList.add('inv');

    // todo: CHARACTER ? EQUIPMENT SETTINGS

    currentObject = mergeDeep({}, defaultData, getUser(defaultCharacter,characterData));

    playerUpdate();
    $("#"+defaultCharacter).classList.add("inv")
    characterDebug.textContent = currentObject.name + " "

    clothingUpdate();
    $("#clothing"+currentClothing)?.classList?.add('inv');
    clothingDebug.textContent = currentClothing + 1

    bodyUrlUpdate();

    // todo: EQUIPMENT SETTINGS

    for (let key in itemData) {
        const itemName = "#" + itemData[key].name;

        if(itemData[key].url !== undefined){
            $(itemName + "Url").value = "";
            $(itemName + "Url").placeholder = itemData[key].url + ".png";}

        $(itemName+"Button").onclick = () => itemToggle($(itemName+"Button"));

        if(!itemData[key].bool) {$("#"+itemData[key].name).classList.add("invisible");}
        else {buttonTog($("#"+itemData[key].name + "Button"));}}

    item.style.top = (-(item.naturalHeight / 2) + 16) + "px";
    spell.style.top = (-(spell.naturalHeight / 2) + 16) + "px";
    equipment.style.top = (-(equipment.naturalHeight) + 14) + "px";
    shield.classList.add("right")

    equipmentCall();
    animationUpdate();

    urlUpdate() //urls don't get pushed to the css unless you actively use this at the start on client load.

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)