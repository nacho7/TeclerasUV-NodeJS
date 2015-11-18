# funciones middleware

## Qué es un middleware

Es un software que está en el medio de otros programas.

## Expressjs y routers

una función middleware, en un router, cumple la función de ejecutarse antes que el resto, y sirve para validaciones generales o particulares, ejemplo: control de sesión, validar ciertas cosas comunes a varias páginas, entre muchas otras funcionalidades que se les pueda ocurrir.

Para pasar a la siguiente función, si se quiere, se usa la función next(), y pueden haber tantas funciones middleware como se desee.

## Cómo hacerlos

Un ejemplo es mejor que nada:

````js
router.post('/miruta', funcion1, funcion2);
function funcion1(req, res, next){ algo}
//los nombres pueden ser cualquiera xD si quieren les ponen nombres tránfugos, pero no les aceptaré el pull request.
function funcion1(request, response, next){ algo}
````

También pueden estar en duro (puestas una detrás de la otra).
