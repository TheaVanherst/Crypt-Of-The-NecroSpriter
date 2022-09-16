
/// animation timing setup (this is going to get recoded)
let ampMultiplier = 0, aniArrLength = 0;
const
    frameTypeToggle = (e) => { //this is to push the current frame times
        buttonTog(e)
        framePushType = !framePushType;
        aniOffsets.unshift(aniOffsets.pop()); //rotates the array clockwise.
        aniArrLength = aniOffsets[0].length;},

    amplifiedToggle = () => {
        ampBool = !ampBool;
        ampMultiplier = ampBool ? 1 : 0;
        amplifiedButton.setAttribute('class', ampBool ? "inv": "");

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
        else {floorHide();}},

    danceFlip = () => { //checks if the floor should flip (every 1 bar)
        if(danceMode[0][1] || danceMode[1][1]){
            floorFlipper = !floorFlipper; //flips the floor
            flipDebug.textContent = floorFlipper ? 1 : 2
            floorFlip();}
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
