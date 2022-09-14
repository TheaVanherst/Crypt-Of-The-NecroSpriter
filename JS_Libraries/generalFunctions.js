
const createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
    return item;},

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").forEach(id => {id?.classList?.remove('inv')});
        currentClothing = newVal;
        body.style.marginTop = -(currentObject.settings.resolution.height * newVal) + "px";
        newButton.classList.add('inv')},

    buttonTog = (e) => {
        e.classList.toggle('inv');},

    arrayShift = (e) => {
        e.unshift(e.pop());},

    getUser = (id,data) => {
        return data.find(d => d.name === id);},

    mapItem = (id,bool,data) => {
        return Object.keys(data).map((k) => {
            if(bool){return parseInt(data[k][id]);}
            else {return data[k][id];}
        })},

    itemDisable = () => {
        for (let key in itemData) {
            if(currentObject.clothingData.settings[itemData[key].name] !== undefined &&
                currentObject.clothingData.settings[itemData[key].name].bool === false){
                $("#" + itemData[key].name + "Button").setAttribute('class', 'deact');
                $("#" + itemData[key].name)?.classList?.add("invisible");}}},

    itemEnable = () => {
        for (let key in itemData) {
            $("#" + itemData[key].name + "Button")?.classList?.remove("deact");}},

    urlUpdate = (i) => {
        const item = itemData[i]
        if(item.url !== undefined){
            if(item.type === "bgi"){
                $("#" + item.name).style.backgroundImage = "url('"+ item.url + ".png?" + Date.now() + "')";}
            else {
                $("#" + item.name).src = item.url + ".png?" + Date.now();}}};

let styleProxy = {
    get: (object, property) => {
        return (value) => {
            if (value) {
                object[property] = value;
                return new Proxy(object, styleProxy);}
            return object[property];}}}

let style = (selector) => {
    let element = document.querySelector(selector);
    return new Proxy(element.style, styleProxy);}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));}

function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);}
            else {
                Object.assign(target, { [key]: source[key] });}}}

    return mergeDeep(target, ...sources);}