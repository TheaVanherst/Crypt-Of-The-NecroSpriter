
const floorRefactor = class floor {
    danceType = 1;
    currentFloor = [];
    previousType = [];

    floorTileSets = [
        [["zone1", "zone1"], ["zone2", "zone2"], ["zone3_1", "zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1", "boss_2", "boss_1"]]
    ];
    overlayTileSets = [
        [["zone1", "zone1_shop"], ["zone2", "zone2_Alt"], ["zone3_Cold", "zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1", "boss_2", "boss_3"]]
    ];

    floorBinary = 0;
    floorArr = ["_NoMP", ""];

    constructor(zoneArea, danceType) {

        this.danceFloor =   $("#danceFloor");
        this.floors =       $("#floor");
        this.background =   $('#backgrounds');
        this.foreground =   $("#foreground");

        this.floorToggle(true);
        this.foregroundToggle(true);

        this.danceType = danceType;

        for (let e in this.floorTileSets) {
            this.background.appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("p", this.floorTileSets[e][i][0])

                if (this.floorTileSets[e][i][1]) {
                    let hover = createButton("f")
                        hover.style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][0]}_Floor.png')`;
                    let title = createButton("p", this.floorTileSets[e][i][0])
                    hover.appendChild(title);
                    child.appendChild(hover);
                }

                child.appendChild(title);

                child.style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][0]}_Floor.png')`;
                this.background.children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e, i);
                }
            }
        }

        let a = this.floorTileSets[0].length, b = Math.floor(zoneArea / a), c = zoneArea - (b * a);
        this.currentFloor = this.previousType = [`${b}`,`${c}`];
        this.backgroundUpdate(b, c);

        if (this.danceType - 1 === 0) {
            $("#danceButton").classList.add("pressed");
        } else if (this.danceType - 1 === 1){
            $("#multiplierButton").classList.add("pressed");
        }
    };

    backgroundUpdate(e, i) {
        if (e !== this.currentFloor[0] || i !== this.currentFloor[1]) { //checks if new floor is different to previous
            let r = this.currentFloor[0],
                c = this.currentFloor[1];
            if(!!$((`#zone${r}${c} f`))) { //checks if embedded f element exists (if toggleable)
                $((`#zone${r}${c} f`)).style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[r][c][0]}_Floor.png')`;
                $((`#zone${r}${c} f p`)).innerText = this.floorTileSets[r][c][0];}}
        else {
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
        }

        $("#backgrounds .pressed")?.classList.remove("pressed");
        this.background.children[e].children[i].classList.add("pressed");

        this.currentFloor = [`${e}`,`${i}`]; //Refer to line 33.
        if (this.floorTileSets[e][i][1]) {  //checks if embedded f element exists (if toggleable)
            $("#zone" + e + i + " f").style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][1]}_Floor.png')`;
            $("#zone" + e + i + " f p").innerText = this.floorTileSets[e][i][1];}
        this.previousType[1] = this.currentFloor;

        this.foreground.src = `UI_Libraries/${this.overlayTileSets[e][i][0]}_Overlay.png`;
        this.floors.style.backgroundImage = $("#zone" + e + i).style.backgroundImage = `url('UI_Libraries/${this.floorTileSets[e][i][0]}_Floor.png')`;
        $("#zone" + e + i + " > p").innerText = this.floorTileSets[e][i][0];

        this.danceUpdate();
        $("#flipDebug").textContent = this.floorBinary;
    };

    foregroundToggle() {
        let temp = [
            [["#foreground", 'invisible'], ["#foregroundButton", 'pressed']],
            [["#foregroundButton", 'pressed'], ["#foreground", 'invisible']]]
        this.foreVisible = this.foreVisible === 0 ? 1 : 0;
        $(temp[this.foreVisible][0][0]).classList.remove(temp[this.foreVisible][0][1]);
        $(temp[this.foreVisible][1][0]).classList.add(temp[this.foreVisible][1][1]);
    };

    floorToggle(bool) {
        this.floorVisible = !this.floorVisible;

        if (!bool && this.floorVisible === false){
            this.danceSwitcher(0);
            this.danceFloor.classList.add('invisible');

            this.floors.classList.add('invisible');
            $("#backgroundButton").classList.remove('pressed');
            $("#multiplierButton, #danceButton").setAttribute("class", "deactivate");}
        else {
            this.floors.classList.remove('invisible');
            $("#backgroundButton").classList.add('pressed');
            $("#multiplierButton, #danceButton").setAttribute("class", "");
        }
    };

    danceSwitcher(a) {
        if (a !== this.danceType) {
            this.danceFloor.classList.remove('invisible');
            if (a === 1) {
                $("#danceButton").setAttribute("class", "pressed");
                $("#multiplierButton").setAttribute("class", "");
            } else if (a === 2) {
                $("#danceButton").setAttribute("class", " ");
                $("#multiplierButton").setAttribute("class", "pressed");
            }}
        else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            $("#danceButton, #multiplierButton").setAttribute("class", "");
        }

        if (this.previousType[0] !== a && a !== 0) {
            this.previousType[0] = a;
            arrayShift(this.floorArr);
        }

        this.danceType = a;
        this.danceUpdate();
    };

    danceUpdate() {
        let e = this.currentFloor[0], i = this.currentFloor[1];
        this.danceUrls = [
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor1.png')`,
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor2.png')`];
        this.danceFloor.style.backgroundImage = this.danceUrls[this.floorBinary];
        $("#floorDebug").textContent = `${this.currentFloor} ${this.floorTileSets[e][i][0]}${this.danceType}`
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.backgroundImage = this.danceUrls[this.floorBinary];
        $("#flipDebug").textContent = this.floorBinary
    };
}
