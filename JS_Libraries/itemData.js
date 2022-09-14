const shovelOffsets = [-1,0,1,0],
    equipmentOffsets = [[0,1,1,2,1,1],
                        [1,2,2,1,0,1],
                        [1,0,1,2,2,1]];

const equipmentAll = [ //assets that rely on background pos
    "#hat", "#weapon", "#ring", "#torch",
    "#boots", "#shovel"];

const
    hat = $('#hat'),
    weapon = $('#weapon'),
    ring = $('#ring'),
    boots = $('#boots'),
    charm = $('#charm'),
    shovel = $('#shovel'),
    torch = $('#torch'),
    hip = $('#hip'),
    special = $('#special'),

    shield = $('#shield'),

    spell = $('#spell'),
    equipment = $('#equipment'),
    item = $('#item'),
    consumables = $("#consumables");

const itemData = [
    {
        name : "hat",
        altName : "helmet",
        bool : false,
        url : "items/hat",
        type : "bgi",
        batMode : false,
    },{
        name : "weapon",
        bool : false,
        url : "items/weapon",
        type : "bgi",
        batMode : false
    },{
        name : "ring",
        bool : false,
        url : "items/ring",
        type : "bgi",
        batMode : false
    },{
        name : "boots",
        bool : false,
        url : "items/boots",
        type : "bgi",
        batMode : false
    },{
        name : "charm",
        bool : false,
        url : "items/charm",
        type : "bgi",
        batMode : false
    },{
        name : "shovel",
        bool : false,
        url : "items/shovel",
        type : "bgi",
        batMode : false
    },{
        name : "torch",
        bool : false,
        url : "items/torch",
        type : "bgi",
        batMode : false
    },{
        name : "hip",
        bool : false,
        url : "items/hip",
        type : "bgi",
        batMode : false
    },{
        name : "special",
        bool : false,
        type : "bgi",
        batMode : false
    },{
        name : "spell",
        bool : false,
        url : "items/spell",
        type : "img"
    },{
        name : "equipment",
        bool : false,
        url : "items/equipment",
        type : "img"
    },{
        name : "item",
        bool : false,
        url : "items/item",
        type : "img"
    },{
        name : "shield",
        bool : false,
        url : "items/shield",
        type : "bgi"
    }
]