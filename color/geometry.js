/*
  Title: Geometry
  Tools for working with objects in a two-dimensional coordinate system.

  MIT-Style License
  Johan Nordberg <its@johan-nordberg.com>
*/

(function() {

function pick() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] !== undefined) return arguments[i];
  }
};

function merge(o1, o2) {
  var key, rv = {};
  for (key in o1) rv[key] = o1[key];
  for (key in o2) rv[key] = o2[key];
  return rv;
};

/*
  Class: Size
  An object that contains width and height values

  Constructor: Size

  Arguments:

  width - *number* A width value.
  height - *number* A height value.

  You can also pass a object with width and height to the constructor.
*/
var Size = function(width, height) {
  this.width = parseFloat(pick(arguments[0].width, width));
  this.height = parseFloat(pick(arguments[0].height, height));
};

/*
  Method: Size.fromPoint

  *Classmethod* Creates a Size from a Point

  Arguments:

  point - Point to be converted to a Size
*/
Size.fromPoint = function(point) {
  return new Size({
    width: point.x,
    height: point.y
  });
};

/*
  Method: getMid

  Returns a <Point> representing the middle point of the size
*/
Size.prototype.getMid = function() {
  return new Point(this.width / 2, this.height / 2);
};

/*
  Method: standardize

  Returns:

  A <Size> with a positive width and height
*/
Size.prototype.standardize = function() {
  return new Size(Math.abs(this.width), Math.abs(this.height));
};

/*
  Method: aspectFit

  Scales size to the size given, keeping aspect ratio.

  Arguments:

  size       - (*<Size>*, required) maximum size to scale up to
  keepInside - (*boolean*, optional. defaults to true) if true size will be scaled to *maximum*
               the size given; otherwise it will be scaled to *at least* size given

  Returns:

  A <Size> scaled to the size given with aspect ratio intact.
*/
Size.prototype.aspectFit = function(size, keepInside) {
  if (keepInside === undefined) keepInside = true;
  var nw = size.height * this.width / this.height;
  var nh = size.width * this.height / this.width;
  if (keepInside ^ (nw >= size.width))
    return new Size(nw || 1, size.height);
  return new Size(size.width, nh || 1);
};

/*
  Method: scale

  Arguments:

  factor - (*float*, required) - factor to multiply size by

  Returns a <Size> scaled by *factor*
*/
Size.prototype.scale = function(factor) {
  return new Size(this.width * factor, this.height * factor);
};

/*
  Method: toStyles

  Returns an object with CSS styles defining the size.
*/
Size.prototype.toStyles = function() {
  return {
    'width': parseInt(this.width) + 'px',
    'height': parseInt(this.height) + 'px'
  };
};

/*
  Method: toString

  Returns string representation of point
*/
Size.prototype.toString = function() {
  return ['<Size width: ', this.width, ' height: ', this.height, '>'].join('');
};

/*
  Constant: Zero
  A zero <Size>
*/
Size.Zero = new Size(0, 0);

/*
  Class: Point
  Object that contains a point in a two-dimensional coordinate system.

  Constructor: Point

  Arguments:

  x - *number* The x-coordinate of the point.
  y - *number* The y-coordinate of the point.

  You can also pass a object with x and y coordinates to the constructor.
*/
var Point = function(x, y) {
  this.x = parseFloat(pick(arguments[0].x, x));
  this.y = parseFloat(pick(arguments[0].y, y));
};

/*
  Method: length

  Returns:

  Pythagorean length of point from origo
*/
Point.prototype.length = function() {
  return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

/*
  Method: distanceTo

  Returns:

  Distance between points
*/
Point.prototype.distanceTo = function(point) {
  var xd = point.x - this.x,
      yd = point.y - this.y;
  return Math.sqrt(xd * xd + yd * yd);
};

/*
  Method: addPoint

  Adds a point to this point.

  Arguments:

  point - Point to add.

  Returns:

  <Point> containing both points added together.
*/
Point.prototype.addPoint = function(point) {
  return new Point(this.x + point.x, this.y + point.y);
}

/*
  Method: substractPoint

  Substracts a point from this point.

  Arguments:

  point - Point to substract

  Returns:

  <Point> containing substracted point.
*/
Point.prototype.substractPoint = function(point) {
  return new Point(this.x - point.x, this.y - point.y);
};

/*
  Method: multiply

  Returns point multiplied by given factor.

  Arguments:

  factor - Factor to multiply by
*/
Point.prototype.multiply = function(factor) {
  return new Point(this.x * factor, this.y * factor);
};

/*
  Method: dot

  Returns dot product of *this* and *point*

*/
Point.prototype.dot = function(point) {
  return this.x * point.x + this.y * point.y;
};

/*
  Method: normalize

  Returns normalized point

*/
Point.prototype.normalize = function() {
 return this.multiply(1 / this.length());
};

/*
  Method: angle

  Returns angle in radians to *point*

*/
Point.prototype.angle = function(point) {
  return (Math.PI * 1.5 + Math.atan2(point.y - this.y, point.x - this.x)) % (Math.PI * 2);
};

/*
  Method: toStyles

  Returns an object with CSS styles defining the size.
*/
Point.prototype.toStyles = function() {
  return {
    'left': parseInt(this.x) + 'px',
    'top': parseInt(this.y) + 'px'
  };
};

/*
  Method: toString

  Returns string representation of point
*/
Point.prototype.toString = function() {
  return ['<Point x: ', this.x, ' y: ', this.y, '>'].join('');
};

/*
  Constant: Zero
  A zero <Point>
*/
Point.Zero = new Point(0, 0);

/*
  Class: Rect
  An object that contains the location and dimensions of a rectangle.

  Constructor: Rect

  Arguments:

  origin - A <Point> object that specifies the coordinates of the
           rectangle's origin. The origin is located in the upper-left
           of the rectangle.

  size -   A <Size> object that specifies the
           height and width of the rectangle

  You can also pass a hash to the constructor.

  > var rect = new Rect({
  >   'origin': {'x': 42, 'y': 42},
  >   'size': {'width': 320, 'height': 480},
  > });
*/
var Rect = function(origin, size) {
  if (arguments.length == 1 && typeof arguments[0] == 'object') {
    this.origin = new Point(arguments[0].origin);
    this.size = new Size(arguments[0].size);
  } else {
    this.origin = origin;
    this.size = size;
  }
};

/*
  Method: Rect.fromPoints

  *Classmethod* Creates a Rect from two points

  Arguments:

  point1 - Point defining upper left corner of rectangle
  point2 - Point defnining lower right corner of rectangle
*/
Rect.fromPoints = function(point1, point2) {
  return new Rect({
    origin: point1,
    size: Size.fromPoint(point2.substractPoint(point1))
  });
};

/*
  Method: standardize

  Returns a rectangle with a positive width and height

  Returns:

  A <Rect> that represents the source rectangle, but with positive width
  and height values.
*/
Rect.prototype.standardize = function() {
  var x = this.origin.x, y = this.origin.y,
      width = this.size.width, height = this.size.height;
  if (this.origin.x > this.origin.x + this.size.width) {
    x = this.origin.x + this.size.width;
    width = Math.abs(this.size.width);
  }
  if (this.origin.y > this.origin.y + this.size.height) {
    y = this.origin.y + this.size.height;
    height = Math.abs(this.size.height);
  }
  return new Rect(new Point(x, y), new Size(width, height));
};

/*
  Method: inset

  Returns a rectangle that is smaller or larger than the source rectangle, with the same center point.

  Arguments:

  delta - (*<Point>*, required) The xy-coordinate value to use for adjusting the source rectangle.

  Returns:

  A <Rect> inset by the x,y values given. Rect will be outset if the xy-coorinates are negative.

*/
Rect.prototype.inset = function(delta) {
  var origin = this.origin.addPoint(delta);
  var size = new Size(this.size.width - delta.x * 2, this.size.height - delta.y * 2);
  return new Rect(origin, size);
};

/*
  Method: containsPoint

  Returns whether a rectangle contains a specified point.

  Arguments:

  point - The <Point> to examine.

  Returns:

  true if the rectangle is not null or empty and the point is
  located within the rectangle; otherwise, false.
*/
Rect.prototype.containsPoint = function(point) {
  return (
    this.origin.x <= point.x && this.origin.y <= point.y &&
    this.origin.x + this.size.width >= point.x &&
    this.origin.y + this.size.height >= point.y
  );
}

/*
  Method: containsRect

  Returns whether a rectangle contains a specified rectangle.

  Arguments:

  rect - The <Rect> to examine.

  Returns:

  true if the rectangle is not null or empty and the other rectangle is
  located within the rectangle; otherwise, false.
*/
Rect.prototype.containsRect = function(rect) {
  var p1 = rect.origin, p2 = rect.getMax();
  return (this.containsPoint(p1) && this.containsPoint(p2));
};

/*
  Method: intersectsRect

  Returns whether two rectangles intersect.

  Arguments:

  rect - The <Rect> to examine.

  Returns:

  true if the two specified rectangles intersect; otherwise, false.
*/
Rect.prototype.intersectsRect = function(rect) {
  var a1 = this.origin, a2 = this.getMax();
  var b1 = rect.origin, b2 = rect.getMax();
  return !(a1.x > b2.x || a2.x < b1.x ||
           a1.y > b2.y || a2.y < b1.y);
};

/*
  Method: getMax

  Returns the point that establishes the bottom right corner of a rectangle.
*/
Rect.prototype.getMax = function() {
  return new Point(this.origin.x + this.size.width,
                   this.origin.y + this.size.height);
};

/*
  Method: getMid

  Returns the point that establishes the center of a rectangle.
*/
Rect.prototype.getMid = function() {
  return new Point(this.origin.x + (this.size.width / 2),
                        this.origin.y + (this.size.height / 2));
};

/*
  Method: setMid

  Arguments:

  midpoint - <Point> defining the new midpoint of the rect

  Returns a new <Rect> with the same size centered at the point given
*/
Rect.prototype.setMid = function(midpoint) {
  var origin = new Point(
    midpoint.x - (this.size.width / 2),
    midpoint.y - (this.size.height / 2)
  );
  return new Rect(origin, this.size);
};

/*
  Method: toStyles

  Returns an object with CSS styles defining the size.
*/
Rect.prototype.toStyles = function() {
  return merge(this.origin.toStyles(), this.size.toStyles());
};

/*
  Method: toString

  Returns string representation of the rectangle
*/
Rect.prototype.toString = function() {
  return ['<Rect origin: ', this.origin.toString(),
          ' size: ', this.size.toString(), '>'].join('');
};

/*
  Packaging

  Uses commonjs's export or require.js's define, otherwise just appends to
  the root object
*/
var geometry = {
  'Size': Size,
  'Point': Point,
  'Rect': Rect
};

if (typeof define == 'function') {
  define(function() { return geometry; });
} else {
  for (var key in geometry) {
    this[key] = geometry[key];
  }
}

}).apply((typeof exports != 'undefined') ? exports : this);
