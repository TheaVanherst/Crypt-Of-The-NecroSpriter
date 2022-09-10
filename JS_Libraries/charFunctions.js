
const batMode = () => {
        if(clothingCurrent === 15 - 1){ //checks if clothing set 15 // bat mode
            if(ampBool){amplifiedToggle()} // disable amp
            $('#headContainer').classList.add('invisible')

            for (let key in itemData) {
                if(itemData[key].batMode === false){
                    $("#" + itemData[key].name + "Button").setAttribute('class', 'deact')
                    $("#" + itemData[key].name)?.classList?.add("invisible");}}}
        else {
            for (let key in itemData) {
                if(itemData[key].batMode === false){
                    $("#" + itemData[key].name + "Button")?.classList?.remove("deact")}}
    }},

    chaunterMode = () => {
        ampBool = true; amplifiedToggle(); //this has to be the opposite, just so I can call the function and it do the work for me.
        $("#amplifiedButton").setAttribute('class', 'deact')}