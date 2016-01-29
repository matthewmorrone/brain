var log = console.log.bind(console)
var body = document.body, i
Object.defineProperty(Array.prototype, 'chunk', {
	value: function(chunkSize) {
		var R = []
		for (var i = 0; i < this.length; i += chunkSize)
			R.push(this.slice(i, i + chunkSize))
		return R
	}
})

var hog = {
	extractHOG: extractHOG,
	extractHistograms: extractHistograms,
	extractHOGFromHistograms: extractHOGFromHistograms
}
for (var func in processing) {
	hog[func] = processing[func];
}
$.color = $.Color
$.color.fn.contrastColor = function() {
	var r = this._rgba[0], g = this._rgba[1], b = this._rgba[2];
	return (((r*299)+(g*587)+(b*144))/1000) >= 131.5 ? "black" : "white";
};

var netOptions = {
	hiddenLayers: [4],
	learningRate: 0.6 // global learning rate, useful when training using streams
}
var net = new brain.NeuralNetwork()
var data = []
var options = {
	errorThresh: 0.005,	// error threshold to reach
	iterations: 20000,	 // maximum training iterations
	log: true,					 // console.log() progress periodically
	logPeriod: 10,			 // number of iterations between logging
	learningRate: 0.3		// learning rate
}
var minpop = 10
var product
var colorThief = new ColorThief()
var canvas = document.getElementById('canvas')
var trained = false

function* grid(img) {
	yield [				0,				 0,		img.width,		img.height/2]

	yield [				0,	4*img.height/8,		img.width/4,	img.height/4]
	yield [	1*img.width/4,	4*img.height/8,		img.width/4,	img.height/4]
	yield [	1*img.width/2,	4*img.height/8,		img.width/4,	img.height/4]
	yield [	3*img.width/4,	4*img.height/8,		img.width/4,	img.height/4]
	yield [				0,	6*img.height/8,		img.width/4,	img.height/4]
	yield [	1*img.width/4,	6*img.height/8,		img.width/4,	img.height/4]
	yield [	1*img.width/2,	6*img.height/8,		img.width/4,	img.height/4]
	yield [	3*img.width/4,	6*img.height/8,		img.width/4,	img.height/4]

	yield [				0,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	1*img.width/8,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	1*img.width/4,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	3*img.width/8,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	1*img.width/2,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	5*img.width/8,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	3*img.width/4,	7*img.height/8,		img.width/8,	img.height/8]
	yield [	7*img.width/8,	7*img.height/8,		img.width/8,	img.height/8]
	yield null
}

// https://github.com/harthur/clusterfck
function cluster(colors) {
	var kmeans = clstrfck

	// Calculate clusters.
	var clusters = kmeans.cluster(colors, 3);
	log(clusters)

	return function(datum) {
		return kmeans.classify(datum)
	}
}

function hogwart(canvas) {
	var options = {
		cellSize: 4,	// length of cell in px
		blockSize: 2,	// length of block in number of cells
		blockStride: 1, // number of cells to slide block window by (block overlap)
		bins: 6,		// bins per histogram
		norm: 'L2'		// block normalization method
	}
	var descriptor = hog.extractHOG(canvas, options)
	// var intensities = hog.intensities(canvas)
	// var gradients = hog.gradients(canvas)
	// var vectors = hog.gradientVectors(canvas)
	// hog.drawGreyscale(canvas)
	// hog.drawGradient(canvas, 'x')
	// hog.drawGradient(canvas, 'y')
	// hog.drawMagnitude(canvas)
	return descriptor
}


// quant(this)
// all(this)
// hogwart(canvas)