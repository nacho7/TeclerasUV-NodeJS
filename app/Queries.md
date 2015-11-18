# Queries

Las consultas no deberían ir en el controlador, pero si se ponen en el modelo, el controlador tiene pleno acceso a todos los modelos, y puede hacer una barbaridad.

Para separar al controlador del modelo, y para que "no se conozcan", es que creé la capa intermedia queries.

Además hice un namespace, para el que le de flojera importar cada uno de los archivos que necesita xD Aunque esto no es tan buen patrón de diseño la verdad...
