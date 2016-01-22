function load(url, cb) {
  var script = document.createElement('script')
  script.onload = cb
  script.src = url
  document.body.appendChild(script)
  return script
}