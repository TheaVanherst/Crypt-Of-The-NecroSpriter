
//TODO : ROOT ESTABLISHING

// just some presets to save my tiny ape brain some time later
const $doc = document.documentElement,
    $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document),
    frameDef = getComputedStyle($doc).getPropertyValue('--frameDef');

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    $("#bpmSlider").oninput = () => bpmUpdate();
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})

    //TODO : DEFAULT SETTING ESTABLISHING

    frameTypeToggle() //Updates the frame array to the default settings
    bpmUpdate() //pushes the current slider status to the debug menu
}, false)

// todo : =====================
// todo : REOCCURRING FUNCTIONS
// todo : =====================

const buttonTog = (e) => {
        e.classList.toggle('inv')};

    buttonUpdate = (status,e) => {
        if(status === true){e.classList.add('inv')}
        else {e.classList.remove('inv')}}

// todo : HTML button gen

    createButton = (css,text,id) => {
        let item = (document.createElement(css))
        if(text !== "" && text !== undefined){item.textContent = text}
        if(id !== "" && id !== undefined){item.id = id}
        return item}

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

let clothingCurrent = 0, clothingTypes = 14, clothingColumns = 7; //default clothing variables.

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const clothing = $('#clothing'), clothingDebug = $('#clothingDebug');

    for (let e = 0; e < Math.ceil(clothingTypes / clothingColumns); e++){ //generates button rows
        clothing.appendChild(createButton("div")); //creates the containing box for each row
        let divS = clothing.getElementsByTagName('div')[e]; //creates a var to address the containing box

        for (let i = 0; i < clothingColumns; i++) { //generates columns
            let cur = (clothingColumns * e) + i; //figures out which button ((row x row width) + coloumn)

            divS.appendChild(createButton("e","","clothing"+cur)) //generates the button itself.
                .appendChild(createButton("t",cur+1)); //this is to align the text in the middle
                    //usually you wouldn't need this but because the box is so small, it overflows and causes issues.

            divS.children[i].onclick = function () {   // attach event listener individually
                $all('#clothing e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                clothingCurrent = cur
                buttonTog(this); verticalUpdate(cur);
                clothingDebug.textContent = cur + 1;
            }}} //presses the button that was just pressed.

    $("#clothing"+clothingCurrent).classList.add('inv') //enables the button that is the default clothing option
    clothingDebug.textContent = clothingCurrent + 1;
}, false);

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

/// animation timing setup (this is going to get recoded)
let aniOffsets, framePushType = true, amplifiedBool = false, //this is just the standard frame time for the animation offset to prevent recalcing. (optimisation)
    amplifiedMulti = 0, aniArrLength = 0;

const frameTypeToggle = () => { //this is to push the current frame times
        framePushType = !framePushType;
        aniOffsets = framePushType ? [1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4] : [1,2,3,4]
        aniArrLength = aniOffsets.length},

    amplifiedToggle = () => {
        amplifiedBool = !amplifiedBool
        amplifiedMulti = amplifiedBool ? 1 : 0;
        animationUpdate()};

// todo : ==================
// todo : CHARACTER SETTINGS
// todo : ==================

const dir = "characters/" //directory where all the character files are saved.
const characterFrames = [
        //Name          WID/HIG/ROW/COL/URL
    [   ["Base Game"],
        ["Cadence P1",  24, 24, 14, 16, "player1"],
        ["Melody",      24, 24, 14, 16, "char1"],
        ["Aria",        24, 24, 14, 16, "char2"],
        ["Dorian",      33, 32, 1 , 16, "char3"],
        ["Eli",         32, 28, 14, 16, "char4"],
        ["Monk",        24, 24, 14, 16, "char5"],
        ["Dove",        24, 24, 14, 16, "char6"],
        ["Coda",        33, 30, 14, 16, "char7"],
        ["Bolt",        24, 24, 14, 16, "char8"],
        ["Bard",        24, 24, 14, 16, "char9"]
    ],[ ["Amplified"],
        ["Nocturna",    25, 27, 15, 16, "char10"],
        ["Diamond",     24, 24, 14, 16, "char11"],
        ["Mary",        24, 24, 14, 16, "char12"],
        ["Tempo",       24, 24, 14, 16, "char13"]
    ],[ ["Synchrony"],
        ["Suzu",        25, 28, 14, 16, "Suzu"],
        ["Chaunter",    27, 26, 14, 16, "Chaunter"],
        ["Klarinetta",  26, 30, 1 , 32, "Klarinetta"]]]
let currentCharacter = "Nocturna"; //default character to select on load.

// todo : CHARACTER LOADING

document.addEventListener('DOMContentLoaded', () => { //function mounting on page load
    const parent = $('#characterSelect')
    for (let e = 0; e < characterFrames.length; e++) { //loops through DLC array types

        parent.appendChild(createButton("options"))
        let child = parent.getElementsByTagName('options')[e]

        for(let i = 0; i < (characterFrames[e].length) - 1; i++) {
            //this gets the placement of the character in the default array if a name is typed.
            currentCharacter = currentCharacter.indexOf(characterFrames[e][i][0]) != -1 ? [e,i] : currentCharacter

            child.appendChild(createButton('e',characterFrames[e][i + 1][0])).onclick = function () {
                currentCharacter = [e,i + 1]; animationFrameSize()
                $all('container.tb3 options e').forEach(id => {id.classList.remove("inv")})
                buttonTog(this)}}}

    animationFrameSize()
    parent.getElementsByTagName('options')[currentCharacter[0]].children[currentCharacter[1] - 1].classList.add("inv")})

const animationFrameSize = () =>  {
    let char = characterFrames[currentCharacter[0]]
    frameWidth = char[currentCharacter[1]][1]
    frameHeight = char[currentCharacter[1]][2]
    $("#characterDebug").textContent =
        currentCharacter[0]+""+currentCharacter[1]+":"+ char[currentCharacter[1]][0]

    let src = "/" + dir + char[currentCharacter[1]][5]
    $('#head').src = src + (currentCharacter[0] !== 2 ? "_heads.png" : "_head.png")
    $('#body').src = src + (currentCharacter[0] !== 2 ? "_armor_body.png" : "_body.png")

    $doc.style.setProperty('--imageW',frameWidth+"px")
    $doc.style.setProperty('--imageH',frameHeight+"px")
    $doc.style.setProperty('--rows',char[currentCharacter[1]][3])
    $doc.style.setProperty('--columns',char[currentCharacter[1]][4])

    $('#body').style.marginTop = -((frameHeight * clothingCurrent) * scaleRes) + "px"}

// todo : ==================
// todo : ANIMATION Rendering
// todo : ==================

// a bunch of presets to save work
let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler'),
    frameWidth = getComputedStyle($doc).getPropertyValue('--imageW').replace("px",""),
    frameHeight = getComputedStyle($doc).getPropertyValue('--imageH').replace("px","");

let playTog = false; //toggle bool and current loop iteration for debug purposes
let start = new Date().getTime(), elapsed = 0, bpm = 130;

// todo : Window loop timer

    window.setInterval(() => {
        if(playTog){
            let time = new Date().getTime() - start;
            elapsed = Math.floor(time / (60/bpm) / (1000 / aniOffsets.length));
            animationPush()}
    }, (60/bpm));

// todo : Animation Update rendering

const verticalUpdate = (e) => {
        $('#body').style.marginTop = -((frameHeight * e) * scaleRes) + "px"
    }, //Updates current clothing

    animationUpdate = () => {
    $all('#weapon, #charm').forEach(id => {
        id.style.marginLeft =
            -(((aniOffsets[elapsed]) - 1) * frameWidth) * scaleRes + 'px' })
    $all('#body, #head').forEach(id => {
        id.style.marginLeft =
            -(((aniOffsets[elapsed]) + (amplifiedMulti * 4) - 1) * frameWidth) * scaleRes + 'px' })},

    animationPush = () => {
        amplifiedMulti = amplifiedBool ? Math.ceil(aniOffsets[elapsed] / 1.7) : 0 // this was about 5 lines of dense math FUCK YOU.

        if (elapsed > aniArrLength - 1) { //if current frame is more than 30
            elapsed = 0;
            start = new Date().getTime();
            floorTog()} //resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) {
            elapsed = aniArrLength - 1;
            floorTog()} //if current frame is less than 0 [manual]

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)};

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
    ["BOSS // Death Metal"]] //175

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

// todo : =========================
// todo : Floor Updating & Swapping
// todo : =========================

let danceTog = false, floorBool = false;

const floorTog = () => {
        floorBool = !floorBool;
        $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);
        $("#floor").style.top =
            -((danceTog ? (floorBool ? 2 : 1) : 0) * 72 * 10) - 30 +'px'},

    floorTileSets = [
        [["Zone1"], ["zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["Zone5"], ["boss_1","boss_2"]]];

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings

    const backgroundUpdate = (obj,e,i) => obj.setAttribute(
        "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')")

    for (let e = 0; e < floorTileSets.length; e++){
        $('#backgrounds').appendChild(createButton("div")); //creates the containing box for each row

        for (let i = 0; i < floorTileSets[0].length; i++) {
            let buttonElem = createButton("e");//generates a button
                buttonElem.appendChild(createButton("t",floorTileSets[e][i][[0]])); //generates text data for the button
            backgroundUpdate(buttonElem,e,i); //assigns background image for the button

            $('#backgrounds').children[e].appendChild(buttonElem).onclick = function () {   // attach event listener individually
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage){
                    floorTileSets[e][i].unshift(floorTileSets[e][i].pop()) //rotates the array clockwise.
                    backgroundUpdate(this,e,i)}

                $('#floor').style.backgroundImage = this.style.backgroundImage; //updates the render image.
                this.children[0].textContent = $('#FloorDebug').textContent = floorTileSets[e][i][[0]]; //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                this.classList.add("inv")}}}

    // ON LAUNCH DEBUG PUSH
    const d = 3; //Default Floor Type
    let c=d-1,v=c>2?1:0,h=c>2?c-(floorTileSets[0].length*(floorTileSets.length*1)):c //figures out which array to use for said floor
    backgroundUpdate($('#floor'),v,h)
    $('#backgrounds')?.children[v]?.children[h]?.classList.add("inv")
    $('#FloorDebug').textContent = floorTileSets[v][h][[0]]
    $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);
    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
})

// todo : ========================
// todo : Equipment call functions
// todo : ========================

const itemToggle = (item, e) => {
    buttonTog(e)
    $("#" + item)?.classList?.toggle("invisible")},

    characterToggle = (item,e) => {
        buttonTog(e)
        $('#'+item)?.classList?.toggle("invisible")
        $('#characterDebug').textContent = e.textContent
    }