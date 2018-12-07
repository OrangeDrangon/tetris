const possibleShapes: Points[] = [
    [
        new Point(0, -1),
        new Point(1, -1),
        new Point(0, -2),
        new Point(1, -2),
    ],
    [
        new Point(0, -1),
        new Point(0, -2),
        new Point(0, -3),
        new Point(0, -4),
    ],
    [
        new Point(0, -1),
        new Point(0, -2),
        new Point(1, -2),
        new Point(2, -2),
    ],
    [
        new Point(2, -1),
        new Point(0, -2),
        new Point(1, -2),
        new Point(2, -2),
    ],
    [
        new Point(0, -1),
        new Point(1, -1),
        new Point(2, -1),
        new Point(1, -2),
    ],
    [
        new Point(0, -1),
        new Point(1, -1),
        new Point(1, -2),
        new Point(2, -2),
    ],
    [
        new Point(1, -1),
        new Point(2, -1),
        new Point(0, -2),
        new Point(1, -2),
    ],
];

const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(250, 500);
        p.frameRate(60);
        this.board = new Board(250, possibleShapes);
        this.keyManager = new KeyManager(p, {
            37: {
                delay: 150,
                func: (() => { this.board.translate(37); }),
            },
            38: {
                delay: 200,
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
        });
        setInterval(() => { this.board.tick(); }, 550);
    };

    p.draw = () => {
        p.background(51);
        this.board.draw(p);
    };
};

const p5Sketch = new p5(sketch);
