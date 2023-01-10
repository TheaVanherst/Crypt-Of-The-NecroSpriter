const
    mapItem = (id,bool,data) => {
        return Object.keys(data).map((k) => {
            if(bool){return parseInt(data[k][id]);}
            else {return data[k][id];}});};

const
    clothingData = [15,8], characterArray = [],
    dlcCount =      mapItem("dlc",true, characterData),
    characterList = mapItem("name",false, characterData);

let characterRefactor = class setup {
    headElement =   document.querySelector("#head");
    bodyElement =   document.querySelector("#body");
    playerElement = document.querySelector("#playerModel");

    constructor(amp, clothing, character) {
        for (let e = 0; e < Math.ceil(clothingData[0] / clothingData[1]); e++) {
            $('#clothing').appendChild(createButton("div"));
            let divS = $('#clothing').children[e];

            for (let i = 0; i < clothingData[1]; i++) {
                let cur = (clothingData[1] * e) + i;
                if(cur < clothingData[0]){
                    divS.appendChild(createButton("e", "", "clothing" + cur))
                        .appendChild(createButton("t", cur + 1));
                    divS.children[i].onclick = () => {
                        this.clothingUpdate(cur);
                    };
                }
            }
        }



        for (let i = 0; i < Math.max.apply(Math, dlcCount) + 1; i++) {
            ($('#characterSelect').appendChild(createButton("t", dlcTypes[i]))) //prints what the character is from
                .appendChild(createButton("options"));} //container for character DLC types

        for (let key in characterData) {
            let char = characterList[key];

            $('#characterSelect').getElementsByTagName('options')[dlcCount[key]]
                .appendChild(createButton('e', char, char)).onclick = () => {
                this.update(key);
                specialData.characterChange(key);}}

        $all("#characterUrl").forEach((e) => {
            e.onkeydown = (a) => {
                if(e.key === 'Enter') {
                    let item = e.target.value,
                        image = new Image();
                        image.src = item + (currentCharacter.dlc !== 2 ? "_armor_body.png" : "_body.png");
                        image.onload = () => {
                            currentCharacter.urlUpdate(item);
                            return;
                        }

                    targetTimeout(e);
                }};
        });

        this.clothingSet =  clothing;
        this.ampBool =      amp;
        this.flipped =      false;

        this.update(character, amp);
    }

    frameArray = [];
    ampArr = [[1,2,3,4],[5,6,11,16]];
    playerFloatOffsets = [8,9,10,11,10,9];
    height; width; head;

    update(character) {
        $("#" + this.name)?.classList.remove("inv");

        this.id =   character;
        this.name = characterData[character].name;
        this.dlc =  characterData[character].dlc;

        this.width =  merge(24, characterData[character]?.settings?.resolution?.width);
        this.height = merge(24, characterData[character]?.settings?.resolution?.height);
        this.#bodyOffsets(character);

        characterData[character]?.settings?.floatSequence === true ?
            this.#floatChecks(frame): this.#floatDisable(character, frame);

        this.headElement.style.height = this.height + "px";
        this.bodyElement.style.height = this.height + "px";
        this.headElement.style.width = this.width + "px";
        this.bodyElement.style.width = this.width + "px";

        style($("#consumables"))
            .marginTop(Math.floor((24 - this.height) / 2) - 5 + "px")
            .marginLeft(Math.ceil(-(24 - this.width) / 2) + "px");
        $("#shield").style.left = Math.floor(-(24 - (this.width)) / 2) + "px";

        this.characterAmp = merge(true, characterData[this.id]?.settings?.amp)
        this.ampFrameUpdate();

        this.#clothingChecks(character);
        this.clothingMulti = -this.height * this.clothingSet + 'px ';
        for(let key in itemArray){
            itemArray[key].characterChange(character);}

        $("#" + this.name).classList.add("inv");
        $("#characterDebug").textContent = this.name + " ";
        $("#clothingDebug").textContent = this.clothingSet + 1;

        this.#debugUpdate(character);
        this.flip()
        this.animate(frame);
    };

    #debugUpdate(e){
        if(currentCharacter){
            let returnString
            let database = Object.entries(characterData[e]);
            database.forEach(([key, value]) => {
                let data = JSON.stringify(value)
                returnString += key + " : " + data + "\n"; // 'one'
            });
            $("#charDebug").innerText = returnString;
        }
    }

    #floatChecks(frame) {
        this.floatOffsets = [0,0,0,0,0,0];
        let bodyOffset = merge(0, characterData[this.name]?.settings?.offset?.body);

        let random = Math.floor(Math.random() * 3);
        this.floatOffsets = this.playerFloatOffsets.map((x) => x);
        for (let key in this.floatOffsets) {
            this.floatOffsets[key] =
                -(this.floatOffsets[key] + ((24 + bodyOffset) - this.height)) + "px 0 0 " +
                Math.floor((24 - this.width) / 2) + "px";
        }
        for (let i = 0; i < random; i++) {
            arrayShift(this.floatOffsets);
        }

        this.floatCycle(frame);};

    #floatDisable(character, frame){
        this.floatOffsets = [0,0,0,0,0,0];
        this.bodyOffset = merge(0, characterData[character]?.settings?.offset?.body);

        for (let key in this.floatOffsets) {
            this.floatOffsets[key] =
                ((24 + this.bodyOffset) - this.height) + "px 0 0 " +
                Math.floor((24 - this.width) / 2) + "px";}
        this.floatCycle(frame);
    };

    flipped = false;

    flip() {
        if(!this.flipped){
            this.playerElement.setAttribute("class", "");
            this.playerElement.style.translate = "0 0";}
        else {
            this.playerElement.setAttribute("class", "mirror");
            this.playerElement.style.translate = -(Math.floor((24 - this.width) / 2) * 2) + "px 0";}};

    flipToggle() {
        this.flipped = !this.flipped;
        this.flip();}

    #bodyOffsets(character) {
        if (characterData[character].settings?.head === false) {
            this.head = false;
            this.headElement.classList.add("invisible");}
        else {
            this.head = true;
            let headOffset = -(merge(0, characterData[character]?.settings?.offset?.head));
            this.headElement.style.top = headOffset + "px";
            this.headElement.classList.remove("invisible");}

        this.urlUpdate();};

    #clothingChecks(character) {
        let rows = merge(14, characterData[character]?.settings?.resolution?.rows);
        for (let i = 0; i < clothingData[0]; i++) {
            $('#clothing' + i).setAttribute('class', i < rows ? "" : "deact");}

        if (this.clothingSet > rows - 1) {
            this.clothingSet = 0;
            buttonTog($('#clothing' + this.clothingSet));}
        else {
            buttonAdjustment("#clothing",this.clothingSet, $('#clothing' + this.clothingSet));}
    };

    clothingUpdate(clothing) {
        this.clothingSet = clothing;
        this.clothingMulti = -(this.height * clothing) + 'px';

        buttonTog($('#clothing .inv'));
        buttonTog($('#clothing' + this.clothingSet));

        if(characterData[this.id]?.clothingData?.clothing === this.clothingSet + 1){
            characterData[this.id]?.clothingData?.floatSequence ? this.#floatChecks(frame) : null;
            this.headElement.classList.add("invisible");
        } else {
            this.#floatDisable(this.id, frame);
            this.headElement.classList.remove("invisible");
        }

        $("#clothingDebug").textContent = clothing;
        this.animate(frame);};

    animate(frame) {
        this.bodyElement.style.objectPosition = this.frameArray[frame] + this.clothingMulti;
        this.headElement.style.objectPosition = this.frameArray[frame] + '0';};

    floatCycle(frame) {
        this.playerElement.style.margin = this.floatOffsets[frame];};

    urlUpdate(url) {
        url = merge(characterArray[this.id]?.[1], url, characterData[this.id].settings.fileUrl);
        let srcLink = (this.dlc !== 2 ? ["_heads", "_armor_body"] : ["_head", "_body"])
            .map(i => i + ".png?" + new Date().getTime());
        characterArray[this.id] = [characterData[this.id].name,url];

        this.head ? this.headElement.src = url + srcLink[0] : null;
        this.bodyElement.src = url + srcLink[1];
        this.src = url + ".png";

        $("#characterUrl").placeholder = url;
        $("#characterUrl").value = "";};

    ampToggle() {
        if (this.characterAmp === false) {
            this.ampBool = false;
            amplifiedButton.setAttribute('class', "deact");}
        else {
            this.ampBool = !this.ampBool;
            amplifiedButton.setAttribute('class', this.ampBool ? "inv" : "");}
        this.ampFrameUpdate()}

    ampFrameUpdate() {
        let multiplierGrab = [];
        for (let i = 0; i < 16; i++) {
            multiplierGrab[i] = -(this.width * i) + 'px ';}
        for(let i = 0; i < 4; i++) {
            this.frameArray[i] = multiplierGrab[this.ampArr[this.ampBool ? 1 : 0][i] - 1];}
        this.animate(frame);};
}
