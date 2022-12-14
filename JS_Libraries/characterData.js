const
    aniOffsets = [
        [1,1,1,2, 2,2,2,2, 2,2,2,2,
         3,3,3,3, 3,3,3,3, 3,3,4,4,
         4,4,4,4, 4,4], [1,2,3,4]];

const
    transform = $('#transform'),
    amplifiedButton = $('#amplifiedButton');

const
    dlcTypes = ["Base Game", "Amplified", "Synchrony"],
    characterData = [
        {
            name: "Cadence",
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
                sequence: [2, 1, 1, 1]},
            weapon: {
                offset: {
                    top: 3, left: 9}},
            ring: {
                offset: {
                    top: 3, left: 4}},
            boots: {
                offset: {
                    top: 4, left: 4}},
            charm: {
                offset: {
                    top: 1, left: 4},
                sequence: [2, 1, 1, 1]},
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
            charm: {
                offset: {
                    left: 4},
                sequence: [2, 1, 1, 1]},
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
                    sequence: [3, 2, 1, 2]},},
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
                    top: 4, left: 1}},
            charm: {
                offset: {
                    top: 2, left: 2}},
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
                clothing: 15,
                head: false,
                // enable: itemEnable,
                // disable: itemDisable,
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
                fileUrl : "characters/char13"}
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
                    top: 4, left: 2,
                    sequence: [1, 1, 1, 2]},
                offset: {
                    sequence: [1, 2, 3, 4]},
                fileUrl : "items/weapon_lance"}
        },{
            name: "Chaunter",
            dlc: 2,
            settings: {
                resolution: {
                    width: 27, height: 26,
                    rows: 1, columns: 9},
                fileUrl : "characters/Chaunter",
                floatSequence : true,
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
                    sequence: [1, 2, 3, 4]},
                fileUrl : "items/chaunter_lantern"},
        },{
            name: "Klarinetta",
            dlc: 2,
            settings: {
                resolution: {
                    width: 26, height: 30,
                    rows: 1, columns: 32
                },
                offset: {
                    body: 1},
                ampMultiplier: 1,
                fileUrl: "characters/Klarinetta"},
            hat: {
                offset: {
                    top: 1, left: 1,}},
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
                    top: 19, left: 13,
                    sequence: [1, 1, 1, 2]},
                sequence: [1, 1, 1, 1],
                transform: {
                    scaleX: -1,
                    scaleY: -1},
                fileUrl: "items/weapon_greatsword"
            }
        },{
            name: "custom",
            dlc: 2,
        }
    ]