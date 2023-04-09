
// character data storage
let currentCharacter;
// environment data storage
let environmentData;
// character equipable data storage
let itemArray =         [],
    consumableData =    [],
    specialData,
    shieldData;

document.addEventListener('DOMContentLoaded', () => {

    currentCharacter = new characterRefactor (
        settings.amplifiedSetting,
        settings.defaultClothing,
        settings.defaultCharacter,
    );

    // environment settings
    $("#crop").style.backgroundColor = settings.backgroundColor;
    environmentData = new floorRefactor (
        settings.defaultFloor,
        settings.foregroundVisible,
        settings.backgroundVisible,
        settings.danceFloorVisible,
        settings.multiplierMode,
    );

    // item creation
    for (let key in itemData) {
        if (itemData[key].type === "equipment") {
            itemArray[key] =
                new itemRefactor (
                    key,
                    settings.defaultCharacter
                );
        }
        else if (itemData[key].type === "consumable") {
            consumableData[key] =
                new consumableRefactor (
                    key
                );
        }
        else if (itemData[key].type === "shield") {
            shieldData =
                new shieldRefactor ( key,
                    settings.shieldPosition,
                    settings.shieldVisibility,
                );
        }
    }

    specialData =
        new specialRefactor(settings.defaultCharacter);

    // item url initializing
    itemData.map(x => {
        let urlBar = $(`#${x.name}Url`)

        if(x?.url){
            let urlCheck = new Image()
            urlCheck.src = x.url + ".png";
            urlCheck.onerror = () => {
                urlBar.classList.add("invalid");
                urlBar.value =          "";
                urlBar.placeholder =    "Invalid itemsData.js URL";
                setTimeout(() => {
                    $(`#${x.name}Url`).classList.remove("invalid");
                }, 2000);
            };
        } else {
            urlBar.placeholder = "No itemsData.js URL";
        }
    })

    // script generation for movement
    $all("panel").forEach((a) => {

        // navigation generation above table sets
        const
            nav =           document.createElement("div");
            nav.classList.add("navigation")
            nav.classList.add("invisible")

        // prev
        const
            pre =           document.createElement("a");
            pre.href =      'javascript:void(0)';
            pre.onclick = (e) => {
                return moveChoiceTo(e.target.parentElement, -1);
            }
        const
            preText =               document.createElement("e");
            preText.textContent =   "Shift Left"
        pre.appendChild(preText);
        nav.appendChild(pre);

        // next
        const
            nex =           document.createElement("ea");
            nex.href =      'javascript:void(0)';
            nex.onclick = (e) => {
                return moveChoiceTo(e.target.parentElement, 1);
            }
        const
            nexText =               document.createElement("e");
            nexText.textContent =   "Shift Right";
        nex.appendChild(nexText);
        nav.appendChild(nex);

        a.insertBefore(
            nav,
            a.firstChild,
        );
    });

    // general settings initializing
    $("#bpmSlider").value =     settings.defaultBPM;
    $("#scaleSlider").value =   settings.defaultScale;

    bpmUpdate();
    scale();

    $("#bpmSlider").oninput = (e) =>    bpmUpdate(e);
    $("#bpmContainer").onwheel = (e) => bpmUpdate(e);
    $("#scaleSlider").oninput = () =>   scale();

    // scroll functionality
    $all(".scrollArea").forEach((e) => {    e.onwheel = (e) =>      scrollWheel(e);})
    $all("#urlData input").forEach((e) => { e.onkeydown = (a) =>    search(a,e);});

    // debug setting
    $("#barDebug").textContent =        floatInt;
    $("#beatDebug").textContent =       frame;
    $("#elapsedDebug").textContent =    elapsed;

    // start-up memory dump
    delete settings;
    delete itemData;

    document.removeEventListener('DOMContentLoaded', () => {});
}, false);
