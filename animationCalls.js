
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

        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[0][elapsed]) + (ampMultiplier * 4) - 1) * -framesize[1]) + 'px' })
    },

    foregroundToggle = () => {
        foregroundBool = !foregroundBool
        $('#foreground').style.display = foregroundBool ? "none" : "block"
        $('#foregroundDebug').textContent = foregroundBool
        buttonTog($('#foregroundButton'))}

    itemToggle = (item, e) => {
        buttonTog(e)
        $("#" + item)?.classList?.toggle("invisible")};

// todo : ==========================
// todo : Animation Update rendering
// todo : ==========================

// a bunch of presets to save work
let start = new Date().getTime(), elapsed = 0, floorID;

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
            if(danceMode[0] || danceMode[1]){
                floorFlip()}
            else{
                floorHide()}
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength; // gets the max value of the array to make it loop around dynamically
            floorID = !floorID;
            if(danceMode[0] || danceMode[1]){
                floorFlip()}
            else {
                floorHide()}
        } // if current frame is less than 0 [manual]

        ampMultiplier = ampBool ? Math.round((aniOffsets[0][elapsed] / 1.35)) * KlarinettaMulti : 0 // this was about 5 lines of dense math FUCK YOU.

        animationUpdate()
        $("#frame").textContent = (elapsed + 1)},

    animationUpdate = () => {
        $all('#hat, #boots, #wrist, #shovel, #weapon, #hip').forEach(id => {
            id.style.backgroundPositionX = ((aniOffsets[0][elapsed] + 3) * -24) + 'px'})

        $('#shovel').style.top = -shovelOffsets[aniOffsets[0][elapsed] - 1] + 'px'
        $('#torch').style.backgroundPositionX = ((characterFrames[currentCharacter[0]][currentCharacter[1]][11][3][elapsed] - 1) * -24) + 'px'
        $('#charm').style.top = -(characterFrames[currentCharacter[0]][currentCharacter[1]][9][3][elapsed] - 2) + 'px'

        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = (((aniOffsets[0][elapsed]) + (ampMultiplier * 4) - 1) * -framesize[1]) + 'px' })};

// todo : ================
// todo : Render Functions
// todo : ================

const floorFlip = () => {
        $('#danceFloor').classList.remove('invisible')
        $('#danceFloor').style.backgroundImage = 'url(UI_Libraries/' + currentFloor + (danceMode[1] ? '_' : '_NoMP_') + 'Floor' + (floorID ? 2 : 1) + '.png)'
        $('#danceDebug').textContent = floorID ? 2 : 1},

    floorHide = () => {
        $('#danceFloor').classList.add('invisible')
        $('#danceDebug').textContent = "0"},

    danceButtons = ["danceButton","multiplierButton"],
    multiplierFlip = (item, id) => {
        for (let i = 0; i < danceMode.length; i++){
            danceMode[i] = i === id ? danceMode[id] = !danceMode[id] : false

            if(danceMode[i]){
                $("#"+danceButtons[i]).classList.add("inv")}
            else {
                $("#"+danceButtons[i]).classList.remove("inv")}}

        if(danceMode[id]){floorFlip()}
        else {floorHide()}},

    bpmUpdate = () => {
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
    const player = $('#playerModel'), head = $('#head'), body = $('#body');
    let char = characterFrames[currentCharacter[0]];

    playerUpdate(player, head, body, char)
    clothingUpdate(player, head, char);
    for (let i = 0; i < calls.length; i++){equipmentCall(i)}

    animationUpdate()};

    playerUpdate = (p,h,b,c) => {
        framesize = [c[currentCharacter[1]][1][1], c[currentCharacter[1]][1][0]];
        $("#characterDebug").textContent = currentCharacter[0] + "" + currentCharacter[1] + ":" + c[currentCharacter[1]][0];

        // updates image sources on character change
        let srcLink = currentCharacter[0] !== 2 ? ["_heads.png", "_armor_body.png"] : ["_head.png", "_body.png"],
            src = dir + c[currentCharacter[1]][4];
        srcLink = srcLink.map(i => i + "?" + new Date().getTime());
        h.src = src + srcLink[0]; b.src = src + srcLink[1];

        //updates background image resolution setting calcs
        $doc.style.setProperty('--imageW', framesize[1] + "px"); // todo: spritesheet settings
        $doc.style.setProperty('--imageH', framesize[0] + "px");  // sets frame resolution
        $doc.style.setProperty('--rows', c[currentCharacter[1]][2][0]); // sets spritesheet rows & coloumns for resize
        $doc.style.setProperty('--columns', c[currentCharacter[1]][2][1]);

        b.style.marginTop = -(framesize[0] * clothingCurrent) + "px";
        h.parentNode.style.marginTop = -c[currentCharacter[1]][3][0] + "px"; // corrects head vertically
        p.style.margin = ((24 + c[currentCharacter[1]][3][1]) - c[currentCharacter[1]][1][1] + "px") + " 0 0 " +
            Math.floor((24 - c[currentCharacter[1]][1][0]) / 2) + "px";}, // fixes vertical placement so they're all aligned

    clothingUpdate = (p,h,c) => {
        activeRows = characterFrames[currentCharacter[0]][currentCharacter[1]][2][0]; // current amount of clothing this character can have.
        for (let i = 0; i < clothingData[0]; i++){
            $('#clothing' + i).setAttribute('class', i < activeRows ? '' : 'deact')} //disables buttons higher than the number of compatible rows

        if(clothingCurrent + 1 > activeRows){ //checks if the current clothing active is not applicable to the new character.
            buttonAdjustment("#clothing",0, $('#clothing0'))
            $('#clothingDebug').textContent = clothingCurrent}

        if(c[currentCharacter[1]][11][4]){
            $("#torch").classList.toggle("flip")}}, // checks if torch needs to be flipped

    equipmentCall = (i) => {
        let char = characterFrames[currentCharacter[0]],
            id = 5 + i, idHash = '#'+calls[i][0];

        if(char[currentCharacter[1]][id][0]){ // checks hatbool from #datastorage
            $(idHash+'Button')?.classList?.remove("deact")
            $(idHash).style.margin = char[currentCharacter[1]][id][1] + 'px 0 0 ' + char[currentCharacter[1]][id][2] + 'px';}
        else {
            $(idHash+'Button').setAttribute('class', 'deact')
            $(idHash).classList.add("invisible")}} // makes hat invisible