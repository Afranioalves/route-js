## RouteJs

 `javascript`
 ```js
  var app =new RouteJs('app',{
      name:'my app'
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
        <?app:name?>
    </body>
</html>
```

`preview`
```plain
my app
```
----
 `javascript`
 ```js
  app.map('name','hello app')
 ```

 `preview`
```plain
hello app
```