const floorRefactor = class floor {
    danceVisibility = true;

    danceType = 1;
    previousType = 1;
    currentFloor = ["2","0"];

    floorTileSets = [
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_1"]]];
    overlayTileSets = [
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_3"]]];
    floorBinary = 0;
    floorArr = ["_NoMP",""];
    flipToggle = [];

    constructor() {
        this.danceVisibility = true;
        this.danceFloor = $("#danceFloor");
        this.floors = $("#floor");

        for (let e in this.floorTileSets){
            $('#backgrounds').appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("t", this.floorTileSets[e][i][0])
                child.appendChild(title);
                child.style.background = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                $('#backgrounds').children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e,i); }
            }
        }

        let a = this.floorTileSets[0].length,
            b = Math.floor(this.currentFloor[0] / a),
            c = this.currentFloor[0] - (b * a);
        this.backgroundUpdate(b,c);

        $("#backgroundButton, #foregroundButton, #danceButton").classList.add("inv");};

    backgroundUpdate(e,i) {
        this.currentFloor = [e,i];

        $("#backgrounds .inv")?.classList.remove("inv");
        $("#backgrounds").children[e].children[i].classList.add("inv");
        $("#foreground").src = 'UI_Libraries/' + this.overlayTileSets[e][i][0] + "_Overlay.png";

        if (JSON.stringify(this.flipToggle) === JSON.stringify(this.currentFloor)) {
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
            $("#zone"+e+i).innerText = this.floorTileSets[e][i][0];
        }

        let push = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')"
        this.danceFloor.style.background =  push;
        this.floors.style.background =      push;
        $("#zone"+e+i).style.background =   push;

        this.flipToggle = [e,i];
        this.danceUpdate();
    }

    floorToggle() {
        this.floors.classList.toggle('invisible');
        $("#backgroundButton").classList.toggle('inv');

        if (this.danceVisibility) { //this is really dumb and lazy-
            this.danceFloor.classList.add("invisible");
            $("#danceButton").setAttribute("class", "deact");
            $("#multiplierButton").setAttribute("class", "deact");
        } else {
            this.danceFloor.classList.remove("invisible");
            $("#danceButton").classList.remove("deact");
            $("#multiplierButton").classList.remove("deact");
        }
        this.danceVisibility = !this.danceVisibility
    };

    foregroundToggle() {
        $("#foreground").classList.toggle('invisible');
        $("#foregroundButton").classList.toggle('inv');
    };

    danceSwitcher(a) {
        let urlCheck1 = new Image()
        let arr = this.currentFloor
        urlCheck1.src = `UI_Libraries/${this.floorTileSets[arr[0]][arr[1]][0]}${this.floorArr[0]}_Floor1.png`;
        urlCheck1.onload = () => {}
        urlCheck1.onerror = () => {
            $("#danceButton").setAttribute("class", "deact");}

        if (a !== this.danceType) {
            this.danceFloor.classList.remove('invisible');
            if (a === 1) {
                $("#danceButton").setAttribute("class", "inv");
                $("#multiplierButton").setAttribute("class", "");}
            else if (a === 2) {
                $("#danceButton").setAttribute("class", " ");
                $("#multiplierButton").setAttribute("class", "inv");}
        } else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");}

        if (this.previousType !== a && a !== 0) {
            this.previousType = a;
            arrayShift(this.floorArr);}

        this.danceType = a;
        this.danceUpdate();
    };

    danceUpdate() {
        let e = this.currentFloor[0], i = this.currentFloor[1];
        this.danceUrls = [
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor1.png')`,
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor2.png')`];
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];
    };
=======

const floorRefactor = class floor {
    danceVisibility = true;

    danceType = 1;
    previousType = 1;
    currentFloor = ["2","0"];

    floorTileSets = [
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_1"]]];
    overlayTileSets = [
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_3"]]];
    floorBinary = 0;
    floorArr = ["_NoMP",""];
    flipToggle = [];

    constructor() {
        this.danceVisibility = true;
        this.danceFloor = $("#danceFloor");
        this.floors = $("#floor");

        for (let e in this.floorTileSets){
            $('#backgrounds').appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                let title = createButton("t", this.floorTileSets[e][i][0])
                child.appendChild(title);
                child.style.background = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                $('#backgrounds').children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e,i); }
            }
        }

        let a = this.floorTileSets[0].length,
            b = Math.floor(this.currentFloor[0] / a),
            c = this.currentFloor[0] - (b * a);
        this.backgroundUpdate(b,c);

        $("#backgroundButton, #foregroundButton, #danceButton").classList.add("inv");};

    backgroundUpdate(e,i) {
        this.currentFloor = [e,i];

        $("#backgrounds .inv")?.classList.remove("inv");
        $("#backgrounds").children[e].children[i].classList.add("inv");
        $("#foreground").src = 'UI_Libraries/' + this.overlayTileSets[e][i][0] + "_Overlay.png";

        if (JSON.stringify(this.flipToggle) === JSON.stringify(this.currentFloor)) {
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
            $("#zone"+e+i).innerText = this.floorTileSets[e][i][0];
        }

        let push = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')"
        this.danceFloor.style.background =  push;
        this.floors.style.background =      push;
        $("#zone"+e+i).style.background =   push;

        this.flipToggle = [e,i];
        this.danceUpdate();
    }

    floorToggle() {
        this.floors.classList.toggle('invisible');
        $("#backgroundButton").classList.toggle('inv');

        if (this.danceVisibility) { //this is really dumb and lazy-
            this.danceFloor.classList.add("invisible");
            $("#danceButton").setAttribute("class", "deact");
            $("#multiplierButton").setAttribute("class", "deact");
        } else {
            this.danceFloor.classList.remove("invisible");
            $("#danceButton").classList.remove("deact");
            $("#multiplierButton").classList.remove("deact");
        }
        this.danceVisibility = !this.danceVisibility
    };

    foregroundToggle() {
        $("#foreground").classList.toggle('invisible');
        $("#foregroundButton").classList.toggle('inv');
    };

    danceSwitcher(a) {
        let urlCheck1 = new Image()
        let arr = this.currentFloor
        urlCheck1.src = `UI_Libraries/${this.floorTileSets[arr[0]][arr[1]][0]}${this.floorArr[0]}_Floor1.png`;
        urlCheck1.onload = () => {}
        urlCheck1.onerror = () => {
            $("#danceButton").setAttribute("class", "deact");}

        if (a !== this.danceType) {
            this.danceFloor.classList.remove('invisible');
            if (a === 1) {
                $("#danceButton").setAttribute("class", "inv");
                $("#multiplierButton").setAttribute("class", "");}
            else if (a === 2) {
                $("#danceButton").setAttribute("class", " ");
                $("#multiplierButton").setAttribute("class", "inv");}
        } else {
            a = 0;
            this.danceFloor.classList.add('invisible');
            $("#danceButton").setAttribute("class", "");
            $("#multiplierButton").setAttribute("class", "");}

        if (this.previousType !== a && a !== 0) {
            this.previousType = a;
            arrayShift(this.floorArr);}

        this.danceType = a;
        this.danceUpdate();
    };

    danceUpdate() {
        let e = this.currentFloor[0], i = this.currentFloor[1];
        this.danceUrls = [
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor1.png')`,
            `url('UI_Libraries/${this.floorTileSets[e][i][0]}${this.floorArr[0]}_Floor2.png')`];
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];
    };

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];
    };
}