$ = document.querySelector;
$$ = document.querySelectorAll;
var $_ = {
    getHTML: function (url, callback) {
        // Feature detection
        if (!window.XMLHttpRequest) return;
        // Create new request
        var xhr = new XMLHttpRequest();
        // Setup callback
        xhr.onload = function() {
            if (callback && typeof(callback) === 'function') {
                callback(this.responseXML);
            }
        }
        // Get the HTML
        xhr.open('GET', url);
        xhr.responseType = 'document';
        xhr.send();
    },
    getJSONP: function (url, callback) {
        // Create script with url and callback (if specified)
        var ref = window.document.getElementsByTagName('script')[0];
        var script = window.document.createElement('script');
        script.src = url + (url.indexOf('?') + 1 ? '&' : '?') + 'callback=' + callback;
        // Insert script tag into the DOM (append to <head>)
        ref.parentNode.insertBefore(script, ref);
        // After the script is loaded (and executed), remove it
        script.onload = function () {
            this.remove();
        };
    },
    ready: function(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function() {
                if (document.readyState != 'loading') {
                    fn();
                }
            });
        }
    },
    parseHTML: function(str) {
        var el = document.createElement('div');
        el.innerHTML = str;
        return el.children;
    },
    parseJSON: function (str) {
        return JSON.parse(str);
    },
    delegate: function(eventName, handler) {
        if (document.addEventListener) {
            document.addEventListener(eventName, handler);
            // handler's first argument is the event object, which contains the target
        } else {
            document.attachEvent('on' + eventName, function() {
                handler.call(document);
            });
        }
    },
    undelegate: function(eventName, handler) {
        if (document.removeEventListener) {
            document.removeEventListener(eventName, handler);
        } else {
            document.detachEvent('on' + eventName, handler);
        }
    },
    now: function () {
        return new Date().getTime();
    },
    getJSON: function (url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    var data = JSON.parse(this.responseText);
                } else {
                    // Error :(
                }
            }
        };
        request.send();
        request = null;
    },
    post: function(url) {
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(data);
    },
    request: function(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    var resp = this.responseText;
                } else {
                }
            }
        };
        request.send();
        request = null;
    },
    filter: function(selector, filterFn) {
        function filter() {
            var elements = document.querySelectorAll(selector);
            var out = [];
            for (var i = elements.length; i--;) {
                if (filterFn(elements[i])) {
                    out.unshift(elements[i]);
                }
            }
            return out;
        }
        return filter(selector, filterFn);
    },
    query: function(selector) {
        return document.querySelectorAll(selector);
    },
    each: function(selector, fn) {
        var elements = document.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
            fn(elements[i], i);
        }
        return this;
    },
    deepExtend: function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];
            if (!obj) {
                continue;
            }
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        deepExtend(out[key], obj[key]);
                    } else {
                        out[key] = obj[key];
                    }
                }
            }
        }
        return out;
    },
    extend: function(out) {
        out = out || {};
        for (var i = 1; i < arguments.length; i++) {
            if (!arguments[i]) {
                continue;
            }
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    out[key] = arguments[i][key];
                }
            }
        }
        return out;
	},
	after: function(node) {
		return this.insertAdjacentHTML("afterend", node);
	},
	append: function(node) {
		return this.insertAdjacentHTML("beforeend", node);
	},
	assert: function(ev) {
		return console.assert(ev);
	},
	before: function(node) {
		return this.insertAdjacentHTML("beforebegin", node);
	},
	prepend: function(node) {
		return Element.insertAdjacentHTML("afterbegin", node);
	},
	log: function() {
		console.log(arguments);
	},
	contains: function(node) {
		return this.contains(node);
	},
	closest: function(sel) {
		return this.closest(sel);
	},
	clone: function() {
		return this.cloneNode();
	},
	inner: function() {
		return this.innerHTML;
	},
	outer: function() {
		return this.outerHTML;
	},
	html: function(out) {
		return (out ? this.outerHTML : this.innerHTML);
	},
	text: function() {
		return this.textContent || this.toString();
	},
	equal: function(node) {
		return this.isEqualNode(node);
	},
	same: function(node) {
		return Node.isSameNode(node);
	},

	remove: function() {
		this.parentElement.removeChild(this);
	},
	replace: function(node) {
		return this.parentElement.replaceChild(this, node);
	},
	first: function() {
		return this.firstChild;
	},
	last: function() {
		return this.lastChild;
	},
	next: function() {
		return this.nextSibling;
	},
	prev: function() {
		return this.previousSibling;
	},
	parent: function() {
		return this.parentElement || this.parentNode;
	},
	children: function() {
		return this.childNodes;
	},
	name: function() {
		return this.name || this.nodeName;
	},
	type: function() {
		return this.type;
	},
	value: function() {
		return this.value;
	},
	tag: function() {
		return this.tagName;
	},
	id: function() {
		return this.id;
	},
	attr: function() {
		if (arguments.length === 1) {
			return this.getAttribute(arguments[0]);
		}
		if (arguments.length === 2) {
			if (arguments[1] === "") {
				return this.removeAttribute(arguments[0]);
			}
			return this.setAttribute(arguments[0], arguments[1]);
		}
		return this.attributes;
	},
	editable: function(edit) {
		if (arguments.length === 1) {
			this.contentEditable = edit;
		}
		return this.isContentEditable;
	},
	class: function() {
		return this.classList || this.className;
	},
	style: function() {
		return this.style;
		// css
	},
	title: function() {
		return this.title;
	},
	query: function(sel) {
		if (sel.slice(0, 1) === ".") {
			return document.getElementsByClassName(sel.slice(1));
		}
		if (sel.slice(0, 1) === "#") {
			return document.getElementById(sel.slice(1));
		}
		// this.getElementsByTagName()
		// this.querySelector()
		return this.querySelectorAll(sel);
	},
	match: function(sel) {
		return this.matches(sel);
	}
}


