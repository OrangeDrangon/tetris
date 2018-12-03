const sketch = function (p: p5) {
    this.size = 500;
    this.resolution = 10;
    p.setup = () => {
        p.createCanvas(this.size, this.size);
    }

    p.draw = () => {
        p.background(51);
    }
}

const p5Sketch = new p5(sketch);
