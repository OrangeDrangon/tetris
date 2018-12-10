const possibleShapes: PossibleShape[] = [
    // square
    {
        color: { r: 225, g: 0, b: 0 },
        points: [
            new Point(0, -1),
            new Point(1, -1),
            new Point(0, -2),
            new Point(1, -2),
        ],
    },
    // line
    {
        color: { r: 9, g: 249, b: 249 },
        points: [
            new Point(0, -1),
            new Point(0, -2),
            new Point(0, -3),
            new Point(0, -4),
        ],
    },
    // L
    {
        color: { r: 229, g: 9, b: 249 },
        points: [
            new Point(0, -1),
            new Point(0, -2),
            new Point(1, -2),
            new Point(2, -2),
        ],
    },
    // backwards L
    {
        color: { r: 245, g: 249, b: 9 },
        points: [
            new Point(2, -1),
            new Point(0, -2),
            new Point(1, -2),
            new Point(2, -2),
        ],
    },
    // T
    {
        color: { r: 0, g: 225, b: 0 },
        points: [
            new Point(0, -1),
            new Point(2, -1),
            new Point(1, -1),
            new Point(1, -2),
        ],
    },
    // forwards Z
    {
        color: { r: 249, g: 133, b: 9 },
        points: [
            new Point(0, -1),
            new Point(1, -2),
            new Point(1, -1),
            new Point(2, -2),
        ],
    },
    // backwards Z
    {
        color: { r: 28, g: 9, b: 249 },
        points: [
            new Point(2, -1),
            new Point(0, -2),
            new Point(1, -1),
            new Point(1, -2),
        ],
    },
];

const sketch = (p: p5) => {
    p.setup = () => {
        const width = 300;
        p.createCanvas(width, width * 2);
        this.board = new Board(width, possibleShapes);
        this.keyManager = new KeyManager(p, {
            37: {
                delay: 150,
                func: (() => { this.board.translate(37); }),
            },
            38: {
                delay: 10000,
                func: (() => { this.board.rotate(); }),
            },
            39: {
                delay: 150,
                func: (() => { this.board.translate(39); }),
            },
            40: {
                delay: 85,
                func: (() => { this.board.tick(); }),
            },
            13: {
                delay: 10000,
                func: (() => { if (this.board.gameOver) { this.board = new Board(width, possibleShapes); } }),
            },
        });
        setInterval(() => { this.board.tick(); }, 550);
    };

    p.draw = () => {
        p.background(51);
        this.board.draw(p);
        // const link = document.getElementsByTagName('link')[0];
        // link.type = 'image/x-icon';
        // link.rel = 'shortcut icon';
        // link.href = document.getElementsByTagName('canvas')[0].toDataURL();
        // document.getElementsByTagName('head')[0].appendChild(link);
    };
};

const p5Sketch = new p5(sketch);
