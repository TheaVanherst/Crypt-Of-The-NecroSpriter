const
    defaultVerticalOffsets = {
        torch: {sequence: [1, 4, 3, 2]},
        charm: {sequence: [1, 2, 3, 2]},
        shovel: {offset:{sequence: [2, 1, 0, 1]}}};

let urlArray = [];

const itemRefactor = class items {
    width = 24;
    height = 24;

    constructor(item, character) {
        this.name = itemData[item].name;
        this.src = itemData[item].url + ".png";
        this.id = item;

        urlArray[item] = [this.name, this.src]
        this.element = $("#" + this.name);
        this.element.src = this.src;
        this.button = $('#' + this.name + "Button");

        if (itemData[item].bool) {
            this.button.classList.add('pressed');}
        else {
            this.element.classList.add("invisible");}

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.element.src = this.src + "?" + new Date().getTime();}

        this.urlUpdate(itemData[item].url);
        this.characterChange(character);}

    characterChange(character) {
        if(characterData[character][this.name]?.bool === false) {
            this.element.classList.add("invisible");
            this.button.setAttribute("class","deactivate");}
        else {
            this.button.classList.remove("deactivate");}

        if(characterData[character][this.name]?.offset?.sequence === undefined){
            this.animationSequence = merge(
                defaultVerticalOffsets[this.name]?.sequence,
                characterData[character][this.name]?.sequence,
                [1,2,3,4]);}
        else {
            this.animationSequence = merge([1,1,1,1],
                defaultVerticalOffsets[this.name]?.sequence);}
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

        this.animate();
    };


    animate() {
        this.element.style.objectPosition = -this.multiplier[frame] + "px " + this.verticalSequence[frame] + "px"
    };

    urlUpdate(url, date) {
        if (!date){
            date = new Date().getTime()}
        let urlBar = $("#" + this.name + "Url")

        if(url !== undefined) {
            urlArray[this.id][1] = url;
            urlBar.placeholder = url;
            urlBar.value = "";

            this.src = url + ".png";
            this.element.src = url + ".png?";}
        else if (this.src !== undefined) {
            this.element.src = urlArray[this.id][1] + ".png?" + date;
            urlBar.placeholder = urlArray[this.id][1];
            urlBar.value = "";}
        else {
            urlBar.placeholder = "No data";
            urlBar.value = "";
        }
    };
};

const equipmentOffsets = [
    [0,1,1,2,2,1],
    [0,1,2,2,1,1],
    [0,1,1,2,1,0]];

const consumableRefactor = class items {
    constructor(item) {
        this.src = itemData[item]?.url;
        this.name = itemData[item].name;
        this.id = item;

        this.element = $("#" + this.name);
        this.element.src = this.src;
        this.button = $('#' + this.name + "Button");

        urlArray[item] = [this.name, this.src];

        if (itemData[item].bool) {
            this.button.classList.add('pressed');}
        else {
            this.element.classList.add("invisible");
        }

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.element.src = this.src + ".png?" + new Date().getTime();
        }

        this.#offsetAdjustment();
        this.urlUpdate(this.src);
        this.animate();
    };

    animate() {
        this.element.style.top = this.floatOffsets[floatInt];
    };

    #offsetAdjustment() {
        this.height = this.element.naturalHeight;
        let random = Math.floor(Math.random() * 3);
        this.floatOffsets = equipmentOffsets[random].map((x) => x);

        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            arrayShift(this.floatOffsets);
        }
        for (let key in this.floatOffsets) {
            this.floatOffsets[key] = (this.floatOffsets[key] - (this.height / 2)) + "px";
        }
    };

    urlUpdate(url, date){
        if (!date){
            date = new Date().getTime()}
        let urlBar = $("#" + this.name + "Url")
        if(url !== undefined) {
            urlArray[this.id][1] = url;
            urlBar.placeholder = url;
            urlBar.value = "";

            this.src = url + ".png";
            this.element.src = this.src;}
        else if (this.src !== undefined) {
            this.element.src = urlArray[this.id][1] + ".png?" + date;
            urlBar.placeholder = urlArray[this.id][1];
            urlBar.value = "";}
        else {
            urlBar.placeholder = "No data";
            urlBar.value = "";
        }

        this.#offsetAdjustment();
        this.src = url;
    };
};

const specialRefactor = class items {
    name = "special";
    floatOffsets = [];

    constructor(character) {
        this.element = $("#" + this.name);
        this.button = $('#' + this.name + "Button");

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.urlUpdate()
            this.element.src = this.src + "?" + new Date().getTime();
        }
        this.characterChange(character);
    };

    characterChange(character) {
        this.disabled = merge(false, characterData[character]?.[this.name]?.bool);
        let floatBool = merge(false, characterData[character]?.[this.name]?.displacement?.float);
        let marginTop = merge(0, characterData[character]?.[this.name]?.displacement?.top);

        if(floatBool){
            let random = Math.floor(Math.random() * 3);
            this.floatOffsets = equipmentOffsets[random].map((x) => x + marginTop + "px");}
        else {
            for (let i = 0; i < 6; i++){
                this.floatOffsets[i] = marginTop + "px";
            }
        }

        if (this.disabled) {
            /* general character settings */
            let width =                     characterData[character]?.[this.name]?.resolution?.width;
            this.element.style.width =      width + "px";
            this.element.style.height =     characterData[character]?.[this.name]?.resolution?.height + "px"
            this.element.style.opacity =    merge(1, characterData[character]?.[this.name]?.transform?.opacity);

            /* transformation data */
            this.element.style.zIndex =     merge(10, characterData[character]?.[this.name]?.zIndex);
            this.element.style.transform = characterData[character]?.[this.name]?.transform ?
                "scale(" + characterData[character]?.[this.name]?.transform?.scaleY + ", "
                + characterData[character]?.[this.name]?.transform?.scaleX + ")" :
                "none"

            /* animation sequence offset sheet */
            this.element.style.marginLeft = merge(0, characterData[character]?.[this.name]?.displacement?.left + "px");
            this.multiplier = [-0 * width + "px 0", -1 * width + "px 0", -2 * width + "px 0", -3 * width + "px 0"];
            /* multiplies the width by animation sequence pattern */

            /* float animation offset sheet */
            this.verticalSequence = merge([1,1,1,1],characterData[character]?.[this.name]?.displacement?.sequence).map((x) => x)
            for (let key in this.verticalSequence) {
                this.verticalSequence[key] = -this.verticalSequence[key] + "px";
            }

            this.animate();
            this.animateFloat();

            this.button.classList.remove("deactivate");
        } else {
            this.multiplier = [0,0,0,0];
            this.verticalSequence = [0,0,0,0];

            this.element.classList.add("invisible");
            this.button.setAttribute("class","deactivate");
        }

        this.urlUpdate(character);
    };

    animate() {
        this.element.style.objectPosition = this.multiplier[frame];
        this.element.style.top = this.verticalSequence[frame];
    };

    animateFloat() {
        this.element.style.marginTop = this.floatOffsets[frame];
    };

    urlUpdate(character) {
        let src = characterData[character]?.[this.name]?.fileUrl;
        let urlBar = $("#" + this.name + "Url")

        if (src) {
            this.src = src + ".png?" ;
            urlArray[11] = ["special", this.src];

            urlBar.placeholder = this.src;
            urlBar.value = "";
            urlBar.classList.remove("deactivate");
            this.element.src = this.src + new Date().getTime();
        } else {
            urlArray[11] = ["special",""];
            urlBar.placeholder = "Not Applicable";

            urlBar.classList.add("deactivate");
            this.element.removeAttribute('src');
        }
    };
};

const shieldRefactor = class items {
    constructor(id, rotation, bool) {
        this.id = id;
        this.button = $("#shieldButton");
        this.element = $('#shield');

        let src = itemData[this.id].url;
        this.src = src;
        $("#shieldUrl").placeholder = src;
        this.element.src = this.src + ".png";

        $('#shieldButton').setAttribute("class", bool ? "pressed" : "");
        this.element.setAttribute("class", !bool ? "invisible" : "");

        let positionData = ["up","down","right"];
        positionData.forEach(i => {
            $('#shieldSettings').appendChild(
                createButton("e",i,"shield" + i)
            ).onclick = (e) => {
                this.positionUpdate(e.target.outerText);
            };
        });

        if (positionData.indexOf(rotation) > 0) {
            this.currentPos = rotation;
        }
        $("#shield" + rotation).classList.add("pressed");
        this.element.classList.add(rotation);

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            $("#shield" + this.currentPos).classList.add("pressed");
            this.element.classList.remove("pressed");

            this.urlUpdate();
        };
    };

    positionUpdate(rotation) {
        $("#shieldButton").classList.add("pressed");
        this.element.setAttribute("class",rotation);

        $("#shield" + this.currentPos).classList.remove("pressed");
        this.currentPos = rotation;
        $("#shield" + this.currentPos).classList.add("pressed");
    };

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