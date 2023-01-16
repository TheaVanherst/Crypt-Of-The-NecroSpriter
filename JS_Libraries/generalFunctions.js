
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

    urlRefresh = () => {
        let date = new Date().getTime();
        for (let key in itemArray) {
            itemArray[key].urlUpdate(undefined,date);
        }
        currentCharacter.urlUpdate();
    },

    bpmUpdate = () => {
        let newBPM = document.getElementById("bpmSlider").value;
        $('#bpm').textContent = newBPM;

        let trackContainer = $('#trackContainer');
        trackContainer.innerHTML = '';

        let step = ((newBPM - (100 - 5)) / 5) - 1;
        for (let i = 0; i < songList[step].length; i++) {

            let item = document.createElement('t');
            item.textContent = songList[step][i];
            let br = document.createElement('br');

            trackContainer.appendChild(item).appendChild(br);
        }
        bpm = 60 / newBPM;
        arrayDivisional = 1000 / aniOffsets[0].length;
},

    search = (e) => {
        if(e.key === 'Enter') {
            const image = new Image();

            let url = e.target.value,
                idStrip = (e.target.id).replace("Url","");
            image.src = url + ".png";
            console.log(`RETURN URL: ${idStrip}`);

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
                    return;}
            };

            targetTimeout(e);
        }},

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