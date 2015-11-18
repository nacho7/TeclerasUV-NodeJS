# Views

Las vistas están en archivos ejs, que son html con código javascript embebido.

El código javascript va entre "<%" y "%>", y cuando se quiere retornar un valor, es:

````
<%=valor%>
````

Este código javascript se ejecuta en el servidor, por lo que no se les ocurra usar jquery o document.getElementById o esas yerbas, porque les dará error.

## Ejemplo

````
<%for(i in variable){%>
  <br>
  mi variable es:
<%=variable[i]%>
<%}%>
````
