# Tecleras UV en NodeJS
Aplicación de las tecleras uv en nodejs para el ramo de desarrollo web.

##Instalación
instalar nodejs

en la consola:

cd \<carpeta\>

npm install

npm install -g gulp

##Arrancar
gulp

##Base de datos
Instalar MySQL 5.6.x
Loguearse como root
en la consola, pegar los siguientes comandos
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

##Tests
No sirven. los probé para farmautomático xD

Sería bueno que se hagan acá :o lo documentaré si tengo tiempo.

Son test de "carga o no la página", cosas así xD "Test unitarios" se llaman. pero no creo que de para hacerlos sinceramente, es fácil, pero no da el tiempo para que aprendan tanto D:
