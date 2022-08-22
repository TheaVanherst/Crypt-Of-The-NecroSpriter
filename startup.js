
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

    frameTypeToggle() //Updates the frame array to the default settings
    bpmUpdate() //pushes the current slider status to the debug menu
}, false)

// todo : =========================
// todo : Floor Swapping
// todo : =========================

const floorTileSets = [
    [["lobby","Zone1"], ["zone2"], ["zone3_1","zone3_2"]],
    [["zone4"], ["Zone5"], ["boss_1","boss_2"]]];

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const backgroundUpdate = (obj,e,i) => obj.setAttribute(
            "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')"),
        parent = $('#backgrounds')

    for (let e = 0; e < floorTileSets.length; e++){
        parent.appendChild(createButton("div")); //creates the containing box for each row

        for (let i = 0; i < floorTileSets[0].length; i++) {
            let child = createButton("e");//generates a button
            child.appendChild(createButton("t",floorTileSets[e][i][[0]])); //generates text data for the button
            backgroundUpdate(child,e,i); //assigns background image for the button

            $('#backgrounds').children[e].appendChild(child).onclick = function () {   // attach event listener individually
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage){
                    floorTileSets[e][i].unshift(floorTileSets[e][i].pop()) //rotates the array clockwise.
                    backgroundUpdate(this,e,i)}

                $('#floor').style.backgroundImage = this.style.backgroundImage; //updates the render image.
                this.children[0].textContent = $('#FloorDebug').textContent = floorTileSets[e][i][[0]]; //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                this?.classList?.add('inv')}}}

    // ON LAUNCH DEBUG PUSH
    const d = 3, //Default Floor Type
        c=d-1,v=c>2?1:0,h=c>2?c-(floorTileSets[0].length*(floorTileSets.length*1)):c //figures out which array to use for said floor
    backgroundUpdate($('#floor'),v,h)

    parent?.children[v]?.children[h].classList?.add('inv')
    $('#FloorDebug').textContent = floorTileSets[v][h][[0]]
    $('#DanceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);

    document.removeEventListener('DOMContentLoaded', () => {}) //cleans up the DOM elements
})

const dir = "characters/" //directory where all the character files are saved.
const characterFrames = [
    //   Name          WID/HIG/ROW/COL/HDP/BDP/File ID
    [   ["Base Game"], //HDP: head displacement, BPD: body displacement
        ["Cadence P1",  24, 24, 14, 16, 0, 0, "player1"],
        ["Melody",      24, 24, 14, 16, 0, 0, "char1"],
        ["Aria",        24, 24, 14, 16, 0, 0, "char2"],
        ["Dorian",      33, 32, 1 , 16, 1, 4, "char3"],
        ["Eli",         32, 28, 14, 16, -0.3, 0, "char4"], // TODO: FIX THIS
        ["Monk",        24, 24, 14, 16, 0, 0, "char5"],
        ["Dove",        24, 24, 14, 16, 4, 0, "char6"],
        ["Coda",        33, 30, 14, 16, 0, 0, "char7"],
        ["Bolt",        24, 24, 14, 16, 0, 0, "char8"],
        ["Bard",        24, 24, 14, 16, 0, 0, "char9"]
    ],[ ["Amplified"],
        ["Nocturna",    25, 27, 15, 16, 0, 0, "char10"],
        ["Diamond",     24, 24, 14, 16, 1, 0, "char11"],
        ["Mary",        24, 24, 14, 16, 0, 0, "char12"],
        ["Tempo",       24, 24, 14, 16, 1, 0, "char13"]
    ],[ ["Synchrony"],
        ["Suzu",        25, 28, 14, 16, 0, 0, "Suzu"],
        ["Chaunter",    27, 26, 1 , 9 , 0, 0, "Chaunter"],
        ["Klarinetta",  26, 30, 1 , 32, 0, 1, "Klarinetta"]]]
let currentCharacter = "Nocturna"; //default character to select on load.

// todo : =================
// todo : CHARACTER CHANGER
// todo : =================

document.addEventListener('DOMContentLoaded', () => { //function mounting on page load
    const parent = $('#characterSelect')
    for (let e = 0; e < characterFrames.length; e++) { //loops through DLC array types
        parent.appendChild(createButton("t",characterFrames[e][0][0])) //prints what the character is from
        parent.appendChild(createButton("options")) //container for character DLC types
        let child = parent.getElementsByTagName('options')[e] //shorthand for newly made child.

        for(let i = 0; i < (characterFrames[e].length) - 1; i++) {
            //this gets the placement of the character in the default array if a name is typed.
            currentCharacter = currentCharacter.indexOf(characterFrames[e][i][0]) != -1 ? [e,i] : currentCharacter

            child.appendChild(createButton('e',characterFrames[e][i + 1][0])).onclick = function () {
                currentCharacter = [e,i + 1];
                animationFrameSize()

                $all('container.tb3 options e').forEach(item => {
                    item?.classList?.remove('inv')})
                buttonTog(this)}}}

    animationFrameSize()
    parent.getElementsByTagName('options')[currentCharacter[0]].children[currentCharacter[1] - 1].classList?.add('inv')
})

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

let clothingCurrent = 0, clothingTypes = 16, clothingColumns = 8; //default clothing variables.

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const clothing = $('#clothing'), clothingDebug = $('#clothingDebug');

    for (let e = 0; e < Math.ceil(clothingTypes / clothingColumns); e++){ //generates button rows
        clothing.appendChild(createButton("div")); //creates the containing box for each row
        let divS = clothing.getElementsByTagName('div')[e]; //creates a var to address the containing box

        for (let i = 0; i < clothingColumns; i++) { //generates columns
            let cur = (clothingColumns * e) + i; //figures out which button ((row x row width) + column)

            divS.appendChild(createButton("e","","clothing"+cur)) //generates the button itself.
                .appendChild(createButton("t",cur+1)); //this is to align the text in the middle
            //usually you wouldn't need this but because the box is so small, it overflows and causes issues.

            divS.children[i].onclick = function () {   // attach event listener individually
                buttonAdjustment("#clothing", cur, this)
                clothingDebug.textContent = cur + 1}}}

    $("#clothing"+clothingCurrent)?.classList?.add('inv')//enables the button that is the default clothing option
    clothingDebug.textContent = clothingCurrent + 1;
}, false);