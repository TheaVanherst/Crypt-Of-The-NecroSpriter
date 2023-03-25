const
    createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
        return item;
    },

    urlRefresh = () => {
        itemArray.map(x => x.urlUpdate())
        consumableData.map(x => x.urlUpdate());
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
            newBPM = newBPM > 190 ? 190 : newBPM < 100 ? 100 : newBPM;

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
            console.log(`RETURN URL: ${idStrip}`);

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

    scale = (a) => {
        let scaleRes
        if(!a){
            scaleRes = $("#scaleSlider").value;
        } else {
            scaleRes = a > 12 ? 12 : a < 4 ? 4 : a;
        }

        $("#transform").style.transform = `scale(${scaleRes})`;

        $("#scaleSlider").value = scaleRes;
        $('#scale').textContent = "1:" + scaleRes;
    },

    navToggle = () => {
        $all(".navigation").forEach((e) => {e.classList.toggle('invisible')})
        $("#navTog").classList.toggle('pressed')
    }

    moveChoiceTo = (elem_choice, direction) => {
        let span = elem_choice.parentNode.parentNode,
            td = span.parentNode;

        if (direction === -1 && span.previousElementSibling) {
            td.insertBefore(span, span.previousElementSibling);
        } else if (direction === 1 && span.nextElementSibling) {
            td.insertBefore(span, span.nextElementSibling.nextElementSibling)
        }
    };

