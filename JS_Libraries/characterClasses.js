
let characterRefactor = class setup {
    headElement =   document.querySelector("#head");
    bodyElement =   document.querySelector("#body");
    playerElement = document.querySelector("#playerModel");

    frameArray = [];

    height;
    width;
    headBool;
    characterUrlArray = [];

    constructor(clothing, defaultCharacter, amplifiedTog, headVis) {
        let clothingSetLengths =    characterData.map(x => x?.settings?.resolution?.rows ?? 14);
        this.clothingSets =         Math.max(...clothingSetLengths);
        let clothingDivisional =    Math.ceil((this.clothingSets / 2));

        for (let e = 0; e < Math.ceil(this.clothingSets / clothingDivisional); e++) {
            let row = document.createElement("div");
                row.classList.add("flex");

            for (let i = 0; i < clothingDivisional; i++) {
                let pos = (clothingDivisional * e) + i;
                if (pos < this.clothingSets) {
                    const
                        buttonElement =                document.createElement("e")
                        buttonElement.textContent =    pos + 1;
                        buttonElement.id =             `clothing${pos}`;

                        buttonElement.classList.add("tog");
                        buttonElement.classList.add('flippant');
                        buttonElement.onclick = () => {
                            this.clothingUpdate(pos);
                        };
                    row.appendChild(buttonElement);
                }
            }
            $('#clothing').appendChild(row);
        }

        for (let i = 0; i < dlcTypes.length; i++) {
            const
                dlcContainer = document.createElement("div")
                dlcContainer.id = dlcTypes[i];
            const
                titleElement = document.createElement("div");
                titleElement.textContent = dlcTypes[i];
            dlcContainer.appendChild(titleElement);

            $('#characterSelect').appendChild(dlcContainer);
        }

        let currentRow = 0, currentCol = 0;
        for (let i in characterData) { // generates character buttons
            const dlcContainer = $('#characterSelect').children[characterData[i].dlc];

            if(!dlcContainer.children[currentRow]) { // checks if new row.
                currentRow =    0;
                currentCol =    0;
            }

            if (currentCol % 2 === 0){ // generates button rows
                const
                    rowContainer = document.createElement("div");
                    rowContainer.classList.add("flex");
                dlcContainer.appendChild(rowContainer);

                currentRow +=   1;
            }

            const character = characterData[i].name;

            const
                buttonElem =                document.createElement("e");
                buttonElem.textContent =    character;
                buttonElem.id =             character;
                buttonElem.classList.add('tog');

            dlcContainer.children[currentRow].appendChild(buttonElem)
                .onclick = () => {
                    this.update(i);
                    specialData.characterChange(i);
            };
            currentCol++;
        }

        $all("#characterUrl").forEach(e => {
            e.onkeydown = e => {
                if(e.key === 'Enter') {
                    const item =    e.target.value,
                        image =     new Image();
                    image.src =     item + (currentCharacter.dlc !== 2 ? "_armor_body.png" : "_body.png");
                    image.onload = () => {
                        currentCharacter.urlUpdate(item);
                    };
                    image.onerror = () => {
                        targetTimeout(e);
                    };
                }
            };
        });

        this.clothingSet =  clothing;
        this.ampTog =       amplifiedTog;
        this.flipped =      false;

        this.update(defaultCharacter);
        if (headVis) this.headToggle();
    };

    update(character) {
        if (this.id === character) {
            character = 0;
        }

        $(`#${this.name}`)?.classList.remove("pressed");

        this.id =       character;
        this.name =     characterData[this.id].name;
        $("#characterDebug").textContent =  `${this.name} `;

        this.headExt =  characterData[this.id].settings.headExt ??  "_heads";
        this.bodyExt =  characterData[this.id].settings.bodyExt ??  "_armor_body";

        this.width =    characterData[this.id]?.settings?.resolution?.width ??  24;
        this.height =   characterData[this.id]?.settings?.resolution?.height ?? 24;

        this.amp =      characterData[this.id]?.settings?.amp ??    true;
        this.ampToggle();

        $('#fShadow').classList.toggle("invisible",
            !(!!characterData[this.id]?.special?.shadow && !($(`#special`).classList.contains("invisible"))));
        // this is a fallback to check for a shadow in a more objective state, as I don't have anything to
        // check the current active character, so it's just dumped here instead.

        this.headElement.style.height =     this.bodyElement.style.height = `${this.height}px`;
        this.headElement.style.width =      this.bodyElement.style.width =  `${this.width}px`;

        $("#consumables").style.marginTop = `${Math.ceil((24 - this.height) / 2) - 5}px`;
        $("#shield").style.left =           `${Math.floor(-(24 - (this.width)) / 2)}px`;

        this.#clothingChecks();
        this.clothingMulti =                `${-this.height * this.clothingSet}px `;
        $("#clothingDebug").textContent =   this.clothingSet + 1;

        itemArray.map(x => x.characterChange(this.id));
        $(`#${this.name}`).classList.add("pressed");

        this.uniqueChecks();
        this.#bodyOffsets();
        this.#headArmourOffset();

        // debug update
        let returnString = "";
        Object.entries(characterData[this.id])
            .forEach(([key, value]) => {
                returnString += `${key} [${JSON.stringify(value)}]`;
            });
        $("#charDebug").innerText = returnString;

        this.flip();
        this.animate();
    };

    flipped = false;

    flip(bool) {
        if (bool) this.flipped ^= true;

        if(!this.flipped){
            $("#mirror").classList.remove("pressed");
            this.playerElement.classList.remove("mirror");
            this.playerElement.style.translate = "0 0";
        }
        else {
            $("#mirror").classList.add("pressed");
            this.playerElement.classList.add("class", "mirror");
            this.playerElement.style.translate = `${-(Math.floor(24 - this.width))}px 0`;
        }
    };

    frameLinear = true;

    frameType() {
        $("#aniType").classList.toggle('pressed', !this.frameLinear);  // button tog
        aniOffsets.unshift(aniOffsets.pop());             // flips array set
        arrayDivisional = 1000 / aniOffsets[0].length;    // precalcs for frame divisional render calc

        // dumb way to indicate frame render types via debug.
        $("#fTypeDebug").textContent = this.frameLinear ? "Lin" : "Dyn";
        this.frameLinear = !this.frameLinear;
    };

    #bodyOffsets() {
        if (characterData[this.id].settings?.head === false) {
            this.headBool = false;
            this.headElement.classList.add("invisible");
            $("#headToggleButton").setAttribute('class','deactivate');
            this.headVisibility = false;
        }
        else {
            if (!(characterData[this.id]?.clothingData?.[this.clothingSet]?.head === false)){
                this.headBool =                 true;
                let headOffset =                -(characterData[this.id]?.settings?.offset?.head ?? 0);
                this.headElement.style.top =    headOffset + "px";

                this.headToggle();
            }
        }

        this.urlUpdate();
    };

    uniqueClothing = []; // cache
    clothingCached = false;

    #clothingChecks() {
        const rows =
            characterData[this.id]?.settings?.resolution?.rows ?? 14;

        for (let i = 0; i < this.clothingSets; i++) {
            if(i < rows){
                $(`#clothing${i}`).classList.remove("deactivate");
            }
            else {
                $(`#clothing${i}`).classList.remove("pressed");
                $(`#clothing${i}`).classList.add("deactivate");
            }
        }

        if (this.clothingSet > rows - 1) {
            this.clothingSet = 0;
            $('#clothing0').classList.add('pressed');
        }
        else {
            $(`#clothing${this.clothingSet}`).classList.add('pressed');
        }
    };

    floatOffsets = ["0px", "0px", "0px", "0px", "0px", "0px"];

    #floatChecks() {
        const bodyOffset =  characterData[this.name]?.settings?.offset?.body ?? 0;

        this.floatOffsets = floatOffsets.map(x =>
            `${-(x + ((24 + bodyOffset) - this.height))}px 0px 0px ${Math.floor((24 - this.width) / 2)}px`);

        for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            arrayShift(this.floatOffsets);
        }
    };

    #floatDisable(){
        this.bodyOffset =       characterData[this.id]?.settings?.offset?.body ?? 0;
        this.floatOffsets =     this.floatOffsets.map(() =>
            `${((24 + this.bodyOffset) - this.height)}px 0px 0px ${Math.ceil((24 - this.width) / 2)}px`);
    };

    uniqueChecks() {
        const uniqueClothingData = characterData[this.id]?.clothingData?.[this.clothingSet] ?? undefined;

        if (!!uniqueClothingData){
            uniqueClothingData?.floatSequence ?
                this.#floatChecks() :
                this.#floatDisable(this.id);

            this.headElement.classList.add("invisible");
            $("#headToggleButton").setAttribute('class','deactivate');
            this.headVisibility = false;

            for (let i in uniqueClothingData?.settings) {
                if (uniqueClothingData.settings[i].bool === false) {
                    console.log("yes")
                        $(`#${uniqueClothingData.settings[i].name}Button`).setAttribute("class","deactivate");
                        $(`#${uniqueClothingData.settings[i].name}`).classList.add('invisible');
                        this.uniqueClothing[i] = uniqueClothingData.settings[i].name;
                    }
            }
            this.clothingCached = true;

        }
        else if (this.uniqueClothing !== [] || this.clothingCached) {
            this.#floatDisable(this.id);
            this.headToggle();

            for (let i in this.uniqueClothing) {
                $(`#${this.uniqueClothing[i]}Button`).classList.remove("deactivate");
                $(`#${this.uniqueClothing[i]}Button`).classList.add("flippant");
            }
            this.uniqueClothing =   [];
            this.clothingCached =   false;
        }
    }

    clothingUpdate(clothing) {
        this.clothingSet =      clothing;
        this.clothingMulti =    `${-(this.height * clothing)}px`;
        
        $('#clothing .pressed')?.classList?.toggle('pressed');
        $(`#clothing${this.clothingSet}`).classList.toggle('pressed');

        this.uniqueChecks();
        this.#bodyOffsets();
        this.#headArmourOffset();

        $("#clothingDebug").textContent = clothing;
        this.animate();
    };

    headArmourOffset = "0px";

    #headArmourOffset() {
        this.clothingSet > 5 ?
            this.headArmourOffset = `${characterData[this.id]?.settings?.resolution?.height ?? 24}px` :
            this.headArmourOffset = `0px`;
    }

    animate() {
        this.bodyElement.style.objectPosition =     this.frameArray[frame] + this.clothingMulti;
        this.headElement.style.objectPosition =     `${this.frameArray[frame]}-${this.headArmourOffset}`;
        this.playerElement.style.margin =           this.floatOffsets[floatInt];
    };

    urlUpdate(url) {
        url =
            url ??
                this.characterUrlArray[this.id]?.[1] ??
                characterData[this.id]?.settings?.fileUrl;

        this.characterUrlArray[this.id] = [characterData[this.id].name,url];

        if (this.headBool)
            this.headElement.src =  `${url}${this.headExt}.png?${new Date().getTime()}`;
        this.bodyElement.src =      `${url}${this.bodyExt}.png?${new Date().getTime()}`;
        this.src =                  `${url}.png`;

        let charUrl =               $("#characterUrl");
            charUrl.placeholder =   url;
            charUrl.value =         "";
    };

    ampToggle(bool) {
        if (!this.amp) {
            this.ampTog = false;
            $("#amplifiedButton").setAttribute('class', "deactivate");
        }
        else {
            if (bool) this.ampTog ^= true;
            let ampButton = $("#amplifiedButton")
                ampButton.classList.remove('deactivate');
                ampButton.classList.toggle('pressed', this.ampTog);
        }
        this.ampFrameUpdate();
    };

    headVisibility = true;
    headToggle() {
        if (this.headBool) {
            $("#headToggleButton").classList.remove("deactivate");
            $("#head").classList.toggle("invisible");
            this.headVisibility = !this.headVisibility;
        } else {
            $("#headToggleButton").classList.toggle("pressed");
        }
    };

    ampFrameUpdate() {
        let ampTog =            this.ampTog ? 1 : 0,
            ampArr =            [[0,0,0,0],[1,1,2,3]],
            ampMultiplier =     characterData[this.id]?.settings?.ampMultiplier ?? 1;

        for (let i = 0; i < 4; i++) {
            this.frameArray[i] =
                `${-(i + (ampMultiplier * (4 * ampArr[ampTog][i]))) * this.width}px `;
        }

        this.animate();
    };
}
