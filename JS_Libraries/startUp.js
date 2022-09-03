
document.addEventListener('DOMContentLoaded', () => { // this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    aniArrLength = aniOffsets[0].length; // Updates the frame array to the default settings

    $("#bpmSlider").value = bpm; // gets the bpm for the slider
    bpmUpdate() // pushes the current slider status to the debug menu

    scaleUpdate(); // gets the scale for the slider ratio
    multiplierFlip()

    if(forceRefresh) { //checks if force refresh is active by default
        buttonTog($('#forceRefresh'))}

    // todo: foreground updating

    $('#foreground').style.display = foregroundBool ? "block" : "none"; //checks if the foreground should be visible or not
    $('#foregroundDebug').textContent = foregroundBool; //posts foreground status to debug
    if(foregroundBool){
        buttonTog($('#foregroundButton')); } //enables button if active

    // todo: Background Updating

    const c=currentFloor-1,v=c>2?1:0,h=c>2?c-3:c; //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]; //sets current floor automatically
    backgroundUpdate($('#floor'),v,h);
    $('#foreground').src =
        "UI_Libraries/" + overlayTileSets[v][h][0] + "_Overlay.png"; //sets foreground url to suit current floor

    $('#backgrounds').children[v].children[h].classList.add('inv') //toggles current floor button to be active
    playTog = danceMode[0] || danceMode[1] //enables play toggle if dance floor bools are enabled.

    // todo: character equipment startup

    characterChange() //updates default character sizes

    for (let i = 0; i < calls.length; i++){ // loops through the equipment array
        if(!calls[i][1]) { // checks if disabled by default
            $("#" + calls[i][0]).classList.add("invisible")}} // hides if disabled

    for (let i = 0; i < miscCalls.length; i++){ //loops through non-player equipables
        if(!miscCalls[i][1]) { // checks if disabled by default
            $("#" + miscCalls[i][0]).classList.add("invisible")}} // hides if disabled

    $("#shield").classList.add("invisible")

    //prebacked calcs so it isn't required on button press
    $('#item').style.top = (-($("#item").naturalHeight / 2) + 16) + "px" // sets vertical position for default floating point
    $('#spell').style.top = (-($("#spell").naturalHeight / 2) + 16) + "px"
    $('#equipment').style.top = (-($("#equipment").naturalHeight) + 14) + "px"

    $("#clothing"+clothingCurrent)?.classList?.add('inv') // enables the button that is the default clothing option

    // todo : debug info final

    $('#floorDebug').textContent = floorTileSets[v][h][[0]]
    $('#danceDebug').textContent = (danceMode[0] ? (floorID ? 2 : 1) : 0);
    $('#amplifiedDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS" // posts debug for the current amplifier multiplier
    $('#clothingDebug').textContent = clothingCurrent + 1; // sets debug ID for the clothing

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)