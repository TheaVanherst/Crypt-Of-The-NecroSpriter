
let characterRefactor = class setup {
    headElement =   document.querySelector("#head");
    bodyElement =   document.querySelector("#body");
    playerElement = document.querySelector("#playerModel");

    frameArray = [];

    height; width; head;
    characterUrlArray = [];

    constructor(amp, clothing, character) {
        let dlcTypes =      ["Base Game", "Amplified", "Synchrony"];
        this.clothingData = [15,8];

        for (let e = 0; e < Math.ceil(this.clothingData[0] / this.clothingData[1]); e++) {
            let row = createButton("div");
                row.classList.add("flex");

            for (let i = 0; i < this.clothingData[1]; i++) {
                let cur = (this.clothingData[1] * e) + i;
                if (cur < this.clothingData[0]) {
                    let buttonElem = createButton("e", cur + 1, "clothing" + cur);
                        buttonElem.classList.add("tog");
                        buttonElem.classList.add('flippant');
                        buttonElem.onclick = () => {
                            this.clothingUpdate(cur);
                    };
                    row.appendChild(buttonElem);
                }
            }
            $('#clothing').appendChild(row);
        }

        let dlcCount = this.#parser("dlc",true, characterData);
        for (let i = 0; i < Math.max.apply(Math, dlcCount) + 1; i++) {
            let dlcSet = createButton("div");
                dlcSet.appendChild(createButton("d", dlcTypes[i]));
            $('#characterSelect').appendChild(dlcSet);
        }

        const characterList = this.#parser("name",false, characterData);
        let rowKey = 0, countKey = 0;
        for (let i in characterData) {

            let dlcElementPre = $('#characterSelect').children[dlcCount[i]];
            if(!dlcElementPre.children[rowKey]) {
                rowKey = 0;
                countKey = 0;}
            if (countKey % 2 === 0){
                let rowContainer = createButton("div");
                    rowContainer.classList.add("flex");
                dlcElementPre.appendChild(rowContainer);
                rowKey += 1;}

            // character selection buttons
            let char = characterList[i];

            let buttonElem = createButton('e', char, char);
                buttonElem.classList.add('tog');
            dlcElementPre.children[rowKey].appendChild(buttonElem)
                .onclick = () => {
                    this.update(i);
                    specialData.characterChange(i);
            };
            countKey++;
        }

        $all("#characterUrl").forEach((e) => {
            e.onkeydown = (e) => {
                if(e.key === 'Enter') {
                    let item = e.target.value,
                        image = new Image();
                    image.src = item + (currentCharacter.dlc !== 2 ? "_armor_body.png" : "_body.png");
                    image.onload = () => {
                        currentCharacter.urlUpdate(item);
                    };
                    image.onerror = () => {
                        targetTimeout(e);
                    }
                }
            };
        });

        this.clothingSet =  clothing;
        this.ampTog =       amp;
        this.flipped =      false;

        this.update(character);
    };

    update(character) {
        $("#" + this.name)?.classList.remove("pressed");

        this.id =   character;
        this.name = characterData[character].name;
        this.dlc =  characterData[character].dlc;

        this.width =  characterData[character]?.settings?.resolution?.width ?? 24;
        this.height = characterData[character]?.settings?.resolution?.height ?? 24;
        this.#bodyOffsets(character);

        characterData[character]?.settings?.floatSequence ? this.#floatChecks() : this.#floatDisable(character);

        this.amp = characterData[character]?.settings?.amp ?? true;
        this.ampToggle();

        this.headElement.style.height =     this.height + "px";
        this.bodyElement.style.height =     this.height + "px";
        this.headElement.style.width =      this.width + "px";
        this.bodyElement.style.width =      this.width + "px";

        $("#consumables").style.marginTop = `${Math.ceil((24 - this.height) / 2) - 5}px`;
        $("#shield").style.left =           `${Math.floor(-(24 - (this.width)) / 2)}px`;

        this.#clothingChecks(character);
        this.clothingMulti = `${-this.height * this.clothingSet}px `;
        itemArray.map(x => x.characterChange(character));

        $(`#${this.name}`).classList.add("pressed");
        $("#characterDebug").textContent =  `${this.name} `;
        $("#clothingDebug").textContent =   this.clothingSet + 1;

        this.#debugUpdate(character);
        this.flip();
        this.animate();
    };

    #parser(id,bool,data){
        return Object.keys(data).map((k) => {
            return bool ? parseInt(data[k][id]) : data[k][id]});
    };

    #debugUpdate(e){
        let returnString = "";
        Object.entries(characterData[e])
            .forEach(([key, value]) => {
                let data = JSON.stringify(value);
                returnString += key + "  [" + data + "]";
            });
        $("#charDebug").innerText = returnString;
    };

    #floatChecks() {
        let floatOffsets = [8,9,10,11,10,9],
            bodyOffset = characterData[this.name]?.settings?.offset?.body ?? 0;

        this.floatOffsets = floatOffsets.map(x => `${-(x + ((24 + bodyOffset) - this.height))}px 0px 0px ${Math.floor((24 - this.width) / 2)}px`);
        for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
            arrayShift(this.floatOffsets);
        }
    };

    floatOffsets = [0,0,0,0,0,0];

    #floatDisable(character){
        this.bodyOffset = characterData[character]?.settings?.offset?.body ?? 0;
        this.floatOffsets = this.floatOffsets.map(() => `${((24 + this.bodyOffset) - this.height)}px 0px 0px ${Math.ceil((24 - this.width) / 2)}px`);
    };

    flipped = false;

    flip(bool) {
        if (bool) this.flipped ^= true;

        if(!this.flipped){
            $("#mirror").classList.remove("pressed");
            this.playerElement.classList.remove("mirror");
            this.playerElement.style.translate = "0 0";
        } else {
            $("#mirror").classList.add("pressed");
            this.playerElement.classList.add("class", "mirror");
            this.playerElement.style.translate = `${-(Math.floor(24 - this.width))}px 0"`;
        }
    };

    frameType() {
        $("#aniType").classList.toggle('pressed');
        aniOffsets.unshift(aniOffsets.pop());
        arrayDivisional = 1000 / aniOffsets[0].length;
    };

    #bodyOffsets(character) {
        if (characterData[character].settings?.head === false) {
            this.head = false;
            this.headElement.classList.add("invisible");
        } else {
            this.head = true;
            let headOffset = -(characterData[character]?.settings?.offset?.head ?? 0);
            this.headElement.style.top = headOffset + "px";
            this.headElement.classList.remove("invisible");
        }

        this.urlUpdate();
    };

    #clothingChecks(character) {
        let rows = characterData[character]?.settings?.resolution?.rows ?? 14;
        for (let i = 0; i < this.clothingData[0]; i++) {
            if(i < rows){
                $('#clothing' + i).classList.remove("deactivate");
            } else {
                $('#clothing' + i).classList.remove("pressed");
                $('#clothing' + i).classList.add("deactivate");
            }
        }

        if (this.clothingSet > rows - 1) {
            this.clothingSet = 0;
            $('#clothing0').classList.toggle('pressed');
        } else {
            $(`#clothing${this.clothingSet}`).classList.add('pressed');
        }
    };

    clothingUpdate(clothing) {
        this.clothingSet = clothing;
        this.clothingMulti = -(this.height * clothing) + 'px';
        
        $('#clothing .pressed')?.classList?.toggle('pressed');
        $('#clothing' + this.clothingSet).classList.toggle('pressed');

        if(characterData[this.id]?.clothingData?.clothing === this.clothingSet + 1) {
            characterData[this.id]?.clothingData?.floatSequence ? this.#floatChecks(frame) : null;
            this.headElement.classList.add("invisible");
        } else {
            this.#floatDisable(this.id);
            this.headElement.classList.remove("invisible");
        }

        $("#clothingDebug").textContent = clothing;
        this.animate();
    };

    animate() {
        this.bodyElement.style.objectPosition = this.frameArray[frame] + this.clothingMulti;
        this.headElement.style.objectPosition = this.frameArray[frame] + '0';
        this.playerElement.style.margin =       this.floatOffsets[floatInt];
    };

    urlUpdate(url) {
        url = url ?? this.characterUrlArray[this.id]?.[1] ?? characterData[this.id]?.settings?.fileUrl;

        let srcLink = (this.dlc !== 2 ? ["_heads","_armor_body"] : ["_head","_body"]).map(i => i + ".png?" + new Date().getTime());
        this.characterUrlArray[this.id] = [characterData[this.id].name,url];

        this.head ? this.headElement.src = url + srcLink[0] : null;
        this.bodyElement.src = url + srcLink[1];
        this.src = url + ".png";

        let charUrl = $("#characterUrl");
            charUrl.placeholder = url;
            charUrl.value = "";
    };

    ampToggle(bool) {
        if (!this.amp) {
            this.ampTog = false;
            $("#amplifiedButton").setAttribute('class', "deactivate");
        } else {
            if (bool) this.ampTog ^= true;
            let ampButton = $("#amplifiedButton")
                ampButton.classList.remove('deactivate');
                ampButton.classList.toggle('pressed', this.ampTog);
        }
        this.ampFrameUpdate();
    };

    ampFrameUpdate() {
        let ampTog = this.ampTog ? 1 : 0,
            ampArr = [[0,0,0,0],[1,1,2,3]],
            ampMultiplier = characterData[this.id]?.settings?.ampMultiplier ?? 1;

        for (let i = 0; i < 4; i++) {
            this.frameArray[i] = -(i + (ampMultiplier * (4 * ampArr[ampTog][i]))) * this.width + "px ";}

        this.animate();
    };
}
