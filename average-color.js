var get_bg_color = (function(window, undefined){
	return function(selector, default_color){
		if(typeof default_color === 'undefined') {
			default_color = '#000';
		}
		
		document = window.document;
		
		var img = document.querySelector(selector);
	
		// get the url of the background image if set
		if(img.currentStyle) {
			var img_url = img.currentStyle['background-image'];
		} else if(window.getComputedStyle) {
			var img_url = document.defaultView.getComputedStyle(img, null).getPropertyValue('background-image');
		} else {
			return default_color;
		}
		img_url = img_url.substr(5, img_url.length - 7);
		
		// create a dom element for canvas to use to calc avg colour
		img = document.createElement('img');
		img.src = img_url;
		img.id = 'dominantColourImg';
		img.style.display = 'none';
		
		// work out the background image's avg colour
		var blockSize = 5, // only visit every 5 pixels
	        canvas = document.createElement('canvas'),
	        context = canvas.getContext && canvas.getContext('2d'),
	        data, width, height,
	        i = -4,
	        length,
	        rgb = {r:0,g:0,b:0},
	        count = 0;
	
	    if (!context) {
	        return default_color;
	    }
	
	    height = canvas.height = img.naturalHeight || img.offsetHeight || img.height;
	    width = canvas.width = img.naturalWidth || img.offsetWidth || img.width;
	
	    context.drawImage(img, 0, 0);
	
	    try {
	        data = context.getImageData(0, 0, width, height);
	    } catch(e) {
	        /* security error, img on diff domain */
	        return default_color;
	    }
	
	    length = data.data.length;
	
	    while ( (i += blockSize * 4) < length ) {
	        ++count;
	        rgb.r += data.data[i];
	        rgb.g += data.data[i+1];
	        rgb.b += data.data[i+2];
	    }
	
	    // ~~ used to floor values
	    rgb.r = ~~(rgb.r/count);
	    rgb.g = ~~(rgb.g/count);
	    rgb.b = ~~(rgb.b/count);
	
	    return 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')';
	};
})(window);


var set_element_color = (function(window, undefined) {
	return function(selector, color) {
		var css = window.document.createElement('style');
		css.innerHTML = selector + '{ color: ' + color + '; }';
		window.document.body.appendChild(css);
	}
})(window);

set_element_color('.dominant', get_bg_color('.sample'));