(function(root) {
  var Squares = root.Squares = (root.Squares || {})
  
  var WINDOW_WIDTH = 900;
  var WINDOW_HEIGHT = 700;
  var SQUARE_WIDTH = 100;
  var SQUARE_HEIGHT = 100;
  var squares = Squares.squares = [];
  var fragment = document.createDocumentFragment();
  
  var Square = Squares.Square = function (options) {
    this._el = document.createElement('article');
    this._el.setAttribute('class', 'square');
    this._el.style.cssText = "position: absolute; width: 100px; height: 100px; z-index: 99;";
    this._el.style.left = options.x
    this._el.style.top = options.y
    this._el.style.background = options.color
    this._speed = options.speed;
    this._dir = options.dir;
    
    // this._addListener();
  };
  
  Square.prototype._getPos = function () {
    return [parseInt(this._el.style.left), parseInt(this._el.style.top)];
  };
  
  Square.prototype._setPos = function (pos) {
    this._el.style.left = pos[0];
    this._el.style.top = pos[1];
  };
  
  Square.prototype.move = function () {
    var curPos = this._getPos();
    var newPos = new Array();
    
    this._checkBounds();
    
    newPos[0] = curPos[0] + (this._dir[0] * this._speed[0]);
    newPos[1] = curPos[1] + (this._dir[1] * this._speed[1]);   
    
    this._setPos(newPos);
    
    // redraw them all at once instead
    // this._redraw();
  }
  
  Square.prototype._checkBounds = function () {
    var curPos = this._getPos();
    
    if (curPos[0] < 0) {
      this._dir[0] = 1;
    } else if (curPos[0] > WINDOW_WIDTH - parseInt(this._el.style.width)) {
      this._dir[0] = -1;
    } else if (curPos[1] > WINDOW_HEIGHT - parseInt(this._el.style.height)) {
      this._dir[1] = -1;
    } else if (curPos[1] < 0) {
      this._dir[1] = 1;
    }
  }
  
  window.onload = function () {
    startSquares();
    
    document.querySelector('section').addEventListener('mousedown' ,function(event){
      event.preventDefault();
      console.log(event.target.tagName)
      if(event.target.tagName.toLowerCase() == 'article'){
       addSquare();
      }
    }, false);
  };
  
  function addSquare() {
    squares.push(new Square({
      x : Math.random() * (WINDOW_WIDTH - SQUARE_WIDTH),
      y : Math.random() * (WINDOW_HEIGHT - SQUARE_HEIGHT),
      color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      speed: [1 + Math.random(), 1 + Math.random()], 
      dir: [1,1]
    }));
  }
  
  
  
  function renderSquares() {
    
    // remove all child nodes
    var container = document.querySelector('section');
    
    while(container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
    
    squares.forEach(function(square) { 
      square.move();
      fragment.appendChild(square._el);
    }); 
    
    document.querySelector('section').appendChild(fragment.cloneNode(true));
    
    requestAnimationFrame(renderSquares);
    
  }

  function startSquares () {
    
    addSquare();
    
    renderSquares();
  }
})(this);