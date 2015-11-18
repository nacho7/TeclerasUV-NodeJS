# Modelos

Para los modelos, se usa Sequelize, que es un ORM (Mapeo relacional-objeto), que soporta mysql, postgres, mariadb, sqlite, y mssql.

## Cómo generarlos

Para generarlos, se debe hacer lo siguiente:

````npm install -g sequelize-auto````

Leer documentación de sequelize auto y correr el comando correspondiente.

A la fecha, no creaba las claves foráneas, yo reparé ese error (fueron 3 líneas), ya lo mezclaron, pero no sé cuándo actualicen la versión en nodejs. Por lo que mientras tanto yo tengo la versión parcheada solamente.

El generador no crea las asociaciones (ver app/models/index.js), así que hay que crearlas a mano. Pero sin las referencias, es más latoso, ya que hay que escribirlas a mano cada vez.

## Cómo hacer sql

Ver documentación en la página. Es muy buena :D
