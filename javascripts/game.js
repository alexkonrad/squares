(function(root) {
    var Game = root.Game = (root.Game || {})
    TILE_WIDTH = Squares.TILE_WIDTH;
    TILE_HEIGHT = Squares.TILE_HEIGHT;
    var $fragment = document.createDocumentFragment();
    
    var Session = Game.Session = function (options) {
        this.$el = options.$el || document.body;
        this.squares = [];
        this._window_width = options.width || 800;
        this._window_height = options.height || 600;
        
        var that = this;
        this.$el.addEventListener(
            'mousedown',
            function (event) {
                event.preventDefault();
                if(event.target.tagName.toLowerCase() === 'article'){
                    that.squares[event.target.id]._dir[1] = -1;
                    that._addSquare(event.pageX, event.pageY, that.squares.length);
                }
            },
            false
        );
    };
    
    Session.prototype.initialize = function () {
        // render a demo screen
        for (var i = 0; i < 250; i++) {
            this._addSquare(
                parseInt(this._window_width * Math.random()),
                parseInt(this._window_height * Math.random()),
                i
            );
        }
        
        this._renderSquares();
        
        document.body.className = "overlay";
        
        var $intro = document.getElementById('intro-screen');
        $intro.style.display = "block"
        document.styleSheets[0].insertRule('#intro-screen { display: block; }');
        
        var that = this;
        document.querySelector('button').addEventListener(
            'click',
            function (event) {
                event.preventDefault();
                document.body.className = "";
                $intro.style.display = "none";
                that.squares.length = 0;
                
                $fragment = document.createDocumentFragment();
                
                that._addSquare(that._window_width/2, that._window_height/2, 0);
                that._renderSquares();
            },
            false
        );
        
    }
    
    Session.prototype._addSquare = function (x, y, id) {
        this.squares.push(new Squares.Square({
            id: id, x : x, y : y,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            speed: [Squares.MIN_SPEED + Math.random(), Squares.MIN_SPEED + Math.random()], 
            dir: [Math.random() < .5 ? -1 : 1, -1],
            width: this._window_width,
            height: this._window_height
        }));
    }

    Session.prototype._renderSquares = function () {
        while(this.$el && this.$el.hasChildNodes()) {
            this.$el.removeChild(this.$el.firstChild);
        }

        this.squares.forEach(function(square) { 
            square.move();
            $fragment.appendChild(square._el);
        }); 

        this.$el && this.$el.appendChild($fragment.cloneNode(true));
        requestAnimationFrame(this._renderSquares.bind(this));
    }
})(this);