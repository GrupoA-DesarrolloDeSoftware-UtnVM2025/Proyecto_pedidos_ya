![Logo](https://assets.utnba.centrodeelearning.com/public-api/files/dc2d0f00bca3fa40ad36e0e4d873afbb/images)

# Trabajo Práctico: Back-End Proyecto Pedidos Ya

Este repositorio contiene el código fuente del trabajo práctico integrador del proyecto de código de pedidos ya del grupo A. El mismo contiene los microservicios de [delivery y zonas](https://cvirtual.frvm.utn.edu.ar/pluginfile.php/169740/mod_assign/introattachment/0/delivery%20zonas.pdf?forcedownload=1).
## Autores

- [Liendo Ortiz, Agustín](https://github.com/AgusLiendo)
- [Dalmasso, Elías](https://github.com/EliasDalmasso)
- [Lomello, Baltasar](https://github.com/Balti2003)
- [Fumero, Ignacio](https://github.com/Ignaciofumero)
- [Villareal, Camila](https://github.com/CamiiV)


## Variables de entorno

Antes de la primer ejecucion, deberá crear un archivo .env en la carpeta raiz del proyecto con los siguientes datos:

| Variable              | Utilidad|
| -------------         | ------------- |
| `DB_HOST`             | Enlace de acceso a la base de datos  |
| `DB_PORT`             | Puerto de acceso a la base de datos  |
| `DB_USERNAME`         | Nombre de usuario para acceder la BD |
| `DB_PASSWORD`         | Clave del usuario para acceder la BD |
| `DB_DATABASE`         | Nombre de la BD a usar por TypeORM   |
| `DB_SSL`              | Uso del protocolo SSL (true/flase)   |
| `JWT_SERVICE_URL`     | Url que Auth-Middleware usa para acceder al endpoint 'can-do' (si no se declara se usará el valor por defecto 'http://localhost:3001') |





## Tecnologías Usadas

- __Node.js:__  Entorno de ejecución JavaScript.
- __NestJS:__ Framework.
- __TypeScript:__ Lenguaje de programación tipado.
- __PostgreSQL:__  Sistema de gestión de bases de datos.
- __TypeORM:__ ORM de TypeScript/Node.js para interactuar con la base de datos.

