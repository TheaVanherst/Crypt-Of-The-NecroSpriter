
const floorRefactor = class floor {
    danceVisibility = true;

    danceFloor = $("#danceFloor");
    floor = $("#floor");

    currentFloor = ["2","0"];
    floorTileSets = [
        [["zone1","zone1"], ["zone2","zone2"], ["zone3_1","zone3_2"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_1"]]];
    overlayTileSets = [
        [["zone1","zone1_shop"], ["zone2","zone2_Alt"], ["zone3_Cold","zone3_Hot"]],
        [["zone4"], ["zone5"], ["boss_1","boss_2","boss_3"]]];
    floorBinary = 0;
    floorArr = ["_NoMP",""];
    flipToggle = []

    constructor() {
        for (let e in this.floorTileSets){
            $('#backgrounds').appendChild(createButton("div"));
            for (let i in this.floorTileSets[0]) {
                let child = createButton("e", null, "zone" + e + i);
                child.appendChild(createButton("t", this.floorTileSets[e][i][0]));
                child.style.background = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')";
                $('#backgrounds').children[e].appendChild(child).onclick = () => {
                    this.backgroundUpdate(e,i); }}}

        let a = this.floorTileSets[0].length,
            b = Math.floor(this.currentFloor[0] / a),
            c = this.currentFloor[0] - (b * a);
        this.backgroundUpdate(b,c);

        $("#backgroundButton, #foregroundButton, #danceButton").classList.add("inv");};

    backgroundUpdate(e,i) {
        this.currentFloor = [e,i];
        let push = "url('UI_Libraries/" + this.floorTileSets[e][i][0] + "_Floor.png')"

        if (JSON.stringify(this.flipToggle) === JSON.stringify(this.currentFloor)) {
            arrayShift(this.floorTileSets[e][i]);
            arrayShift(this.overlayTileSets[e][i]);
            $("#zone"+e+i).innerText = this.floorTileSets[e][i][0];}
        $("#foreground").src = 'UI_Libraries/' + this.overlayTileSets[e][i][0] + "_Overlay.png";

        this.danceFloor.style.background = push;
        this.floor.style.background = push;
        $("#zone"+e+i).style.background = push;

        this.danceUpdate();
        this.flipToggle = [e,i];}

    floorToggle() {
        this.floor.classList.toggle('invisible');
        $("#backgroundButton").classList.toggle('inv');

        if (this.floor.classList.contains('invisible')) { //this is really dumb and lazy-
            this.danceVisibility = false; // but there's no way to return a bool out of a toggle classlist.
            this.danceFloor.classList.add("invisible");
            $("#danceButton").setAttribute("class", "deact");
            $("#multiplierButton").setAttribute("class", "deact");}
        else {
            $("#danceButton").classList.remove("deact");
            $("#multiplierButton").classList.remove("deact");}};

    foregroundToggle() {
        $("#foreground").classList.toggle('invisible');
        $("#foregroundButton").classList.toggle('inv');};

    danceSwitcher(a,b) {
        let objs = [$("#danceButton"),$("#multiplierButton")];

        objs[b].classList.remove('inv');
        if (objs[a].classList !== objs[b].classList) {
            objs[a].classList.toggle('inv');

            arrayShift(this.floorArr);
            this.danceUpdate();
            this.danceFloor.classList.remove('invisible');}

        objs[a].classList.length === 0 && objs[b].classList.length === 0 ?
            this.danceFloor.classList.add('invisible') : null;};

    danceUpdate() {
        let e = this.currentFloor[0], i = this.currentFloor[1];
        this.danceUrls = [
            "url('UI_Libraries/" + this.floorTileSets[e][i][0] + this.floorArr[0] + "_Floor1.png')",
            "url('UI_Libraries/" + this.floorTileSets[e][i][0] + this.floorArr[0] + "_Floor2.png')"];
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];}

    floorFlip() {
        this.floorBinary ^= 1;
        this.danceFloor.style.background = this.danceUrls[this.floorBinary];}
}