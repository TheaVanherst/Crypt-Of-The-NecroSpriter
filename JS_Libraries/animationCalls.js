
let start = new Date().getTime(),
    elapsed = 0,
    frame = 0,
    bpm,
    arrayDivisional,

    floatInt = 0,
    playTog = false,
    scaleRes;

const heartBeat = $("#bpmCounter").children;

window.setInterval(() => {
    if (playTog) {
        frame = aniOffsets[0][elapsed];
        elapsed = Math.floor((new Date().getTime() - start) / bpm / arrayDivisional);
        animationPush();}
    }, bpm);

const playReset = () => { // this deals with resetting the play button
        if (playTog) {
            playTog = false; // forces animation to pause
            $("#play")?.classList?.remove('inv');
            animationPush();}}, // resets the button setting

    floatPush = (bool, check, add) => {
        $("#bpmCounter").children[floatInt].classList.remove("beat");

        floatInt = bool ? check : floatInt + add;
        for (let key in consumableData) {
            consumableData[key].animate(floatInt);} // gets new current time
        specialData.animateFloat(floatInt);

        heartBeat[floatInt].classList.add("beat");
        $("#barDebug").textContent = floatInt;},

    animationPush = () => {
        if (elapsed >= aniOffsets[0].length) {
            start = new Date().getTime();
            elapsed = 0;
            floorData.floorFlip();
            floatPush(floatInt > 4, 0, +1);} // gets new current time

        else if (elapsed < 0) {
            elapsed = 3;
            floorData.floorFlip();
            floatPush(floatInt < 1,  5, -1);}

        $("#playerModel").style.margin =
            -currentCharacter.floatOffsets[floatInt] + "px 0 0 " +
            Math.floor((24 - currentCharacter.width) / 2) + "px";

        frame = aniOffsets[0][elapsed] - 1;
        $("#beatDebug").textContent = frame;
        $("#elapsedDebug").textContent = elapsed;

        currentCharacter.animate(frame);
        specialData.animate(frame);
        for (let key in itemArray) {
            itemArray[key].animate(frame);}
        },

    frameTypeToggle = (e) => { //this is to push the current frame times
        e ? buttonTog($("#aniType")) : null;
        aniOffsets.unshift(aniOffsets.pop());
        arrayDivisional = 1000 / aniOffsets[0].length;};

onwheel = (e) => {
    let newVal = parseInt((e.deltaY || e.deltaY*-1) > 0 ? -1 : 1) + parseInt(scaleRes);
    scaleRes = newVal > 12 ? 12 : newVal < 4 ? 4 : newVal;

    $("#scaleSlider").value = scaleRes;
    zoomEvent();};

const zoomEvent = () => {
    $doc.style.setProperty('--scaler',scaleRes);
    transform.style.transform = "scale("+scaleRes+")";
    transform.style.marginTop = -(scaleRes * 86)+ "px";
    $('#scale').textContent = "1:" + scaleRes;},

    scaleUpdate = () => {
        scaleRes = document.getElementById("scaleSlider").value;
        zoomEvent(); };

frameTypeToggle(true);
