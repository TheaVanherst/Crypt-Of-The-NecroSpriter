
/// animation timing setup (this is going to get recoded)
let ampMultiplier = 0, aniArrLength = 0;

const frameTypeToggle = () => { //this is to push the current frame times
        framePushType = !framePushType;
        aniOffsets.unshift(aniOffsets.pop()); //rotates the array clockwise.
        aniArrLength = aniOffsets[0].length;},

    amplifiedToggle = () => {
        ampBool = !ampBool;
        ampMultiplier = ampBool ? 1 : 0;
        $('#amplifiedButton').setAttribute('class', ampBool ? "" : "deact");

        $all(bodyParts).forEach(id => { // specific displacement for the character
            id.style.marginLeft =
                ((frame + (ampMultiplier * 4)) * -currentObject.settings.resolution.width) + 'px';})},

    foregroundToggle = () => {
        foreground.setAttribute('class', foregroundBool ? "invisible" : "");
        foregroundBool = !foregroundBool;
        buttonTog($('#foregroundButton'));},

    floorFlip = () => {
        danceFloor.classList.remove('invisible');
        danceFloor.style.backgroundImage =
            'url(UI_Libraries/' + currentFloor + (danceMode[1][1] ? '_' : '_NoMP_') + 'Floor' + (floorFlipper ? 2 : 1) + '.png)';},

    floorHide = () => {
        danceFloor.classList.add('invisible');},

    multiplierFlip = (item, id) => {
        for (let i = 0; i < danceMode.length; i++){
            let t = $("#"+danceMode[i][0]);
            danceMode[i][1] = i === id ? danceMode[id][1] = !danceMode[id][1] : false;
            floorDebug.textContent = danceMode[0][1] + " / " + danceMode[1][1] + " : "
            if(!t.classList.contains("deact")){
                t.setAttribute('class', danceMode[i][1] ? "inv" : "");}}

        if(danceMode[id]){floorFlip()}
        else {floorHide();}};

// todo: SCROLL FUNCTIONALITY

let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler');

onwheel = (e) => { //scroll wheel functionality
    scaleRes = parseInt((e.deltaY || e.deltaY*-1) > 0 ? -1 : 1) + parseInt(scaleRes);
    scaleRes = scaleRes > 12 ? 12 : scaleRes < 4 ? 4 : scaleRes;

    $("#scaleSlider").value = scaleRes; // gets the bpm for the slider
    zoomEvent();};

const zoomEvent = () => {
        $doc.style.setProperty('--scaler',scaleRes);
        style("#transform")
            .transform("scale("+scaleRes+")")
            .marginTop(-(scaleRes * 86)+ "px"); // the number is the vertical pixel offset, higher it is, lower the camera on zoom.
        $('#scale').textContent = "1:" + scaleRes;}, // sets the bpm from the slider value

    scaleUpdate = () => {
        scaleRes = document.getElementById("scaleSlider").value; // gets the bpm for the slider
        zoomEvent(); };
