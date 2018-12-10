var Board = (function () {
    function Board(width, possibleShapes) {
        if (width % 10 !== 0) {
            throw new Error('Width must be divisible by 10');
        }
        else if (width <= 100) {
            throw new Error('Width must be at least 100 pixels');
        }
        this.width = width;
        this.height = width * 2;
        this.resolution = width / 10;
        this.gameOver = false;
        this.state = new Array(10).fill(undefined).map(function () { return new Array(20).fill(undefined); });
        this.possibleShapes = possibleShapes;
        this.activePiece = this.newPiece();
    }
    Board.prototype.draw = function (p) {
        this.activePiece.draw(p);
        this.state.forEach(function (column) {
            column.forEach(function (piece) {
                if (piece) {
                    piece.draw(p);
                }
            });
        });
        if (this.gameOver) {
            p.fill(255, 255, 255);
            p.textSize(40);
            p.textAlign(p.CENTER);
            p.text('Game Over', this.width / 2, this.height / 2);
        }
    };
    Board.prototype.tick = function () {
        var _this = this;
        if (this.gameOver) {
            return;
        }
        var _loop_1 = function (i) {
            if (this_1.checkRow(i)) {
                this_1.state.forEach(function (column) {
                    column[i] = undefined;
                    for (var j = i; j >= 0; j--) {
                        if (column[j] && !column[j + 1]) {
                            column[j].location.y++;
                            column[j + 1] = column[j];
                            column[j] = undefined;
                        }
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.state[0].length; i++) {
            _loop_1(i);
        }
        var points = this.activePiece.points;
        var over = false;
        this.state.forEach(function (column) {
            if (column[0]) {
                over = true;
                return;
            }
        });
        if (over) {
            this.gameOver = true;
            return;
        }
        points.forEach(function (point) {
            if (_this.state[point.x][point.y + 1] !== undefined || point.y >= 19) {
                over = true;
                return;
            }
        });
        if (over) {
            this.placePiece();
            return;
        }
        points.forEach(function (point) {
            point.y++;
        });
    };
    Board.prototype.translate = function (keyCode) {
        var _this = this;
        var points = this.activePiece.points;
        try {
            if (keyCode === 39) {
                var over_1 = false;
                points.forEach(function (point) {
                    if (_this.state[point.x + 1][point.y]) {
                        over_1 = true;
                        return;
                    }
                });
                if (over_1) {
                    return;
                }
                points.forEach(function (point) {
                    point.x++;
                });
            }
            else if (keyCode === 37) {
                var over_2 = false;
                points.forEach(function (point) {
                    if (_this.state[point.x - 1][point.y]) {
                        over_2 = true;
                        return;
                    }
                });
                if (over_2) {
                    return;
                }
                points.forEach(function (point) {
                    point.x--;
                });
            }
        }
        catch (error) { }
    };
    Board.prototype.rotate = function () {
        var _this = this;
        if (this.activePiece.name === 'square') {
            return;
        }
        var newPoints = this.activePiece.rotate();
        if (!newPoints) {
            return;
        }
        var over = false;
        newPoints.forEach(function (point) {
            if (_this.state[point.x][point.y]) {
                over = true;
                return;
            }
        });
        if (over) {
            return;
        }
        this.activePiece.points = newPoints;
    };
    Board.prototype.newPiece = function () {
        var copy = this.possibleShapes.map(function (obj) {
            var newObj = Object.assign({}, obj);
            newObj.points = newObj.points.map(function (point) { return point.clone(); });
            return newObj;
        });
        var shape = copy[Math.floor(Math.random() * copy.length)];
        var newPiece = new Piece(this.resolution, shape.points, shape.color, shape.name);
        return newPiece;
    };
    Board.prototype.placePiece = function () {
        var _this = this;
        var piece = this.activePiece;
        piece.points.forEach(function (point) {
            _this.state[point.x][point.y] = new PlacedPiece(_this.resolution, new Point(point.x, point.y), piece.color);
        });
        this.activePiece = this.newPiece();
    };
    Board.prototype.checkRow = function (row) {
        var full = true;
        this.state.forEach(function (column) {
            if (!(column[row] && full)) {
                full = false;
            }
        });
        return full;
    };
    return Board;
}());
var KeyManager = (function () {
    function KeyManager(p, keyCallbacks) {
        var _this = this;
        this.intervals = {};
        p.keyPressed = function () {
            try {
                if (!_this.intervals[p.keyCode]) {
                    var keyCallback = keyCallbacks[p.keyCode];
                    keyCallback.func();
                    _this.intervals[p.keyCode] = setInterval(keyCallback.func, keyCallback.delay);
                }
            }
            catch (error) { }
        };
        p.keyReleased = function () {
            for (var key in _this.intervals) {
                if (_this.intervals.hasOwnProperty(key)) {
                    var interval = _this.intervals[key];
                    clearInterval(interval);
                    _this.intervals[key] = undefined;
                }
            }
        };
    }
    return KeyManager;
}());
var Piece = (function () {
    function Piece(resolution, points, color, name) {
        this.points = points;
        this.color = color;
        this.resolution = resolution;
        this.name = name;
    }
    Piece.prototype.draw = function (p) {
        var _this = this;
        this.points.forEach(function (point) {
            p.fill(_this.color.r, _this.color.g, _this.color.b);
            p.rect(point.x * _this.resolution, point.y * _this.resolution, _this.resolution, _this.resolution);
        });
    };
    Piece.prototype.rotate = function () {
        var angle = Math.PI / 2;
        var s = Math.sin(angle);
        var c = Math.cos(angle);
        var newPoints = [];
        var origin = new Point(this.points[2].x + 1, 20 - this.points[2].y + 1);
        this.points.forEach(function (point) {
            var transformedX = point.x + 1 - origin.x;
            var transformedY = (20 - point.y + 1) - origin.y;
            var newX = (transformedX * c - transformedY * s) + origin.x - 1;
            var newY = 20 - ((transformedX * s + transformedY * c) + origin.y - 1);
            if (newX >= 10 || newX < 0 || newY >= 20 || newY < 0) {
                return;
            }
            newPoints.push(new Point(newX, newY));
        });
        if (newPoints.length !== 4) {
            return;
        }
        return newPoints;
    };
    return Piece;
}());
var PlacedPiece = (function () {
    function PlacedPiece(resolution, location, color) {
        this.location = location;
        this.color = color;
        this.resolution = resolution;
    }
    PlacedPiece.prototype.draw = function (p) {
        p.fill(this.color.r, this.color.g, this.color.b);
        p.rect(this.location.x * this.resolution, this.location.y * this.resolution, this.resolution, this.resolution);
    };
    return PlacedPiece;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    return Point;
}());
var _this = this;
var possibleShapes = [
    {
        color: { r: 225, g: 0, b: 0 },
        name: 'square',
        points: [
            new Point(0, -1),
            new Point(1, -1),
            new Point(0, -2),
            new Point(1, -2),
        ],
    },
    {
        color: { r: 9, g: 249, b: 249 },
        name: 'line',
        points: [
            new Point(0, -1),
            new Point(0, -2),
            new Point(0, -3),
            new Point(0, -4),
        ],
    },
    {
        color: { r: 229, g: 9, b: 249 },
        points: [
            new Point(0, -1),
            new Point(0, -2),
            new Point(1, -2),
            new Point(2, -2),
        ],
    },
    {
        color: { r: 245, g: 249, b: 9 },
        points: [
            new Point(2, -1),
            new Point(0, -2),
            new Point(1, -2),
            new Point(2, -2),
        ],
    },
    {
        color: { r: 0, g: 225, b: 0 },
        points: [
            new Point(0, -1),
            new Point(2, -1),
            new Point(1, -1),
            new Point(1, -2),
        ],
    },
    {
        color: { r: 249, g: 133, b: 9 },
        points: [
            new Point(0, -1),
            new Point(1, -2),
            new Point(1, -1),
            new Point(2, -2),
        ],
    },
    {
        color: { r: 28, g: 9, b: 249 },
        points: [
            new Point(2, -1),
            new Point(0, -2),
            new Point(1, -1),
            new Point(1, -2),
        ],
    },
];
var sketch = function (p) {
    p.setup = function () {
        var width = 300;
        p.createCanvas(width, width * 2);
        _this.board = new Board(width, possibleShapes);
        _this.keyManager = new KeyManager(p, {
            37: {
                delay: 150,
                func: (function () { _this.board.translate(37); }),
            },
            38: {
                delay: 10000,
                func: (function () { _this.board.rotate(); }),
            },
            39: {
                delay: 150,
                func: (function () { _this.board.translate(39); }),
            },
            40: {
                delay: 85,
                func: (function () { _this.board.tick(); }),
            },
            13: {
                delay: 10000,
                func: (function () { if (_this.board.gameOver) {
                    _this.board = new Board(width, possibleShapes);
                } }),
            },
        });
        setInterval(function () { _this.board.tick(); }, 550);
    };
    p.draw = function () {
        p.background(51);
        _this.board.draw(p);
    };
};
var p5Sketch = new p5(sketch);