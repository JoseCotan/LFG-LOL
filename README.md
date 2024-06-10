<p align="center"><img src="https://i.ibb.co/T1GNXRd/logo.png" width="300" alt="Logo LFG-LOL"></a></p>

<h1 align="center">LFG-LOL</h1>

## Sobre LFG-LOL

LFG-LOL es una aplicación web diseñada para reunir a jugadores de League of Legends (LoL) en un solo lugar, proporcionando una plataforma fácil de usar donde los usuarios pueden buscar compañeros de equipo, crear publicaciones, formar equipos y organizar eventos.

## Instalación

Guía para iniciar el proyecto:

- Clonar el repositorio: git clone https://github.com/JoseCotan/LFG-LOL.git
- Cambia a la carpeta del repositorio: cd LFG-LOL
- Instalar paquetes: composer install
- Instalar dependencias: npm install
- Crear base de datos:

* sudo -u postgres createuser -P proyecto
* sudo -u postgres createdb -O proyecto proyecto

- Migraciones: php artisan migrate:fresh --seed
- Iniciar servidor en local: php artisan serve y npm run dev

Con estos comandos la aplicación estará lista.


## Cuenta de administrador

- admin@admin.com
- Contraseña: adminadmin
