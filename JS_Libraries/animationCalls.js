
let start = new Date().getTime(), //gets the reference point for the elapsed to work to.
    elapsed = 0, //counter for the bpm loop
    floatInt = 0, //flips every bar (music)
    floorFlipper; //equipment float pattern counter

window.setInterval(() => {
    frame = aniOffsets[0][elapsed] - 1;
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));
        animationPush();}
}, (60/bpm));

const heartBeat = $("#bpmCounter").children,

    playReset = () => { // this deals with resetting the play button
        if(playTog){
            playTog = false; // forces animation to pause
            $("#play")?.classList?.remove('inv');} // resets the button setting
        animationPush();}, // updates the animation from the onclick call ++ or --

    animationPush = () => {
        $("#bpmCounter").children[floatInt].classList.remove("beat");

        if (elapsed > aniArrLength - 1) {
            start = new Date().getTime();
            elapsed = 0;

            danceFlip();

            floatInt = floatInt > 4 ? 0 : floatInt + 1;
            characterClass.floatCycle(floatInt)
            for (let key in consumableItems) {
                consumableItems[key].animate(floatInt)}} // gets new current time

        else if (elapsed < 0) {
            elapsed = 3;
            danceFlip();

            floatInt = floatInt < 1 ? 5 : floatInt - 1;
            characterClass.floatCycle(floatInt)
            for (let key in consumableItems) {
                consumableItems[key].animate(floatInt)}}

            $("#playerModel").style.margin =
                -characterClass.floatOffsets[floatInt] + "px 0 0 " +
                Math.floor((24 - characterClass.width) / 2) + "px";

        heartBeat[floatInt].classList.add("beat");

        frame = aniOffsets[0][elapsed] - 1;
        $("#beatDebug").textContent = frame;
        $("#barDebug").textContent = floatInt + 1;
        $("#elapsedDebug").textContent = elapsed;

        //ampMultiplier = ampBool ? (Math.round((frame) / 1.35) * currentObject.settings.ampMultiplier) + 1 : 0; // this was about 5 lines of dense math FUCK YOU.

        characterClass.animate(frame)
        specialItem.animate(frame)
        for (let key in itemArray) {
            itemArray[key].animate(frame)}
    },

    danceFlip = () => { //checks if the floor should flip (every 1 bar)
        if (danceMode[0][1] || danceMode[1][1]) {
            floorFlipper = !floorFlipper; //flips the floor
            $("#flipDebug").textContent = floorFlipper ? 1 : 2;
            floorFlip();}
        else {floorHide();}};
