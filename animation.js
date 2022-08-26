
// todo : =====================
// todo : REOCCURRING FUNCTIONS
// todo : =====================

const buttonTog = (e) => {
        e?.classList?.toggle('inv')},

// todo : HTML button gen

    createButton = (css,text,id) => {
        let item = (document.createElement(css))
        if(text !== "" && text !== undefined){item.textContent = text}
        if(id !== "" && id !== undefined){item.id = id}
        return item },

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").forEach(id => {id?.classList?.remove('inv')})
        clothingCurrent = newVal;
        $('#body').style.marginTop = -(frameHeight * newVal) + "px"
        $('#headContainer').classList.remove('invisible') //compensates for nocturna
        buttonTog(newButton)};

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

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
        animationUpdate()},

    foregroundToggle = () => {
        foregroundBool = !foregroundBool
        $('#foreground').style.display = foregroundBool ? "none" : "block"
        $('#foregroundDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS"
        buttonTog($('#foregroundButton'))}

// todo : ==================
// todo : CHARACTER SETTINGS
// todo : ==================

let activeRows

const animationResize = () =>  {
    const head = $('#head'), body = $('#body')
    let char = characterFrames[currentCharacter[0]];
    frameWidth = char[currentCharacter[1]][1];
    frameHeight = char[currentCharacter[1]][2];
    $("#characterDebug").textContent = currentCharacter[0]+""+currentCharacter[1]+":"+ char[currentCharacter[1]][0];

    let src = dir + char[currentCharacter[1]][7];
    head.src =  src + (currentCharacter[0] !== 2 ? "_heads.png" : "_head.png");
    body.src =  src + (currentCharacter[0] !== 2 ? "_armor_body.png" : "_body.png");

    head.classList.remove('invisible');
    if(currentCharacter[0] === 2){
        if(currentCharacter[1] === 2){
            $('#head').classList.add('invisible')}}

    $doc.style.setProperty('--imageW',frameWidth+"px");
    $doc.style.setProperty('--imageH',frameHeight+"px");
    $doc.style.setProperty('--rows',char[currentCharacter[1]][3]);
    $doc.style.setProperty('--columns',char[currentCharacter[1]][4]);

    body.style.marginTop = -(frameHeight * clothingCurrent) + "px";
    activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][3];

    $('#headContainer').style.marginTop = -char[currentCharacter[1]][5] + "px"; //corrects head vertically
    $('#playerModel').style.marginTop = (24 + char[currentCharacter[1]][6]) - char[currentCharacter[1]][2] + "px";
    $('#playerModel').style.marginLeft = Math.floor((24 - char[currentCharacter[1]][1]) / 2) + "px";

    //$('#playerModel').style.marginLeft = char[currentCharacter[1]][1] % 2 ? (scaleRes / 2) + "px" : "24px"
    // this fixes the pixel offset between characters to make them align with pixels properly.

    for (let i = clothingCurrent; i < clothingData[0] - 1; i++){ // removes the deactivated tag to any applicable above
        $('#clothing' + i)?.classList?.remove('deact')} // the amount of clothing the current char can have.
    activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][3]; // current amount of clothing this character can have.

    for (let i = activeRows; i < clothingData[0]; i++){ // removes clickability for layers of clothing not applicable to said character.
        $('#clothing' + i)?.classList?.add('deact')}

    if(clothingCurrent + 1 > activeRows){ //checks if the current clothing active is not applicable to the new character.
        buttonAdjustment("#clothing",0, $('#clothing0'))
        $('#clothingDebug').textContent = clothingCurrent}

    $('#headContainer,#bodyContainer')?.classList?.remove('invisible')
    animationUpdate()}

// todo : ==================
// todo : ANIMATION Rendering
// todo : ==================

window.setInterval(() => {
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));
        animationPush()}}, (60/bpm));

// a bunch of presets to save work
let start = new Date().getTime(), elapsed = 0, floorID = false;

const floorFlip = () => {
    $('#danceFloor').classList.remove('invisible')
    $('#danceFloor').style.backgroundImage = 'url(UI_Libraries/' + currentFloor + (floorMultiBool ? '_' : '_NoMP_') + 'Floor' + (floorID ? 2 : 1) + '.png)'
    $('#danceDebug').textContent = floorID ? 2 : 1},

    floorHide = () => {
        $('#danceFloor').classList.add('invisible')
        $('#danceDebug').textContent = "0"},

    multiplierFlip = () => {
        $all("#danceButton, #floorMultiBool").forEach(i => {
            i.classList.remove("inv")})

        if(danceFloorBool){$('#danceButton').classList.add("inv")}
        else if(floorMultiBool){$('#multiplierButton').classList.add("inv") }

        if(danceFloorBool || floorMultiBool){floorFlip()}
        else {floorHide()}}

// todo : Animation Update rendering

    animationPush = () => {
        $('#amplifiedDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS"

        if (elapsed >= aniArrLength) { // if current frame is more than the horizontal displacement array
            elapsed = 0; // resets the elapsed time
            start = new Date().getTime(); // gets new current time
            floorID = !floorID;
            if(danceFloorBool || floorMultiBool){
                floorFlip()}
            else{
                floorHide()}
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength; // gets the max value of the array to make it loop around dynamically
            floorID = !floorID;
            if(danceFloorBool || floorMultiBool){
                floorFlip()}
            else {
                floorHide()}
        } // if current frame is less than 0 [manual]

        ampMultiplier = ampBool ? Math.round((aniOffsets[0][elapsed] / 1.35)) * KlarinettaMulti : 0 // this was about 5 lines of dense math FUCK YOU.

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)},

    animationUpdate = () => {
        console.log(aniOffsets[0])
        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[0][elapsed]) + (ampMultiplier * 4) - 1) * -frameWidth) + 'px' })};

// todo : scale pushing

let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler');

const scaleUpdate = () => {
        scaleRes = document.getElementById("scaleSlider").value; // gets the bpm for the slider
        $doc.style.setProperty('--scaler',scaleRes);

        $("#transform").style.transform = "scale(" + scaleRes +")"
        $("#transform").style.marginTop = -(scaleRes * 100)+ "px"

        $('#scale').textContent = "1:" + scaleRes; // sets the bpm from the slider value

        animationUpdate()},

// todo : BPM divisional

    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        let trackContainer = $('#trackContainer') // shorthand
        trackContainer.innerHTML = '' // empties the current compatible tracks
        $('#bpmDebug').textContent = bpm; // sets the bpm from the slider value
        $('#bpm').textContent = bpm;

        let step = ((bpm - (100 - 5)) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++){ // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br)}
        } // appends to parent

// todo : ==================
// todo : Equipment Dealing
// todo : ==================

const itemToggle = (item, e) => {
    buttonTog(e)
    $("#" + item)?.classList?.toggle("invisible")};

// todo: this resets the play button when changing frame.

const playReset = () => { // this deals with resetting the play button
    playTog = false; // forces animation to pause
    $("#play")?.classList?.remove('inv') // resets the button setting
    animationPush()} // updates the animation from the onclick call ++ or --

// todo : ==================
// todo : Final Setup
// todo : ==================

document.addEventListener('DOMContentLoaded', () => { // this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    $("#bpmSlider").value = bpm;
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})

    frameTypeToggle() // Updates the frame array to the default settings
    bpmUpdate() // pushes the current slider status to the debug menu

    animationResize() //updates default character sizes
    scaleUpdate() //pushes the current default scale
    foregroundToggle()

    $('#amplifiedDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS" // posts debug for the current amplifier multiplier
    $("#clothing"+clothingCurrent)?.classList?.add('inv') // enables the button that is the default clothing option
    $('#clothingDebug').textContent = clothingCurrent + 1; // sets debug ID for the clothing

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)
