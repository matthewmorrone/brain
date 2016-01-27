window.$_GET = function(name) {
    if (!name) {
        return new Url(window.location.href).queryPairs;
    }
    var nameEQ = name + '=',
        url = window.location.href,
        pos = url.indexOf('?'),
        url = url.slice(pos + 1),
        arr = url.split('&'),
        i = 0,
        pair = '',
        arrl = arr.length;
    for (i = 0; i < arrl; i++) {
        var pair = arr[i];
        if (pair.indexOf(nameEQ) === 0) {
            return decodeURIComponent(pair.slice(nameEQ.length).replace(/\+/g, '%20'));
        }
    }
    return null;
}

function load(url, cb) {
    var script = document.createElement('script')
    script.onload = cb
    script.src = url
    document.body.appendChild(script)
    return script
}

function file_exists(url) {
    if (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status == 200;
    } else {
        return false;
    }
}

function file_get_contents(url) {
    if (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.responseText;
    } else {
        return false;
    }
}

function file(url) {
    if (url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.responseText.split("\n");
    } else {
        return false;
    }
}
