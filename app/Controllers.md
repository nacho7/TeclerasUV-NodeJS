# Controladores

Van en la carpeta controllers dentro de app.

No pongas otro tipo de archivos ahí, que no sean controllers, debido a que config/express.js fallará en encontrarlos automáticamente.

Existen de dos tipos:

# GET

Cuando se carga una página en el navegador, se llama a este método por defecto.

## Recibir datos

Para recibir datos, se puede de dos formas, que no son excluyentes (pueden estar ambas)

### request.query

es cuando la página es de la forma

````
mipagina?var1=20&var2=soy+erick
````

Ejemplo:

````
www.youtube.com/watch?video=algo
````

se reciben en el objeto: request.query, y no se declaran en ninguna parte, por lo que pueden venir tantos y de la forma que se le ocurra al niño chico que ingresa valores, y la página no se caerá ni le pasará nada, pero si faltan, y los estás usando, se puede caer D: ahí caen las validaciones infinitas DDD:

````js
if(request.query.mivar1 && request.query.mivar2){}
````

### request.params

es cuando la página es de la forma

`````
mipagina/1/soy+erick
````

Ejemplo:

````
www.youtube.com/watch/video/algo
````

Estos se declaran en el router, de la forma:

````
mipagina/:mivar1/:mivar2
````

y se leen como:

````js
request.params.mivar1
````


# POST

## Recibir datos

Para recibir datos en un post sólo hay una forma, y es con request.body, toma los valores de un formulario según el campo name.

### request.body

Estos valores pasan "por debajo", y el usuario nunca los ve. En realidad pasan en los headers de la página, y si la página pasa "limpia", el usuario con las herramientas de los navegadores modernos los puede ver. Para evitar eso hay que usar https, y así pasan encriptados.


# Formularios

Los formularios que usen el method="GET", llaman al método get del controlador que tenga la misma ruta que la definida en action, pero con los parámetros en request.query

Ejemplo:

Página:

````html
<form action="miruta" method="GET">
  <input type ="text" name="mivar1" value="Elvalor, esto debe estar entre comillas siempre, y no se reemplaza si es texto o passowrd, etc">
  <input type ="hidden" name="mihidden" value="oculto">
</form>
````

Controller:

````js
router.get('/miruta', function(req, res, next){
  console.log(req.query);
  console.log(req.query.mivar1); //texo gigante, o el texto ingresado por el usuario
  console.log(req.query.mihidden); //oculto, sirve para pasar variables de un lado a otro, no lo implementé acá.
  })
````
