
function getEventTarget(e) {
	e = e || window.event;
	return e.target || e.srcElement;
}
Element.prototype.hide = function() {
	this.style.display = 'none';
}
Element.prototype.show = function() {
	this.style.display = '';
}
Array.prototype.each = function() {
	for (i = 0; i < this.length; i++) {
		fn(this[i], i);
	}
}
Array.prototype.map = function(fn) {
	var results = [];
	for (var i = 0; i < this.length; i++) {
		results.push(fn(this[i], i));
	}
	return results;
}
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}
Object.prototype.type = function() {
	Object.prototype.toString.call(this).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
}
Function.prototype.proxy = function() {
	this.apply(context, arguments.slice(1));
}
Element.prototype.on = function(eventName, handler) {
	if (this.addEventListener) {
		this.addEventListener(eventName, handler);
	} else {
		this.attachEvent('on' + eventName, function() {
			handler.call(this);
		});
	}
}
Element.prototype.off = function(eventName, handler) {
	if (this.removeEventListener) {
		this.removeEventListener(eventName, handler);
	} else {
		this.detachEvent('on' + eventName, handler);
	}
}
Array.prototype.indexOf = Array.prototype.inArray = function(item) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] === item) {
			return i;
		}
	}
	return -1;
}
Element.prototype.attr = function() {
	if (arguments.length === 1) {
		return this.getAttribute(arguments[0]);
	}
	if (arguments.length === 2) {
		return this.setAttribute(arguments[0], arguments[1]);
	}
}
Element.prototype.before = function(htmlString) {
	return this.insertAdjacentHTML('beforebegin', htmlString);
}
Element.prototype.prepend = function(htmlString) {
	return this.insertAdjacentHTML('afterbegin', htmlString);
}
// Element.prototype.prepend = function(el) {
//	return this.parent.insertBefore(el, this.parent.firstChild);
// }
Element.prototype.after = function(htmlString) {
	return this.insertAdjacentHTML('afterend', htmlString);
}
Element.prototype.append = function(htmlString) {
	return this.insertAdjacentHTML('beforeend', htmlString);
}
Element.prototype.children = function() {
	var children = [];
	for (var i = this.children.length; i--;) {
		if (this.children[i].nodeType != 8) {
			children.unshift(this.children[i]);
		}
	}
	return children;
}
Element.prototype.clone = function() {
	return this.cloneNode(true);
}
Element.prototype.contains = function(child) {
	return this !== child && this.contains(child);
}
Element.prototype.containsSelector = function(selector) {
	return this.querySelector(selector) !== null
}
Element.prototype.empty = function() {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
	return this;
}
Element.prototype.find = function(selector) {
	return this.querySelectorAll(selector);
}
Element.prototype.html = function() {
	if (arguments.length === 1) {
		this.innerHTML = arguments[0];
	}
	return this.innerHTML;
}
Element.prototype.replaceWith = function(str) {
	this.outerHTML = str;
}
Element.prototype.toString = function() {
	return this.outerHTML;
}
Element.prototype.text = function() {
	if (arguments.length === 1) {
		if (this.textContent !== undefined) {
			this.textContent = arguments[0];
		} else {
			this.innerText = arguments[0];
		}
	}
	return this.textContent || this.innerText;
}
Element.prototype.matches = Element.prototype.is = function() {
	if (arguments[0] instanceof jQuery) {
		return this === arguments[0];
	} else {
		var selector = arguments[0];
		var _matches = (this.matches || this.matchesSelector || this.msMatchesSelector || this.mozMatchesSelector || this.webkitMatchesSelector || this.oMatchesSelector);
		if (_matches) {
			return _matches.call(this, selector);
		} else {
			var nodes = this.parentNode.querySelectorAll(selector);
			for (var i = nodes.length; i--;) {
				if (nodes[i] === this) {
					return true;
				}
			}
			return false;
		}
	}
}
Element.prototype.next = function() {
	function nextElementSibling(el) {
		do {
			el = el.nextSibling;
		} while (el && el.nodeType !== 1);
		return el;
	}
	this.nextElementSibling || nextElementSibling(this);
}
Element.prototype.offset = function() {
	var rect = el.getBoundingClientRect()
	return {
		top: rect.top + document.body.scrollTop,
		left: rect.left + document.body.scrollLeft
	}
}
Element.prototype.offsetParent = function() {
	return this.offsetParent || this;
}
Element.prototype.offsetHeight = function() {
	return this.offsetHeight;
}
Element.prototype.outerHeight = function() {
	var height = this.offsetHeight;
	var style = this.currentStyle || getComputedStyle(this);
	height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	return height;
}
Element.prototype.offsetWidth = function() {
	return this.offsetWidth;
}
Element.prototype.outerWidth = function() {
	var width = this.offsetWidth;
	var style = this.currentStyle || getComputedStyle(this);
	width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	return width;
}
Element.prototype.parent = function() {
	return this.parentNode;
}
Element.prototype.position = function() {
	return {
		left: this.offsetLeft,
		top: this.offsetTop
	}
}
Element.prototype.prev = function() {
	function previousElementSibling(el) {
		do {
			el = el.previousSibling;
		} while (el && el.nodeType !== 1);
		return el;
	}
	this.previousElementSibling || previousElementSibling(this);
}
Element.prototype.remove = function() {
	return this.parentNode.removeChild(this);
}
Element.prototype.siblings = function () {
	var elem = this;
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for (; sibling; sibling = sibling.nextSibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
	}
	return siblings;
};

Element.prototype.trigger = function(eventName) {
	if (document.createEvent) {
		var event = document.createEvent('HTMLEvents');
		event.initEvent(eventName, true, false);
		this.dispatchEvent(event);
	} else {
		this.fireEvent('on' + eventName);
	}
	return this;
}
Element.prototype.all = function() {
	return this.childNodes;
}
Element.prototype.first = function() {
	return this.firstChild;
}
Element.prototype.last = function() {
	return this.lastChild;
}
// Object.prototype.forEach = function (callback, scope) {
//	var collection = this;
//	if (Object.prototype.toString.call(collection) === '[object Object]') {
//		for (var prop in collection) {
//			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
//				callback.call(scope, collection[prop], prop, collection);
//			}
//		}
//	} else {
//		for (var i = 0, len = collection.length; i < len; i++) {
//			callback.call(scope, collection[i], i, collection);
//		}
//	}
// };


// Element.prototype.closest = function (selector) {
//	var elem = this;
//	var firstChar = selector.charAt(0);
//	for (; elem && elem !== document; elem = elem.parentNode) {
//		if (firstChar === '.') {
//			if (elem.classList.contains(selector.substr(1))) {
//				return elem;
//			}
//		}
//		if (firstChar === '#') {
//			if (elem.id === selector.substr(1)) {
//				return elem;
//			}
//		}
//		if (firstChar === '[') {
//			if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
//				return elem;
//			}
//		}
//		if (elem.tagName.toLowerCase() === selector) {
//			return elem;
//		}
//	}
//	return false;
// };

Element.prototype.parents = function (selector) {
	var elem = this;
	var parents = [];
	if (selector) {
		var firstChar = selector.charAt(0);
	}
	for (; elem && elem !== document; elem = elem.parentNode) {
		if (selector) {
			if (firstChar === '.') {
				if (elem.classList.contains(selector.substr(1))) {
					parents.push(elem);
				}
			}
			if (firstChar === '#') {
				if (elem.id === selector.substr(1)) {
					parents.push(elem);
				}
			}
			if (firstChar === '[') {
				if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
					parents.push(elem);
				}
			}
			if (elem.tagName.toLowerCase() === selector) {
				parents.push(elem);
			}
		} else {
			parents.push(elem);
		}
	}
	if (parents.length === 0) {
		return null;
	} else {
		return parents;
	}
};
