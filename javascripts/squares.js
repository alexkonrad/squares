(function(root) {
    var Squares = root.Squares = (root.Squares || {})

    var TILE_WIDTH = Squares.TILE_WIDTH =  50;
    var TILE_HEIGHT = Squares.TILE_HEIGHT = 50;
    var MIN_SPEED = Squares.MIN_SPEED = .5;

    var Square = Squares.Square = function (options) {
        this._speed = options.speed;
        this._dir = options.dir;
        this._window_width = options.width;
        this._window_height = options.height;

        this._el = document.createElement('article');
        this._el.setAttribute('id', options.id)
        this._el.style.left = options.x
        this._el.style.top = options.y
        this._el.style.background = options.color
    };
    
    Square.prototype.move = function () {
        var curPos = this._getPos();
        var newPos = new Array();

        this._checkBounds();

        newPos[0] = curPos[0] + (this._dir[0] * (2 * this._speed[0]));
        newPos[1] = curPos[1] + (this._dir[1] * (2 * this._speed[1]));   

        this._setPos(newPos);
    };

    Square.prototype._getPos = function () {
        return [parseInt(this._el.style.left), parseInt(this._el.style.top)];
    };

    Square.prototype._setPos = function (pos) {
        this._el.style.left = pos[0];
        this._el.style.top = pos[1];
    };

    Square.prototype._checkBounds = function () {
        var currentPos = this._getPos();
        var borderRight = this._window_width - TILE_WIDTH;
        var borderBottom = this._window_height - TILE_HEIGHT;

        // reverse direction if necessary
        if (currentPos[0] < 0 || currentPos[0] > borderRight) {
            this._dir[0] *= -1;
        } else if (currentPos[1] < 0) {
            this._dir[1] *= -1;
        } else if (currentPos[1] > borderBottom) {
            this._dir[1] *= -1;
            this._speed[1] = MIN_SPEED + Math.random();
        }
    }
})(this);