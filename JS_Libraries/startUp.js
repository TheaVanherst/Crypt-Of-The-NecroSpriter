
let currentCharacter, floorData; //don't touch
let itemArray = [], consumableData = [], specialData, shieldData;

document.addEventListener('DOMContentLoaded', () => {

    let startCharacter = 0; // This will initiate as the default character [0-17].
    currentCharacter = new characterRefactor(false, 4, startCharacter); //AMP mode / clothing set / def char

    $("#crop").style.backgroundColor = "darkslategray"; //background colour.
    floorData = new floorRefactor(0,1, true, true);
    //floor you want [0-5], dance mode [0-2], true or false for visibility states.
    // floor types [0-5] : Zone 1, Zone 2, Zone 3 (COLD), Zone 4, Zone 5, Boss (1)

    $("#bpmSlider").value = 130; //start-up bpm
    $("#scaleSlider").value = 4; //start-up scale

    let shieldSettings = ["right", false]
    //direction of shield [up, right, down] / visibility [true or false]

    specialData = new specialRefactor(startCharacter);

    for (let key in itemData) {
        if (itemData[key].type === "equipment") {
            itemArray[key] = new itemRefactor(key, startCharacter);
        } else if (itemData[key].type === "consumable") {
            consumableData[key] = new consumableRefactor(key);
        } else if (itemData[key].type === "shield") {
            shieldData = new shieldRefactor(key, shieldSettings[0], shieldSettings[1]);
        }
    }

    document.removeEventListener('DOMContentLoaded', () => {});
}, false);

const songList = [
    ["Tombtorial"], //100
    ["N/a"], //105
    ["N/a"], //110
    ["1-1 // Disco Descent"], //115
    ["BOSS // Deep Blues [123]", "BOSS // King Conga", "BOSS // Golden Lute", "TRAINING // Watch Your Step"], //120
    ["BOSS // Coral Riff [126]", "BOSS // Frankensteinway"], //125
    ["LOBBY // Rhythmortis","1-2 // Crypteque","2-1 // Fungal Funk","4-1 // Styx and Stones", "5-1 // Voltzwaltz"], //130
    ["3-1 // Stone Cold (cold)"," 3-1 // Igneous Rock (hot)"], //135
    ["1-3 // Mausoleum Mash","2-2 // Grave Throbbing","BOSS // Necrodancer Phase 1","BOSS // Dead Ringer","5-2 // Power Cords"], //140
    ["3-2 // Dance of the Decorous (cold)","3-2 March of the Profane (hot)","4-2 // Heart of the Crypt", "BOSS // Conductor"], //145
    ["2-3 // Portabellohead", "BOSS // FortissiMole"], //150
    ["3-3 // A Cold sweat (cold)","3-3 // A Hot Mess (hot)","5-3 // Six Feet Thunder"], //155
    ["4-3 // The Wight To Remain","BOSS // Necrodancer Phase 2"], //160
    ["N/a"], //165
    ["N/a"], //170
    ["BOSS // Death Metal"], //175
    ["N/a"], //180
    ["N/a"], //185
    ["N/a"]]; //190

// General scripts that are required to be bound & assigned on startup.

document.addEventListener('DOMContentLoaded', () => {

    bpmUpdate();
    scale();

    itemData.map(x => {
        let urlBar = $(`#${x.name}Url`)

        if(x?.url){
            let urlCheck = new Image()
            urlCheck.src = x.url + ".png";
            urlCheck.onerror = () => {
                urlBar.classList.add("invalid");
                urlBar.value = "";
                urlBar.placeholder = "Invalid itemsData.js URL";
                setTimeout(() => {
                    $(`#${x.name}Url`).classList.remove("invalid");
                }, 2000);
            };
        } else {
            urlBar.placeholder = "No itemsData.js URL";
        }
    })

    delete itemData;

    $all("panel").forEach((a) => {
        let nav = createButton("div");
            nav.classList.add("navigation")
            nav.classList.add("invisible")

        let pre = createButton("a");
            pre.href = 'javascript:void(0)';
            pre.onclick = (e) => {return moveChoiceTo(e.target.parentElement, -1);}
        let preText = createButton("e", "Shift Left");
        pre.appendChild(preText);
        nav.appendChild(pre);

        let nex = createButton("a");
        nex.href = 'javascript:void(0)';
        nex.onclick = (e) => {return moveChoiceTo(e.target.parentElement, 1);}
        let nexText = createButton("e", "Shift Right");
        nex.appendChild(nexText);
        nav.appendChild(nex);

        a.insertBefore(nav, a.firstChild);
    });

    $("#bpmSlider").oninput = (e) =>    bpmUpdate(e);
    $("#bpmContainer").onwheel = (e) => bpmUpdate(e);
    $("#scaleSlider").oninput = () =>   scale();

    $all(".scrollArea").forEach((e) => {    e.onwheel = (e) =>      scrollWheel(e);})
    $all("#urlData input").forEach((e) => { e.onkeydown = (a) =>    search(a,e);});

    $("#barDebug").textContent = floatInt;
    $("#beatDebug").textContent = frame;
    $("#elapsedDebug").textContent = elapsed;

    document.removeEventListener('DOMContentLoaded', () => {});
}, false);
