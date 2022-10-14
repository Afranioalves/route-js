/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs',
    item: "Hello App"
});

app.map('item',app.useTemplate(temp))