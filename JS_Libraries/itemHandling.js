
// todo : ================
// todo : ITEM POSITIONING
// todo : ================

const itemArrayXYSize = () => {
    for (let i = 0; i < miscCalls.length; i++){
        let item = $("#" + miscCalls[i][0])
        item.style.width = item.naturalWidth
        item.style.height = item.naturalHeight}},

    itemToggle = (item, e) => {
        buttonTog(e)

        $("#" + item).src = $("#" + item).src + "?" + new Date().getTime()
        $("#" + item)?.classList?.toggle("invisible")

        $("#consumables").style.margin = $('#boots').style.margin
        console.log($('#boots').style.marginLeft)
        for (let i = 0; i < miscCalls.length; i++){
            if (miscCalls[i].indexOf(item) >= 0) {
                $('#' + item).style.top = itemYIndividualPos(item)
                return}}
    },

    itemYPos = () => {
        $('#spell').style.top = -($("#spell").naturalHeight) - equipmentOffsets[0][floatInt] + 'px'
        $('#item').style.top = -($("#item").naturalHeight) - equipmentOffsets[1][floatInt] + 'px'
        $('#equipment').style.top = -($("#equipment").naturalHeight) - equipmentOffsets[2][floatInt] + 'px'},

    itemYIndividualPos = (i) => {
        let t = i === "spell" ? 0 : i === "item" ? 1 : i === "equipment" ? 2 : undefined
        return -($('#'+i).naturalHeight) - equipmentOffsets[t][floatInt] + 'px'},

    equipmentCall = (c) => {
        for (let i = 0; i < calls.length; i++){
            let id = 5 + i, idHash = '#'+calls[i][0];

            if(c[currentCharacter[1]][id][0]){ // checks hatbool from #datastorage
                $(idHash+'Button')?.classList?.remove("deact")
                $(idHash).style.margin = c[currentCharacter[1]][id][1] + 'px 0 0 ' + c[currentCharacter[1]][id][2] + 'px';}
            else {
                $(idHash+'Button').setAttribute('class', 'deact')
                $(idHash).classList.add("invisible");}}} // makes hat invisible

