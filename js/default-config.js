export const defaultConfig = {
    version: '1.0',
    timeoutMs: 100,
    durationSec: 10,
    tests: [
        {
            name: "Blink",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '11111',
                        '10101',
                        '11111',
                        '10101',
                        '11111'
                    ]
                },
                {
                    transX: 0,
                    transY: 0,
                    angle: 0,
                    points: [
                        '00000',
                        '01010',
                        '00000',
                        '01010',
                        '00000'
                    ]
                }
            ]
        },
        {
            name: "Rotate",
            states: [
                {
                    transX: 0,
                    transY: 0,
                    angle: -10,
                    points: [
                        '11111',
                        '10101',
                        '11111',
                        '10101',
                        '11111'
                    ]
                },
                {
                    transX: 0,
                    transY: 0,
                    angle: 10,
                    points: [
                        '11111',
                        '10101',
                        '11111',
                        '10101',
                        '11111'
                    ]
                }
            ]
        }
    ]
};
