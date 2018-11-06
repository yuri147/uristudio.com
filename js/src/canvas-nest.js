'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, enumerable: false, writable: true, configurable: true }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Circle = (function() {
  function Circle(x, y) {
    _classCallCheck(this, Circle);

    this.x = x;
    this.y = y;
    // console.info(Math.random())
    if (Math.random() > 0.5) {
      this.r = 3;
    } else {
      this.r = 1;
    }
    // this.r = Math.random() * 10;
    this._mx = Math.random();
    this._my = Math.random();
  }

  _createClass(Circle, [
    {
      key: 'drawCircle',
      value: function drawCircle(ctx) {
        ctx.beginPath();
        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();
      }
    },
    {
      key: 'drawLine',
      value: function drawLine(ctx, _circle) {
        var dx = this.x - _circle.x;
        var dy = this.y - _circle.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140 && d > 50) {
          ctx.beginPath();

          ctx.moveTo(this.x, this.y); //起始点
          ctx.lineTo(_circle.x, _circle.y); //终点
          ctx.closePath();
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.stroke();
        }
      }
    },
    {
      key: 'move',
      value: function move(w, h) {
        this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx;
        this._my = this.y < h && this.y > 0 ? this._my : -this._my;
        this.x += this._mx / 2;
        this.y += this._my / 4;
      }
    }
  ]);

  return Circle;
})();

var currentCirle = (function(_Circle) {
  _inherits(currentCirle, _Circle);

  function currentCirle(x, y) {
    _classCallCheck(this, currentCirle);

    return _possibleConstructorReturn(
      this,
      (currentCirle.__proto__ || Object.getPrototypeOf(currentCirle)).call(this, x, y)
    );
  }

  _createClass(currentCirle, [
    {
      key: 'drawCircle',
      value: function drawCircle(ctx) {
        ctx.beginPath();

        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
        this.r = 1;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        // ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();
      }
    }
  ]);

  return currentCirle;
})(Circle);

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

var canvas = document.getElementById('canvas');
var ctx = setupCanvas(canvas);
var w = (canvas.width = canvas.offsetWidth);
var h = (canvas.height = canvas.offsetHeight);
var circles = [];
var current_circle = new currentCirle(0, 0);

var draw = function draw() {
  ctx.clearRect(0, 0, w, h);
  for (var i = 0; i < circles.length; i++) {
    circles[i].move(w, h);
    circles[i].drawCircle(ctx);
    for (var j = i + 1; j < circles.length; j++) {
      circles[i].drawLine(ctx, circles[j]);
    }
  }
  if (current_circle.x) {
    current_circle.drawCircle(ctx);
    for (var k = 1; k < circles.length; k++) {
      current_circle.drawLine(ctx, circles[k]);
    }
  }
  requestAnimationFrame(draw);
};

var init = function init(num) {
  for (var i = 0; i < num; i++) {
    // circles.push(new Circle(Math.random() * w, Math.random() * h));
    // console.info(i / num);
    circles.push(new Circle(((i + 1) / num) * w, Math.random() * h));
  }
  draw();
  ctx.globalAlpha = 0;
  var int = self.setInterval(function() {
    ctx.globalAlpha += 0.05;
    if (ctx.globalAlpha >= 1) {
      window.clearInterval(int);
    }
  }, 150);
};

if (window.screen.width > 750) {
  window.addEventListener('load', function() {
    init(30);
    // setTimeout(() => {
    //   init(30)
    // }, 500);
  });
  window.onmousemove = function(e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
  };
  window.onmouseout = function() {
    current_circle.x = null;
    current_circle.y = null;
  };
}
