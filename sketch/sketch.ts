const sketch = (p: p5) => {
    p.setup = () => {
        p.createCanvas(250, 500);
        p.frameRate(15);
        this.board = new Board(250);

    }

    p.draw = () => {
        p.background(51);
        this.board.draw(p);
        this.board.tick();
    }
}

const p5Sketch = new p5(sketch);
