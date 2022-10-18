
/** @init RouteJs */
var app = new RouteJs('app', {
    name: 'RouteJs'
});

new RouteJs('lib',lib);

// var img=new Image()
// var lib =new RouteJs('lib',{
//     "home-img":(img.src="../../imgs/home.svg",img.cloneNode()),
//     "about-img":(img.src="../../imgs/about.svg",img.cloneNode()),
//     "404-img":(img.src="../../imgs/404.svg",img.cloneNode())
// });





 onhashchange = function(){
    var hash=location.hash.trim();
    if (!hash) {
        hash='#'
    }
    app.map('contents',app.useTemplate(document.querySelector('[path="'+hash+'"]')||document.querySelector('[_404]')))
    hash=hash.split("#")
    hash=hash[hash.length-1]||"home"
    app.map('name',hash)
}

onhashchange()