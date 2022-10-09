
/// animation timing setup (this is going to get recoded)
let aniArrLength, scaleRes,
    foregroundBool, backgroundBool;

const
    frameTypeToggle = (e) => { //this is to push the current frame times
        if (e) {
            framePushType = !framePushType;
            buttonTog($("#aniType"));}
        aniOffsets.unshift(aniOffsets.pop()); //rotates the array clockwise.
        aniArrLength = aniOffsets[0].length;},

    foregroundToggle = (e) => {
        if (e) {
            foregroundBool = !foregroundBool;
            buttonTog($('#foregroundButton'));}
        $("#foreground").setAttribute('class', foregroundBool ? "" : "invisible");},

    backgroundToggle = (e) => {
        if (e) {
            backgroundBool = !backgroundBool;
            buttonTog($('#backgroundButton'));}

        if(backgroundBool){
            for (let i = 0; i < danceMode.length; i++) {
                danceMode[i][1] = false;}

            $all("#floor, #danceFloor").forEach(e => {
                e.setAttribute('class', "");});
            $all("#danceButton, #multiplierButton").forEach(e => {
                e.setAttribute('class', "");});}
        else {
            $all("#floor, #danceFloor").forEach(e => {
                e.setAttribute('class', "invisible");});
            $all("#danceButton, #multiplierButton").forEach(e => {
                e.setAttribute('class', "deact");});}

        $("#danceFloor").classList.add('invisible');},

    floorFlip = () => {
        $("#danceFloor").classList.remove('invisible');
        $("#danceFloor").style.backgroundImage =
            'url(UI_Libraries/' + currentFloor + (danceMode[1][1] ? '_' :
                '_NoMP_') + 'Floor' + (floorFlipper ? 2 : 1) + '.png)';},

    floorHide = () => {
        $("#danceFloor").classList.add('invisible');},

    animationFlip = () => {
        let bool = $("#playerModel").classList.contains('mirror')
        $("#playerModel").setAttribute("class", bool ? "" : "mirror");
        characterClass.flip(bool)},

    multiplierFlip = (item, id) => {
        for (let i = 0; i < danceMode.length; i++) {
            let t = $("#"+danceMode[i][0]);
            danceMode[i][1] = i === id ? danceMode[id][1] = !danceMode[id][1] : false;
            $("#floorDebug").textContent = danceMode[0][1] + " / " + danceMode[1][1] + " : ";
            if (!t.classList.contains("deact")) {
                t.setAttribute('class', danceMode[i][1] ? "inv" : "");}}

        if (danceMode[id]) {floorFlip();}
        else {floorHide();}},

    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        $('#bpm').textContent = bpm; // sets the bpm from the slider value

        let trackContainer = $('#trackContainer'); // shorthand
        trackContainer.innerHTML = ''; // empties the current compatible tracks

        let step = ((bpm - (100 - 5)) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++){ // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br);}}; // appends to parent

onwheel = (e) => {
    scaleRes = parseInt((e.deltaY || e.deltaY*-1) > 0 ? -1 : 1) + parseInt(scaleRes);
    scaleRes = scaleRes > 12 ? 12 : scaleRes < 4 ? 4 : scaleRes;

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