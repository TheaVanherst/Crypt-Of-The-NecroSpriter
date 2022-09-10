
let frame = 0,
    start = new Date().getTime(), //gets the reference point for the elapsed to work to.
    elapsed = 0, //counter for the bpm loop
    equipmentFloatInt = 0; //equipment float pattern counter

window.setInterval(() => {
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));
        frame = aniOffsets[0][elapsed - 1]

        animationPush()}}, (60/bpm));

// a bunch of presets to save work
let floorFlipper; //flips every bar (music)

const playReset = () => { // this deals with resetting the play button
        playTog = false; // forces animation to pause
        $("#play")?.classList?.remove('inv') // resets the button setting
        animationPush()}, // updates the animation from the onclick call ++ or --

    danceFlip = () => { //checks if the floor should flip (every 1 bar)
        if(danceMode[0][1] || danceMode[1][1]){
            floorFlipper = !floorFlipper; //flips the floor
            floorFlip();}
        else {floorHide();}}

    animationPush = () => {
        if (elapsed >= aniArrLength) { // if current frame is more than the horizontal displacement array
            elapsed = 0; // resets the elapsed time
            start = new Date().getTime(); // gets new current time
            danceFlip()
            equipmentFloatInt = equipmentFloatInt >= equipmentOffsets[0].length ? 0 : equipmentFloatInt++

            if(equipmentFloatInt === 0 && forceRefresh){
                bodyUrlUpdate($('#head'),$('#body'))
                for (let key in itemData) {
                    urlUpdate(key)}
            } //requires to be as soon as it resets to prevent console spam
        } // resets timer every 30 animation frames. [automation]
        else if (elapsed < 0) { // if user has gone to the previous frame, and the new frame is below 0
            elapsed = aniArrLength; // gets the max value of the array to make it loop around dynamically
            danceFlip()
            equipmentFloatInt = equipmentFloatInt < 0 ? equipmentOffsets[0].length : equipmentFloatInt--} // if current frame is less than 0 [manual]

        ampMultiplier = ampBool ? Math.round(frame / 1.35) * currentObject.settings.ampMultiplier : 0 // this was about 5 lines of dense math FUCK YOU.
        animationUpdate()};

let specialWidth = [0, 0];

const animationUpdate = () => {
        $all('#hat, #boots, #ring, #shovel, #weapon, #hip').forEach(id => {
            id.style.backgroundPositionX = ((aniOffsets[0][elapsed] + 3) * -24) + 'px'})
        $all('#body, #head').forEach(id => { // specific displacement for the character
            id.style.marginLeft = ((frame + (ampMultiplier * 4) - 1) * -currentObject.settings.resolution.width) + 'px' })

        if(currentObject.special.bool){
            $('#special').style.backgroundPositionX = (specialWidth[1][frame] * specialWidth[0]) + "px"
            $('#special').style.top = -(currentObject.special.offset.top[frame]) + "px"}

        $('#shovel').style.top = -shovelOffsets[frame] + 'px'
        $('#torch').style.backgroundPositionX = ((specialWidth[1][frame] - 1) * -24) + 'px'
        $('#charm').style.top = -(currentObject.charm.offset.sequence[frame] - 2) + 'px'

        //$('#boots').style.margin = -(currentObject.boots.offset.top) + "px 0 0" + -(currentObject.boots.offset.left + "px")

        itemYPos()};

// todo : ================
// todo : Render Functions
// todo : ================

const bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        $('#bpm').textContent = bpm; // sets the bpm from the slider value

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
        const player = $('#playerModel'), head = $('#head'), body = $('#body'); //precalls

        playerUpdate(player, head, body)
        clothingUpdate();
        bodyUrlUpdate(head,body)
        equipmentCall()},

    playerUpdate = (p,h,b) => {
        // updates image sources on character change
        //updates background image resolution setting calcs
        $doc.style.setProperty('--imageW', currentObject.settings.resolution.width + "px"); // todo: spritesheet settings
        $doc.style.setProperty('--imageH', currentObject.settings.resolution.height + "px");  // sets frame resolution
        $doc.style.setProperty('--rows', currentObject.settings.resolution.rows); // sets spritesheet rows & coloumns for resize
        $doc.style.setProperty('--columns', currentObject.settings.resolution.columns);

        if(currentObject.special.bool === true){
            $("#specialButton").classList.remove("deact")
            specialWidth[0] = currentObject.special.resolution.width
            specialWidth[1] = currentObject.special.offset.sequence

            style("#special")
                .backgroundImage("url('items/" + currentObject.special.fileUrl + ".png')")
                .margin(currentObject.special.displacement.top + "px 0 0 " + currentObject.special.displacement.left + "px")
                .transform("rotate("+currentObject.special.offset.rotation+"deg)")
                .width(currentObject.special.resolution.width + 0.5 + "px")
                .height(currentObject.special.resolution.height + "px")}
        else {
            $("#specialButton").setAttribute('class','deact')
        }

        b.style.marginTop = -(currentObject.settings.resolution.height * clothingCurrent) + "px";
        h.parentNode.style.marginTop = -currentObject.settings.offset.head + "px"; // corrects head vertically
        p.style.margin = ((defaultData.settings.resolution.height + currentObject.settings.offset.body) - currentObject.settings.resolution.height + "px") +
            " 0 0 " + Math.floor((defaultData.settings.resolution.width - currentObject.settings.resolution.width) / 2) + "px";
    }, // fixes vertical placement so they're all aligned

// todo : ==================
// todo : CLOTHING UPDATING
// todo : ==================

    clothingUpdate = () => {
        for (let i = 0; i < clothingData[0]; i++){
            $('#clothing' + i).setAttribute('class', i < currentObject.settings.resolution.rows ? '' : 'deact')
        } //disables buttons higher than the number of compatible rows

        if(clothingCurrent + 1 > currentObject.settings.resolution.rows){ //checks if the current clothing active is not applicable to the new character.
            buttonAdjustment("#clothing",0, $('#clothing0'))}
        if(currentObject.torch.flip){
            $("#torch").classList.add("flip")}
        else {
            $("#torch").classList.remove("flip")}} // checks if torch needs to be flipped