class PlacedPiece {
    public location: Point;
    public color: Color;
    public resolution: number;
    constructor(resolution: number, location: Point, color: Color) {
        this.location = location;
        this.color = color;
        this.resolution = resolution;
    }

    public draw(p: p5) {
        p.fill(this.color.r, this.color.g, this.color.b);
        p.rect(this.location.x * this.resolution, this.location.y * this.resolution, this.resolution, this.resolution);
    }
}
