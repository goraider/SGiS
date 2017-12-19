# UGUS-SGIS

- Angular 4
- Bulma.io
- Angular Cli

## Instrucciones para publicar en producción

- Crear el directorio en el servidor donde se va alojar:

```
mkdir mi_proyecto  && cd mi_proyecto

Para Clonar el proyecto:
git clone https://goraider@bitbucket.org/goraider/angular.git


```
- Inicializar repositorio apuntando al proyecto, creando el repositorio remoto:
```
git init
git remote add origin https://goraider@bitbucket.org/goraider/angular.git
```

- Configuramos para que solo baje la carpeta del proyecto:
```
git pull origin master
```
- Dentro de la carpeta del Proyecto instalamos, para cargar todos los paquetes y sus dependencias:
```
npm install
```
- para compilar en produccion:

```
dentro de la carpeta del proyecto, este nos genera el proyecto compilado, ejecutamos:

ng build
```

- La estructura interna de nuestra carpeta quedaría como sigue
```
│ // La carpeta con nuestro build
├── tmp/
├──── dist/
│ // La carpeta app con los archvos html, js y css de nuestra aplicación 
│    ├── assets
│    ├── scripts
│    ├── favicon.ico
│    ├── index.html
.......etc.
```

- Configurar el archivo de apache **httpd.conf** para que apunte a la carpeta **tmp/dist/** del proyecto

```
<VirtualHost *:80>
    ServerAdmin john@doe.com
    DocumentRoot /var/www/html/mi_proyecto/dist
    ServerName mi.proyecto.com
    ErrorLog logs/error_log
    CustomLog logs/access_log combined
    <Directory /var/www/html/mi_proyecto/dist>
        RewriteEngine on

        # No reescribir archivos o directorios
        RewriteCond %{REQUEST_FILENAME} -f [OR]
        RewriteCond %{REQUEST_FILENAME} -d
        RewriteRule ^ - [L]

        # Reescribir todo lo demas a index.html para permitir html5 state links
        RewriteRule ^ index.html [L]
    </Directory>
</VirtualHost>
```