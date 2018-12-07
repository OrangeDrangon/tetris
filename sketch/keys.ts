class KeyManager {
    public intervals: IKeyIntervals;
    constructor(p: p5, keyCallbacks: IKeyCallbacks) {
        this.intervals = {};
        p.keyPressed = () => {
            try {
                if (!this.intervals[p.keyCode]) {
                    const keyCallback = keyCallbacks[p.keyCode];
                    keyCallback.func();
                    this.intervals[p.keyCode] = setInterval(keyCallback.func, keyCallback.delay);
                }
            } catch (e) { }
        }

        p.keyReleased = () => {
            for (const key in this.intervals) {
                if (this.intervals.hasOwnProperty(key)) {
                    let interval = this.intervals[key];
                    clearInterval(interval);
                    this.intervals[key] = undefined;
                }
            }
        }
    }
}

interface IKeyCallbacks {
    [index: number]: { func: Function, delay: number };
    65?: { func: Function, delay: number };
    66?: { func: Function, delay: number };
    67?: { func: Function, delay: number };
    68?: { func: Function, delay: number };
    69?: { func: Function, delay: number };
    70?: { func: Function, delay: number };
    71?: { func: Function, delay: number };
    72?: { func: Function, delay: number };
    73?: { func: Function, delay: number };
    74?: { func: Function, delay: number };
    75?: { func: Function, delay: number };
    76?: { func: Function, delay: number };
    77?: { func: Function, delay: number };
    78?: { func: Function, delay: number };
    79?: { func: Function, delay: number };
    80?: { func: Function, delay: number };
    81?: { func: Function, delay: number };
    82?: { func: Function, delay: number };
    83?: { func: Function, delay: number };
    84?: { func: Function, delay: number };
    85?: { func: Function, delay: number };
    86?: { func: Function, delay: number };
    87?: { func: Function, delay: number };
    88?: { func: Function, delay: number };
    89?: { func: Function, delay: number };
    90?: { func: Function, delay: number };
    37?: { func: Function, delay: number };
    38?: { func: Function, delay: number };
    39?: { func: Function, delay: number };
    40?: { func: Function, delay: number };
}

interface IKeyIntervals {
    [index: number]: number;
    65?: number;
    66?: number;
    67?: number;
    68?: number;
    69?: number;
    70?: number;
    71?: number;
    72?: number;
    73?: number;
    74?: number;
    75?: number;
    76?: number;
    77?: number;
    78?: number;
    79?: number;
    80?: number;
    81?: number;
    82?: number;
    83?: number;
    84?: number;
    85?: number;
    86?: number;
    87?: number;
    88?: number;
    89?: number;
    90?: number;
    37?: number;
    38?: number;
    39?: number;
    40?: number;
}
