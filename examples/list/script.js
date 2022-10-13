var i = 0;
var alp = 'abcdefghijklmnopqrstuvwsyz'.toUpperCase()

/** @list markers */
function alphabet_order() {
    return (alp[i++]||"?") + ':'
}
function number_order() {
    return (i += 1) + ':'
}
var star = '*'


/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs',
    n: alphabet_order
});

/** @button onclick */
function foo() {
    var elm = document.createElement('h4')
    elm.innerHTML += '<?app:n?> ' + input.value;
    input.value=""
    list.appendChild(elm)
}