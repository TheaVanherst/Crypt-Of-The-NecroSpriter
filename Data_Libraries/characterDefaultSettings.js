
const defaultData = {
    settings: {
        resolution: {
            width:      24,
            height:     24,
            rows:       14,
            columns:    16
        },
        offset: {
            head:   0,
            body:   0
        },
        ampMultiplier: 1,
        amp:        true,
        head:       true,

        fileUrl:    "", // don't use spaces!!!
        headExt:    "_heads",
        bodyExt:    "_armor_body",
    },
    hat: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 2],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    weapon: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 2],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    ring: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 2],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    boots: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 2],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    charm: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 2],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    shovel: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [-1, 0, 1, 0],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    torch: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 4],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    hip: {
        offset: {
            top:    0,
            left:   0,
            sequence:   [1, 2, 3, 4],
            flip:   false
        },
        sequence:   [1, 2, 3, 4]
    },
    special: {
        bool:       false,
        zIndex:     10,
        resolution: {
            height: 0,
            width:  0
        },
        displacement: {
            top:    0,
            left:   0,
            sequence:   [1, 1, 1, 1],
            float:  false,
            fixed:  false
        },
        sequence:   [1, 2, 3, 4],
        transform: {
            opacity:    1,
            scaleX:     1,
            scaleY:     1
        },
        fileUrl:    "",
    },
    clothingData: {
        0: {
            // this isn't used here, and it just a demo of using via. characterData
            // specify the clothing number, and enter the data you want to adjust - remove what you don't.
            head:           false,
            floatSequence:  true,
            settings: [
                {
                    name: "hat",
                    bool: true
                },{
                    name: "weapon",
                    bool: true
                },{
                    name: "ring",
                    bool: true
                },{
                    name: "boots",
                    bool: true
                },{
                    name: "charm",
                    bool: true
                },{
                    name: "shovel",
                    bool: true
                },{
                    name: "torch",
                    bool: true
                },{
                    name: "hip",
                    bool: true
            }],
        },
    },
}