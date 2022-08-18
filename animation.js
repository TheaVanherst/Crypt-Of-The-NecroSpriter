
//TODO : ROOT ESTABLISHING

// just some presets to save my tiny ape brain some time later
const $doc = document.documentElement,
    $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document),
    $comp = getComputedStyle;
let frameDef = getComputedStyle($doc).getPropertyValue('--frameDef');

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    $("#bpmSlider").oninput = () => bpmUpdate();
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})

    //TODO : DEFAULT SETTING ESTABLISHING

    frameTypeToggle()
    bpmUpdate()

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)

// todo : =====================
// todo : REOCCURRING FUNCTIONS
// todo : =====================

const buttonTog = (e) =>
        e.classList.toggle('inv')

    buttonUpdate = (status,e) => {
        if(status === true){e.classList.add('inv')}
        else {e.classList.remove('inv')}}

// todo : HTML button gen

    createButton = (css,text,id) => {
        let item = (document.createElement(css))
        item.textContent = text

        if(id!==""){item.id = id}

        return item}

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

let clothingDefault = 0, clothingTypes = 14, clothingColumns = 7; //default clothing variables.

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    let clothing = $('#clothing'), clothingDebug = $('#clothingDebug')

    for (let e = 0; e < Math.ceil(clothingTypes / clothingColumns); e++){ //generates button rows
        clothing.appendChild(createButton("div","","")) //creates the containing box for each row
        let divS = clothing.getElementsByTagName('div')[e] //creates a var to address the containing box

        for (let i = 0; i < clothingColumns; i++) { //generates columns
            let cur = (clothingColumns * e) + i //figures out which button ((row x row width) + coloumn)

            divS.appendChild(createButton("e","","clothing"+cur)) //generates the button itself.
                .appendChild(createButton("t",cur+1,"")) //this is to align the text in the middle
                    //usually you wouldn't need this but because the box is so small, it overflows and causes issues.

            divS.children[i].onclick = function () {   // attach event listener individually
                $all('#clothing e').forEach(id => {id.classList.remove("inv")}) //removes all buttons from being enabled on mouse press
                buttonTog(this); verticalUpdate(cur)
                clothingDebug.textContent = cur + 1
            }}} //presses the button that was just pressed.

    $("#clothing"+clothingDefault).classList.add('inv') //enables the button that is the default clothing option
    clothingDebug.textContent = clothingDefault + 1

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
}, false)

// todo : ==================
// todo : ANIMATION SETTINGS
// todo : ==================

/// animation timing setup (this is going to get recoded)
let animationOffsets, bpm = 130; //this is just the standard frame time for the animation offset to prevent recalcing. (optimisation)

// a bunch of presets to save work
let scaleRes = getComputedStyle($doc).getPropertyValue('--scaler'),
    verticalOffset = getComputedStyle($doc).getPropertyValue('--size');

let playTog = false //toggle bool and current loop iteration for debug purposes
let start = new Date().getTime(), elapsed = 0;

    window.setInterval(() => {
        if(playTog){
            let time = new Date().getTime() - start;
            elapsed = Math.floor(time / (60/bpm) / (1000 / animationOffsets.length ))
            animationPush()}
    }, (60/bpm));

// todo : Animation Updater

    verticalUpdate = (e) => $('#body').style.marginTop = -(verticalOffset * e) * scaleRes + "px" //Updates current clothing

    animationPush = () => {
        if (elapsed > animationOffsets.length - 1) { //if current frame is more than 30
            elapsed = 0; start = new Date().getTime(); //resets timer every 30 animation frames. [automation]
            floorTog()} //floor swap

        else if (elapsed < 0) {
            elapsed = animationOffsets.length - 1; //if current frame is less than 0 [manual]
            floorTog()} //floor swap

        $all('#body, #head').forEach(id => {
            id.style.marginLeft =
                -((animationOffsets[elapsed] - 1) * verticalOffset) * scaleRes + 'px' })

    $("#frame").textContent = (elapsed + 1)}

// todo : ==============================
// todo : Music Playlist / BPM automated
// todo : ==============================

let songList = [
    ["1-1 // Disco Descent"], //115
    ["BOSS // Deep Blues", "BOSS // King Conga", "BOSS // Golden Lute", "TRAINING // Watch Your Step"], //120
    ["BOSS // Coral Riff"], //125
    ["LOBBY // Rhythmortis","1-2 // Crypteque","2-1 // Fungal Funk","4-1 // Styx and Stones"], //130
    ["3-1 // Stone Cold (cold)"," 3-1 // Igneous Rock (hot)"], //135
    ["1-3 // Mausoleum Mash","2-2 // Grave Throbbing","BOSS // Necrodancer Phase 1","BOSS // Dead Ringer"], //140
    ["3-2 // Dance of the Decorous (cold)","3-2 March of the Profane (hot)","4-2 // Heart of the Crypt"], //145
    ["2-3 // Portabellohead"], //150
    ["3-3 // A Cold sweat (cold)","3-3 // A Hot Mess (hot)"], //155
    ["4-3 // The Wight To Remain","BOSS // Necrodancer Phase 2"], //160
    ["N/a"], //165
    ["N/a"], //170
    ["BOSS // Death Metal"]] //175

// todo : BPM divisional

    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value;
        let trackContainer = $('#trackContainer')

        $('#bpmDebug').innerHTML = bpm
        $('#bpm').innerHTML = bpm
        trackContainer.innerHTML = ''

        let step = ((bpm - 110) / 5) - 1

        for(let i = 0; i < songList[step].length; i++){

            let item = document.createElement('t')
            item.textContent = songList[step][i]
            let br = document.createElement('br')

            trackContainer.appendChild(item).appendChild(br)}}

// todo : =========================
// todo : Floor Updating & Swapping
// todo : =========================

let danceTog = false, floorBool = false, framePushType = true;

    frameTypeToggle = () => //this is to push the current frame times
        animationOffsets = (framePushType ? [1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4] : [1,2,3,4])

    floorTog = () => {
        floorBool = !floorBool
        $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0)
        $("#crop").style.backgroundPositionY =
            -((danceTog ? (floorBool ? 2 : 1) : 0) * (scaleRes * (verticalOffset * 2))) - (scaleRes * 5) + 'px'}

let currentFloor = 0 , floorColoumns = 3, //(floorTileSets.length / 2)
    floorTileSets = [
        ["Zone1"], ["zone2"], [true,"zone3_1","zone3_2"],
        ["zone4"], ["Zone5"], [true,"boss_1","boss_2"]];

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    let background = $('#backgrounds'), floor = $('#FloorDebug')

    for (let e = 0; e < floorTileSets.length / floorColoumns; e++) { //generates button rows
        background.appendChild(createButton("div","","")) //creates the containing box for each row
        let parentContainer = background.getElementsByTagName('div')[e] //creates a var to address the containing box

        for (let i = 0; i < floorColoumns; i++) {
            let cur = (floorColoumns * e) + i,
                arrayTile = floorTileSets[cur][floorTileSets[cur].length > 1 ? 1 : 0]

            const buttonElem = createButton("e","","floor"+cur)//generates a button
                buttonElem.appendChild(createButton("t",arrayTile,"")) //generates text data for the button
                buttonElem.appendChild(createButton("f","","")) //generates image data for the button
                    .setAttribute("style", "background-image : url('UI_Libraries/"+arrayTile+"_Floor.png');") //assigns background image for the button

            parentContainer.appendChild(buttonElem)

            parentContainer.children[i].onclick = function () {   // attach event listener individually
                if(floorTileSets[cur].length > 1){ //checks if there is two images to switch between

                    if (this.id === "floor"+currentFloor) { //checks if the current floor is the same as the one being clicked on
                        floorTileSets[cur][0] = !floorTileSets[cur][0]} //internal array bool flip, toggles between the floor types

                    this.children[1].setAttribute("style", "background-image : url('UI_Libraries/"+floorTileSets[cur][floorTileSets[cur][0] ? 1 : 2]+"_Floor.png');")
                    this.children[0].textContent = floorTileSets[cur][floorTileSets[cur][0] ? 1 : 2]} //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}) //removes all buttons from being enabled on mouse press
                this.classList.add("inv")

                currentFloor = cur //updates the current floor for the .FirstChild.id check on function start
                $('#FloorDebug').textContent = floorTileSets[cur].length > 1 ? floorTileSets[cur][this.getAttribute('backgroundBool')] : arrayTile
                $('#crop').style.backgroundImage = $comp(this.getElementsByTagName('f')[0]).backgroundImage
            }
    }}

    let floorPush = floorTileSets[currentFloor][floorTileSets[currentFloor].length > 1 ? 1 : 0]
    $('#crop').setAttribute("style", "background-image : url('UI_Libraries/"+floorPush+"_Floor.png');")
    floor.textContent = floorPush

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
})
