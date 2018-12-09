class Piece {
    public points: Points; // Bottom left corner then over then up
    public color: Color;
    private resolution: number;
    constructor(resolution: number, points: Points, color: Color) {
        this.points = points;
        this.color = color;
        this.resolution = resolution;
    }

    public draw(p: p5) {
        this.points.forEach((point) => {
            p.fill(this.color.r, this.color.g, this.color.b);
            p.rect(point.x * this.resolution, point.y * this.resolution, this.resolution, this.resolution);
        });
    }

    public toArray() {
        console.log(this.points);
    }
}
