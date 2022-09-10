
document.addEventListener('DOMContentLoaded', () => { // this just sets the boxes back to default settings
    aniArrLength = aniOffsets[0].length; // Updates the frame array to the default settings

    bpmUpdate() // pushes the current slider status to the debug menu
    scaleUpdate(); // gets the scale for the slider ratio
    multiplierFlip()

    if(forceRefresh) {buttonTog($('#forceRefresh'))} //checks if force refresh is active by default

    // todo: Background Updating

    if(foregroundBool){
        buttonTog($('#foregroundButton'));}
    else {
        $('#foreground').classList.add("invisible");}

    const c=currentFloor-1,v=c>2?1:0,h=c>2?c-3:c; //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]; //sets current floor automatically
    backgroundUpdate($('#floor'),v,h);
    $('#foreground').src =
        "UI_Libraries/" + overlayTileSets[v][h][0] + "_Overlay.png"; //sets foreground url to suit current floor

    $('#backgrounds').children[v].children[h].classList.add('inv') //toggles current floor button to be active

    playTog = danceMode[0] || danceMode[1] //enables play toggle if dance floor bools are enabled.

    // todo: character equipment startup

    currentObject = _.merge({}, defaultData, getUser(defaultCharacter,characterData))
    characterChange() //updates default character sizes
    $("#"+defaultCharacter).classList.add("inv")

    for (let key in itemData) { // prebaked data url
        const itemName = "#" + itemData[key].name
        urlUpdate(key)

        if(itemData[key].url !== undefined){
            $(itemName + "Url").value = ""
            $(itemName + "Url").placeholder = itemData[key].url + ".png"} //binds url to the placeholder

        $(itemName+"Button").onclick = () => itemToggle($(itemName+"Button"))

        if(!itemData[key].bool) { // checks if disabled by default
            $("#"+itemData[key].name).classList.add("invisible")}
        else { // else toggles
            buttonTog($("#"+itemData[key].name + "Button"))}}

    $('#item').style.top = (-($("#item").naturalHeight / 2) + 16) + "px" // sets vertical position for default floating point
    $('#spell').style.top = (-($("#spell").naturalHeight / 2) + 16) + "px"
    $('#equipment').style.top = (-($("#equipment").naturalHeight) + 14) + "px"

    $("#clothing"+clothingCurrent)?.classList?.add('inv') // enables the button that is the default clothing option

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)