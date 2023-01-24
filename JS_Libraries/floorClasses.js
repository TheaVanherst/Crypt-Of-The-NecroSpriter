const floorRefactor = class floor {
    danceType = 1;
    currentFloor = [];
    previousType = [];

    floorTileSets = [
        [["zone1", "zone1"], ["zone2", "zone2"], ["zone3_1", "zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1", "boss_2", "boss_1"]]];
    overlayTileSets = [
        [["zone1", "zone1_shop"], ["zone2", "zone2_Alt"], ["zone3_Cold", "zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1", "boss_2", "boss_3"]]];

    floorBinary = 0;
    floorArr = ["_NoMP", ""];

    buttonToggle = [$("#danceButton"), $("#multiplierButton")]

    constructor(zoneArea, danceType, floorVisibility, foregroundVisibility) {

        this.danceFloor = $("#danceFloor");
        this.floors = $("#floor");
        this.floorVisible = !floorVisibility;
        this.floorToggle();
        this.foregVisible = !foregroundVisibility;
        this.foregroundToggle();

        this.danceType = danceType;

        for (let e in this.floorTileSets) {
            $('#backgrounds').appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("p", this.floorTileSets[e][i][0])

                if (this.floorTileSets[e][i][1]) {
                    let hover = createButton("f")
                        hover.style.backgroundImage = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                    let title = createButton("p", this.floorTileSets[e][i][0])
                    hover.appendChild(title);
                    child.appendChild(hover);
                }

                child.appendChild(title);

                child.style.backgroundImage = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                $('#backgrounds').children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e, i);
                }
            }
        }

        let a = this.floorTileSets[0].length,
            b = Math.floor(zoneArea / a),
            c = zoneArea - (b * a);
        this.currentFloor = [`${b}`,`${c}`];
        this.previousType = [`${b}`,`${c}`];
        this.backgroundUpdate(b, c);

        this.buttonToggle[this.danceType - 1].classList.add("pressed");
    };

    backgroundUpdate(e, i) {
        if (e !== this.currentFloor[0] || i !== this.currentFloor[1]) {
            let row = this.currentFloor[0],
                col = this.currentFloor[1];
            $("#zone" + row + col + " f").style.backgroundImage = "url('UI_Libraries/" + this.floorTileSets[row][col][0] + "_Floor.png')";
            $("#zone" + row + col + " f p").innerText = this.floorTileSets[row][col][0];
            console.log(this.floorTileSets[row][col][0])
        } else {
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
        }

        this.currentFloor = [`${e}`,`${i}`]; //Refer to line 33.

        $("#backgrounds .pressed")?.classList.remove("pressed");
        $("#backgrounds").children[e].children[i].classList.add("pressed");

        this.currentFloor = [`${e}`,`${i}`]; //Refer to line 33.

        if (this.floorTileSets[e][i][1]) {
            $("#zone" + e + i + " f").style.backgroundImage = "url('UI_Libraries/" + this.floorTileSets[e][i][1] + "_Floor.png')";
            $("#zone" + e + i + " f p").innerText = this.floorTileSets[e][i][1];
        }

        this.previousType[1] = this.currentFloor;

        $("#foreground").src = 'UI_Libraries/' + this.overlayTileSets[e][i][0] + "_Overlay.png";

        let push = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')"
        this.danceFloor.style.backgroundImage = push;
        this.floors.style.backgroundImage = push;
        $("#zone" + e + i).style.backgroundImage = push;
        $("#zone" + e + i + " > p").innerText = this.floorTileSets[e][i][0];

        this.danceUpdate();
        $("#flipDebug").textContent = this.floorBinary
    };

    foregroundToggle() {
        this.foregVisible = !this.foregVisible

        if(this.foregVisible){
            $("#foreground").classList.remove('invisible');
            $("#foregroundButton").classList.add('pressed');
        } else {
            $("#foreground").classList.add('invisible');
            $("#foregroundButton").classList.remove('pressed');
        }
    };

    floorToggle() {
        this.floorVisible = !this.floorVisible;

        if (this.floorVisible === false){
            this.danceSwitcher(0);
            this.danceFloor.classList.add('invisible');

            this.floors.classList.add('invisible');
            $("#danceButton").setAttribute("class", "deactivate");
            $("#multiplierButton").setAttribute("class", "deactivate");
        } else {
            this.floors.classList.remove('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");
        }
        $("#backgroundButton").classList.toggle('pressed');
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
            }
        } else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");
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

        $("#floorDebug").textContent = `[${this.currentFloor}:${this.floorTileSets[e][i][0]}] ${this.danceType}`
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.backgroundImage = this.danceUrls[this.floorBinary];
        $("#flipDebug").textContent = this.floorBinary
    };
}
