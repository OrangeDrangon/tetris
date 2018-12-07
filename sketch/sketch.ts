const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(250, 500);
        p.frameRate(60);
        this.board = new Board(250);
        this.keyManager = new KeyManager(p, {
            37: {
                func: (() => { this.board.translate(37); }),
                delay: 150,
            },
            38: {
                func: (() => { this.board.rotate(); }),
                delay: 200,
            },
            39: {
                func: (() => { this.board.translate(39); }),
                delay: 150,
            },
            40: {
                func: (() => { this.board.tick(); }),
                delay: 85,
            },
        });
        setInterval(() => { this.board.tick(); }, 550)
    }

    p.draw = () => {
        p.background(51);
        this.board.draw(p);
    }
}

const p5Sketch = new p5(sketch);
