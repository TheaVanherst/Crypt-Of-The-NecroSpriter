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

    constructor(zoneArea, danceType, floorVisibility, foregroundVisiblity) {

        this.danceFloor = $("#danceFloor");
        this.floors = $("#floor");
        this.floorVisible = !floorVisibility;
        this.floorToggle();
        this.foregVisible = !foregroundVisiblity;
        this.foregroundToggle();

        this.danceType = danceType;

        for (let e in this.floorTileSets) {
            $('#backgrounds').appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("t", this.floorTileSets[e][i][0])
                child.appendChild(title);
                child.style.background = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                $('#backgrounds').children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e, i);
        }}}

        let a = this.floorTileSets[0].length,
            b = Math.floor(zoneArea / a),
            c = zoneArea - (b * a);
        this.previousType[0] = this.danceType;
        this.previousType[1] = [`${b}`,`${c}`]; //can't tell you why these needs to bet put into strings. They just do I guess.
        this.currentFloor = [`${b}`,`${c}`];
        this.backgroundUpdate(b, c);

        this.buttonToggle[this.danceType - 1].classList.add("inv");
    };

    backgroundUpdate(e, i) {
        this.currentFloor = [`${e}`,`${i}`]; //Refer to line 33.

        $("#backgrounds .inv")?.classList.remove("inv");
        $("#backgrounds").children[e].children[i].classList.add("inv");

        if (JSON.stringify(this.previousType[1]) === JSON.stringify(this.currentFloor) &&
            JSON.stringify([e, i]) === JSON.stringify(this.currentFloor)) {
                arrayShift(this.floorTileSets[e][i]);
                arrayShift(this.overlayTileSets[e][i]);
                $("#zone" + e + i).children[0].innerText = this.floorTileSets[e][i][0];
        }

        this.previousType[1] = this.currentFloor

        $("#foreground").src = 'UI_Libraries/' + this.overlayTileSets[e][i][0] + "_Overlay.png";

        let push = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')"
        this.danceFloor.style.background = push;
        this.floors.style.background = push;
        $("#zone" + e + i).style.background = push;

        this.danceUpdate();
        $("#flipDebug").textContent = this.floorBinary
    };

    foregroundToggle() {
        this.foregVisible = !this.foregVisible

        if(this.foregVisible){
            $("#foreground").classList.remove('invisible');
            $("#foregroundButton").classList.add('inv');
        } else {
            $("#foreground").classList.add('invisible');
            $("#foregroundButton").classList.remove('inv');
        }
    };

    floorToggle() {
        this.floorVisible = !this.floorVisible;

        if (this.floorVisible === false){
            this.danceSwitcher(0);
            this.danceFloor.classList.add('invisible');

            this.floors.classList.add('invisible');
            $("#danceButton").setAttribute("class", "deact");
            $("#multiplierButton").setAttribute("class", "deact");}
        else {
            this.floors.classList.remove('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");}

        $("#backgroundButton").classList.toggle('inv');
    };

    danceSwitcher(a) {
        if (a !== this.danceType) {
            this.danceFloor.classList.remove('invisible');
            if (a === 1) {
                $("#danceButton").setAttribute("class", "inv");
                $("#multiplierButton").setAttribute("class", "");
            } else if (a === 2) {
                $("#danceButton").setAttribute("class", " ");
                $("#multiplierButton").setAttribute("class", "inv");
            }
        } else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");}

        if (this.previousType[0] !== a && a !== 0) {
            this.previousType[0] = a;
            arrayShift(this.floorArr);  }

        this.danceType = a;
        this.danceUpdate();

        // let urlCheck1 = new Image()
        // urlCheck1.src = this.danceUrls[0];
        // urlCheck1.onerror = () => {
        //     $("#danceButton").setAttribute("class", "deact");}
        // urlCheck1.onload = () => {
        //     $("#danceButton").classList.remove('deact');}
    };

    danceUpdate() {
        let e = this.currentFloor[0], i = this.currentFloor[1];
        this.danceUrls = [
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor1.png')`,
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor2.png')`];
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];

        $("#floorDebug").textContent = `[${this.currentFloor}:${this.floorTileSets[e][i][0]}](${this.danceType}):`
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];
        $("#flipDebug").textContent = this.floorBinary
    };
}
