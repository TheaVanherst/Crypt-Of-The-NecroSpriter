
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

const
    beatDebug = $("#beatDebug"),
    barDebug = $("#barDebug"),
    heartBeat = $("#bpmCounter").children,
    elapsedDebug = $("#elapsedDebug"),

    flipDebug = $("#flipDebug"),
    floorDebug = $("#floorDebug");
let floorFlipper; //flips every bar (music)

const
    playReset = () => { // this deals with resetting the play button
        playTog = false; // forces animation to pause
        $("#play")?.classList?.remove('inv'); // resets the button setting
        animationPush();}, // updates the animation from the onclick call ++ or --

    animationPush = () => {
        if (elapsed > aniArrLength - 1) { // if current frame is more than the horizontal displacement array
            elapsed = 0; start = new Date().getTime(); // gets new current time

            heartBeat[floatInt].classList.remove("beat")
            floatInt = floatInt === equipmentOffsets[0].length - 1 ? 0 : (floatInt + 1);
            heartBeat[floatInt].classList.add("beat")

            danceFlip();

            if (floatInt === 0 && forceRefresh) {
                bodyUrlUpdate();
                urlUpdate()}
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength - 1; // gets the max value of the array to make it loop around dynamically

            heartBeat[floatInt].classList.remove("beat")
            floatInt = floatInt === 0 ? equipmentOffsets[0].length - 1 : (floatInt - 1);
            heartBeat[floatInt].classList.add("beat")

            danceFlip();
        } // if current frame is less than 0 [manual]

        beatDebug.textContent = frame
        barDebug.textContent = floatInt + 1
        elapsedDebug.textContent = elapsed

        if (currentObject?.clothingData && currentObject.clothingData.floatSequence &&
                currentObject.clothingData.clothing === currentClothing + 1) {
            playerModel.style.marginTop = -playerFloatOffsets[floatInt] - 8 + "px";}
        ampMultiplier = ampBool ? Math.round(frame / 1.35) * currentObject.settings.ampMultiplier : 0; // this was about 5 lines of dense math FUCK YOU.

        animationUpdate();
    },

    animationUpdate = () => {
        $all(equipmentAll).forEach(id => {
            id.style.backgroundPositionX = ((frame + 3) * -24) + 'px';})
        $all(bodyParts).forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((frame - 1) + (ampMultiplier * 4)) * -currentObject.settings.resolution.width) + 'px';})

        if (currentObject?.special) {
            special.style.backgroundPositionX = -((currentObject.special.offset.sequence[frame - 1] - 1) * currentObject.special.resolution.width) + 'px';
            special.style.top = -(currentObject?.special?.offset?.top[frame-1]) + "px";}

        torch.style.backgroundPositionX = ((currentObject.torch.sequence[frame - 1] - 1) * -24) + 'px';
        hip.style.backgroundPositionX = -((currentObject.hip.sequence[frame]) * -24) + 'px';
        charm.style.top = -(currentObject.charm.offset.sequence[frame - 1]) + 'px';

        shovel.style.top = -shovelOffsets[frame - 1] + 'px';
        itemYPos()},

    playerUpdate = () => {
        characterUrl.placeholder = currentObject.settings.fileUrl
        characterUrl.value = ""
        // updates image sources on character change
        //updates background image resolution setting calcs
        $doc.style.setProperty('--imageW', currentObject.settings.resolution.width + "px"); // todo: spritesheet settings
        $doc.style.setProperty('--imageH', currentObject.settings.resolution.height + "px");  // sets frame resolution
        $doc.style.setProperty('--rows', currentObject.settings.resolution.rows); // sets spritesheet rows & coloumns for resize
        $doc.style.setProperty('--columns', currentObject.settings.resolution.columns);

        head.setAttribute('class',currentObject.settings.head ? "" : "invisible")

        if (currentObject?.special) {
            specialButton.classList.remove("deact");
            special.style.zIndex = currentObject.special.zIndex //fuck the zindex
            special.style.backgroundImage = "url('items/" + currentObject.special.fileUrl + ".png')";
            console.log("url('items/" + currentObject.special.fileUrl + ".png')")

            if(currentObject.special.offset.rotation > 0){
                special.style.transform = "rotate("+currentObject.special.offset.rotation+"deg)"
                special.style.left = "0.5px"
                special.style.width = currentObject.special.resolution.width + 0.5 + "px"}
            else if (currentObject.special.flip){
                special.style.left = "0.5px"
                special.style.width = currentObject.special.resolution.width + 0.5 + "px"}
            else {
                special.style.width = currentObject.special.resolution.width + "px";}

            special.style.margin = currentObject.special.displacement.top + "px 0 0 " + currentObject.special.displacement.left + "px";
            special.style.height = currentObject.special.resolution.height + "px";}
        else {
            specialButton.setAttribute('class',"deact");}

        if(currentObject.torch.flip){torch.classList.add("flip")}
        else{torch.classList.remove("flip")}

        amplifiedButton.setAttribute('class', ampBool ? "inv": "");

        body.style.marginTop = -(currentObject.settings.resolution.height * currentClothing) + "px";
        headContainer.style.marginTop = -currentObject.settings.offset.head + "px"; // corrects head vertically
        playerModel.style.margin = ((defaultData.settings.resolution.height + currentObject.settings.offset.body) - currentObject.settings.resolution.height + "px") +
            " 0 0 " + Math.floor((defaultData.settings.resolution.width - currentObject.settings.resolution.width) / 2) + "px";
    }, // fixes vertical placement so they're all aligned

    clothingUpdate = () => {
        for (let i = 0; i < clothingData[0]; i++){
            $('#clothing' + i).setAttribute('class', i < currentObject.settings.resolution.rows ? "" : "deact");}

        if(currentObject?.clothingData && currentObject.clothingData.clothing - 1 === currentClothing){
            head.setAttribute('class', currentObject.clothingData.head ? "" : "invisible")}

        if(currentClothing + 1 > currentObject.settings.resolution.rows){ //checks if the current clothing active is not applicable to the new character.
            buttonAdjustment("#clothing",0, $('#clothing0'));}
        else {
            buttonTog($("#clothing" + currentClothing));}
    }