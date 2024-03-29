
let start =     new Date().getTime(),
    playTog = false;

let bpm =       0,
    elapsed =   0,
    frame =     0,
    floatInt =  0,
    arrayDivisional;

window.setInterval(() => { // this is all bad.
    if (playTog) {
        frame =     aniOffsets[0][elapsed];
        elapsed =   Math.floor((Date.now() - start) / bpm / arrayDivisional);
        animationPush();
    }
}, bpm);

const
    floatPush = (bool, check, add) => {
        $("#bpmCounter .beat")?.classList.remove("beat");

        floatInt = bool ? check : floatInt + add;
        for (let key in consumableData) {
            consumableData[key].animate(floatInt);
        }
        specialData.animateFloat(floatInt);

        $("#bpmCounter").children[floatInt].classList.add("beat");
        $("#barDebug").textContent = floatInt;
    },

    animationPush = () => {
        if (elapsed >= aniOffsets[0].length) {

            elapsed =   0;
            start =     Date.now();

            environmentData.floorFlip();
            floatPush(floatInt > 4, 0, +1);
        }
        else if (elapsed < 0) {
            elapsed = 3;
            environmentData.floorFlip();
            floatPush(floatInt < 1,  5, -1);
        }

        $("#playerModel").style.margin =
            -currentCharacter.floatOffsets[floatInt] + "px 0 0 " +
            Math.floor((24 - currentCharacter.width) / 2) + "px";

        frame =                             aniOffsets[0][elapsed] - 1;
        $("#beatDebug").textContent =       frame;
        $("#elapsedDebug").textContent =    elapsed;

        currentCharacter.animate();
        specialData.animate();

        for (let key in itemArray) {
            itemArray[key].animate();
        }
    },

    playToggle = (bool) => {
        if (bool) {
            playTog ^= true;
        } else {
            playTog = false;
        }

        $('#playTog').classList.toggle('pressed', playTog);
        animationPush();
    }