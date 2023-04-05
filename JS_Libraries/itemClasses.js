const
    defaultVerticalOffsets = {
        torch: {sequence: [1, 4, 3, 2]},
        charm: {sequence: [1, 2, 3, 2]},
        shovel: {offset:{sequence: [2, 1, 0, 1]}}};

const itemRefactor = class items {
    width = 24;
    height = 24;

    constructor(item, character) {
        this.name =         itemData[item].name;

        this.ogUrl =        itemData[item].url;
        this.src =          this.ogUrl + ".png";

        this.element =      $((`#${this.name}`));
        this.element.src =  this.src;
        this.button =       $((`#${this.name}Button`));

        itemData[item].bool ? this.button.classList.add('pressed') : this.element.classList.add("invisible");

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.element.src = `${this.src}?${new Date().getTime()}`;}

        this.urlUpdate(itemData[item].url);
        this.characterChange(character);}

    characterChange(character) {
        if(characterData[character][this.name]?.bool === false) {
            this.element.classList.add("invisible");
            this.button.setAttribute("class","deactivate");}
        else {
            this.button.classList.remove("deactivate");}

        this.animationSequence =    characterData[character][this.name]?.sequence ??
                                        defaultVerticalOffsets[this.name]?.sequence ??
                                            [1,2,3,4]
        this.verticalSequence =     characterData[character][this.name]?.offset?.sequence ??
                                        defaultVerticalOffsets[this.name]?.offset?.sequence ??
                                            [0,0,0,0];

        let flipOffset = 0;
        if(characterData[character][this.name]?.flip === true){
            this.element.classList.add("flip");
            flipOffset = 0.5;}
        else {
            this.element.classList.remove("flip");}

        this.multiplier =               this.animationSequence.map(x => ((x - 1) * this.width) - flipOffset)
        this.element.style.marginTop =  `${characterData[character]?.[this.name]?.offset?.top ?? 0}px`;
        this.element.style.marginLeft = `${characterData[character]?.[this.name]?.offset?.left ?? 0}px`;

        this.animate();
    };

    animate() {
        this.element.style.objectPosition = `${-this.multiplier[frame]}px ${this.verticalSequence[frame]}px`
    };

    urlUpdate(url, date) {
            date =      date ?? new Date().getTime();
        let urlBar =    $((`#${this.name}Url`))

        if(url !== undefined) {
            this.ogUrl =            url;
            urlBar.placeholder =    url;
            urlBar.value =          "";

            this.src =              `${url}.png?`;
            this.element.src =      `${url}.png?`;}
        else if (this.ogUrl !== undefined) {
            this.element.src =      `${this.ogUrl}.png?${date}`;
            urlBar.placeholder =    this.ogUrl;
            urlBar.value =          "";}
        else {
            urlBar.placeholder =    "No data";
            urlBar.value =          "";
        }
    };
};

const equipmentOffsets = [
    [0,1,1,2,2,1],
    [0,1,2,2,1,1],
    [0,1,1,2,1,0]];

const consumableRefactor = class items {
    constructor(item) {
        this.name =         itemData[item].name;

        this.ogUrl =        itemData[item]?.url;
        this.src =          this.ogUrl;

        this.element =      $(`#${this.name}`);
        this.element.src =  `${this.src}?${new Date().getTime()}`;

        itemData[item].bool ? $(`#${this.name}Button`).classList.add('pressed') : this.element.classList.add("invisible");

        $(`#${this.name}Button`).onclick = () => {
            $(`#${this.name}Button`).classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.element.src = `${this.src}?${new Date().getTime()}`;}

        this.#offsetAdjustment();
        this.urlUpdate(this.src);
        this.animate();
    };

    animate() {
        this.element.style.top = this.floatOffsets[floatInt];
    };

    #offsetAdjustment() {
        this.height =       this.element.naturalHeight;
        let equShift =      equipmentOffsets[Math.floor(Math.random() * 3)].map((x) => x);

        for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
            arrayShift(equShift);}

        this.floatOffsets = equShift.map(x => (x - Math.ceil(this.height / 2)) + "px");

    };

    urlUpdate(url, date){
        date = date ?? new Date().getTime();

        if(url !== undefined) {
            this.ogUrl =            url;
            $(`#${this.name}Url`).placeholder =    url;
            $(`#${this.name}Url`).value =          "";

            this.src =              `${url}.png`;
            this.element.src =      this.src;
        } else if (!!this.ogUrl) {
            this.element.src =      `${this.ogUrl}.png?${date}`;
            $(`#${this.name}Url`).placeholder =    this.ogUrl;
            $(`#${this.name}Url`).value =          "";
        } else {
            $(`#${this.name}Url`).placeholder =    "No data";
            $(`#${this.name}Url`).value =          "";
        }

        this.#offsetAdjustment();
    };
};

const specialRefactor = class items {
    name = "special";
    floatOffsets = [];

    constructor(character) {
        this.element =      $((`#${this.name}`));
        this.button =       $((`#${this.name}Button`));

        this.button.onclick = () => {
            this.button.classList.toggle('pressed');
            this.element.classList.toggle('invisible');
            this.urlUpdate()
            this.element.src = `${this.src}?${new Date().getTime()}`;}
        this.characterChange(character);
    };

    characterChange(character) {
        if(characterData[character]?.[this.name]?.displacement?.float) {
            this.floatOffsets = equipmentOffsets[Math.floor(Math.random() * 3)].map((x) =>
                                     `${x + characterData[character]?.[this.name]?.displacement?.top ?? 0}px`);
        } else {
            for (let i = 0; i < 6; i++){
                this.floatOffsets[i] =   `${characterData[character]?.[this.name]?.displacement?.top ?? 0}px`;}}

        if (characterData[character]?.[this.name]?.bool) {
            /* transformation data */
            this.element.style.zIndex =     characterData[character]?.[this.name]?.zIndex ?? 10;
            this.element.style.transform =  characterData[character]?.[this.name]?.transform ?
                                   `scale(${characterData[character]?.[this.name]?.transform?.scaleY}, 
                                          ${characterData[character]?.[this.name]?.transform?.scaleX})` : "none"
            /* animation sequence offset sheet */
            this.element.style.marginLeft = `${characterData[character]?.[this.name]?.displacement?.left ?? 0}px`;
            /* general character settings */
            this.element.style.width =   `${characterData[character]?.[this.name]?.resolution?.width}px`;
            this.element.style.height =  `${characterData[character]?.[this.name]?.resolution?.height}px`;
            this.element.style.opacity =    characterData[character]?.[this.name]?.transform?.opacity ?? 1;
            this.multiplier =              (characterData[character]?.[this.name]?.sequence ?? [1,2,3,4]).map(
                         x => `${-(x - 1) * characterData[character]?.[this.name]?.resolution?.width}px 0`)
            /* float animation offset sheet */
            this.verticalSequence =        (characterData[character]?.[this.name]?.displacement?.sequence ?? [1,1,1,1]).map(x => `${-x}px`);

            this.animate();
            this.animateFloat();
            this.urlUpdate();

            this.button.classList.remove("deactivate");}
        else {
            this.multiplier = this.verticalSequence = [0,0,0,0];
            this.button.setAttribute("class","deactivate");
            this.element.classList.add("invisible");
        }

        this.urlUpdate();
    };

    animate() {
        this.element.style.objectPosition =     this.multiplier[frame];
        this.element.style.top =                this.verticalSequence[frame];
    };

    animateFloat() {
        this.element.style.marginTop =          this.floatOffsets[frame];
    };

    urlUpdate(src) {
        src = src ?? characterData[currentCharacter.id]?.[this.name]?.fileUrl;

        if (src) {
            this.src =              `${src}.png?`;

            $("#specialUrl").placeholder =    src;
            $("#specialUrl").value =          "";
            $("#specialUrl").classList.remove("deactivate");
            this.element.src =      `${src}.png?${new Date().getTime()}`;}
        else {
            $("#specialUrl").placeholder =    "Not Applicable";

            $("#specialUrl").classList.add("deactivate");
            this.element.removeAttribute('src');}
    };
};

const shieldRefactor = class items {
    constructor(id, rotation, bool) {
        this.id =       id;
        this.button =   $("#shieldButton");
        this.element =  $('#shield');

        this.src =                      itemData[this.id].url;
        $("#shieldUrl").placeholder =   itemData[this.id].url;
        this.element.src =              `${this.src}.png`;

        $('#shieldButton').setAttribute("class", bool ? "pressed" : "");
        this.element.setAttribute("class", !bool ? "invisible" : "");

        ["up","down","right"].forEach(i => {
            $('#shieldSettings').appendChild(createButton("e",i,"shield" + i)).onclick = (e) => {
                this.positionUpdate(e.target.outerText);};
        });

        this.currentPos = rotation;
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

        $((`#shield${this.currentPos}`)).classList.remove("pressed");
        this.currentPos = rotation;
        $((`#shield${this.currentPos}`)).classList.add("pressed");
    };

    urlUpdate(){
        let shieldUrl =             $("#shieldUrl")?.value ?? this.src;
        let src =                   shieldUrl.value ?? this.src;
        if(src !== this.src){
            this.src =              src;
            shieldUrl.placeholder = this.src;
            shieldUrl.value =       "";
            this.element.src =      `${this.ogUrl}.png?${new Date().getTime()}`;
        }
    };
};