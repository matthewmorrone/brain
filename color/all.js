function all(img) {
    var blockSize = 1,
        defaultRGB = {r: 0, g: 0, b: 0},
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r: 0, g: 0, b: 0},
        rgba = {r: 0, g: 0, b: 0, a: 0}
        count = 0,
        colors = new Set()
        colorCounts = {}
    if (!context) {
        return defaultRGB
    }
    height = canvas.height = img.naturalHeight || img.offsetHeight || img.height
    width  = canvas.width  = img.naturalWidth  || img.offsetWidth  || img.width
    context.drawImage(img, 0, 0)
    try {
        data = context.getImageData(0, 0, width, height)
    } catch (e) {
        return defaultRGB
    }
    length = data.data.length
    while ((i += blockSize * 4) < length) {
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
        rgba = {r: data.data[i], g: data.data[i+1], b: data.data[i+2]}
        colors.add(JSON.stringify(rgba))
        colorCounts[JSON.stringify(rgba)] = colorCounts[JSON.stringify(rgba)] ? colorCounts[JSON.stringify(rgba)]++ : 0
        // log(JSON.stringify(rgba))
    }
    rgb.r = ~~(rgb.r / count)
    rgb.g = ~~(rgb.g / count)
    rgb.b = ~~(rgb.b / count)
    log(colors.size)

    return "rgba("+rgb.r+", "+rgb.g+", "+rgb.b+", 255)"
    // return rgb
}
