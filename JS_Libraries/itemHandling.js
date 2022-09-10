
const itemToggle = (e) => {
        let id = e.id
        buttonTog($("#"+id));
        id = id.replace("Button","");

        $("#" + id).src = $("#" + id).src + "?" + new Date().getTime();
        $("#" + id)?.classList?.toggle("invisible");

        $("#consumables").style.margin = $('#boots').style.margin;
        itemYPos()},

    itemYPos = () => {
        $('#spell').style.top = -($("#spell").naturalHeight) - equipmentOffsets[0][equipmentFloatInt] + 'px';
        $('#item').style.top = -($("#item").naturalHeight) - equipmentOffsets[1][equipmentFloatInt] + 'px';
        $('#equipment').style.top = -($("#equipment").naturalHeight) - equipmentOffsets[2][equipmentFloatInt] + 'px';},

    equipmentCall = () => {
        for (let key in itemData){
            let item = itemData[key].name;
            if(currentObject[item] !== undefined){
                if(currentObject[item].bool){ // checks hatbool from #datastorage
                    $('#'+item+'Button')?.classList?.remove("deact");
                    $('#'+item).style.margin = currentObject[item].offset.top + 'px 0 0 ' + currentObject[item].offset.left + 'px';}
                else {
                    $('#'+item+'Button').setAttribute('class', 'deact');
                    $('#'+item).classList.add("invisible");}}
        }} // makes hat invisible

document.addEventListener('DOMContentLoaded', () => {
    $all("#urlData input").forEach((e) => { //assigned on page load to text boxes
        e.onkeydown = (a) => { search(a) };})}); // assigns functions to keydown, so I don't have to in the html

const search = (e) => {
        if(e.key === 'Enter') { //assigned to text boxes
            let image = new Image(), // generates a new test image
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

    bodyUrlUpdate = (h,b) => {
        let srcLink = currentObject.dlc !== 2 ? ["_heads", "_armor_body"] : ["_head", "_body"],
            srcPush = dir + currentObject.settings.fileUrl;
        srcLink = srcLink.map(i => i + ".png?" + new Date().getTime());

        if(currentObject.settings.head){ampBool = false
            $("#amplifiedButton").setAttribute('class', 'deact');
            h.src = srcPush + srcLink[0];}
        else {
            h.src = srcPush + srcLink[1];}
        b.src = srcPush + srcLink[1];
    }
