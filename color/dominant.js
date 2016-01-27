function dominant(canvas) {
	"use strict"

	let context = canvas.getContext("2d")
	let colorCount = {}
	let maxCount = 0
	let dominantColor = ""
	let data = context.getImageData(0, 0, canvas.height, canvas.width).data

	for (let i = 0; i < data.length; i += 4) {
		if (data[i+3] == 0)
			continue

		let color = data[i] + "," + data[i+1] + "," + data[i+2]
		if (color == "255,255,255")
			continue

		colorCount[color] = colorCount[color] ?  colorCount[color] + 1 : 1
		if (colorCount[color] > maxCount) {
			maxCount = colorCount[color]
			dominantColor = color
		}
	}

	// let rgb = dominantColor.split(",")
	// return rgb
	return dominantColor
}