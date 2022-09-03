
// just some presets to save my tiny ape brain some time later
const $doc = document.documentElement,
    $ = document.querySelector.bind(document),
    $all = document.querySelectorAll.bind(document),
    frameDef = getComputedStyle($doc).getPropertyValue('--frameDef');

// todo : ====================
// todo : BUTTON FUNCTIONALITY
// todo : ====================

const createButton = (css,text,id) => {
        let item = (document.createElement(css))
        if(text !== "" && text !== undefined){item.textContent = text}
        if(id !== "" && id !== undefined){item.id = id}
    return item },

    buttonAdjustment = (button, newVal, newButton) => {
        $all(button + " e").forEach(id => {id?.classList?.remove('inv')})
        clothingCurrent = newVal;
        $('#body').style.marginTop = -(framesize[0] * newVal) + "px"
        $('#headContainer').classList.remove('invisible') //compensates for nocturna
        buttonTog(newButton)},

    buttonTog = (e) => {
    e?.classList?.toggle('inv')},

    arrayShift = (e) => {
        e.unshift(e.pop())}

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
