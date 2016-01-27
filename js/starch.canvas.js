function Canvas(canvas) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!(this instanceof Canvas2DContext)) {
    return new Canvas2DContext(canvas);
  }
  this.context = this.ctx = canvas.getContext('2d');
  if (!Canvas2DContext.prototype.arc) {
    Canvas2DContext.setup.call(this, this.ctx);
  }
}
function Canvas(el, w, h) {
  this.canvas = create("canvas") || jQuery(el) || el
  this.canvas.width = this.width = w || 100
  this.canvas.height = this.height = h || 100
  this.context = this.canvas.getContext("2d")
  this.c = this.context
  this.defaults = {
    color: "black",
    fillStyle: "",
    width: 1
  }
  return this
}
Canvas.prototype.element = function() {
  return this.canvas
}
Canvas.prototype.attach = function(where) {
  where = where || document.body
  where.appendChild(this.canvas)
  return this
}
Canvas.prototype.clear = function() {
  this.c.clearRect(0, 0, this.width, this.height)
  return this
}
Canvas.prototype.line = function(x1, y1, x2, y2, options) {

  if (x1.isArray()) {
    options = y1
    y1 = x1.y1
    x2 = x1.x2
    y2 = x1.y2
    x1 = x1.x1
  }
  var o = _.defaults({}, options, this.defaults)
  this.c.beginPath()
  this.c.moveTo(x1, y1)
  this.c.lineTo(x2, y2)
  this.c.strokeStyle = o.color
  this.c.lineWidth = o.width
  this.c.stroke()
  this.c.closePath()
  return this
}
Canvas.prototype.circle = function(x, y, r, options) {
  var o = _.defaults({}, options, this.defaults)
  this.c.beginPath();
  this.c.arc(x, y, r, 0, 2 * Math.PI, false);
  this.c.lineWidth = o.width
  this.c.strokeStyle = o.color
  this.c.stroke()
  if (o.fillStyle) {
    this.c.fillStyle = o.fillStyle// || "black"
    this.c.fill()
  }
  return this
}
Canvas.prototype.square = function(x, y, e, options) {
  var o = _.defaults({}, options, this.defaults)
  this.c.beginPath()
  this.c.rect(x, y, e, e)
  this.c.lineWidth = o.width
  this.c.strokeStyle = o.color
  this.c.stroke()
  if (o.fillStyle) {
    this.c.fillStyle = o.fillStyle
    this.c.fillRect(x, y, e, e)
  }
  return this
}




function Canvas2DContext(canvas) {
  if (typeof canvas === 'string') {
    canvas = document.getElementById(canvas);
  }
  if (!(this instanceof Canvas2DContext)) {
    return new Canvas2DContext(canvas);
  }
  this.context = this.ctx = canvas.getContext('2d');
  if (!Canvas2DContext.prototype.arc) {
    Canvas2DContext.setup.call(this, this.ctx);
  }
}
Canvas2DContext.setup = function () {
  var methods = ['arc','arcTo','beginPath','bezierCurveTo','clearRect','clip',
    'closePath','drawImage','fill','fillRect','fillText','lineTo','moveTo',
    'quadraticCurveTo','rect','restore','rotate','save','scale','setTransform',
    'stroke','strokeRect','strokeText','transform','translate'];

  var getterMethods = ['createPattern','drawFocusRing','isPointInPath','measureText', // drawFocusRing not currently supported
    // The following might instead be wrapped to be able to chain their child objects
    'createImageData','createLinearGradient',
    'createRadialGradient', 'getImageData','putImageData'
  ];

  var props = ['canvas','fillStyle','font','globalAlpha','globalCompositeOperation',
    'lineCap','lineJoin','lineWidth','miterLimit','shadowOffsetX','shadowOffsetY',
    'shadowBlur','shadowColor','strokeStyle','textAlign','textBaseline'];

  for (let m of methods) {
    let method = m;
    Canvas2DContext.prototype[method] = function () {
      this.ctx[method].apply(this.ctx, arguments);
      return this;
    };
  }

  for (let m of getterMethods) {
    let method = m;
    Canvas2DContext.prototype[method] = function () {
      return this.ctx[method].apply(this.ctx, arguments);
    };
  }

  for (let p of props) {
    let prop = p;
    Canvas2DContext.prototype[prop] = function (value) {
      if (value === undefined)
        return this.ctx[prop];
      this.ctx[prop] = value;
      return this;
    };
  }
};
Canvas2DContext.setup = function () {
  var methods = ['arc','arcTo','beginPath','bezierCurveTo','clearRect','clip',
    'closePath','drawImage','fill','fillRect','fillText','lineTo','moveTo',
    'quadraticCurveTo','rect','restore','rotate','save','scale','setTransform',
    'stroke','strokeRect','strokeText','transform','translate'];

  var getterMethods = ['createPattern','drawFocusRing','isPointInPath','measureText', // drawFocusRing not currently supported
    // The following might instead be wrapped to be able to chain their child objects
    'createImageData','createLinearGradient',
    'createRadialGradient', 'getImageData','putImageData'
  ];

  var props = ['canvas','fillStyle','font','globalAlpha','globalCompositeOperation',
    'lineCap','lineJoin','lineWidth','miterLimit','shadowOffsetX','shadowOffsetY',
    'shadowBlur','shadowColor','strokeStyle','textAlign','textBaseline'];

  for (let m of methods) {
    let method = m;
    Canvas2DContext.prototype[method] = function () {
      this.ctx[method].apply(this.ctx, arguments);
      return this;
    };
  }

  for (let m of getterMethods) {
    let method = m;
    Canvas2DContext.prototype[method] = function () {
      return this.ctx[method].apply(this.ctx, arguments);
    };
  }

  for (let p of props) {
    let prop = p;
    Canvas2DContext.prototype[prop] = function (value) {
      if (value === undefined)
        return this.ctx[prop];
      this.ctx[prop] = value;
      return this;
    };
  }
};