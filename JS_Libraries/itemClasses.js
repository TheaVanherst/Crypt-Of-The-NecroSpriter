const
    defaultVerticalOffsets = {
        torch: {sequence: [1, 4, 3, 2]},
        charm: {sequence: [1, 2, 3, 2]},
        shovel: {offset:{sequence: [2, 1, 0, 1]}}};

let itemArray = [],
    urlArray = [];

const itemRefactor = class items {
    width = 24;
    height = 24;

    constructor(item, character, f) {
        this.name = itemData[item].name;
        this.src = itemData[item].url + ".png";
        this.id = item;

        urlArray[item] = [this.name, this.src]
        this.element = $("#" + this.name);
        this.element.src = this.src;
        this.button = $('#' + this.name + "Button");

        if (itemData[item].bool) {
            this.button.classList.add('inv');
            this.element.classList.remove('invisible');}
        else {
            this.element.classList.add("invisible");}

        this.button.onclick = () => {
            buttonTog(this.button);
            this.element.classList.toggle('invisible');
            this.element.src = this.src + "?" + new Date().getTime();}

        this.urlUpdate(itemData[item].url);
        this.characterChange(character, f);}

    characterChange(character, f) {
        if(characterData[character][this.name]?.bool === false) {
            this.element.classList.add("invisible");
            this.button.setAttribute("class","deact");}
        else {
            this.button.classList.remove("deact");}

        if(characterData[character][this.name]?.offset?.sequence === undefined){
            this.animationSequence = merge(
                defaultVerticalOffsets[this.name]?.sequence,
                characterData[character][this.name]?.sequence,
                [1,2,3,4])}
        else {
            this.animationSequence = merge([1,1,1,1],
                defaultVerticalOffsets[this.name]?.sequence)}
        this.verticalSequence = merge(
            defaultVerticalOffsets[this.name]?.offset?.sequence,
            characterData[character][this.name]?.offset?.sequence,
            [0,0,0,0]);

        let flipOffset = 0;
        if(characterData[character][this.name]?.flip === true){
            this.element.classList.add("flip");
            flipOffset = 0.5;}
        else {
            this.element.classList.remove("flip");}

        this.multiplier = []
        for (let i = 0; i < 4; i++){
            this.multiplier[i] = (this.animationSequence[i] - 1) * this.width - flipOffset}

        this.element.style.marginTop =
            characterData[character]?.[this.name]?.offset?.top ?
                characterData[character][this.name].offset.top + "px" : 0;
        this.element.style.marginLeft =
            characterData[character]?.[this.name]?.offset?.left ?
                characterData[character][this.name].offset.left + "px" : 0;

        this.animate(f);};

    animate(f) {
        this.element.style.objectPosition = -this.multiplier[f] + "px " + this.verticalSequence[f] + "px"};

    urlUpdate(url, date) {
        if(url !== undefined) {
            urlArray[this.id][1] = url;
            $("#" + this.name + "Url").placeholder = url;
            $("#" + this.name + "Url").value = "";
            this.element.src = url + ".png?";}
        else if (this.src !== undefined) {
            this.element.src = urlArray[this.id][1] + ".png?" + date;
            $("#" + this.name + "Url").placeholder = urlArray[this.id][1];
            $("#" + this.name + "Url").value = "";
        } else {
            $("#" + this.name + "Url").placeholder = "No data";
            $("#" + this.name + "Url").value = "";}};
};

let consumableData = [];
const equipmentOffsets = [
    [0,1,1,2,2,1],
    [0,1,2,2,1,1],
    [0,1,1,2,1,0]];

const consumableRefactor = class items {
    constructor(item, f) {
        this.src = itemData[item].url + ".png";
        this.name = itemData[item].name;
        this.id = item;

        this.element = $("#" + this.name);
        this.element.src = this.src;
        this.button = $('#' + this.name + "Button");

        urlArray[item] = [this.name, this.src];
        if (itemData[item].bool) {
            this.button.classList.add('inv');
            this.element.classList.remove('invisible');}
        else {
            this.element.classList.add("invisible");}

        this.button.onclick = () => {
            buttonTog(this.button);
            this.element.classList.toggle('invisible');
            this.element.src = this.src + "?" + new Date().getTime();}

        this.#offsetAdjustment()
        this.urlUpdate(this.src, f)
        this.animate(f);};

    animate(f) {
        this.element.style.top = this.floatOffsets[f];};

    #offsetAdjustment() {
        this.height = this.element.naturalHeight;
        let random = Math.floor(Math.random() * 3);
        this.floatOffsets = equipmentOffsets[random].map((x) => x);

        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            arrayShift(this.floatOffsets);}
        for (let key in this.floatOffsets) {
            this.floatOffsets[key] = (this.floatOffsets[key] - (this.height / 2)) + "px";}}

    urlUpdate(url, date){
        if(url !== undefined) {
            urlArray[this.id][1] = url;
            $("#" + this.name + "Url").placeholder = url;
            $("#" + this.name + "Url").value = "";

            this.src = url;
            this.element.src = this.src;}
        else if (this.src !== undefined) {
            this.element.src = urlArray[this.id][1] + ".png?" + date;
            $("#" + this.name + "Url").placeholder = urlArray[this.id][1];
            $("#" + this.name + "Url").value = "";
        } else {
            $("#" + this.name + "Url").placeholder = "No data";
            $("#" + this.name + "Url").value = "";}

        this.#offsetAdjustment()

        this.top = this.floatOffsets[frame] + 'px';
        this.src = url;};
};

const specialRefactor = class items {
    name = "special";

    constructor(character, f) {
        this.element = $("#" + this.name);
        this.button = $('#' + this.name + "Button");

        if (characterData[character]?.[this.name]?.bool) {
            this.button.classList.add('inv');
            this.element.classList.remove('invisible');}
        else {
            this.element.classList.add("invisible");}

        this.button.onclick = () => {
            buttonTog(this.button);
            this.element.classList.toggle('invisible');
            this.urlUpdate()
            this.element.src = this.src + "?" + new Date().getTime();}

        this.characterChange(character, f);}

    floatOffsets = [];

    characterChange(character, f) {
        this.disabled = merge(false, characterData[character]?.[this.name]?.bool);
        let floatBool = merge(false, characterData[character]?.[this.name]?.displacement?.float)
        let margintop = merge(0, characterData[character]?.[this.name]?.displacement?.top);

        if(floatBool){
            let random = Math.floor(Math.random() * 3);
            this.floatOffsets = equipmentOffsets[random].map((x) => x + margintop + "px");
        } else {
            for (let i = 0; i < 6; i++){
                this.floatOffsets[i] = margintop + "px"}}

        if (!this.disabled) {
            this.multiplier = [0,0,0,0];
            this.verticalSequence = [0,0,0,0];

            this.element.classList.add("invisible");
            this.button.setAttribute("class","deact");}
        else {
            let sequence = merge([1,2,3,4], characterData[character]?.[this.name]?.sequence),
                scale = [
                    characterData[character]?.[this.name]?.transform?.scaleY,
                    characterData[character]?.[this.name]?.transform?.scaleX];

            let width = merge(0, characterData[character]?.[this.name]?.resolution?.width);
            this.element.style.height = characterData[character]?.[this.name]?.resolution.height + "px";
            if (characterData[character]?.[this.name]?.transform) {
                this.element.style.transform = "scale(" + scale[0] + ", " + scale[1] + ")";
                this.element.style.width = width + 0.5 + "px";}
            else {
                this.element.style.transform = "none";
                this.element.style.width = width + "px";}

            this.element.style.marginLeft = merge(0, characterData[character]?.[this.name]?.displacement?.left + "px");
            this.element.style.zIndex =     merge(10, characterData[character]?.[this.name]?.zIndex);

            this.multiplier = [
                -(sequence[0] - 1) * width + "px 0", -(sequence[1] - 1) * width + "px 0",
                -(sequence[2] - 1) * width + "px 0", -(sequence[3] - 1) * width + "px 0"];

            this.verticalSequence = merge([1,1,1,1],characterData[character]?.[this.name]?.displacement?.sequence);
            this.verticalSequence = this.verticalSequence.map((x) => x)
            for (let key in this.verticalSequence){this.verticalSequence[key] = -this.verticalSequence[key] + "px";}

            this.animate(f);
            this.button.classList.remove("deact");}

        this.urlUpdate(character);}

    animate(f) {
        this.element.style.objectPosition = this.multiplier[f];
        this.element.style.top = this.verticalSequence[f];}

    animateFloat(f) {
        this.element.style.marginTop = this.floatOffsets[f];};

    urlUpdate(character) {
        let src = merge(urlArray[8]?.[1], characterData[character]?.[this.name]?.fileUrl);

        if (src) {
            this.src = src + ".png?" ;
            urlArray[8] = ["special", this.src];

            $("#" + this.name + "Url").placeholder = this.src;
            $("#" + this.name + "Url").value = "";

            $("#" + this.name + "Url").classList.remove("deact");
            this.element.src = this.src + new Date().getTime(); }
        else {
            urlArray[8] = ["special",""];
            $("#" + this.name + "Url").placeholder = "Not Applicable";

            $("#" + this.name + "Url").classList.add("deact");
            this.element.removeAttribute('src');}
    };
};

const shieldRefactor = class items {
    id = 12; //dedicated slot in the url array chart.

    constructor(rotation, bool) {
        //general setup to save time later.
        this.button = $("#shieldButton");
        this.element = $('#shield');

        //url updating
        let src = itemData[this.id].url;
        this.src = src + ".png";
        $("#shieldUrl").placeholder = src;
        this.element.src = this.src;

        //shield visibly (based on startUp.js)
        $('#shieldButton').setAttribute("class", bool ? "inv" : "");
        this.element.setAttribute("class", !bool ? "invisible" : "");

        //creates the buttons on startup.
        let positionData = ["up","down","right"];
        positionData.forEach(i => {
            $('#shieldSettings').appendChild(
                createButton("e",i,"shield" + i)
            ).onclick = (e) => {
                this.positionUpdate(e.target.outerText);
            };
        });
        //sets rotational data (based on startUp.js)
        if (positionData.indexOf(rotation) > 0) {
            this.currentPos = rotation;}
        $("#shield" + rotation).classList.add("inv");
        this.element.classList.add(rotation);

        // binds the toggle button to refresh the url
        this.button.onclick = () => {
            buttonTog(this.button);
            this.element.classList.toggle('invisible');
            $("#shield" + this.currentPos).classList.add("inv");
            this.element.classList.remove("inv");

            this.urlUpdate();
        };
    }

    positionUpdate(rotation) {
        $("#shieldButton").classList.add("inv");
        this.element.setAttribute("class",rotation);

        $("#shield" + this.currentPos).classList.remove("inv");
        this.currentPos = rotation;
        $("#shield" + this.currentPos).classList.add("inv");};

    urlUpdate(){
        let src = merge($("#shieldUrl").value, this.src);
        if(src !== this.src){
            this.src = src;
            urlArray[this.id] = ["shield",this.src];

            $("#shieldUrl").placeholder = this.src;
            $("#shieldUrl").value = "";
            this.element.src = this.src + "?" + new Date().getTime();
        }
    };
};