(function(root) {
  var Squares = root.Squares = (root.Squares || {})
  
  var Square = Squares.Square = function (options) {
    this._el = document.createElement('article'); 
    this._el.style.cssText = "position: absolute; width: 100px; height: 100px";
    this._el.style.left = options.x
    this._el.style.top = options.y
    this._el.style.background = options.color
    this._speed = options.speed;
    this._dir = options.dir;
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
    
    newPos[0] = curPos[0] + (this._dir[0] * this._speed[0]);
    newPos[1] = curPos[1] + (this._dir[1] * this._speed[1]);   
    
    this._setPos(newPos);
  }
  
  Square.prototype.getBounds = function () {
    var curPos = this._getPos();
    
    if (curPos[0] < 0) {
      this._dir[0] = 1;
    } else if (curPos[0] > 800) {
      this._dir[0] = -1;
    } else if (curPos[1] > 600) {
      this._dir[1] = -1;
    } else if (curPos[1] < 0) {
      this._dir[1] = 1;
    }
  }
  
  Square.prototype.redraw = function () {
    document.body.appendChild(this._el);
  }
  
  window.onload = function () {
    startSquares();
  };

  function startSquares () {
    var square = new Square({
      x : 300,
      y : 250,
      color: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      speed: [2 + Math.random(), 2 + Math.random()], dir: [1,1]
    });
    window.setInterval(function () {  
      square.getBounds();
      square.move();
      square.redraw();
    }, 10)
  }
})(this);