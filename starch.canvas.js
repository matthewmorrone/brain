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