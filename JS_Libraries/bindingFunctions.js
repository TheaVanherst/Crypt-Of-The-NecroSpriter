
document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    $("#ani, #frame").value = frameDef;
    $("#bpmSlider").oninput = () => bpmUpdate();
    $("#scaleSlider").oninput = () => scaleUpdate();
    //$all('body e').forEach(id => {id.onclick = () => buttonTog(id)})
}, false)

// todo : =========================
// todo : Floor Swapping
// todo : =========================

const backgroundUpdate = (obj,e,i) => obj?.setAttribute(
    "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')");

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    let backgrounds = $('#backgrounds'), danceButton = $("#danceButton")
    for (let e = 0; e < floorTileSets.length; e++){
        backgrounds.appendChild(createButton("div")); //creates the containing box for each row

        for (let i = 0; i < floorTileSets[0].length; i++) {
            let child = createButton("e");//generates a button
            child.appendChild(createButton("t",floorTileSets[e][i][[0]])); //generates text data for the button
            backgroundUpdate(child,e,i); //assigns background image for the button

            backgrounds.children[e].appendChild(child).onclick = function () {   // attach event listener individually
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage){
                    arrayShift(floorTileSets[e][i]) //rotates the array clockwise.
                    arrayShift(overlayTileSets[e][i]) //rotates the array clockwise.
                    backgroundUpdate(this,e,i)}

                $('#foreground').src = "UI_Libraries/" + overlayTileSets[e][i][0] + "_Overlay.png"

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
                this.children[0].textContent = $('#floorDebug').textContent = overlayTileSets[e][i][[0]]; //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                this?.classList?.add('inv')}
        }}
})

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
            currentCharacter = currentCharacter.indexOf(characterFrames[e][i][0]) !== -1 ? [e,i] : currentCharacter

            child.appendChild(createButton('e',characterFrames[e][i + 1][0])).onclick = function () {
                currentCharacter = [e,i + 1];
                KlarinettaMulti = currentCharacter[0] == 2 ? currentCharacter[1] == 3 ? 2 : 1 : 1

                if(currentCharacter[0] === 2 && currentCharacter[1] === 2){ //CHAUNTER
                    ampBool = true; amplifiedToggle(); //this has to be the opposite, just so I can call the function and it do the work for me.
                    $("#amplifiedButton").setAttribute('class', 'deact')}
                else {$("#amplifiedButton")?.classList?.remove("deact")}

                characterChange();
                itemYPos(); // this is needed as the positioning is based on information relative to the character.

                $('container.tb3 options e.inv')?.classList?.remove('inv') //deactivates current buttons
                $('#clothing' + clothingCurrent).classList.add("inv")
                buttonTog(this)}
        }}
    parent.getElementsByTagName('options')[currentCharacter[0]].children[currentCharacter[1] - 1].classList?.add('inv')})

// todo : ================
// todo : CLOTHING CHANGER
// todo : ================

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const clothing = $('#clothing'), clothingDebug = $('#clothingDebug');

    for (let e = 0; e < Math.ceil(clothingData[0] / clothingData[1]); e++){ //generates button rows
        clothing.appendChild(createButton("div")); //creates the containing box for each row
        let divS = clothing.getElementsByTagName('div')[e]; //creates a var to address the containing box

        for (let i = 0; i < clothingData[1]; i++) { //generates columns
            let cur = (clothingData[1] * e) + i; //figures out which button ((row x row width) + column)

            divS.appendChild(createButton("e","","clothing"+cur)) //generates the button itself.
                .appendChild(createButton("t",cur+1)); //this is to align the text in the middle
            //usually you wouldn't need this but because the box is so small, it overflows and causes issues.

            divS.children[i].onclick = function () {   // attach event listener individually
                buttonAdjustment("#clothing", cur, this)

                if(currentCharacter[0] === 1 && currentCharacter[1] === 1){ // Nocturna
                    if(i === 6 && e === 1){ //checks if clothing set 15 // bat mode
                        if(ampBool){amplifiedToggle()} // disable amp
                        $('#headContainer').classList.add('invisible')
                        $("#amplifiedButton").setAttribute('class', 'deact')
                        for (let e = 0; e < calls.length; e++) {
                            $("#"+calls[e][0]+"Button").setAttribute('class', 'deact')}}
                    else {
                        for (let e = 0; e < calls.length; e++) {
                            $("#"+calls[e][0]+"Button").classList.remove('deact')}}

                    for (let i = 0; i < calls.length; i++) {
                        $("#"+calls[i][0]+"Button").style.backgroundPositionX = ((aniOffsets[0][elapsed] + 3) *
                            (calls[i][0] === "special" ? -27 : -24) ) + 'px'}
                } // makes amp button inactive
                else {
                    $("#amplifiedButton")?.classList?.remove("deact")} // resets the amp button if the current character is Nocturna

                clothingDebug.textContent = cur + 1}
        }}
}, false);


document.addEventListener('DOMContentLoaded', () => {
    const parent = $('#shieldSettings'), shield = $('#shield'),
        directions = [["Up","Down","Right"],[2,4,1]],
        dimensions = [[-9,0,0],[9,0,10],[0,16,10]],
        cur = directions[0]

    for (let i = 0; i < directions[0].length; i++) {
        parent.appendChild(createButton("e",cur[i],"shield"+cur[i]))
        parent.children[i + 1].onclick = function() {

            for (let i = 0; i < cur.length; i++) {
                $("#shield" + cur[i]).classList.remove("inv"); }
            buttonTog(this)

            if(this.className.indexOf("inv") > -1){
                $("#shield")?.classList?.remove("invisible");
                $("#shieldButton")?.classList?.add("inv");}

            shield.style.display = "block"
            shield.style.backgroundPositionX = 24 * (directions[1][i] - 1) + "px";
            shield.style.margin = dimensions[i][0] + "px 0 0 " + dimensions[i][1] + "px";
            shield.style.zIndex = dimensions[i][2]
        }
    }

    $("#shieldButton").onclick = function() {
        if(this.className.indexOf("inv") > -1){
            $("#shield").style.display = "none"
            for (let i = 0; i < cur.length; i++) {
                $("#shield" + cur[i]).classList.remove("inv"); }}
        else {
            $("#shield").style.display = "block"}
        buttonTog(this);}
});
