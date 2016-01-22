function getDominantColor(aImg) {
  let canvas = document.createElement("canvas");
  canvas.height = aImg.height;
  canvas.width = aImg.width;

  let context = canvas.getContext("2d");
  context.drawImage(aImg, 0, 0);

  // keep track of how many times a color appears in the image
  let colorCount = {};
  let maxCount = 0;
  let dominantColor = "";

  // data is an array of a series of 4 one-byte values representing the rgba values of each pixel
  let data = context.getImageData(0, 0, aImg.height, aImg.width).data;

  for (let i = 0; i < data.length; i += 4) {
    // ignore transparent pixels
    if (data[i+3] == 0)
      continue;

    let color = data[i] + "," + data[i+1] + "," + data[i+2];
    // ignore white
    if (color == "255,255,255")
      continue;

    colorCount[color] = colorCount[color] ?  colorCount[color] + 1 : 1;

    // keep track of the color that appears the most times
    if (colorCount[color] > maxCount) {
      maxCount = colorCount[color];
      dominantColor = color;
    }
  }

  let rgb = dominantColor.split(",");
  return rgb;
}