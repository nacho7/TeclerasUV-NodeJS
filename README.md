# Tecleras UV en NodeJS

Aplicación de las tecleras uv en nodejs para el ramo de desarrollo web.

##Instalación

instalar nodejs

en la consola:

````
cd carpeta_donde_esta_bajada_la_app
````

pueden arrastrar y soltar la carpeta en la terminal de cmd o de linux.

````
npm install
````

si dice que npm es un comando no reconocido, cerrar todas las terminales y volverlas a abrir, si sigue diciendo, reiniciar el pc.

````
npm install -g gulp
````

##Arrancar

````
gulp
````

La página estará en localhost:3000

##Base de datos

Instalar MySQL 5.6.x (es la que uso, aunque en teoría debería funcionar con 5.7.x, no lo he probado).

Loguearse como root con:
````
mysql -u root -p
````
y poner su contraseña cuando se as pida (la que pusieron al instalar mysql), si no tienen, entonces el comando es sin el -p, es decir ````mysql -u root````

Por favor al instalarlo ponerle que el servicio inicie automáticamente al prender el pc (es un checkbox que tienen que marcar), y luego reiniciar el pc.

Si les dice error de conexión, es que no iniciaron el servicio. para inciarlo manualmente:
tecla windows+r y ejecutar "services.msc", ir a propiedades de mysql (o mysql56, etc), e iniciarlo, y setearlo en automático.

Si les dice comando no encontrado tienen que añadirlo al path...  para eso:
vayan a panel de control->Sistema y seguridad->sistema->configuración avanzada->variables de entorno y cambian PATH de usuario por:

````
todoelresto;C:\Program Files\MySQL\MySQL Server 5.6\bin
````

Según donde se haya instalado.

en la consola de mysql, pegar los siguientes comandos

````
create user 'teclerasuv'@'localhost' identified by 'desarrolloweb';
````

````
create database teclerasuv;
````

````
grant all privileges on teclerasuv.* to teclerasuv@'localhost';
````

````
exit;
````

En cmd usar:

````
mysql -u teclerasuv -p teclerasuv < archivo_dump.sql
````

Cuando pida contraseña, tipear: desarrolloweb

Usando el archivo dump de la carpeta data.

##Tests

No sirven. los probé para farmautomático xD

Sería bueno que se hagan acá :o lo documentaré si tengo tiempo.

Son test de "carga o no la página", cosas así xD "Test unitarios" se llaman. pero no creo que de para hacerlos sinceramente, es fácil, pero no da el tiempo para que aprendan tanto D:
