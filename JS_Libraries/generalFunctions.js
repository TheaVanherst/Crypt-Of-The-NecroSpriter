const
    createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
        return item;
    },

    urlRefresh = () => {
        for (let key in itemArray) {
            itemArray[key].urlUpdate();
        }
        for (let i = 0; i < consumableData.length - itemArray.length; i++) {
            consumableData[i + itemArray.length].urlUpdate();
        }
        specialData.urlUpdate();
        shieldData.urlUpdate();
        currentCharacter.urlUpdate();
    },

    bpmUpdate = (e) => {
        let newBPM
        if (e?.deltaY) {
            e.preventDefault();
            let value = $("#bpmSlider").value;

            newBPM = parseInt((e.deltaY || -(e.deltaY)) > 0 ? -5 : 5) + parseInt(value)
            $("#bpmSlider").value = newBPM;
        } else {
            newBPM = $("#bpmSlider").value;
        }

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
        arrayDivisional = 1000 / aniOffsets[0].length;
        bpm = 60 / newBPM;
    },

    search = (e) => {
        if(e.key === 'Enter') {
            const image = new Image();

            let url = e.target.value,
                idStrip = (e.target.id).replace("Url","");

            image.src = url + ".png";
            // console.log(`RETURN URL: ${idStrip}`);

            image.onload = () => {
                for (let i = 0; i < itemArray.length; i++) {
                    if(itemArray[i].name === idStrip){
                        itemArray[i].urlUpdate(url);
                        return;}
                }
                for (let i = itemArray.length + 1; i < consumableData.length; i++) {
                    if(consumableData[i].name === idStrip){
                        consumableData[i].urlUpdate(url);
                        return;}
                }

                if(idStrip === "special"){
                    specialData.urlUpdate(url);
                    return;}
                if(idStrip === "shield"){
                    shieldData.urlUpdate(url);
                    return;}

                console.log("Item look-up failed.")
            };

            image.onerror = () => {
                targetTimeout(e);
            }
        }
    },

    scale = (a) => {
        let scaleRes = a > 12 ? 12 : a < 4 ? 4 : a;
        $("#transform").style.transform = `scale(${scaleRes})`;

        $("#scaleSlider").value = scaleRes;
        $('#scale').textContent = "1:" + scaleRes;
    },


    targetTimeout = (e) => {
        let placeholder = e.target.placeholder;
        e.target.value = "";
        e.target.placeholder = "Not a valid directory";
        e.target.classList.add("invalid");

        setTimeout(function () {
            e.target.classList.remove("invalid");
            e.target.placeholder = placeholder;
        }, 1953);
    },

    arrayShift = (e) => {
        e.unshift(e.pop());
    },

    merge = (defaultData, newData, fallback) => {
        return newData !== undefined ? newData.valueOf() :
            defaultData !== undefined ? defaultData.valueOf() : fallback;
    };