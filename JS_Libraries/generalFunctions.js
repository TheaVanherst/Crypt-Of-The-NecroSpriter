
const
    createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
        return item;},

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").classList?.remove('inv');
        newButton.classList.add('inv');},

    buttonTog = (e) => {
        e.classList.toggle('inv');},

    itemToggle = (e) => {
        let id = e.id;
        buttonTog($("#"+id));
        id = id.replace("Button","");

        $("#" + id).src = $("#" + id).src + "?" + new Date().getTime();
        $("#" + id)?.classList?.toggle("invisible");},

    timeUpdate = () => {
        let date = new Date().getTime();
        for (let key in itemArray) {
            itemArray[key].urlUpdate(undefined,date)}

        characterClass.urlUpdate()},

    bodyUrlSearch = (e) => {
        if(e.key === 'Enter') {
            const
                image = new Image(),
                item = e.target.value;
            image.src = item + (characterClass.dlc !== 2 ? "_armor_body.png" : "_body.png");
            image.onload = () => {
                characterClass.urlUpdate(item);
                return;}

            targetTimeout(e)}},

    search = (e) => {
        if(e.key === 'Enter') {
            const image = new Image();

            let url = e.target.value,
                idStrip = (e.target.id).replace("Url","");
            image.src = url + ".png";
            image.onload = () => {
                let date = new Date().getTime();

                for (let i = 0; i < itemArray.length; i++) {
                    if(itemArray[i].name === idStrip){
                        itemArray[i].urlUpdate(url);
                        return;}}

                for (let i = 0; i < consumableItems.length; i++) {
                    if(consumableItems[i].name === idStrip){
                        consumableItems[i].urlUpdate(url);
                        return;}}

                if(idStrip === "special"){
                    specialItem.urlUpdate(url);
                    return;}

                if(idStrip === "shield"){
                    shieldData.urlUpdate(url);
                    return;}};

            targetTimeout(e)}},

    targetTimeout = (e) => {
        let placeholder = e.target.placeholder;
        e.target.value = "";
        e.target.placeholder = "Not a valid directory";

        setTimeout(function () {
            e.target.placeholder = placeholder;}, 1953);},

    arrayShift = (e) => {
        e.unshift(e.pop());},

    styleProxy = {
        get: (object, property) => {
            return (value) => {
                if (value) {
                    object[property] = value;
                    return new Proxy(object, styleProxy);}
                return object[property];};}},

    style = (selector) => {
        return new Proxy(selector.style, styleProxy);},

    merge = (defaultData, newData, fallback) => {
        return newData !== undefined ? newData.valueOf() :
            defaultData !== undefined ? defaultData.valueOf() : fallback;};