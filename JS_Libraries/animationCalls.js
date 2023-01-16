
let start = new Date().getTime(),
    bpm,
    arrayDivisional,

    elapsed = 0,
    frame = 0,
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

const playReset = () => {
        if (playTog) {
            playTog = false;
            $("#play")?.classList?.remove('inv');
            animationPush();
        }
},

    floatPush = (bool, check, add) => {
        $("#bpmCounter").children[floatInt].classList.remove("beat");

        floatInt = bool ? check : floatInt + add;
        for (let key in consumableData) {
            consumableData[key].animate(floatInt);
        }
        specialData.animateFloat(floatInt);

        heartBeat[floatInt].classList.add("beat");
        $("#barDebug").textContent = floatInt;
},

    animationPush = () => {
        if (elapsed >= aniOffsets[0].length) {
            start = new Date().getTime();
            elapsed = 0;
            floorData.floorFlip();
            floatPush(floatInt > 4, 0, +1);}

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
            itemArray[key].animate(frame);
        }
},

    frameTypeToggle = () => {
        $("#aniType").classList.toggle("inv")
        aniOffsets.unshift(aniOffsets.pop());
        arrayDivisional = 1000 / aniOffsets[0].length;
};

onwheel = (e) => {
    let newVal;
    if (e.deltaY) {
        newVal = parseInt((e.deltaY || e.deltaY * -1) > 0 ? -1 : 1) + parseInt(scaleRes);
    }

    console.log(e.deltaY)
    scaleRes = newVal > 12 ? 12 : newVal < 4 ? 4 : newVal;

    $("#scaleSlider").value = scaleRes;
    $doc.style.setProperty('--scaler',scaleRes);
    $('#scale').textContent = "1:" + scaleRes;
};

frameTypeToggle(true);
