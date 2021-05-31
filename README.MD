README.MD

Proyecto para la conexión con la FIFA  en donde permitirá mostrar como los equipos de las diferente confederaciones se relacionan con otros, que jugadores pertenecen a que equipos y los equipos que pertenezcan a las diferentes competiciones.

Content:
Este proyecto contiene 4 ramas: master, develop, docker y front. La rama principal es la de MASTER es la rama que se tiene que descargar para poder hacer que el proyecto funcione correctamente.

How to clone:
Al descargar el proyecto con la rama master se deben levantar 3 instancias: el docker-compose, el backend y el frontend.

1. Docker-compose: Dentro de la carpeta general de Neo4j se debe ejecutar el siguiente comando: sudo docker-compose up 
2. Backend: Se tiene que acceder a la carpeta del backend que esta dentro de la carpeta general. Y lúego se debe ejecutar el comando npm i, seguido de eso se debe levantar con el comando nodemon
3. Frontend: Se tiene que acceder a la carpeta del frontend que esta dentro de la carpeta general. Y luego se debe ejecutar el comando npm i, seguido de eso se ejecuta el comando npm run serve.
4. Acceder a la base de datos con la contraseña test, en dado caso aparezca una notificación de que la contraseña no es la correcta se debe de utilizar la contraseña predeterminada neo4j y luego cambiar la contraseña a test.

