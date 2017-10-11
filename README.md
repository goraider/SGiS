# X3-C

- Angular 2
- Bulma.io
- Angular Cli

## Instrucciones para publicar en producción

- Crear el directorio en el servidor donde se va alojar:

```
mkdir mi_proyecto  && cd mi_proyecto
```
- Inicializar repositorio apuntando al proyecto cambiamos la palabra **origin** por **github** para saber de donde viene:
```
git init
git remote add -f github https://github.com/XXAI/X3-C.git
```

- Configuramos para que solo baje la carpeta de distribucion:
```
git config core.sparsecheckout true
echo dist/ >> .git/info/sparse-checkout
echo dist/assets >> .git/info/sparse-checkout
echo dist/scripts >> .git/info/sparse-checkout
echo dist/web-workers >> .git/info/sparse-checkout
```

- La configuración anterior solo es al inicio y una sola vez, a partir de aqui, solo hacemos pull y nada mas bajaremos el directorio de distribución de angular cli.
```
git pull github master
```

- La estructura interna de nuestra carpeta quedaría como sigue
```
.
+-- .git
+-- dist/
|   +-- assets/
|   |   +-- *.*
|   +-- scripts/
|   |   +-- *.*
|   +-- web-workers/
|   |   +-- *.*
|   +-- favicon.ico
|   +-- index.html
|   +-- *.*
```

- Configurar el archivo de apache **httpd.conf** para que apunte a la carpeta **dist/** del proyecto

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