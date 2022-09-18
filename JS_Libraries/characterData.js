const
    aniOffsets = [
        [1,1,1,2, 2,2,2,2, 2,2,2,2,
         3,3,3,3, 3,3,3,3, 3,3,4,4,
         4,4,4,4, 4,4], [1,2,3,4]],
    playerFloatOffsets = [0,1,2,2,1,0];

const
    transform = $('#transform'),
    amplifiedButton = $('#amplifiedButton'),

    head = $('#head'),
    headContainer = $('#headContainer'),
    body = $('#body'),
    playerModel = $('#playerModel'),
    characterUrl = $("#characterUrl");

const
    bodyParts = [
    '#body, #head'];

const
    defaultData = {
        settings: {
            resolution: {
                width: 24, height: 24,
                rows: 14, columns: 16},
            offset: {
                head: 0, body: 0},
            ampMultiplier: 1,
            floatSequence: undefined,
            fileUrl: "",
            head: true,
            amp: true},
        hat: {
            bool: true,
            offset: {
                top: 0, left: 0},
            sequence: [1, 2, 3, 4]},
        weapon: {
            bool: true,
            offset: {
                top: 0, left: 0},
            sequence: [1, 2, 3, 4]},
        ring: {
            bool: true,
            offset: {
                top: 0, left: 0},
            sequence: [1, 2, 3, 4]},
        boots: {
            bool: true,
            offset: {
                top: 0, left: 0},
            sequence: [1, 2, 3, 4]},
        charm: {
            bool: true,
            offset: {
                top: 0, left: 0,
                sequence: [1, 2, 3, 2]}},
        shovel: {
            bool: true,
            offset: {
                top: 0, left: 0}},
        torch: {
            bool: true,
            offset: {
                top: 0, left: 0},
            sequence: [1, 2, 3, 4],
            flip: false},
        hip: {
            bool: true,
            offset: {
                top: 0, left: 0
            },
            sequence: [4, 3, 2, 1]},
        // special: {
        //     bool: false,
        //     zIndex: 10,
        //     resolution: {
        //         height: 0, width: 0},
        //     displacement: {
        //         top: 0, left: 0},
        //     offset: {
        //         top: [0, 0, 0, 0],
        //         sequence: [0, 0, 0, 0],
        //         rotation: 0,
        //         flip: false
        //     },
        //     fileUrl: ""},

        // clothingData: {
        //         bool: true,
        //         clothing: 1,
        //         head: false,
        //         floatSequence: true}
    },

    dlcTypes = ["Base Game", "Amplified", "Synchrony"],
    characterData = [
        {
            name: "cadence",
            dlc: 0,
            settings: {
                fileUrl: "characters/player1"},
            shovel: {
                offset: {
                    top: 1}}
        },{
            name: "Melody",
            dlc: 0,
            settings: {
                fileUrl: "characters/char1"},
            weapon: {
                bool: false},
            ring: {
                offset: {
                    left: 4}}
        },{
            name: "Aria",
            dlc: 0,
            settings: {
                fileUrl: "characters/char2"}
        },{
            name: "Dorian",
            dlc: 0,
            settings: {
                resolution: {
                    width: 33, height: 32,
                    rows: 1},
                offset: {
                    head: 1, body: 4},
                fileUrl: "characters/char3"},
            hat: {
                offset: {
                    left: 4},
                sequence: [0, 0, 0, 0]},
            ring: {
                offset: {
                    top: 3, left: 4}},
            boots: {
                offset: {
                    top: 4, left: 4}},
            charm: {
                offset: {
                    top: 1, left: 4,
                    sequence: [2, 1, 1, 1]}},
            shovel: {
                offset: {
                    top: 2, left: 3}},
            torch: {
                offset: {
                    top: 4, left: 3},
                sequence: [2, 3, 4, 1]},
            hip: {
                offset: {
                    top: 2, left: 3}}
        },{
            name: "Eli",
            dlc: 0,
            settings: {
                resolution: {
                    width: 33, height: 28},
                fileUrl: "characters/char4"},
            hat: {
                bool: false},
            weapon: {
                bool: false},
            ring: {
                offset: {
                    top: 3, left: 4}},
            boots: {
                offset: {
                    top: 4, left: 4}},
            shovel: {
                bool: false},
            torch: {
                offset: {
                    top: 2, left: 6},
                flip: true},
            hip: {
                offset: {
                    top: 0, left: 3},
                sequence: [1,2,3,4]},
        },{
            name: "Monk",
            dlc: 0,
            settings: {
                fileUrl: "characters/char5"}
        },{
            name: "Dove",
            dlc: 0,
            settings: {
                offset: {
                    head: 4},
                fileUrl: "characters/char6"}
        },{
            name: "Coda",
            dlc: 0,
            settings: {
                resolution: {
                    width: 33, height: 30},
                fileUrl : "characters/char7"},
            hat: {
                bool: false},
            weapon: {
                bool: false},
            ring: {
                offset: {
                    top: 4, left: 4}},
            boots: {
                offset: {
                    top: 6, left: 4}},
            charm: {
                bool: true,
                offset: {
                    top: 2, left: 4,
                    sequence: [2, 0, -2, -1]}},
            shovel: {
                offset: {
                    top: 4, left: 4}}
        },{
            name: "Bolt",
            dlc: 0,
            settings: {
                fileUrl: "characters/char8"}
        },{
            name: "Bard",
            dlc: 0,
            settings: {
                fileUrl: "characters/char9"}
        },{
            name: "Nocturna",
            dlc: 1,
            settings: {
                resolution: {
                    width: 25, height: 27,
                    rows: 15},
                fileUrl: "characters/char10"},
            hat: {
                offset: {
                    top: 2, left: 2}},
            weapon: {
                offset: {
                    top: 3, left: 3}},
            ring: {
                offset: {
                    top: 2, left: 2}},
            boots: {
                offset: {
                    top: 3, left: 1}},
            charm: {
                offset: {
                    top: 2, left: 2,
                    sequence: [1, 2, 3, 2]}},
            shovel: {
                offset: {
                    top: 3, left: 1}},
            torch: {
                offset: {
                    top: 3, left: 2}},
            hip: {
                offset: {
                    top: 2, left: 2}},
            clothingData: {
                bool: true,
                clothing: 15,
                head: false,
                enable: itemEnable,
                disable: itemDisable,
                settings: {
                    hat: {
                        bool: false},
                    weapon: {
                        bool: false},
                    ring: {
                        bool: false},
                    boots: {
                        bool: false},
                    charm: {
                        bool: false},
                    shovel: {
                        bool: false},
                    torch: {
                        bool: false},
                    hip: {
                        bool: false}},
                floatSequence: true},
        },{
            name: "Diamond",
            dlc: 1,
            settings: {
                headOffset: {
                    top: 1},
                fileUrl : "characters/char11"},
            hip: {
                bool: false}
        },{
            name: "Mary",
            dlc: 1,
            settings: {
                fileUrl : "characters/char12"}
        },{
            name: "Tempo",
            dlc: 1,
            settings: {
                headOffset: {
                    top: 1},
                fileUrl : "characters/char12"}
        },{
            name: "Suzu",
            dlc: 2,
            settings: {
                resolution: {
                    width: 25, height: 28},
                fileUrl : "characters/Suzu"},
            hat: {
                offset: {
                    top: 2, left: 2}},
            weapon: {
                bool: false},
            ring: {
                offset: {
                    top: 2, left: 2}},
            boots: {
                offset: {
                    top: 4, left: 1}},
            charm: {
                offset: {
                    top: 3, left: 2}},
            shovel: {
                offset: {
                    top: 3, left: 1}},
            torch: {
                offset: {
                    top: 4, left: 2}},
            hip: {
                offset: {
                    top: 2, left: 2}},
            special: {
                bool: true,
                resolution: {
                    height: 24, width: 24},
                displacement: {
                    top: 2, left: 2},
                offset: {
                    sequence: [1, 2, 3, 4]},
                fileUrl : "weapon_lance"}
        },{
            name: "chaunter",
            dlc: 2,
            settings: {
                resolution: {
                    width: 27, height: 26,
                    rows: 1, columns: 9},
                fileUrl : "characters/Chaunter",
                head: false,
                amp: false},
            hat: {
                bool: false},
            weapon: {
                bool: false},
            ring: {
                bool: false},
            boots: {
                bool: false},
            charm: {
                bool: false},
            torch: {
                bool: false},
            hip: {
                bool: false},
            special: {
                bool: true,
                zIndex: 0,
                resolution: {
                    height: 27, width: 27},
                displacement: {
                    top: 0, left: 0},
                offset: {
                    top: [1, 1, 1, 1],
                    sequence: [1, 2, 3, 4]},
                fileUrl : "chaunter_lantern"},
            clothingData: {
                bool: true,
                clothing: 1,
                head: false,
                floatSequence: true}
        },{
            name: "Klarinetta",
            dlc: 2,
            settings: {
                resolution: {
                    width: 26, height: 30,
                    rows: 1, columns: 32
                },
                ampMultiplier: 1,
                fileUrl: "characters/Klarinetta"},
            hat: {
                offset: {
                    top: 1, left: 1}},
            weapon: {
                bool: false},
            ring: {
                offset: {
                    top: 3, left: 2}},
            boots: {
                offset: {
                    top: 5, left: 1}},
            charm: {
                offset: {
                    top: 2, left: 1,
                    sequence: [1, 1, 2, 2]}},
            shovel: {
                offset: {
                    top: 3, left: 1}},
            torch: {
                offset: {
                    top: 8, left: 4},
                sequence: [1, 4, 3, 2]},
            hip: {
                offset: {
                    top: 2, left: 1}},
            special: {
                bool: true,
                zIndex: 10,
                resolution: {
                    height: 28, width: 28},
                displacement: {
                    top: 19, left: 13},
                offset: {
                    top: [1, 1, 1, 2],
                    sequence: [1, 1, 1, 1],
                    rotation: 180},
                fileUrl: "weapon_greatsword"
            }
        },{
            name: "custom",
            dlc: 2,
        }
    ]