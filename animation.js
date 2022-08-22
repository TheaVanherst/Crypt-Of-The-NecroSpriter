
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
        $all(button + " e").forEach(id => {id?.classList?.add('inv')})
        clothingCurrent = newVal;
        $('#body').style.marginTop = -((frameHeight * newVal) * scaleRes) + "px"
        buttonTog(newButton)};

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

/// animation timing setup (this is going to get recoded)
let aniOffsets, framePushType = false, amplifiedBool = false, //this is just the standard frame time for the animation offset to prevent recalcing. (optimisation)
    amplifiedMulti = 0, aniArrLength = 0;

const frameTypeToggle = () => { //this is to push the current frame times
        framePushType = !framePushType;
        aniOffsets = framePushType ? [1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4] : [1,2,3,4]
        aniArrLength = aniOffsets.length},

    amplifiedToggle = () => {
        amplifiedBool = !amplifiedBool
        amplifiedMulti = amplifiedBool ? 1 : 0;
        $('#AmplifiedDebug').textContent = amplifiedBool ? "AMP" : "DIS";
        animationUpdate()};

// todo : ==================
// todo : CHARACTER SETTINGS
// todo : ==================

let activeRows

const animationFrameSize = () =>  {
    let char = characterFrames[currentCharacter[0]];
    frameWidth = char[currentCharacter[1]][1];
    frameHeight = char[currentCharacter[1]][2];
    $("#characterDebug").textContent = currentCharacter[0]+""+currentCharacter[1]+":"+ char[currentCharacter[1]][0];

    let src = "/" + dir + char[currentCharacter[1]][7];
    $('#head').src = src + (currentCharacter[0] !== 2 ? "_heads.png" : "_head.png");
    $('#body').src = src + (currentCharacter[0] !== 2 ? "_armor_body.png" : "_body.png");

    $('#head').classList.remove('invisible');
    if(currentCharacter[0] === 2){
        if(currentCharacter[1] === 2){
            $('#head').classList.add('invisible')}}

    $doc.style.setProperty('--imageW',frameWidth+"px");
    $doc.style.setProperty('--imageH',frameHeight+"px");
    $doc.style.setProperty('--rows',char[currentCharacter[1]][3]);
    $doc.style.setProperty('--columns',char[currentCharacter[1]][4]);

    $('#body').style.marginTop = -((frameHeight * clothingCurrent) * scaleRes) + "px";
    activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][3];

    $('#headContainer').style.marginTop = "calc((" + (char[currentCharacter[1]][5] - char[currentCharacter[1]][6]) + " * var(--scaler) * -1) * 1px)";
    $('#bodyContainer').style.marginTop = "calc((" + char[currentCharacter[1]][6] + " * var(--scaler)) * 1px)";

    // let body = $('#bodyContainer').offsetLeft            // TODO: FINISH THIS OFF TO LOCK TO PIXELS PROPERLY.
    // let pixelCorrector = Math.ceil(body/12) * 12
    // $('#bodyContainer').style.marginLeft = body - pixelCorrector

    for (let i = clothingCurrent; i < clothingTypes - 1; i++){ // removes the deactivated tag to any applicable above
        $('#clothing' + i)?.classList?.remove('deact')} // the amount of clothing the current char can have.
    activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][3]; // current amount of clothing this character can have.

    for (let i = activeRows; i < clothingTypes; i++){ // removes clickability for layers of clothing not applicable to said character.
        $('#clothing' + i).classList.add('deact')}

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
    danceTog = false, floorBool = false;

const floorTog = () => {
    floorBool = !floorBool;
    $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);
    $("#floor").style.top = -((danceTog ? (floorBool ? 2 : 1) : 0) * 72 * 10) - 30 +'px'};

let playTog = false; //toggle bool and current loop iteration for debug purposes
let start = new Date().getTime(), elapsed = 0, bpm = 130;

    window.setInterval(() => {
        if(playTog){
            let time = new Date().getTime() - start;
            elapsed = Math.floor(time / (60/bpm) / (1000 / aniOffsets.length));
            animationPush()}
    }, (60/bpm));

// todo : Animation Update rendering

const animationPush = () => {
        amplifiedMulti = amplifiedBool ? Math.round((aniOffsets[elapsed] / 1.3)) : 0 // this was about 5 lines of dense math FUCK YOU.
        console.log(aniOffsets[elapsed])
        $('#AmplifiedDebug').textContent = "AMP" + amplifiedMulti

        if (elapsed > aniArrLength - 1) { //if current frame is more than 30
            elapsed = 0;
            start = new Date().getTime();
            floorTog()} //resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) {
            elapsed = aniArrLength - 1;
            floorTog()} //if current frame is less than 0 [manual]

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)},

    animationUpdate = () => {
        $all('#weapon, #charm').forEach(id => {
            id.style.marginLeft = -(((aniOffsets[elapsed]) - 1) * frameWidth) * scaleRes + 'px' })
        $all('#body, #head').forEach(id => {
            id.style.marginLeft = -(((aniOffsets[elapsed]) + (amplifiedMulti * 4) - 1) * frameWidth) * scaleRes + 'px' })}

// todo : ==============================
// todo : Music Playlist / BPM automated
// todo : ==============================

const songList = [
        ["1-1 // Disco Descent"], //115
        ["BOSS // Deep Blues", "BOSS // King Conga", "BOSS // Golden Lute", "TRAINING // Watch Your Step"], //120
        ["BOSS // Coral Riff"], //125
        ["LOBBY // Rhythmortis","1-2 // Crypteque","2-1 // Fungal Funk","4-1 // Styx and Stones", "5-1 // Voltzwaltz"], //130
        ["3-1 // Stone Cold (cold)"," 3-1 // Igneous Rock (hot)"], //135
        ["1-3 // Mausoleum Mash","2-2 // Grave Throbbing","BOSS // Necrodancer Phase 1","BOSS // Dead Ringer","5-2 // Power Cords"], //140
        ["3-2 // Dance of the Decorous (cold)","3-2 March of the Profane (hot)","4-2 // Heart of the Crypt"], //145
        ["2-3 // Portabellohead"], //150
        ["3-3 // A Cold sweat (cold)","3-3 // A Hot Mess (hot)","5-3 // Six Feet Thunder"], //155
        ["4-3 // The Wight To Remain","BOSS // Necrodancer Phase 2"], //160
        ["N/a"], //165
        ["N/a"], //170
        ["BOSS // Death Metal"]], //175

// todo : BPM divisional

    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value;
        let trackContainer = $('#trackContainer')

        $('#bpm').innerHTML = $('#bpmDebug').innerHTML = bpm
        trackContainer.innerHTML = ''

        let step = ((bpm - 110) / 5) - 1;
        for (let i = 0; i < songList[step].length; i++){

            let item = document.createElement('t');
            item.textContent = songList[step][i];
            let br = document.createElement('br');

            trackContainer.appendChild(item).appendChild(br)}}
