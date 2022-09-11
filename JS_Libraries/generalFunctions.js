
// just some presets to save my tiny ape brain some time later
const $doc = document.documentElement,
    $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document);

const createButton = (css,text,id) => {
        let item = (document.createElement(css));
        if(text !== "" && text !== undefined){item.textContent = text;}
        if(id !== "" && id !== undefined){item.id = id;}
    return item },

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").forEach(id => {id?.classList?.remove('inv')});
        clothingCurrent = newVal;
        $('#body').style.marginTop = -(currentObject.settings.resolution.height * newVal) + "px";
        $('#headContainer').classList.remove('invisible'); //compensates for nocturna
        buttonTog(newButton);},

    buttonTog = (e) => {
    e?.classList?.toggle('inv')},

    arrayShift = (e) => {
        e.unshift(e.pop());},

    getUser = (id,data) => {
        return data.find(d => d.name === id);},

    mapItem = (id,bool,data) => {
        return Object.keys(data).map((k) => {
            if(bool){return parseInt(data[k][id]);}
            else {return data[k][id];}
        })};

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

    return mergeDeep(target, ...sources);
}