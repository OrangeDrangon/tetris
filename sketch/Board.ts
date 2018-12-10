class Board {
    public width: number;
    public height: number;
    public resolution: number;
    public gameOver: boolean;
    public linesCleared: number;
    public level: number;
    private state: PlacedPiece[][];
    private activePiece: Piece;
    private possibleShapes: PossibleShape[];
    private interval: number;
    private tickRate: number;

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
        this.possibleShapes = possibleShapes;
        this.activePiece = this.newPiece();
        this.linesCleared = 0;
        this.level = 1;
        this.tickRate = 550;
        this.interval = setInterval(() => { this.tick(); }, this.tickRate);
    }

    public draw(p: p5) {
        this.activePiece.draw(p);
        this.state.forEach((column) => {
            column.forEach((piece) => {
                if (piece) { piece.draw(p); }
            });
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
        for (let i = 0; i < this.state[0].length; i++) {
            if (this.checkRow(i)) {
                this.linesCleared++;
                console.log(this.linesCleared);
                this.state.forEach((column) => {
                    column[i] = undefined;
                    for (let j = i; j >= 0; j--) {
                        if (column[j] && !column[j + 1]) {
                            column[j].location.y++;
                            column[j + 1] = column[j];
                            column[j] = undefined;
                        }
                    }
                });
                if (this.linesCleared % 10 === 0) {
                    this.level++;
                    console.log(this.level);
                    clearInterval(this.interval);
                    this.tickRate = Math.floor(0.85 * this.tickRate);
                    this.interval = setInterval(() => { this.tick(); }, this.tickRate);
                }
            }
        }
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
        if (this.activePiece.name === 'square') { return; }

        const newPoints = this.activePiece.rotate();

        if (!newPoints) { return; }

        let over = false;

        newPoints.forEach((point) => {
            if (this.state[point.x][point.y]) {
                over = true;
                return;
            }
        });

        if (over) { return; }

        this.activePiece.points = newPoints;
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
            shape.name,
        );
        return newPiece;
    }

    private placePiece() {
        const piece = this.activePiece;
        piece.points.forEach((point) => {
            this.state[point.x][point.y] = new PlacedPiece(this.resolution, new Point(point.x, point.y), piece.color);
        });
        this.activePiece = this.newPiece();
    }

    private checkRow(row: number) {
        let full = true;
        this.state.forEach((column) => {
            if (!(column[row] && full)) { full = false; }
        });
        return full;
    }
}
