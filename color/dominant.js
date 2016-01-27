function dominant(canvas) {
	"use strict"
	var context = canvas.getContext("2d")
	var colorCount = {}
	var maxCount = 0
	var dominantColor = ""
	var data = context.getImageData(0, 0, canvas.height, canvas.width).data
	for (var i = 0; i < data.length; i += 4) {
		if (data[i+3] == 0) {
			continue
		}
		var color = data[i] + "," + data[i+1] + "," + data[i+2]
		if (color == "255,255,255") {
			continue
		}
		colorCount[color] = colorCount[color] ?  colorCount[color] + 1 : 1
		if (colorCount[color] > maxCount) {
			maxCount = colorCount[color]
			dominantColor = color
		}
	}
	// var [r, g, b, a] = dominantColor.split(",")
	return "rgba("+dominantColor.split(",").join(", ")+", 255)"
}