
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
        buttonTog(newButton)};

const buttonTog = (e) => {
    e?.classList?.toggle('inv')};

// todo : ===================
// todo : ANIMATION LOOP CALL
// todo : ===================

window.setInterval(() => {
    if(playTog){
        elapsed = Math.floor((new Date().getTime() - start) / (60/bpm) / (1000 / aniOffsets[0].length));
        animationPush()}}, (60/bpm));

const proxy = {
    get: (obj, prop) => {
        return (value) => {
            if (value) {
                obj[prop] = value;
                return new Proxy(obj, proxy)}
            return obj[prop]}}},

    style = (selector) => {
    const element = $(selector);
    return element ? new proxy(element.style, proxy) : undefined}