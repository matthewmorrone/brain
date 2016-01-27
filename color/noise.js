var ctx = document.getElementById("canvas").getContext("2d"),
noise = function(){
  for(var y = 0; y < 6; y++) {
    for(var x = 0; x < 30; x++) {
      var color = ~~(Math.random() * 360);
      ctx.fillStyle = "hsl(" + color + ", 60%, 60%)";
      ctx.fillRect(x * 15, y * 15, 14, 14);
    }
  }
}
setInterval(noise, 100);