
let frame = 1,
    start = new Date().getTime(), //gets the reference point for the elapsed to work to.
    elapsed = 0, //counter for the bpm loop
    floatInt = 0; //equipment float pattern counter

window.setInterval(() => {
    frame = (aniOffsets[0][elapsed]);
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));
        animationPush()}
}, (60/bpm));

const beatDebug = $("#beatDebug"),
    barDebug = $("#barDebug"),
    elapsedDebug = $("#elapsedDebug")

const flipDebug = $("#flipDebug"),
    floorDebug = $("#floorDebug")

// a bunch of presets to save work
let floorFlipper; //flips every bar (music)

const playReset = () => { // this deals with resetting the play button
        playTog = false; // forces animation to pause
        $("#play")?.classList?.remove('inv'); // resets the button setting
        animationPush();}, // updates the animation from the onclick call ++ or --

    danceFlip = () => { //checks if the floor should flip (every 1 bar)
        if(danceMode[0][1] || danceMode[1][1]){
            floorFlipper = !floorFlipper; //flips the floor
            flipDebug.textContent = floorFlipper ? 1 : 2
            floorFlip();}
        else {floorHide();}},

    heartBeat = $("#bpmCounter").children

    animationPush = () => {
        if (elapsed > aniArrLength - 1) { // if current frame is more than the horizontal displacement array
            elapsed = 0; start = new Date().getTime(); // gets new current time

            heartBeat[floatInt].classList.remove("beat")
            floatInt = floatInt == equipmentOffsets[0].length - 1 ? 0 : (floatInt + 1);
            heartBeat[floatInt].classList.add("beat")

            danceFlip();

            if (floatInt === 0 && forceRefresh) {
                bodyUrlUpdate();
                for (let key in itemData) {
                    urlUpdate(key);}}
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength - 1; // gets the max value of the array to make it loop around dynamically

            heartBeat[floatInt].classList.remove("beat")
            floatInt = floatInt == 0 ? equipmentOffsets[0].length - 1 : (floatInt - 1);
            heartBeat[floatInt].classList.add("beat")

            danceFlip();
        } // if current frame is less than 0 [manual]

        beatDebug.textContent = frame
        barDebug.textContent = floatInt + 1
        elapsedDebug.textContent = elapsed

        if (currentObject.clothingData.bool === true && currentObject.clothingData.floatSequence === true &&
                currentObject.clothingData.clothing === currentClothing + 1) {
            playerModel.style.marginTop = -playerFloatOffsets[floatInt] - 8 + "px";}
        ampMultiplier = ampBool ? Math.round(frame / 1.35) * currentObject.settings.ampMultiplier : 0; // this was about 5 lines of dense math FUCK YOU.

        animationUpdate();
    };

const animationUpdate = () => {
        $all(equipmentAll).forEach(id => {
            id.style.backgroundPositionX = ((frame + 3) * -24) + 'px';})
        $all(bodyParts).forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((frame - 1) + (ampMultiplier * 4)) * -currentObject.settings.resolution.width) + 'px';})

        if (currentObject.special.bool) {
            style("#special")
                .backgroundPositionX((currentObject.special.offset.sequence[frame] * currentObject.special.resolution.width) + "px")
                .top(-(currentObject.special.offset.top[frame-1]) + "px");}

        torch.style.backgroundPositionX = ((currentObject.torch.sequence[frame - 1] - 1) * -24) + 'px';
        hip.style.backgroundPositionX = -((currentObject.hip.sequence[frame]) * -24) + 'px';
        special.style.backgroundPositionX = -((currentObject.special.offset.sequence[frame - 1] - 1) * -24) + 'px';

        charm.style.top = -(currentObject.charm.offset.sequence[frame - 1]) + 'px';
        shovel.style.top = -shovelOffsets[frame - 1] + 'px';

        //$('#boots').style.margin = -(currentObject.boots.offset.top) + "px 0 0" + -(currentObject.boots.offset.left + "px")

        itemYPos()};

// todo : ================
// todo : Render Functions
// todo : ================

const bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        $('#bpm').textContent = bpm; // sets the bpm from the slider value

        let trackContainer = $('#trackContainer'); // shorthand
        trackContainer.innerHTML = ''; // empties the current compatible tracks

        let step = ((bpm - (100 - 5)) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++){ // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br);}} // appends to parent

// todo : ==================
// todo : CHARACTER UPDATING
// todo : ==================

const playerUpdate = () => {
        // updates image sources on character change
        //updates background image resolution setting calcs
        $doc.style.setProperty('--imageW', currentObject.settings.resolution.width + "px"); // todo: spritesheet settings
        $doc.style.setProperty('--imageH', currentObject.settings.resolution.height + "px");  // sets frame resolution
        $doc.style.setProperty('--rows', currentObject.settings.resolution.rows); // sets spritesheet rows & coloumns for resize
        $doc.style.setProperty('--columns', currentObject.settings.resolution.columns);

        head.setAttribute('class',currentObject.settings.head ? "" : "invisible")

        if (currentObject.special.bool) {
            $("#specialButton").classList.remove("deact");
            style("#special")
                .backgroundImage("url('items/" + currentObject.special.fileUrl + ".png')")
                .margin(currentObject.special.displacement.top + "px 0 0 " + currentObject.special.displacement.left + "px")
                .transform("rotate("+currentObject.special.offset.rotation+"deg)")
                .width(currentObject.special.resolution.width + 0.5 + "px")
                .left("0.5px")
                .height(currentObject.special.resolution.height + "px");}
        else {
            $("#specialButton").setAttribute('class',"deact");}

        $('#amplifiedButton').setAttribute('class', ampBool ? "inv": "");

        body.style.marginTop = -(currentObject.settings.resolution.height * currentClothing) + "px";
        headContainer.style.marginTop = -currentObject.settings.offset.head + "px"; // corrects head vertically
        playerModel.style.margin = ((defaultData.settings.resolution.height + currentObject.settings.offset.body) - currentObject.settings.resolution.height + "px") +
            " 0 0 " + Math.floor((defaultData.settings.resolution.width - currentObject.settings.resolution.width) / 2) + "px";
    }, // fixes vertical placement so they're all aligned

// todo : ==================
// todo : CLOTHING UPDATING
// todo : ==================

    clothingUpdate = () => {
        for (let i = 0; i < clothingData[0]; i++){
            $('#clothing' + i).setAttribute('class', i < currentObject.settings.resolution.rows ? "" : "deact");}

        if(currentObject.clothingData.bool && currentObject.clothingData.clothing - 1 === currentClothing){
            head.setAttribute('class', currentObject.clothingData.head ? "" : "invisible")}
        if(currentObject.torch.flip){torch.classList.add("flip")}
        else{torch.classList.remove("flip")}

        if(currentClothing + 1 > currentObject.settings.resolution.rows){ //checks if the current clothing active is not applicable to the new character.
            buttonAdjustment("#clothing",0, $('#clothing0'));}
        else {
            buttonTog($("#clothing" + currentClothing));}
    }