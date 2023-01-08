const defaultData = {
    settings: {
        resolution: {
            width: 24, height: 24,
            rows: 14, columns: 16},
        offset: {
            head: 0, body: 0},
        ampMultiplier: 1,
        floatSequence: false,
        fileUrl: "",
        head: true,
        amp: true},
    hat: {
        offset: {
            // top: 0, left: 0,
            sequence: [1, 2, 3, 2]}},
    weapon: {
        offset: {
            top: 0, left: 0}},
    ring: {
        offset: {
            top: 0, left: 0},
        sequence: [1, 2, 3, 4]},
    boots: {
        offset: {
            top: 0, left: 0}},
    charm: {
        offset: {
            top: 0, left: 0,
            sequence: [1, 2, 3, 2]}},
    shovel: {
        offset: {
            top: 0, left: 0,
            sequence: [-1, 0, 1, 0]}},
    torch: {
        offset: {
            // top: 0, left: 0},
            flip: false
        },
        hip: {
            offset: {
                // top: 0, left: 0,
                sequence: [1, 2, 3, 4]
            }
        },
        special: {
            bool: false,
            zIndex: 10,
            resolution: {
                height: 0, width: 0
            },
            displacement: {
                top: 0, left: 0,
                sequence: [1, 1, 1, 1]},
            sequence: [1, 2, 3, 4],
            transform: {
                scaleX: 0,
                scaleY: 0},
            fileUrl: ""
        },

        clothingData: {
            bool: true,
            clothing: 1,
            head: false,
            floatSequence: true
        }
    }
}