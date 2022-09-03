
/// animation timing setup (this is going to get recoded)
let ampMultiplier = 0, aniArrLength = 0;

const frameTypeToggle = () => { //this is to push the current frame times
        framePushType = !framePushType;
        aniOffsets.unshift(aniOffsets.pop()) //rotates the array clockwise.
        aniArrLength = aniOffsets[0].length},

    amplifiedToggle = () => {
        ampBool = !ampBool
        ampMultiplier = ampBool ? 1 : 0;
        $('#amplifiedDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS"
        buttonTog($('#amplifiedButton'))

        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[0][elapsed]) + (ampMultiplier * 4) - 1) * -framesize[1]) + 'px' })},

    foregroundToggle = () => {
        foregroundBool = !foregroundBool

        $('#foreground').setAttribute('class', foregroundBool ? "invisible" : "")
        $('#foregroundDebug').textContent = foregroundBool
        buttonTog($('#foregroundButton'))},

    floorFlip = () => {
        $('#danceFloor').classList.remove('invisible')
        $('#danceFloor').style.backgroundImage = 'url(UI_Libraries/' + currentFloor + (danceMode[1][1] ? '_' : '_NoMP_') + 'Floor' + (floorID ? 2 : 1) + '.png)'
        $('#danceDebug').textContent = floorID ? 2 : 1},

    floorHide = () => {
        $('#danceFloor').classList.add('invisible')
        $('#danceDebug').textContent = "0"},

    multiplierFlip = (item, id) => {
        for (let i = 0; i < danceMode.length; i++){
            danceMode[i][1] = i === id ? danceMode[id][1] = !danceMode[id][1] : false
            if(!$("#"+danceMode[i][0]).classList.contains("deact")){
                $("#"+danceMode[i][0]).setAttribute('class', danceMode[i][1] ? "inv" : "")}}

        if(danceMode[id]){floorFlip()}
        else {floorHide()}};

const urlUpdate = () => {
    for (let i = 0; i < calls.length; i++) {
        if(calls[i][0] !== "special") {
            $('#' + calls[i][0]).style.backgroundImage = "url('items/" + calls[i][0] + ".png?" + Date.now() + "')"; }}
    for (let i = 0; i < miscCalls.length; i++) {
        $('#' + miscCalls[i][0]).style.backgroundImage = "url('items/" + miscCalls[i][0] + ".png?" + Date.now() + "')"; }};

// todo: SCROLL FUNCTIONALITY

let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler');

onwheel = (e) => { //scroll wheel functionality
    scaleRes = parseInt((e.deltaY || e.deltaY*-1) > 0 ? -1 : 1) + parseInt(scaleRes);
    scaleRes = scaleRes > 12 ? 12 : scaleRes < 4 ? 4 : scaleRes;

    $("#scaleSlider").value = scaleRes; // gets the bpm for the slider
    zoomEvent();};

const zoomEvent = () => {
        $doc.style.setProperty('--scaler',scaleRes);
        let transform = $("#transform");

        transform.style.transform = "scale("+scaleRes+")";
        transform.style.marginTop = -(scaleRes * 86)+ "px"; // the number is the vertical pixel offset, higher it is, lower the camera on zoom.
        $('#scale').textContent = "1:" + scaleRes;}, // sets the bpm from the slider value

    scaleUpdate = () => {
        scaleRes = document.getElementById("scaleSlider").value; // gets the bpm for the slider
        zoomEvent(); };
