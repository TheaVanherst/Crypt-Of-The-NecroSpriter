
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
        $('#body').style.marginTop = -((frameHeight * newVal) * scaleRes) + "px"
        buttonTog(newButton)};

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

/// animation timing setup (this is going to get recoded)
let aniOffsets, amplifiedMulti = 0, aniArrLength = 0;

const frameTypeToggle = () => { //this is to push the current frame times
        framePushType = !framePushType;
        aniOffsets = framePushType ? [1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4] : [1,2,3,4]
        aniArrLength = aniOffsets.length},

    amplifiedToggle = () => {
        amplifiedBool = !amplifiedBool
        amplifiedMulti = amplifiedBool ? 1 : 0;
        $('#AmplifiedDebug').textContent = amplifiedBool ? "AMP" + amplifiedMulti : "DIS"
        animationUpdate()};

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

    body.style.marginTop = -((frameHeight * clothingCurrent) * scaleRes) + "px";
    activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][3];

    $('#headContainer').style.marginTop = "calc((" + (char[currentCharacter[1]][5] - char[currentCharacter[1]][6]) + " * var(--scaler) * -1) * 1px)";
    $('#bodyContainer').style.marginTop = "calc((" + char[currentCharacter[1]][6] + " * var(--scaler)) * 1px)";

    // let body = $('#bodyContainer').offsetLeft            // TODO: FINISH THIS OFF TO LOCK TO PIXELS PROPERLY.
    // let pixelCorrector = Math.ceil(body/12) * 12
    // $('#bodyContainer').style.marginLeft = body - pixelCorrector

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

// a bunch of presets to save work
let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler'),
    danceTog = false, floorBool = false, playTog = false;
let start = new Date().getTime(), elapsed = 0;

const floorFlip = () => {
    floorBool = !floorBool;
    $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);
    $("#floor").style.top = -((danceTog ? (floorBool ? 2 : 1) : 0) * 72 * 10) - 30 +'px'};

    window.setInterval(() => {
        if(playTog){
            let time = new Date().getTime() - start;
            elapsed = Math.floor(time / (60/bpm) / (1000 / aniOffsets.length));
            animationPush()}
    }, (60/bpm));

// todo : Animation Update rendering

const animationPush = () => {
        $('#AmplifiedDebug').textContent = amplifiedBool ? "AMP" + amplifiedMulti : "DIS"

        if (elapsed > aniArrLength - 1) { // if current frame is more than the horizontal displacement array
            elapsed = 0; // resets the elapsed time
            start = new Date().getTime(); // gets new current time
            floorFlip()} // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength - 1; // gets the max value of the array to make it loop around dynamically
            floorFlip()} // if current frame is less than 0 [manual]

        amplifiedMulti = amplifiedBool ? Math.round((aniOffsets[elapsed] / 1.35)) * KlarinettaMulti : 0 // this was about 5 lines of dense math FUCK YOU.

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)},

    animationUpdate = () => {
        $all('#weapon, #charm').forEach(id => { // fixed displacement for equipment
            id.style.marginLeft = (((aniOffsets[elapsed]) - 1) * frameWidth) * -scaleRes + 'px' })
        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[elapsed]) + (amplifiedMulti * 4) - 1) * frameWidth) * -scaleRes + 'px' })}

// todo : BPM divisional

    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        let trackContainer = $('#trackContainer') // shorthand
        trackContainer.innerHTML = '' // empties the current compatible tracks
        $('#bpmDebug').textContent = bpm; // sets the bpm from the slider value

        let step = ((bpm - 110) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++){ // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br)}} // appends to parent

// todo : ==================
// todo : Equipment Dealing
// todo : ==================

const itemToggle = (item, e) => {
    buttonTog(e)
    $("#" + item)?.classList?.toggle("invisible")};

const playReset = () => { // this deals with resetting the play button
    playTog = false; // forces animation to pause
    $("#play")?.classList?.remove('inv') // resets the button setting
    animationPush()} // updates the animation from the onclick call ++ or --

// todo : ==================
// todo : Final Setup
// todo : ==================

document.addEventListener('DOMContentLoaded', () => { // this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    $("#bpmSlider").value = bpm
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})

    frameTypeToggle() // Updates the frame array to the default settings
    bpmUpdate() // pushes the current slider status to the debug menu

    animationResize()
    $('#AmplifiedDebug').textContent = amplifiedBool ? "AMP" + amplifiedMulti : "DIS" // posts debug for the current amplifier multiplier
    $("#clothing"+clothingCurrent)?.classList?.add('inv') // enables the button that is the default clothing option
    $('#clothingDebug').textContent = clothingCurrent + 1; // sets debug ID for the clothing

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)
