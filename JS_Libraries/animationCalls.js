
// todo : ===================
// todo : ANIMATION LOOP CALL
// todo : ===================

window.setInterval(() => {
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));

        animationPush()}}, (60/bpm));

// todo : ==========================
// todo : Animation Update rendering
// todo : ==========================

// a bunch of presets to save work
let start = new Date().getTime(), floorID;
let floatInt = 0, elapsed = 0, updateTimer

const playReset = () => { // this deals with resetting the play button
        playTog = false; // forces animation to pause
        $("#play")?.classList?.remove('inv') // resets the button setting
        animationPush()}, // updates the animation from the onclick call ++ or --

    animationPush = () => {
        $('#amplifiedDebug').textContent = ampBool ? "AMP" + ampMultiplier : "DIS"

        if (elapsed >= aniArrLength) { // if current frame is more than the horizontal displacement array
            elapsed = 0; // resets the elapsed time
            start = new Date().getTime(); // gets new current time

            floorID = !floorID;
            if(danceMode[0][1] || danceMode[1][1]){
                floorFlip();} else {floorHide();}

            floatInt++
            floatInt = floatInt >= equipmentOffsets[0].length ? 0 : floatInt
            if(floatInt === 0 && forceRefresh){urlUpdate()} //requires to be as soon as it resets to prevent console spam
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength; // gets the max value of the array to make it loop around dynamically

            floorID = !floorID;
            if(danceMode[0][1] || danceMode[1][1]){
                floorFlip();} else {floorHide();}

            floatInt--
            floatInt = floatInt < 0 ? equipmentOffsets[0].length : floatInt
        } // if current frame is less than 0 [manual]

        ampMultiplier = ampBool ? Math.round((aniOffsets[0][elapsed] / 1.35)) * KlarinettaMulti : 0 // this was about 5 lines of dense math FUCK YOU.

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)};

let specialWidth = [0, 0];

const animationUpdate = () => {
        let cd = characterFrames[currentCharacter[0]][currentCharacter[1]]
        $all('#hat, #boots, #ring, #shovel, #weapon, #hip').forEach(id => {
            id.style.backgroundPositionX = ((aniOffsets[0][elapsed] + 3) * -24) + 'px'})
        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[0][elapsed]) + (ampMultiplier * 4) - 1) * -framesize[1]) + 'px' })

        if(cd[13][0]){
            $('#special').style.backgroundPositionX = (specialWidth[1][aniOffsets[0][elapsed] - 1] * specialWidth[0]) + "px"
            $('#special').style.top = -(cd[13][3][aniOffsets[0][elapsed] - 1]) + "px"}

        $('#shovel').style.top = -shovelOffsets[aniOffsets[0][aniOffsets[0][elapsed] - 1] - 1] + 'px'
        $('#torch').style.backgroundPositionX = ((cd[11][3][aniOffsets[0][elapsed] - 1] - 1) * -24) + 'px'
        $('#charm').style.top = -(cd[9][3][aniOffsets[0][elapsed] - 1] - 2) + 'px'

        itemYPos()};

// todo : ================
// todo : Render Functions
// todo : ================

const bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        $('#bpmDebug').textContent = bpm; // sets the bpm from the slider value
        $('#bpm').textContent = bpm;

        let trackContainer = $('#trackContainer') // shorthand
        trackContainer.innerHTML = '' // empties the current compatible tracks

        let step = ((bpm - (100 - 5)) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++){ // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br)}} // appends to parent

// todo : ==================
// todo : CHARACTER UPDATING
// todo : ==================

const characterChange = () =>  { //simplification of the character change calling
        const player = $('#playerModel'), head = $('#head'), body = $('#body'), special = $('#special'); //precalls
        let char = characterFrames[currentCharacter[0]],
            charData = characterFrames[currentCharacter[0]][currentCharacter[1]]

        playerUpdate(player, head, body, char, charData, special)
        clothingUpdate(player, head, char, charData);
        equipmentCall(char)},

    playerUpdate = (p,h,b,c,cd,s) => {
        framesize = [cd[1][1], cd[1][0]];
        // updates image sources on character change
        let srcLink = currentCharacter[0] !== 2 ? ["_heads.png", "_armor_body.png"] : ["_head.png", "_body.png"],
            src = dir + cd[4];
        srcLink = srcLink.map(i => i + "?" + new Date().getTime());

        if(!cd[14]){ampBool = false
            $("#amplifiedButton").setAttribute('class', 'deact')}
        h.src = src + (cd[14] ? srcLink[0] : srcLink[1])
        b.src = src + srcLink[1];

        //updates background image resolution setting calcs
        $doc.style.setProperty('--imageW', framesize[1] + "px"); // todo: spritesheet settings
        $doc.style.setProperty('--imageH', framesize[0] + "px");  // sets frame resolution
        $doc.style.setProperty('--rows', cd[2][0]); // sets spritesheet rows & coloumns for resize
        $doc.style.setProperty('--columns', cd[2][1]);

        if(cd[13][0]){
            specialWidth[0] = cd[13][1][0]
            specialWidth[1] = cd[13][4]
            s.style.backgroundImage = "url('items/" + cd[13][5] + ".png')"
            s.style.margin = cd[13][2][0] + "px 0 0 " + cd[13][2][1] + "px"
            s.style.transform = "rotate("+cd[13][6]+"deg)"
            s.style.width = specialWidth[0] + 0.5 + "px"
            s.style.height = cd[13][1][1] + "px"}

        b.style.marginTop = -(framesize[0] * clothingCurrent) + "px";
        h.parentNode.style.marginTop = -cd[3][0] + "px"; // corrects head vertically
        p.style.margin = ((24 + cd[3][1]) - cd[1][1] + "px") + " 0 0 " + Math.floor((24 - cd[1][0]) / 2) + "px";

        $("#characterDebug").textContent = currentCharacter[0] + "" + currentCharacter[1] + ":" + cd[0];}, // fixes vertical placement so they're all aligned

// todo : ==================
// todo : CLOTHING UPDATING
// todo : ==================

    clothingUpdate = (p,h,c,cd) => {
        activeRows = cd[2][0]; // current amount of clothing this character can have.
        for (let i = 0; i < clothingData[0]; i++){
            $('#clothing' + i).setAttribute('class', i < activeRows ? '' : 'deact')} //disables buttons higher than the number of compatible rows

        if(clothingCurrent + 1 > activeRows){ //checks if the current clothing active is not applicable to the new character.
            buttonAdjustment("#clothing",0, $('#clothing0'))
            $('#clothingDebug').textContent = clothingCurrent}

        if(cd[11][4]){
            $("#torch").classList.toggle("flip")}} // checks if torch needs to be flipped