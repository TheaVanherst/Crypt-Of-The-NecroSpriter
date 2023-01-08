
const
    createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
        return item;},

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").classList?.remove('inv');
        newButton.classList.add('inv');},

    buttonTog = (e) => {
        e.classList.toggle('inv');},

    itemToggle = (e) => {
        let id = e.id;
        buttonTog($("#"+id));
        id = id.replace("Button","");
        console.log(id)
        $("#" + id).src = consumableData[e] + "?" + new Date().getTime();
    },

    timeUpdate = () => {
        let date = new Date().getTime();
        for (let key in itemArray) {
            itemArray[key].urlUpdate(undefined,date)}
        currentCharacter.urlUpdate()},

    bodyUrlSearch = (e) => {
        if(e.key === 'Enter') {
            const
                image = new Image(),
                item = e.target.value;
            image.src = item + (currentCharacter.dlc !== 2 ? "_armor_body.png" : "_body.png");
            image.onload = () => {
                currentCharacter.urlUpdate(item);
                return;}

            targetTimeout(e)}},



    bpmUpdate = () => {
        bpm = document.getElementById("bpmSlider").value; // gets the bpm for the slider
        $('#bpm').textContent = bpm; // sets the bpm from the slider value

        let trackContainer = $('#trackContainer'); // shorthand
        trackContainer.innerHTML = ''; // empties the current compatible tracks

        let step = ((bpm - (100 - 5)) / 5) - 1; // uses the step to calculate the array placement
        for (let i = 0; i < songList[step].length; i++) { // grabs the songs in the array from the step calc

            let item = document.createElement('t'); // creates a new text element
            item.textContent = songList[step][i]; // sets text for each string in the array from @dataStorage
            let br = document.createElement('br'); // makes a break for the next entry in the for loop

            trackContainer.appendChild(item).appendChild(br);}
        bpm = 60 / bpm;
        arrayDivisional = 1000 / aniOffsets[0].length;}, // appends to parent

    zoomEvent = () => {
        $doc.style.setProperty('--scaler',scaleRes);
        transform.style.transform = "scale("+scaleRes+")";
        transform.style.marginTop = -(scaleRes * 86)+ "px";
        $('#scale').textContent = "1:" + scaleRes;},

    scaleUpdate = () => {
        scaleRes = document.getElementById("scaleSlider").value;
        zoomEvent(); },



    search = (e) => {
        if(e.key === 'Enter') {
            const image = new Image();

            let url = e.target.value,
                idStrip = (e.target.id).replace("Url","");
            image.src = url + ".png";
            image.onload = () => {

                for (let i = 0; i < itemArray.length; i++) {
                    if(itemArray[i].name === idStrip){
                        itemArray[i].urlUpdate(url);
                        return;}}

                for (let i = 0; i < consumableData.length; i++) {
                    if(consumableData[i].name === idStrip){
                        consumableData[i].urlUpdate(url);
                        return;}}

                if(idStrip === "special"){
                    specialData.urlUpdate(url);
                    return;}

                if(idStrip === "shield"){
                    shieldData.urlUpdate(url);
                    return;}};

            targetTimeout(e)}},

    targetTimeout = (e) => {
        let placeholder = e.target.placeholder;
        e.target.value = "";
        e.target.placeholder = "Not a valid directory";

        setTimeout(function () {
            e.target.placeholder = placeholder;}, 1953);},

    arrayShift = (e) => {
        e.unshift(e.pop());},

    styleProxy = {
        get: (object, property) => {
            return (value) => {
                if (value) {
                    object[property] = value;
                    return new Proxy(object, styleProxy);}
                return object[property];};}},

    style = (selector) => {
        return new Proxy(selector.style, styleProxy);},

    merge = (defaultData, newData, fallback) => {
        return newData !== undefined ? newData.valueOf() :
            defaultData !== undefined ? defaultData.valueOf() : fallback;};