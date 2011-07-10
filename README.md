
# RouteJs
```js
/*JavaScript*/

var app=new RouteJs(String, Object])

app.map(String, String || Promise || NodeList || Element || Node || app.useTemplate || app.usePromise)

app.mapAll(Object)

app.useTemplate(HTMLTemplateElement || Element)

app.usePromise(Promise, String || NodeList || Element || Node || app.useTemplate || app.usePromise)

app.createNodeList(String)

```

  
```html
<!--HTML-->

<?A:B C?>

```
`
where 
A = Route name,
B = Map name,
C = placeholder (value to be displayed before B loads)
  `



# Examples
 `javascript`
 ```js
  var app =new RouteJs('app',{
      name:'Word'
  })
  console.log(app)
 ```

 `html`
```html
<!DOCTYPE html>
<html>
    <head>
        <script src="script.js"></script>
        <script>...</script>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
    </head>
    <body>
        Hello <?app:name?>
    </body>
</html>
```

`preview`
```plain
Hello Word
```
----
 `javascript`
 ```js
  app.map('name','App')
 ```

 `preview`
```preview
Hello App
```

[see a live example](https://owens94819.github.io/route-js/)