class Board {
    public width: number;
    public height: number;
    public resolution: number;
    public gameOver: boolean;
    private state: PlacedPiece[][];
    private activePiece: Piece;
    private placedPieces: PlacedPiece[];
    private possibleShapes: PossibleShape[];

    constructor(width: number, possibleShapes: PossibleShape[]) {
        if (width % 10 !== 0) {
            throw new Error('Width must be divisible by 10');
        } else if (width <= 100) {
            throw new Error('Width must be at least 100 pixels');
        }
        this.width = width;
        this.height = width * 2;
        this.resolution = width / 10;
        this.gameOver = false;
        this.state = new Array(10).fill(undefined).map(() => new Array(20).fill(undefined));
        this.placedPieces = new Array();
        this.possibleShapes = possibleShapes;
        this.activePiece = this.newPiece();
    }

    public draw(p: p5) {
        this.activePiece.draw(p);
        this.placedPieces.forEach((piece) => {
            piece.draw(p);
        });
        if (this.gameOver) {
            p.fill(255, 255, 255);
            p.textSize(40);
            p.textAlign(p.CENTER);
            p.text('Game Over', this.width / 2, this.height / 2);
        }
    }

    public tick() {
        if (this.gameOver) { return; }
        const points = this.activePiece.points;
        let over = false;
        this.state.forEach((column) => {
            if (column[0]) {
                over = true;
                return;
            }
        });
        if (over) {
            this.gameOver = true;
            return;
        }
        points.forEach((point) => {
            if (this.state[point.x][point.y + 1] !== undefined || point.y >= 19) {
                over = true;
                return;
            }
        });
        if (over) {
            this.placePiece();
            return;
        }
        points.forEach((point) => {
            point.y++;
        });
    }

    public translate(keyCode: number) {
        const points = this.activePiece.points;
        try {
            if (keyCode === 39) {
                let over = false;
                points.forEach((point) => {
                    if (this.state[point.x + 1][point.y]) {
                        over = true;
                        return;
                    }
                });
                if (over) { return; }

                points.forEach((point) => {
                    point.x++;
                });
            } else if (keyCode === 37) {
                let over = false;
                points.forEach((point) => {
                    if (this.state[point.x - 1][point.y]) {
                        over = true;
                        return;
                    }
                });
                if (over) { return; }

                points.forEach((point) => {
                    point.x--;
                });
            }
            // tslint:disable-next-line:no-empty
        } catch (error) { }
    }

    public rotate() {
        console.log('rotated');
    }

    private newPiece() {
        const copy: PossibleShape[] = this.possibleShapes.map((obj) => {
            const newObj = Object.assign({}, obj) as PossibleShape;
            newObj.points = newObj.points.map((point) => point.clone()) as Points;
            return newObj;
        });
        const shape = copy[Math.floor(Math.random() * copy.length)];
        const newPiece = new Piece(
            this.resolution,
            shape.points,
            shape.color,
        );
        return newPiece;
    }

    private placePiece() {
        const piece = this.activePiece;
        piece.points.forEach((point) => {
            this.state[point.x][point.y] = new PlacedPiece(this.resolution, new Point(point.x, point.y), piece.color);
            this.placedPieces.push(this.state[point.x][point.y]);
        });
        this.activePiece = this.newPiece();
    }
}
