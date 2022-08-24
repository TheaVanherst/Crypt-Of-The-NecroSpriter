
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
}, false)

// todo : =========================
// todo : Floor Swapping
// todo : =========================

document.addEventListener('DOMContentLoaded', () => { //this just sets the boxes back to default settings
    const backgroundUpdate = (obj,e,i) => obj?.setAttribute(
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

                currentFloor = floorTileSets[e][i][0]
                if(danceTog || floorMultiplier){floorFlip()}

                if(e === 0 && i === 1){ //checks if on zone 2
                    if(danceTog === true){ //checks if the Dance Floor button is active
                        floorMultiplier = true; danceTog = false; //forces the dance floor to switch to the multiplier
                        multiplierFlip($('#floorMultiplier'))} //flips
                    $("#danceButton")?.classList?.add("deact") } //disables the dance floor button.
                else {
                    $("#danceButton")?.classList?.remove("deact")}
                // this disables the default dance floor without the multiplier.

                $('#floor').style.backgroundImage = this.style.backgroundImage; //updates the render image.
                this.children[0].textContent = $('#floorDebug').textContent = floorTileSets[e][i][[0]]; //updates the text on the image when clicked on

                $all('#backgrounds e').forEach(id => {id.classList.remove("inv")}); //removes all buttons from being enabled on mouse press
                this?.classList?.add('inv')}
        }}

    // ON LAUNCH DEBUG PUSH
    const c=currentFloor-1,v=c>2?1:0,h=c>2?c-(floorTileSets[0].length*(floorTileSets.length*1)):c //figures out which array to use for said floor
    currentFloor = floorTileSets[v][h][0]
    backgroundUpdate($('#floor'),v,h)

    parent?.children[v]?.children[h].classList?.add('inv')
    $('#floorDebug').textContent = floorTileSets[v][h][[0]]
    $('#danceDebug').textContent = (danceTog ? (floorBool ? 2 : 1) : 0);
})

// todo : =================
// todo : CHARACTER CHANGER
// todo : =================

let KlarinettaMulti = 1;

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
                    ampBool = true; //this has to be the opposite, just so I can call the function and it do the work for me.
                    amplifiedToggle();
                    $("#ampButton")?.classList?.remove('inv')
                    $("#ampButton")?.classList?.add("deact")}
                else {
                    $("#ampButton")?.classList?.remove("deact")}

                animationResize()

                $all('container.tb3 options e').forEach(item => {
                    item?.classList?.remove('inv')})
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
                    $('#headContainer').classList.remove('invisible') // resets the head to be visible
                    $("#ampButton")?.classList?.remove("deact") // resets the amp button if the current character is Nocturna

                    if(i === 6 && e === 1){ //checks if clothing set 15
                        if(ampBool){ //if amp is enabled
                            $('#ampButton')?.classList?.remove('inv') // makes amp button inactive
                            amplifiedToggle()} // disable amp

                        $('#headContainer').classList.add('invisible')
                        $("#ampButton")?.classList?.add("deact")}} // bat mode

                clothingDebug.textContent = cur + 1}
        }}
}, false);
