/** @init RouteJs */
var app = new RouteJs('app', {
        name: 'RouteJs'
    }),
    storage = new RouteJs('localStorage', RouteJs.extend(localStorage));

if (!localStorage.routed) {
    storage.mapAll({
        name: "RouteJs",
        style: "themes/default.css",
        routed:"1"
    })
}

app.map('item', app.useTemplate(temp, true))