
const
    dlcTypes = [ // preset DLC names
            "Base Game",
            "Amplified",
            "Synchrony",
            "Custom"
        ],
    aniOffsets = [ // animation offsets
        [
            1,1,1,
            2,2,2,2,2,2,2,
            3,3,3,3,3,3,3,3,3,
            4,4,4,4,4,4,
        ],[
            1, 2, 3, 4,
        ]
    ],
    floatOffsets = [ // preset character float offsets
        8,9,10,11,10,9
    ];

const
    characterData = [
        {
            name:   "Cadence",
            dlc:    0,
            settings: {
                fileUrl:    "characters/player1",
            },
            shovel: {
                offset: {
                    top: 1
                }
            }
        },
        {
            name:   "Melody",
            dlc:    0,
            settings: {
                fileUrl:    "characters/char1",
            },
            weapon: {
                bool:   false
            },
            ring: {
                offset: {
                    left:   4
                }
            }
        },
        {
            name:   "Aria",
            dlc:    0,
            settings: {
                fileUrl: "characters/char2",
            }
        },
        {
            name:   "Dorian",
            dlc:    0,
            settings: {
                resolution: {
                    width:  33,
                    height: 32,
                    rows:   1
                },
                offset: {
                    head:   1,
                    body:   4
                },
                fileUrl: "characters/char3",
            },
            hat: {
                offset: {
                    left:   4
                },
                sequence:   [2, 1, 1, 1]
            },
            weapon: {
                offset: {
                    top:    3,
                    left:   9
                }
            },
            ring: {
                offset: {
                    top:    3,
                    left:   4
                }
            },
            boots: {
                offset: {
                    top:    4,
                    left:   4
                }
            },
            charm: {
                offset: {
                    top:    1,
                    left:   4
                },
                sequence:   [2, 1, 1, 1]
            },
            shovel: {
                offset: {
                    top:    2,
                    left:   3
                }
            },
            torch: {
                offset: {
                    top:    4,
                    left:   3
                },
                sequence: [2, 3, 4, 1]
            },
            hip: {
                offset: {
                    top:    2,
                    left:   3
                }
            }
        },
        {
            name: "Eli",
            dlc: 0,
            settings: {
                resolution: {
                    width:  33,
                    height: 28
                },
                fileUrl: "characters/char4",
            },
            hat: {
                bool:   false
            },
            weapon: {
                bool:   false
            },
            ring: {
                offset: {
                    top:    3,
                    left:   4
                }
            },
            boots: {
                offset: {
                    top:    4,
                    left:   4
                }
            },
            charm: {
                offset: {
                    left:   4
                },
                sequence:   [2, 1, 1, 1]
            },
            shovel: {
                bool:   false
            },
            torch: {
                offset: {
                    top:    2,
                    left:   6
                },
                flip:   true
            },
            hip: {
                offset: {
                    top:    0,
                    left:   3
                },
                sequence:   [1,2,3,4]
            },
        },
        {
            name:   "Monk",
            dlc:    0,
            settings: {
                fileUrl:    "characters/char5",
            }
        },
        {
            name:   "Dove",
            dlc:    0,
            settings: {
                offset: {
                    head:   4
                },
                fileUrl:    "characters/char6",
            }
        },
        {
            name:   "Coda",
            dlc:    0,
            settings: {
                resolution: {
                    width:  33,
                    height: 30
                },
                fileUrl:    "characters/char7",
            },
            hat: {
                bool:   false
            },
            weapon: {
                bool:   false
            },
            ring: {
                offset: {
                    top:    4,
                    left:   4
                }
            },
            boots: {
                offset: {
                    top:    6,
                    left:   4
                }
            },
            charm: {
                bool:   true,
                offset: {
                    top:    2,
                    left:   4
                },
                sequence:   [3, 2, 1, 2]
            },
            shovel: {
                offset: {
                    top:    4,
                    left:   4
                }
            },
            torch: {
                offset: {
                    top:    5,
                    left:   2
                }
            },
            hip: {
                offset: {
                    top:    2,
                    left:   4
                },
                sequence:   [4, 1, 2, 3]
            }
        },
        {
            name:   "Bolt",
            dlc:    0,
            settings: {
                fileUrl: "characters/char8",
            }
        },
        {
            name:   "Bard",
            dlc:    0,
            settings: {
                fileUrl: "characters/char9",
            }
        },
        {
            name:   "Reaper",
            dlc:    0,
            settings: {
                offset: {
                    head:   1
                },
                fileUrl: "characters/char14",
            },
            special: {
                bool:       true,
                resolution: {
                    height: 23,
                    width:  17
                },
                displacement: {
                    top:    -1,
                    left:   -20,
                    float:  true,
                    fixed:  true
                },
                offset: {
                    sequence: [0, 1, 2, 3]
                },
                transform: {
                    opacity:    0.5,
                    scaleX:     1,
                    scaleY:     -1
                },
                fileUrl: "items/familiar_soul"
            }
        },
        {
            name:   "Nocturna",
            dlc:    1,
            settings: {
                resolution: {
                    width:  25,
                    height: 27,
                    rows:   15
                },
                fileUrl: "characters/char10",
            },
            hat: {
                offset: {
                    top:    1,
                    left:   2
                }
            },
            weapon: {
                offset: {
                    top:    3,
                    left:   3
                }
            },
            ring: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            boots: {
                offset: {
                    top:    4,
                    left:   1
                }
            },
            charm: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            shovel: {
                offset: {
                    top:    3,
                    left:   1
                }
            },
            torch: {
                offset: {
                    top:    3,
                    left:   2
                }
            },
            hip: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            clothingData: {
                14: {
                    head:   false,
                    settings: [
                        {
                            name:   "hat",
                            bool:   false,
                        },{
                            name:   "weapon",
                            bool:   false
                        },{
                            name:   "ring",
                            bool:   false
                        },{
                            name:   "boots",
                            bool:   false
                        },{
                            name:   "charm",
                            bool:   false
                        },{
                            name:   "shovel",
                            bool:   false
                        },{
                            name:   "torch",
                            bool:   false
                        },{
                            name:   "hip",
                            bool:   false
                        }
                    ],
                    floatSequence: true
                },
            },
        },
        {
            name:   "Diamond",
            dlc:    1,
            settings: {
                headOffset: {
                    top: 1
                },
                fileUrl: "characters/char11"
            },
            hip: {
                bool: false
            }
        },
        {
            name:   "Mary",
            dlc:    1,
            settings: {
                fileUrl : "characters/char12"
            }
        },
        {
            name:   "Tempo",
            dlc:    1,
            settings: {
                headOffset: {
                    top:    1
                },
                fileUrl:    "characters/char13"
            }
        },
        {
            name:   "Suzu",
            dlc:    2,
            settings: {
                resolution: {
                    width:  25,
                    height: 28
                },
                fileUrl:    "characters/Suzu",
                headExt:    "_head",
                bodyExt:    "_body",
            },
            hat: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            weapon: {
                bool: false
            },
            ring: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            boots: {
                offset: {
                    top:    4,
                    left:   1
                }
            },
            charm: {
                offset: {
                    top:    3,
                    left:   2
                }
            },
            shovel: {
                offset: {
                    top:    3,
                    left:   1
                }
            },
            torch: {
                offset: {
                    top:    4,
                    left:   2
                }
            },
            hip: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            special: {
                bool:   true,
                resolution: {
                    height:     24,
                    width:      24
                },
                displacement: {
                    top:        4,
                    left:       2,
                    sequence:   [1, 1, 1, 2]
                },
                offset: {
                    sequence:   [1, 2, 3, 4]
                },
                fileUrl: "items/weapon_lance"
            }
        },
        {
            name:   "Chaunter",
            dlc:    2,
            settings: {
                resolution: {
                    width:      27,
                    height:     26,
                    rows:       1,
                    columns:    9
                },
                fileUrl:    "characters/chaunter",
                bodyExt:    "_body",
                amp:        false
            },
            hat: {
                bool:   false
            },
            weapon: {
                bool:   false
            },
            ring: {
                bool:   false
            },
            boots: {
                bool:   false
            },
            charm: {
                bool:   false
            },
            torch: {
                bool:   false
            },
            hip: {
                bool:   false
            },
            special: {
                bool:   true,
                zIndex: 0,
                resolution: {
                    height: 27,
                    width:  27
                },
                displacement: {
                    top:    0,
                    left:   0
                },
                offset: {
                    sequence:   [1, 2, 3, 4]
                },
                fileUrl:    "items/chaunter_lantern"
            },
            clothingData: {
                0: {
                    head:           false,
                    floatSequence:  true
                }
            }
        },
        {
            name: "Klarinetta",
            dlc: 2,
            settings: {
                resolution: {
                    width:      26,
                    height:     30,
                    rows:       1,
                    columns:    32
                },
                offset: {
                    body:   1
                },
                ampMultiplier:  2,
                fileUrl:        "characters/klarinetta",
                headExt:        "_head",
                bodyExt:        "_body",
            },
            hat: {
                offset: {
                    top:    1,
                    left:   1
                },
                sequence:   [1, 1, 2, 2]
            },
            weapon: {
                bool: false
            },
            ring: {
                offset: {
                    top:    3,
                    left:   2
                }
            },
            boots: {
                offset: {
                    top:    5,
                    left:   1
                }
            },
            charm: {
                offset: {
                    top:        2,
                    left:       1,
                    sequence:   [1, 2, 2, 1]
                }
            },
            shovel: {
                offset: {
                    top:    3,
                    left:   1
                }
            },
            torch: {
                offset: {
                    top:    8,
                    left:   4
                },
                sequence:   [1, 4, 3, 2]
            },
            hip: {
                offset: {
                    top:    2,
                    left:   1
                }
            },
            special: {
                bool:       true,
                zIndex:     10,
                resolution: {
                    height: 28,
                    width:  28
                },
                displacement: {
                    top:        19,
                    left:       13,
                    sequence:   [1, 1, 1, 2]
                },
                sequence:       [1, 1, 1, 1],
                transform: {
                    scaleX:     -1,
                    scaleY:     -1
                },
                fileUrl: "items/weapon_greatsword"
            }
        },
        { // all this is the same as nocturna.
            name: "Vahn",
            dlc: 3,
            settings: {
                resolution: {
                    width:  25,
                    height: 27,
                    rows:   15
                },
                fileUrl: "characters/vahn"
            },
            hat: {
                offset: {
                    top:    1,
                    left:   2
                }
            },
            weapon: {
                offset: {
                    top:    3,
                    left:   3
                }
            },
            ring: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            boots: {
                offset: {
                    top:    4,
                    left:   1
                }
            },
            charm: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            shovel: {
                offset: {
                    top:    3,
                    left:   1
                }
            },
            torch: {
                offset: {
                    top:    3,
                    left:   2
                }
            },
            hip: {
                offset: {
                    top:    2,
                    left:   2
                }
            },
            clothingData: {
                14: {
                    head:           false,
                    floatSequence:  true,
                    settings: [
                        {
                            name: "hat",
                            bool: false
                        },{
                            name: "weapon",
                            bool: false
                        },{
                            name: "ring",
                            bool: false
                        },{
                            name: "boots",
                            bool: false
                        },{
                            name: "charm",
                            bool: false
                        },{
                            name: "shovel",
                            bool: false
                        },{
                            name: "torch",
                            bool: false
                        },{
                            name: "hip",
                            bool: false
                        }
                    ],
                },
            },
        },
        { // same as Klarinetta.
            name: "Yumi",
            dlc: 3,
            settings: {
                resolution: {
                    width:      26,
                    height:     30,
                    rows:       1,
                    columns:    32
                },
                offset: {
                    body:   1
                },
                ampMultiplier:  2,
                fileUrl:        "characters/yumi"
            },
            hat: {
                offset: {
                    top:    1,
                    left:   1
                },
                sequence:   [1, 1, 2, 2]
            },
            weapon: {
                bool: false
            },
            ring: {
                offset: {
                    top:    3,
                    left:   2
                }
            },
            boots: {
                offset: {
                    top:    5,
                    left:   1
                }
            },
            charm: {
                offset: {
                    top:        2,
                    left:       1,
                    sequence:   [1, 2, 2, 1]
                }
            },
            shovel: {
                offset: {
                    top:    3,
                    left:   1
                }
            },
            torch: {
                offset: {
                    top:    8,
                    left:   4
                },
                sequence:   [1, 4, 3, 2]
            },
            hip: {
                offset: {
                    top:    2,
                    left:   1
                }
            },
            special: {
                bool:       true,
                zIndex:     10,
                resolution: {
                    height: 28,
                    width:  28
                },
                displacement: {
                    top:        19,
                    left:       13,
                    sequence:   [1, 1, 1, 2]
                },
                sequence:       [1, 1, 1, 1],
                transform: {
                    scaleX:     -1,
                    scaleY:     -1
                },
                fileUrl: "items/weapon_greatHammer"
            },
        },{
            name: "AltVahn",
            dlc: 3,
            settings: {
                resolution: {
                    width:      21,
                    height:     27,
                    rows:       2,
                    columns:    4
                },
                offset: {
                    body:   1
                },
                fileUrl:    "characters/clone_vahn",
                bodyExt:    "",
                amp:        false,
            },
            clothingData: {
                0: {
                    head: false,},
                1: {
                    head: false,}
            }
        },{
            name: "AltYumi",
            dlc: 3,
            settings: {
                resolution: {
                    width:      26,
                    height:     30,
                    rows:       2,
                    columns:    4
                },
                offset: {
                    body:   1
                },
                fileUrl:    "characters/clone_yumi",
                bodyExt:    "",
                amp:        false,
            },
            clothingData: {
                0: {
                    head: false,},
                1: {
                    head: false,}
            }
        }
    ]