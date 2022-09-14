
document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    $("#bpmSlider").oninput = () => bpmUpdate();
    $("#scaleSlider").oninput = () => scaleUpdate();
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})
}, false)

// todo : =========================
// todo : Floor Swapping
// todo : =========================

const characterDebug = $("#characterDebug"),
    clothingDebug = $("#clothingDebug")

const backgroundUpdate = (obj,e,i) => obj?.setAttribute(
    "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')");

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const danceButton = $("#danceButton")
    for (let e = 0; e < floorTileSets.length; e++){
        backgrounds.appendChild(createButton("div")); //creates the containing box for each row

        for (let i = 0; i < floorTileSets[0].length; i++) {
            const child = createButton("e");//generates a button
            child.appendChild(createButton("t",floorTileSets[e][i][[0]])); //generates text data for the button
            backgroundUpdate(child,e,i); //assigns background image for the button

            backgrounds.children[e].appendChild(child).onclick = function () {   // attach event listener individually
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage){
                    arrayShift(floorTileSets[e][i]) //rotates the array clockwise.
                    arrayShift(overlayTileSets[e][i]) //rotates the array clockwise.
                    backgroundUpdate(this,e,i)}

                foreground.src = "UI_Libraries/" + overlayTileSets[e][i][0] + "_Overlay.png"

                currentFloor = floorTileSets[e][i][0]
                if(danceMode[0][1] || danceMode[1][1]){floorFlip()}

                if(e === 0 && i === 1){ //checks if on zone 2
                    if(danceMode[0][1]){ //checks if the Dance Floor button is active
                        danceMode = [[danceMode[0][0],false], [danceMode[1][0],true]] //forces the dance floor to switch to the multiplier
                        multiplierFlip($('#floorMultiBool'))} //flips
                    danceButton?.classList?.add("deact") } //disables the dance floor button.
                else {
                    danceButton?.classList?.remove("deact")}
                // this disables the default dance floor without the multiplier.

                $('#floor').style.backgroundImage = this.style.backgroundImage; //updates the render image.
                this.children[0].textContent = overlayTileSets[e][i][[0]]; //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                this?.classList?.add('inv')}
        }}
})

// todo : =================
// todo : CHARACTER CHANGER
// todo : =================

let currentObject = {};

document.addEventListener('DOMContentLoaded', () => { //function mounting on page load
    const parent = $('#characterSelect'),
        dlcCount = mapItem("dlc",true,characterData),
        characterList = mapItem("name",false,characterData);

    for(let i = 0; i < Math.max.apply(Math, dlcCount) + 1; i++){
        parent.appendChild(createButton("t",dlcTypes[i])); //prints what the character is from
        parent.appendChild(createButton("options"));} //container for character DLC types

    for (let key in characterData) {
        let currentCharacter = characterList[key];

        parent.getElementsByTagName('options')[dlcCount[key]]
            .appendChild(createButton('e', currentCharacter, currentCharacter)).onclick = function () {

            currentObject = {};
            currentObject = mergeDeep({}, defaultData, getUser(currentCharacter,characterData));
            characterDebug.textContent = currentObject.name

            playerUpdate();
            clothingUpdate();
            bodyUrlUpdate();
            equipmentCall();
            animationUpdate(); // this is needed as the positioning is based on information relative to the character.


            $('container.tb3 options e.inv')?.classList?.remove('inv'); //deactivates current buttons
            buttonTog(this);}}});

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const clothing = $('#clothing');

    for (let e = 0; e < Math.ceil(clothingData[0] / clothingData[1]); e++){ //generates button rows
        clothing.appendChild(createButton("div")); //creates the containing box for each row
        let divS = clothing.getElementsByTagName('div')[e]; //creates a var to address the containing box

        for (let i = 0; i < clothingData[1]; i++) { //generates columns
            let cur = (clothingData[1] * e) + i; //figures out which button ((row x row width) + column)

            divS.appendChild(createButton("e","","clothing"+cur)) //generates the button itself.
                .appendChild(createButton("t",cur+1)); //this is to align the text in the middle
            //usually you wouldn't need this but because the box is so small, it overflows and causes issues.

            divS.children[i].onclick = function () {   // attach event listener individually
                const Uniqueclothing = currentObject.clothingData
                buttonAdjustment("#clothing", cur, this);
                clothingDebug.textContent = cur + 1;

                if(Uniqueclothing.bool && Uniqueclothing.clothing - 1 === cur && !Uniqueclothing.head){
                    ampBool = false;
                    $("#amplifiedButton").setAttribute("class","deact");}
                else {
                    $("#amplifiedButton").classList.remove("deact");}

                if(Uniqueclothing.bool){
                    Uniqueclothing.disable();
                    if(Uniqueclothing.clothing - 1 === cur){
                        head.classList.add("invisible");}
                    else {
                        playerModel.style.marginTop =
                            ((defaultData.settings.resolution.height + currentObject.settings.offset.body) -
                                currentObject.settings.resolution.height + "px");
                        head.classList.remove("invisible");}}
                else {
                    head.classList.remove("invisible");}

                if(Uniqueclothing.bool === true){
                    if(Uniqueclothing.clothing - 1 === cur){
                        Uniqueclothing.enable();}}
            }
        }}
}, false);

// todo : ================
// todo : SHIELD CHANGER
// todo : ================

document.addEventListener('DOMContentLoaded', () => {
    const children = ["up","down","right"];

    children.forEach(i => {
        const shieldDir = "#shield" + i;
        $('#shieldSettings').appendChild(createButton("e",i,"shield" + i))
            .onclick = () => {
            $all("#shieldSettings > e.inv").forEach(e => {e.classList.remove("inv")});
            shield.setAttribute("class",i);
            buttonTog($(shieldDir));

            if($(shieldDir).className.indexOf("inv") > -1){
                shield?.classList?.remove("invisible");        //TODO: Fix this please
                $("#shieldButton")?.classList?.add("inv");}}})

    $("#shieldButton").onclick = function () {
        $("#shield" + children[shieldPos])?.classList?.add("inv");
        if(this.className.indexOf("inv") > -1){
            shield?.classList?.add("invisible");
            for (let i = 0; i < children.length; i++) {
                $("#shield" + children[i]).classList.remove("inv");}}
        else {
            shield?.classList?.remove("invisible");}
        buttonTog(this);
    }
})
