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

    p.keyPressed = () => {        
        if (p.keyCode === 37 || p.keyCode === 39) {
            this.board.translate(p.keyCode);
        } else if (p.keyCode === 38 || p.keyCode === 40) {
            this.board.rotate(p.keyCode);
        } else if (p.keyCode === 13 && this.board.gameOver) {
            this.board = new Board(250);
        }
    }
}

const p5Sketch = new p5(sketch);
