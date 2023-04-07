
const floorRefactor = class floor {
    danceType = 0;
    currentFloor = [];
    previousType = [];

    tileSet = 0;
    floorTileSets = [
        [
            [["zone1", "zone1_NoMP"], ["zone1","zone1_NoMP"]],
            [["zone2", undefined], ["zone2", undefined]],
            [["zone3_1","zone3_1_NoMp"], ["zone3_2","zone3_2_NoMP"]]
        ],[
            [["zone4","zone4_NoMP"]],
            [["zone5","zone5_NoMP"]],
            [["boss_1","boss_1_NoMP"], ["boss_2","boss_2_NoMP"], ["boss_1","boss_1_NoMP"]]
        ]
    ];
    buttonArr = [ // buttons assosiated with the data above, via. this.tileset
        "#multiplierButton", "#danceButton"
    ]

    overlayTileSets = [
        [["zone1", "zone1_shop"], ["zone2", "zone2_Alt"], ["zone3_Cold", "zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1", "boss_2", "boss_3"]]
    ];

    floorBinary = 0;

    constructor(zoneArea) {
        // declaration for asset changing
        this.danceFloor =   $("#danceFloor");
        this.floors =       $("#floor");
        this.background =   $('#backgrounds');
        this.foreground =   $("#foreground");

        this.danceButton = $("#danceButton");
        this.multiButton = $("#multiplierButton");
        this.backgButton = $("#backgroundButton");

        this.debugFloor = $("#floorDebug");
        this.debugFlip = $("#flipDebug");

        // button generation for floors
        for (let e in this.floorTileSets) {
            this.background.appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("p", this.floorTileSets[e][i][0][0])

                if (this.floorTileSets[e][i][1]) {
                    let hover = createButton("f")
                        hover.style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][0][0]}_Floor.png')`;
                    let title = createButton("p", this.floorTileSets[e][i][0][0]);

                    hover.appendChild(title);
                    child.appendChild(hover);
                }

                child.appendChild(title);

                child.style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][0][0]}_Floor.png')`;
                this.background.children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e, i);
                }
            }
        }

        // start up variable fallback
        zoneArea = zoneArea ?? 0; // start up zone type

        // start up variables
        this.floorToggle();
        this.foregroundToggle();

        // calculates placement via. default settings
        let a = this.floorTileSets[0].length,
            b = Math.floor(zoneArea / a),
            c = zoneArea - (b * a);

        // fallback for specified default zones that don't exist
        if (!(!!this.floorTileSets?.[b]?.[c]?.[0]?.[this.tileSet])) {
            b = 0;
            c = 0;
        }

        // sets currently active button (sets floor)
        this.backgroundUpdate(b, c);
        $("#flipDebug").textContent = this.floorBinary;
    };

    verifyFloorCheck() {
        if(this.floorTileSets?.[this.currentFloor[0]]?.[this.currentFloor[1]]?.[0].includes(undefined)){ //checks for non-existant floors
            $(this.buttonArr[0]).setAttribute("class", "deactivate");
        }
        else { // removes disable
            this.danceButton.classList.remove("deactivate");
            this.multiButton.classList.remove("deactivate");
        }
    }

    backgroundUpdate(e, i) {
        if (e !== this.currentFloor[0] || i !== this.currentFloor[1]) { // checks if new floor is different to previous
            let r = this.currentFloor[0],
                c = this.currentFloor[1];

            if(!!$(`#zone${r}${c} f`)) { // checks if embedded f element exists (if toggleable)
                $(`#zone${r}${c} f`).style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[r][c][0][this.tileSet]}_Floor.png')`;
                $(`#zone${r}${c} f p`).innerText = this.floorTileSets[r][c][0][this.tileSet];
            }
        }
        else { // this switches between the floors if contained in array
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
        }

        $("#backgrounds .pressed")?.classList.remove("pressed");
        this.background.children[e].children[i].classList.add("pressed");

        this.currentFloor =    [`${e}`,`${i}`]; // Updates the floor store array
        this.previousType[1] = [`${e}`,`${i}`]; // updates previous floor type

        this.verifyFloorCheck();

        // sets floor srcs
        this.foreground.src =                       `UI_Libraries/${this.overlayTileSets[e][i][0]}_Overlay.png`;
        this.floors.style.backgroundImage =         `url('UI_Libraries/${this.floorTileSets[e][i][0][0]}_Floor.png')`;

        // sets current visible floor preview
        $("#zone" + e + i).style.backgroundImage =  `url('UI_Libraries/${this.floorTileSets[e][i][0][0]}_Floor.png')`;
        $("#zone" + e + i + " > p").innerText =     this.floorTileSets[e][i][0][this.tileSet];

        // toggle preview change
        if (this.floorTileSets[e][i]?.[1]?.[this.tileSet]) {  // checks if embedded f element exists (if toggleable)
            $("#zone" + e + i + " f").style.backgroundImage =   `url('UI_Libraries/${this.floorTileSets[e][i][1][this.tileSet]}_Floor.png')`;
            $("#zone" + e + i + " f p").innerText =             this.overlayTileSets[e][i][1];
        }

        this.danceUpdate();
    };

    foregroundToggle() {
        let temp = [
            [["#foreground", 'invisible'], ["#foregroundButton", 'pressed']],
            [["#foregroundButton", 'pressed'], ["#foreground", 'invisible']]];
        this.foreVisible = this.foreVisible === 0 ? 1 : 0;
        $(temp[this.foreVisible][0][0]).classList.remove(temp[this.foreVisible][0][1]);
        $(temp[this.foreVisible][1][0]).classList.add(temp[this.foreVisible][1][1]);
    };

    floorToggle(bool) {
        this.floorVisible = !this.floorVisible;

        if (!bool && this.floorVisible === false){
            this.danceFloor.classList.add('invisible');
            this.floors.classList.add('invisible');

            this.backgButton.classList.remove('pressed');
            this.multiButton.setAttribute("class", "deactivate");
            this.danceButton.setAttribute("class", "deactivate");
        }
        else {
            this.floors.classList.remove('invisible');

            this.backgButton.classList.add('pressed');
            this.multiButton.setAttribute("class", "");
            this.danceButton.setAttribute("class", "");
        }

        this.verifyFloorCheck();
    };

    danceSwitcher(a) {
        if (a !== this.danceType) {
            this.danceFloor.classList.remove('invisible');
            if (a === 1) {
                this.danceButton.classList.add("pressed");
                this.multiButton.classList.remove("pressed");
            } else if (a === 2) {
                this.danceButton.classList.remove("pressed");
                this.multiButton.classList.add("pressed");
            }
        }
        else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            this.danceButton.classList.remove("pressed");
            this.multiButton.classList.remove("pressed");
        }

        if (this.previousType[0] !== a && a !== 0) {
            this.previousType[0] = a;
            if(this.floorTileSets[this.currentFloor[0]][this.currentFloor[1]][0][1]){
                this.tileSet ^= 1;
            }
        }

        this.danceType = a;
        this.danceUpdate();
    };

    danceUpdate() {
        this.danceUrls = [ `url('UI_Libraries/${this.floorTileSets[this.currentFloor[0]][this.currentFloor[1]][0][this.tileSet]}_Floor1.png')`,
                           `url('UI_Libraries/${this.floorTileSets[this.currentFloor[0]][this.currentFloor[1]][0][this.tileSet]}_Floor2.png')`];
        this.danceFloor.style.backgroundImage = this.danceUrls[this.floorBinary];

        this.debugFlip.textContent = `${this.currentFloor} | ${this.overlayTileSets[this.currentFloor[0]][this.currentFloor[1]][0]}${this.danceType}`
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.backgroundImage = this.danceUrls[this.floorBinary];
        this.debugFloor.textContent =           this.floorBinary
    };
}
