/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs',
});

new RouteJs('localStorage', localStorage);

app.map('item',app.useTemplate(temp,true))