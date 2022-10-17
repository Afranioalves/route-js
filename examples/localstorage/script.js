/** @init RouteJs */
var app = new RouteJs('app', {
        name: 'RouteJs'
    }),
    storage = new RouteJs('localStorage', RouteJs.extend(localStorage));

if (!localStorage.routed) {
    storage.mapAll({
        name: "default",
        style: _default.content.textContent.trim(),
        routed: "1"
    })
}

app.map('item', app.useTemplate(temp, true))