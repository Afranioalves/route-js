/** @init RouteJs */
var app = new RouteJs('app', {
        name: 'RouteJs'
    }),
    storage = new RouteJs('localStorage', RouteJs.extend(localStorage));

app.map('item', app.useTemplate(temp, true))