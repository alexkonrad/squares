(function(root) {
    var Game = root.Game = (root.Game || {})
    var TILE_WIDTH = Squares.TILE_WIDTH;
    var TILE_HEIGHT = Squares.TILE_HEIGHT;
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
                    that._addSquare(
                        event.pageX,
                        event.pageY,
                        that.squares.length
                    );
                }
            },
            false
        );
    };
    
    
    // renders a startup screen and starts game play
    Session.prototype.initialize = function () {
        var i = 0;
        var that = this;
        var tiles = setInterval(function () {
            that._addSquare(
                parseInt((that._window_width - TILE_WIDTH) * Math.random()),
                parseInt((that._window_height - TILE_HEIGHT) * Math.random()),
                i
            );
            i += 1;
        }, 5)
        
        this._renderSquares();
        
        document.body.className = "overlay";
        document.styleSheets[0].insertRule('article { width: ' + TILE_WIDTH + '; height: ' + TILE_HEIGHT + ' }', 0);
        
        var $intro = document.getElementById('intro-screen');
        $intro.style.display = "block"
        document.styleSheets[0].insertRule('#intro-screen { display: block; }');
        
        var titleFlicker = setInterval(function() {
               var val = 1;
               if (Math.random() > 0.5) {
                   val = Math.floor((Math.random()*10)+1);
               }
               
               document.querySelector('h1').style.textShadow = "white 0 0 " + val + "px"
                
        }, 150);
        
        var that = this;
        document.querySelector('button').addEventListener(
            'click',
            function (event) {
                event.preventDefault();
                
                window.clearInterval(titleFlicker);
                window.clearInterval(tiles);
                
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
    
    Session.prototype._addSquare = function (x, y, id, xDir) {
        this.squares.push(new Squares.Square({
            id: id, x : x, y : y,
            color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
            speed: [Squares.MIN_SPEED , Squares.MIN_SPEED], 
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