class KeyManager {
    public intervals: KeyIntervals;
    constructor(p: p5, keyCallbacks: KeyCallbacks) {
        this.intervals = {};
        p.keyPressed = () => {
            try {
                if (!this.intervals[p.keyCode]) {
                    const keyCallback = keyCallbacks[p.keyCode];
                    keyCallback.func();
                    this.intervals[p.keyCode] = setInterval(keyCallback.func, keyCallback.delay);
                }
                // tslint:disable-next-line:no-empty
            } catch (error) { }
        };

        p.keyReleased = () => {
            for (const key in this.intervals) {
                if (this.intervals.hasOwnProperty(key)) {
                    const interval = this.intervals[key];
                    clearInterval(interval);
                    this.intervals[key] = undefined;
                }
            }
        };
    }
}
