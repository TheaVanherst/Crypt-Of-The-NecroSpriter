
const backgroundUpdate = (obj,e,i) => obj?.setAttribute(
    "style", "background-image : url('UI_Libraries/"+floorTileSets[e][i][0]+"_Floor.png')");

document.addEventListener('DOMContentLoaded', () => {
    for (let e = 0; e < floorTileSets.length; e++){
        $('#backgrounds').appendChild(createButton("div"));

        for (let i = 0; i < floorTileSets[0].length; i++) {
            const child = createButton("e",null,floorTileSets[e][i][[0]]);//generates a button
            child.appendChild(createButton("t",floorTileSets[e][i][[0]]));
            backgroundUpdate(child,e,i);

            $('#backgrounds').children[e].appendChild(child).onclick = function () {
                if (floorTileSets[e][i].length > 1 && this.style.backgroundImage === $('#floor').style.backgroundImage){
                    arrayShift(floorTileSets[e][i]);
                    arrayShift(overlayTileSets[e][i]);
                    backgroundUpdate(this,e,i);}

                $("#foreground").src = "UI_Libraries/" + overlayTileSets[e][i][0] + "_Overlay.png";

                currentFloor = floorTileSets[e][i][0];
                if(danceMode[0][1] || danceMode[1][1]){
                    floorFlip();}

                if (e === 0 && i === 1) {
                    if (danceMode[0][1]) {
                        danceMode = [[danceMode[0][0],false], [danceMode[1][0],true]];
                        multiplierFlip($('#floorMultiBool'));}
                    $("#danceButton")?.classList?.add("deact");
                } else {
                    $("#danceButton")?.classList?.remove("deact");}

                $("#floor").style.backgroundImage = this.style.backgroundImage;
                this.children[0].textContent = overlayTileSets[e][i][[0]];

                $all('#backgrounds e').forEach(id => {
                    id.classList.remove("inv");});
                this?.classList?.add('inv');}}}})

