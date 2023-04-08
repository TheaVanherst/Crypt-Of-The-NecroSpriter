const
    urlRefresh = () => {
        itemArray.map(x => x.urlUpdate())
        consumableData.map(x => x.urlUpdate());

        specialData.urlUpdate();
        shieldData.urlUpdate();
        currentCharacter.urlUpdate();
    },

    bpmUpdate = (e) => {
        let newBPM;

        if (e?.deltaY) {
            e.preventDefault(); // prevents zoom

            newBPM =    parseInt((e.deltaY || -(e.deltaY)) > 0 ? -5 : 5) + parseInt($("#bpmSlider").value)
            newBPM =    newBPM > 190 ? 190 : newBPM < 100 ? 100 : newBPM;

            $("#bpmSlider").value = newBPM;
        }
        else {
            newBPM =    $("#bpmSlider").value;
        }

        $('#bpm').textContent = newBPM;

        let trackContainer =            $('#trackContainer');
            trackContainer.innerHTML =  '';

        let step = ((newBPM - (100 - 5)) / 5) - 1;
        for (let i = 0; i < songList[step].length; i++) {

            let item =              document.createElement('t');
                item.textContent =  songList[step][i];
            let br =                document.createElement('br');

            trackContainer
                .appendChild(item)
                .appendChild(br);
        }

        arrayDivisional =   1000 / aniOffsets[0].length;
        bpm =               60 / newBPM;
    },

    search = (e) => {
        if(e.key === 'Enter') {
            const image = new Image();

            let url = e.target.value,
                idStrip = (e.target.id).replace("Url","");
            image.src = url + ".png";

            console.log(`RETURN URL: ${idStrip}`); // debug

            image.onload = () => {
                for (let i = 0; i < itemArray.length; i++) {
                    if(itemArray[i].name === idStrip){
                        itemArray[i].urlUpdate(url);
                        return;
                    }
                }
                for (let i = itemArray.length + 1; i < consumableData.length; i++) {
                    if(consumableData[i].name === idStrip){
                        consumableData[i].urlUpdate(url);
                        return;
                    }
                }

                if (idStrip === "special") {
                    specialData.urlUpdate(url);
                    return;
                }
                else if (idStrip === "shield") {
                    shieldData.urlUpdate(url);
                    return;
                }

                console.log("Item look-up failed.");
            };

            image.onerror = () => {
                targetTimeout(e);
            }
        }
    },

    targetTimeout = (e) => {
        let placeholder =       e.target.placeholder;       // grabs fallback
        e.target.placeholder =  "Not a valid directory";    // warns of invalid directory
        e.target.value =        "";                         // clear value
        e.target.classList.add("invalid");                  // flashing animation

        setTimeout(function () {
            e.target.classList.remove("invalid");     // removes animation
            e.target.placeholder = placeholder;             // reverts back to previous text
        }, 1953);                                    // GOD SAVE THE QUEEN.
    },

    arrayShift = (e) => {
        e.unshift(e.pop());
    },

    scale = (a) => {
        let scaleRes
        if(!(!!a)){
            scaleRes =  $("#scaleSlider").value;
        }
        else {
            scaleRes =  a > 12 ? 12 : a < 4 ? 4 : a;
        }

        $("#transform").style.transform = `scale(${scaleRes})`;

        $("#scaleSlider").value =        scaleRes;
        $('#scale').textContent = "1:" + scaleRes;
    },

    navToggle = () => {
        $all(".navigation").forEach(e => {
            e.classList.toggle('invisible')
        });
        $("#navTog").classList.toggle('pressed');
    }

    moveChoiceTo = (elem_choice, direction) => {
        let span =  elem_choice.parentNode.parentNode,
            td =    span.parentNode;

        if (direction === -1 && span.previousElementSibling) {
            td.insertBefore(span, span.previousElementSibling);
        }
        else if (direction === 1 && span.nextElementSibling) {
            td.insertBefore(span, span.nextElementSibling.nextElementSibling)
        }
    };

