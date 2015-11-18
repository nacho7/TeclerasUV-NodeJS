# Qué es NodeJS

Es un servidor Web que usa javascript como lenguaje. Es muy pequeñito y todo se basa en millones de módulos instalables.

# Qué es expressjs

Es un Framework que aúna el controlador con la vista, no tiene modelo. Es un framework pequeñito y sencillo de usar, sin paradigmas tránfugos (como otros), y con buena documentación. Es recomendado para introducirse en nodejs, ya que muchos otros frameworks más completos, usan expressjs como middleware para sus fines.

## Documentación

[Documentacion oficial, nosotros usamos la version 4](http://expressjs.com/)

# Qué es Sequelize

Es un ORM, son los modelos.

## Documentación

[Documentacion api estable, se está usando la 3 (última estable)](http://docs.sequelizejs.com/en/stable/)

# Otra documentación

## MUST

[Acá solucionarán todo excepto el sentido de su vida](http://stackoverflow.com/)

## Javascript opcional, para ser un maestro en javascript

[Tutorial desde begginer hasta mediano pro de la W3C](http://www.w3schools.com/js/default.asp)

[Tutorial muuuy bueno introductio sobre callbacks](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)

Hay un tipo especial de callbacks llamado "Promesa", que es cuando una función tiene un callback para cuando tiene éxito, y otro para cuando falla.

[Tutorial promesas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
El Scope, alcance o ámbito de las variables en javascript es medio tránfugo, bastante más distinto que en otros lenguajes.

Como resumen, antes que se ejecute un programa, se almacenan todas las funciones, y se declaran las variables, pero no se asignan. De manera que puedes usar una función en cualquier parte del código, y las variables, si no están asignadas, dirá que es 'undefined', pero si no está declarada, dará un error de referencia y parará.

````js
var a;
function mifun(){
  console.log(a);
}
mifun();//undefined
a=3;
mifun();//3
console.log(b); //error y todo se fue a la b
````

Un resumen sobre eso:
[ámbito de las variables en javascript, una introducción](http://librosweb.es/libro/javascript/capitulo_4/ambito_de_las_variables.html)
