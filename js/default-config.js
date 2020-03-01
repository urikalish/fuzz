export const defaultConfig = {
    timeoutMs: -1,
    //durationSec: 10,
    tests: [
        {
            name: "Ref",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '1111',
                        '1111',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                    ]
                },
            ]
        },
        {
            name: "Rotate",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '1111',
                        '1111',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                    ]
                },
                {
                    transX: 0,
                    transY: 0,
                    angle: 10,
                    points: [
                        '1111',
                        '1111',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                    ]
                }
            ]
        },
        {
            name: "Translate",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '1111',
                        '1111',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                    ]
                },
                {
                    transX: 0.5,
                    transY: 0,
                    angle: 0,
                    points: [
                        '1111',
                        '1111',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                        '1100',
                    ]
                }
            ]
        },
        {
            name: "Blink",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '11111',
                        '11111',
                        '11111',
                        '11111',
                        '11111'
                    ]
                },
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '00000',
                        '00000',
                        '00000',
                        '00000',
                        '00000'
                    ]
                }
            ]
        },
    ]
};
