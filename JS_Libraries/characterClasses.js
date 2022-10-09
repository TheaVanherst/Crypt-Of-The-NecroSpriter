
const
    mapItem = (id,bool,data) => {
        return Object.keys(data).map((k) => {
            if(bool){return parseInt(data[k][id]);}
            else {return data[k][id];}});};

const clothingData = [16,8], characterArray = [],
    dlcCount = mapItem("dlc",true, characterData),
    characterList = mapItem("name",false, characterData);

let characterRefactor = class currentCharacter {
    headElement = document.querySelector("#head");
    bodyElement = document.querySelector("#body");
    playerElement = document.querySelector("#playerModel");

    constructor(amp, clothing, character) {
        for (let e = 0; e < Math.ceil(clothingData[0] / clothingData[1]); e++) {
            $('#clothing').appendChild(createButton("div"));
            let divS = $('#clothing').getElementsByTagName('div')[e];

            for (let i = 0; i < clothingData[1]; i++) {
                let cur = (clothingData[1] * e) + i;

                divS.appendChild(createButton("e", "", "clothing" + cur))
                    .appendChild(createButton("t", cur + 1));
                divS.children[i].onclick = function () {
                    characterClass.clothingUpdate(cur);}}}

        for (let i = 0; i < Math.max.apply(Math, dlcCount) + 1; i++) {
            $('#characterSelect').appendChild(createButton("t", dlcTypes[i])); //prints what the character is from
            $('#characterSelect').appendChild(createButton("options"));
        } //container for character DLC types

        for (let key in characterData) {
            let currentCharacter = characterList[key];

            $('#characterSelect').getElementsByTagName('options')[dlcCount[key]]
                .appendChild(createButton('e', currentCharacter, currentCharacter)).onclick = function () {

                characterClass.update(key, frame)
                specialItem.characterChange(key)
                $('container.tb3 options e.inv')?.classList?.remove('inv');
                buttonTog(this);}}

        $all("#characterUrl").forEach((e) => {
            e.onkeydown = (a) => {
                bodyUrlSearch(a);};});

        this.clothingSet = clothing;

        frame = 0;
        $("#beatDebug").textContent = 0;
        $("#barDebug").textContent = 1;
        $("#elapsedDebug").textContent = 0;

        this.update(character);
        this.amp(amp);
        this.animate(0);}

    frameArray = [];
    ampArr = [[1,2,3,4],[5,6,11,16]];
    playerFloatOffsets = [8,9,10,11,10,9];
    height; width; head;

    update(character,frame) {
        this.dlc =  characterData[character].dlc;
        this.id = character;

        this.width =    merge(24,    characterData[character]?.settings?.resolution?.width);
        this.height =   merge(24,   characterData[character]?.settings?.resolution?.height);
        this.#bodyOffsets(character);

        characterData[character]?.settings?.floatSequence === true ?
            this.#floatChecks(character, frame): this.#floatDisable(character, frame);

        this.headElement.style.height = this.height + "px";
        this.bodyElement.style.height = this.height + "px";
        this.headElement.style.width = this.width + "px";
        this.bodyElement.style.width = this.width + "px";

        style($("#consumables"))
            .marginTop(Math.floor((24 - this.height) / 2) - 5 + "px")
            .marginLeft(Math.ceil(-(24 - this.width) / 2) + "px");
        $("#shield").style.left = Math.floor(-(24 - (this.width)) / 2) + "px";
        this.amp(this.ampBool);

        this.#clothingChecks(character);
        this.clothingMulti = -this.height * this.clothingSet + 'px ';

        for(let key in itemArray){
            itemArray[key].characterChange(character);}

        $("#" + characterData[character].name).classList.add("inv")
        $("#characterDebug").textContent = characterData[character].name + " ";
        $("#clothingDebug").textContent = this.clothingSet + 1;

        this.animate(frame);};

    #floatChecks(character, frame) {
        this.floatOffsets = [0,0,0,0,0,0];
        let bodyOffset = merge(0, characterData[character]?.settings?.offset?.body);

        let random = Math.floor(Math.random() * 3);
        this.floatOffsets = this.playerFloatOffsets.map((x) => x);
        for (let key in this.floatOffsets){
            this.floatOffsets[key] =
                -(this.floatOffsets[key] + ((24 + bodyOffset) - this.height)) + "px 0 0 " +
                Math.floor((24 - this.width) / 2) + "px";}
        for (let i = 0; i < random; i++) {
            arrayShift(this.floatOffsets);}

        this.floatCycle(frame);};

    #floatDisable(character, frame){
        this.floatOffsets = [0,0,0,0,0,0];
        this.bodyOffset = merge(0, characterData[character]?.settings?.offset?.body);

        for (let key in this.floatOffsets) {
            this.floatOffsets[key] =
                ((24 + this.bodyOffset) - this.height) + "px 0 0 " +
                Math.floor((24 - this.width) / 2) + "px";}
        this.floatCycle(frame);};

    flip(bool) {
        this.playerElement.style.translate =
            bool ? "0 0" : -(Math.floor((24 - this.width) / 2) * 2) + "px 0";}
    //this is dumb and lazy as shit but it's either this or fucking around with the entire animation offset loop.

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
            buttonAdjustment("#clothing",this.clothingSet, $('#clothing' + this.clothingSet));}};

    clothingUpdate(clothing) {
        buttonTog($('#clothing' + this.clothingSet));
        this.clothingSet = clothing;
        this.clothingMulti = -(this.height * clothing) + 'px';
        buttonTog($('#clothing' + this.clothingSet));

        if(characterData[this.id]?.clothingData?.clothing === this.clothingSet + 1){
            characterData[this.id]?.clothingData?.floatSequence ? this.#floatChecks(this.id, frame) : null

            this.headElement.classList.add("invisible")}
        else {
            this.#floatDisable(this.id, frame)
            this.headElement.classList.remove("invisible")}

        $("#clothingDebug").textContent = clothing;
        this.animate(frame);};

    animate(frame) {
        this.bodyElement.style.objectPosition = this.frameArray[frame] + this.clothingMulti;
        this.headElement.style.objectPosition = this.frameArray[frame] + '0';};

    floatCycle(frame) {
        this.playerElement.style.margin = this.floatOffsets[frame];};

    urlUpdate(url) {
        url = merge(characterArray[this.id]?.[1], url, characterData[this.id].settings.fileUrl)
        let srcLink = (this.dlc !== 2 ? ["_heads", "_armor_body"] : ["_head", "_body"])
            .map(i => i + ".png?" + new Date().getTime());
        characterArray[this.id] = [characterData[this.id].name,url];

        this.head ? this.headElement.src = url + srcLink[0] : null;
        this.bodyElement.src = url + srcLink[1];
        this.src = url + ".png";

        $("#characterUrl").placeholder = url;
        $("#characterUrl").value = "";};

    amp(bool) {
        let multiplierGrab = [],
            arrayReader;

        if(characterData[this.id]?.settings?.amp === false){
            this.ampBool = false;
            amplifiedButton.setAttribute('class', "deact");}
        else {
            this.ampBool = bool;
            amplifiedButton.setAttribute('class', this.ampBool ? "inv": "");}

        arrayReader = this.ampBool ? 1 : 0;

        for (let i = 0; i < 16; i++) {
            multiplierGrab[i] = -(this.width * i) + 'px ';}
        for(let i = 0; i < 4; i++) {
            this.frameArray[i] = multiplierGrab[this.ampArr[arrayReader][i] - 1];}};
}
