(function(root) {
    var Squares = root.Squares = (root.Squares || {})

    var WINDOW_WIDTH = 400;
    var WINDOW_HEIGHT = 400;
    var TILE_WIDTH = 50;
    var TILE_HEIGHT = 50;
    var MIN_SPEED = .5;
    var squares = Squares.squares = [];
    var $section = undefined;
    var $fragment = document.createDocumentFragment();

    var Square = Squares.Square = function (options) {
        this._speed = options.speed;
        this._dir = options.dir;

        this._el = document.createElement('article');
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
    }

    Square.prototype._getPos = function () {
        return [parseInt(this._el.style.left), parseInt(this._el.style.top)];
    };

    Square.prototype._setPos = function (pos) {
        this._el.style.left = pos[0];
        this._el.style.top = pos[1];
    };

    Square.prototype._checkBounds = function () {
        var currentPos = this._getPos();
        var borderRight = WINDOW_WIDTH - TILE_WIDTH;
        var borderBottom = WINDOW_HEIGHT - TILE_HEIGHT;

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

    window.onload = function () {
        WINDOW_WIDTH = document.body.offsetWidth;
        WINDOW_HEIGHT = document.body.offsetHeight;
        $section = document.querySelector('section');

        document.styleSheets[0].insertRule('article { width: ' + TILE_WIDTH + '; height: ' + TILE_HEIGHT + ' }', 0);

        _addSquare(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        _renderSquares();

        document.querySelector('section').addEventListener(
            'mousedown',
            function(event) {
                event.preventDefault();
                if(event.target.tagName.toLowerCase() === 'article'){
                    for (var i = 0; i < 5; i++) {
                        _addSquare(event.pageX, event.pageY);
                    }
                }
            },
            false
        );
    };
    
    function _addSquare(x, y) {
        function sign () { 
            return Math.random() < .5 ? -1 : 1; 
        }
        squares.push(new Square({
            x : x,
            y : y,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            speed: [MIN_SPEED + Math.random(), MIN_SPEED + Math.random()], 
            dir: [sign(), sign()]
        }));
    }

    function _renderSquares() {
        while($section.hasChildNodes()) {
            $section.removeChild($section.firstChild);
        }

        squares.forEach(function(square) { 
            square.move();
            $fragment.appendChild(square._el);
        }); 

        $section.appendChild($fragment.cloneNode(true));
        requestAnimationFrame(_renderSquares);
    }
})(this);