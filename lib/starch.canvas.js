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