(function(root) {
    var Game = root.Game = (root.Game || {})
    TILE_WIDTH = Squares.TILE_WIDTH;
    TILE_HEIGHT = Squares.TILE_HEIGHT;
    var squares = Squares.squares = [];
    var $section = undefined;
    var $fragment = document.createDocumentFragment();

    window.onload = function () {
        WINDOW_WIDTH = document.body.offsetWidth;
        WINDOW_HEIGHT = document.body.offsetHeight;
        $section = document.querySelector('section');

        document.styleSheets[0].insertRule('article { width: ' + TILE_WIDTH + '; height: ' + TILE_HEIGHT + ' }', 0);

        _addSquare(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2, 0);
        _renderSquares();

        document.querySelector('section').addEventListener(
            'mousedown',
            function(event) {
                event.preventDefault();
                if(event.target.tagName.toLowerCase() === 'article'){
                    squares[event.target.id]._dir[1] = -1;
                    _addSquare(event.pageX, event.pageY, squares.length);
                }
            },
            false
        );
    };
    
    function _addSquare(x, y, id) {
        function sign () { 
            return Math.random() < .5 ? -1 : 1; 
        }
        squares.push(new Squares.Square({
            id: id,
            x : x,
            y : y,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            speed: [Squares.MIN_SPEED + Math.random(), Squares.MIN_SPEED + Math.random()], 
            dir: [sign(), -1]
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