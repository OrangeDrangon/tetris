class Piece {
    public points: Points; // Bottom left corner then over then up
    public color: Color;
    public name: string;
    private resolution: number;
    constructor(resolution: number, points: Points, color: Color, name?: string) {
        this.points = points;
        this.color = color;
        this.resolution = resolution;
        this.name = name;
    }

    public draw(p: p5) {
        this.points.forEach((point) => {
            p.fill(this.color.r, this.color.g, this.color.b);
            p.rect(point.x * this.resolution, point.y * this.resolution, this.resolution, this.resolution);
        });
    }

    public rotate() {
        const angle = Math.PI / 2;
        const s = Math.sin(angle);
        const c = Math.cos(angle);

        const newPoints: Point[] = [];

        const origin = new Point(this.points[2].x + 1, 20 - this.points[2].y + 1);

        this.points.forEach((point) => {
            const transformedX = point.x + 1 - origin.x;
            const transformedY = (20 - point.y + 1) - origin.y;

            const newX = (transformedX * c - transformedY * s) + origin.x - 1;
            const newY = 20 - ((transformedX * s + transformedY * c) + origin.y - 1);

            if (newX >= 10 || newX < 0 || newY >= 20 || newY < 0) { return; }

            newPoints.push(new Point(newX, newY));
        });

        if (newPoints.length !== 4) { return; }

        return newPoints as Points;
    }
}
