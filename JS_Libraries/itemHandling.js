
const itemToggle = (e) => {
        let id = e.id;
        buttonTog($("#"+id));
        id = id.replace("Button","");

        $("#" + id).src = $("#" + id).src + "?" + new Date().getTime();
        $("#" + id)?.classList?.toggle("invisible");

        consumables.style.margin = boots.style.margin;
        itemYPos()},

    itemYPos = () => {
        spell.style.top = -(spell.naturalHeight) - equipmentOffsets[0][floatInt] + 'px';
        item.style.top = -(item.naturalHeight) - equipmentOffsets[1][floatInt] + 'px';
        equipment.style.top = -(equipment.naturalHeight) - equipmentOffsets[2][floatInt] + 'px';},

    equipmentCall = () => {
        for (let key in itemData){
            const item = itemData[key].name, obj = currentObject[item];
            if(obj !== undefined){
                if(obj.bool){ // checks hatbool from #datastorage
                    $('#'+item+'Button')?.classList?.remove("deact");
                    $('#'+item).style.margin = obj.offset.top + 'px 0 0 ' + obj.offset.left + 'px';}
                else {
                    $('#'+item+'Button').setAttribute('class', 'deact');
                    $('#'+item).classList.add("invisible");}}
        }} // makes hat invisible

document.addEventListener('DOMContentLoaded', () => {
    $all("#urlData input").forEach((e) => { //assigned on page load to text boxes
        e.onkeydown = (a) => { search(a); };});}); // assigns functions to keydown, so I don't have to in the html

const search = (e) => {
        if(e.key === 'Enter') { //assigned to text boxes
            const image = new Image(), // generates a new test image
                item = e.target;

            image.src = item.value + ".png";
            image.onload = () => { // on test image load
                let idStrip = (item.id).replace("Url",""); //strip down "hat" from the button ID

                if(item.value !== undefined) {
                    let forms1 = document.querySelectorAll("#playerModel div");
                    [].forEach.call(forms1, i => {
                        if (idStrip === i.id) {
                            $('#' + idStrip).style.backgroundImage = "url('" + item.value + ".png?" + Date.now() + "')";}
                        return false;})

                    let forms2 = document.querySelectorAll("#playerModel img");
                    [].forEach.call(forms2, i => {
                        if (idStrip === i.id) {
                            $('#' + idStrip).src = item.value + ".png?" + Date.now();}
                        return false});}}}},

    bodyUrlUpdate = () => {
        let srcLink = (currentObject.dlc !== 2 ? ["_heads", "_armor_body"] : ["_head", "_body"])
                .map(i => i + ".png?" + new Date().getTime()),
            srcPush = currentObject.settings.fileUrl;

        if(currentObject.settings.amp){
            $("#amplifiedButton").classList.remove("deact")}

        if(currentObject.settings.head){
            head.src = srcPush + srcLink[0];}
        body.src = srcPush + srcLink[1];
    };

document.addEventListener('DOMContentLoaded', () => {
    $all("#characterUrl").forEach((e) => { //assigned on page load to text boxes
        e.onkeydown = (a) => { bodyUrlSearch(a); };});}); // assigns functions to keydown, so I don't have to in the html

const
    bodyUrlSearch = (e) => {
        if(e.key === 'Enter') {
            console.log("yes")
            const image = new Image(), // generates a new test image
                item = e.target.value;

            let srcLink = (currentObject.dlc !== 2 ? "_armor_body.png" : "_body.png"),
                pushUrlbody = item + srcLink;

            image.src = pushUrlbody
            image.onload = () => { // on test image load
                defaultData.settings.fileUrl = item;
                currentObject.settings.fileUrl = item;
                bodyUrlUpdate()}}}
