Esta herramienta digital forma parte del catálogo de herramientas del **Banco Interamericano de Desarrollo*. Puedes conocer más sobre la iniciativa del BID en [code.iadb.org](code.iadb.org)*

  

## Cliente Web SGiS (Sistema de Gestión de Incidencias en Salud).

[![Build Status](https://travis-ci.com/EL-BID/CLIENTE-SGiS.svg?branch=master)](https://travis-ci.com/EL-BID/CLIENTE-SGiS)

  
![SGiS](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/src/assets/iconos/android-chrome-192x192.png)
  

### Descripción y contexto

Salud Mesoamérica, ME-G1001 & ME-G1004

Una de las prioridades de la Secretaría de Salud del Estado de Chiapas es tener herramientas para implementar acciones que permitan el acceso de las mujeres a los servicios obstétricos, a fin de reducir la muerte materna y neonatal; Por lo tanto, la creación de SGiS, es una estrategia para fortalecer la sistematización en atención de referencias, respuesta de urgencias, emergencias obstétricas y neonatales; cada unidad hospitalaria será la central de información; encargada de gestionar a pacientes en salud maternal, desde el monitoreo, registro y seguimiento de las incidencias; los procesos serán controlados a través de SGiS, estos para coordinar la red de servicios a fin de brindar una atención resolutiva a los usuarios dentro del menor tiempo posible.

Para contribuir a mejorar la calidad y eficacia de los servicios de salud deberá existir un sistema de referencia y respuesta que “constituya el enlace entre las unidades hospitalarias operativas de los niveles de atención que conforman la red de servicios, con el propósito de brindar a los usuarios atención médica integral y oportuna en las unidades, conforme al padecimiento de la paciente y la capacidad resolutiva de la unidad hospitalaria que resulten más convenientes”.

  

---
### Guía de usuario
---
##### Manual de Usuario:
Para guiar y ser mas explicito a cualquier usuario encargado para trabajar con SGiS se brinda un [Manual de Usuario](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/src/assets/Manual-Usuario-SGiS.pdf).

  
##### Manual Técnico:

Para la continuidad en el desarrollo de SGiS se brinda un Manual Técnico; después de instalar el proyecto, dependencias y paquetes, pueden generarlo de la siguiente manera:

1. Ingresar a la carpeta raíz del proyecto.
2. Abrir una consola de comandos dentro de la carpeta.
3. y ejecutar el siguiente comando:
```
npm run compodoc
```
Se creara una carpeta dentro del proyecto llamada **documentation**, basta con abrir la carpeta y a su ves el archivo **index.html** y listo visualizara todos los componentes de SGiS de acuerdo a su código fuente y como funciona cada parte.

### Guía de instalación

---

#### Requisitos de Instalación.

##### Software:

El desarrollo del Cliente web de SGiS se programó en [Angular 4](https://angular.io/)

  

Para poder instalar y utilizar el Cliente web, deberá asegurarse que su servidor cumpla con los siguientes requisitos, se dejan los links de descarga:

  

1. [Node.js](https://nodejs.org/es/) Descargar: "Recomendado para la mayoría"

2. [Npm](https://www.npmjs.com/get-npm) es un manejador de paquetes para el proyecto de Angular 4

3. [Git](https://git-scm.com/) es un sistema de control de versiones distribuidas de [código abierto y gratuito](https://git-scm.com/about/free-and-open-source).

4. [Angular CLI](https://cli.angular.io/) Hace que sea fácil crear una aplicación que ya funciona.

5. [Google Chrome](https://www.google.com.mx/intl/es_ALL/chrome/) El navegador optimo para acceder a SGiS.

6. [Visual Studio Code](https://code.visualstudio.com/download) El procesador de texto recomendado para codificar y explorar las carpetas de acuerdo a la estructura del proyecto SGiS.

*Si algo de lo anterior mencionado no se instalara correctamente, podrá consultar la documentación oficial de cada paquete de instalación*
  

#### Instalación y Configuración:

Una ves instalado todo lo anterior, abrimos una consola en nuestro servidor para clonar el proyecto en base al [Repositorio](https://github.com/EL-BID/CLIENTE-SGiS.git).

  

Ejecutamos el siguiente comando en nuestra consola:

```

git clone https://github.com/EL-BID/CLIENTE-SGiS.git

```

  

Una ves clonado el proyecto, cargamos e instalamos todos los paquetes y sus dependencias, siempre y cuando estemos dentro de la carpeta del proyecto raíz y ejecutando el siguiente comando:

```

npm install

```
Una ves instaladas nuestras las dependencias con el comando anterior, inicializamos nuestro proyecto, existen 2 formas de hacerlo:

- Este comando inicializa todas las dependencias que node instalo de nuestro archivo [package.json](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/package.json) y a su ves inicia el servidor del cliente web en el puerto 4200.

```
npm start
```

- O también este comando inicializa el servidor del cliente web, también en el puerto 4200.

```
ng serve
```
Si esta ocupando el puerto 4200 en otra aplicación, pueden inicializar el proyecto cambiando dicho puerto de la siguiente manera:

```
ng serve --port 4201
```
 


#### Dependencias:

Todas la dependencias que requiere SGiS para funcionar, están en el archivo [package.json](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/package.json):

El desarrollo de SGiS esta construido en 2 partes:

1.  La [API](https://github.com/Luisvl13/API-SGiS) que se conecta la arquitectura de Base de Datos. (Seguir los pasos de instalación y configuración de la API).

2. El [Cliente Web](https://github.com/EL-BID/CLIENTE-SGiS) que solicita y envía datos a la API antes mencionada.

  

Para tener este vinculo y conexión entre API y CLIENTE, debe asegurarse que los archivos [environment.prod.ts](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/src/environments/environment.prod.ts) (Producción) y [environment.ts](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/src/environments/environment.ts) (Pruebas) tengan las cadenas de conexión correspondientes

  

```

│ sgis
├── / src
├──── environments/
├─────environment.prod.ts
		"production":true,
		"API_URL": "http://localhost:8000/api/v1",
		"API_PATH": "http://localhost:8000",
		"OAUTH_CLIENTE": "http://localhost:8000/api/sync",
		"OAUTH_SERVER": "http://api.oa2.che",
		"OAUTH_DISPONIBLE": false,
├─────environment.ts
		"production": false,
		"API_URL": "http://localhost:8000/api/v1",
		"API_PATH": "http://localhost:8000",
		"OAUTH_CLIENTE": "http://localhost:8000/api/sync",
		"OAUTH_SERVER": "http://api.oa2.che",
		"OAUTH_DISPONIBLE": false,

```
¡En hora buena!, si todo esta correcto, podrá abrir una pestaña del navegador [Google Chrome](https://www.google.com.mx) y acceder al puerto donde se hayan levantado los servicios del Cliente Web, *por ejemplo: http://localhost:4200* de la siguiente manera:

![cargando](https://github.com/goraider/CLIENTE-SGiS/blob/master/src/assets/cargando.png)


Procedemos a escribir nuestro usuario y contraseña de acuerdo a la configuración de la [API](https://github.com/Luisvl13),
probar con root 123456

![login](https://github.com/goraider/CLIENTE-SGiS/blob/master/src/assets/login.jpg)


#### Compilar y Poner en un servidor de producción:

Para compilar y subir a producción SGiS es necesario que el archivo [environment.prod.ts](https://github.com/goraider/CLIENTE-SGiS/blob/master/src/environments/environment.prod.ts) tenga los módulos del archivo JSON de la variable "MENU": al del del archivo [environment.ts](https://github.com/goraider/CLIENTE-SGiS/blob/master/src/environments/environment.ts) (Siempre y cuando se encuentren listos para producción) y tener la variable "production":true.

Basta con abrir una consola de comandos en nuestro servidor y escribir el siguiente comando:
  
```
ng build --aot --env prod
```
Finalizado lo anterior, esperando que compile el proyecto al 100%, deberá explorar la carpeta tmp del proyecto SGiS.

La estructura de nuestra carpeta quedaría de la siguiente manera:

```

La carpeta con nuestro proyecto compilado
│sgis
├── tmp/
├──── dist/
├─────── assets
├─────── scripts
		 favicon.ico
		 fontawesome-webfont.674f50d287a8c48dc19b.eot
		 fontawesome-webfont.912ec66d7572ff821749.svg
		 fontawesome-webfont.af7ae505a9eed503f8b8.woff2
		 fontawesome-webfont.b06871f281fee6b241d6.ttf
		 fontawesome-webfont.fee66e712a8a08eef580.woff
		 index.html
		 inline.bundle.js
		 inline.bundle.js.map
		 main.bundle.js
		 main.bundle.js.map
		 scripts.bundle.js
		 scripts.bundle.js.map
		 styles.bundle.js
		 styles.bundle.js.map
		 vendor.bundle.js
		 vendor.bundle.js.map

```
  

### Cómo contribuir

  

---

Si deseas contribuir con este proyecto, por favor lee las siguientes guías que establece el [BID](https://www.iadb.org/es  "BID"):

*  [Guía para Publicar Herramientas Digitales](https://el-bid.github.io/guia-de-publicacion/  "Guía para Publicar")

*  [Guía para la Contribución de Código](https://github.com/EL-BID/Plantilla-de-repositorio/blob/master/CONTRIBUTING.md  "Guía de Contribución de Código")

  

### Código de conducta

---

Puedes ver el código de conducta para este proyecto en el siguiente archivo [CODEOFCONDUCT.md](https://github.com/EL-BID/Supervision-SISBEN-ML/blob/master/CODEOFCONDUCT.md).

  

### Autor/es

  

---
* **[Javier Alejandro Gosain Díaz](https://github.com/goraider "Github")** - [Email](alejandro_gosain@hotmail.com)
* **[Ramiro Gabriel Alférez Chavez](mailto:ramiro.alferez@gmail.com "Correo electrónico")**
* **[Eliecer Ramirez Esquinca](https://github.com/checherman "Github")**
* **[Luis Alberto Valdez Lescieur](https://github.com/Luisvl13  "Github")**


  

### Información adicional

---

Para hacer el correcto uso del Cliente Web para SGiS, previamente tienen que instalar la [API](https://github.com/Luisvl13) que contiene las conexiones correspondientes a la base de datos y la encargada de realizar peticiones a los datos.

  

### Licencia
---


La Documentación de Soporte y Uso del software se encuentra licenciada bajo Creative Commons IGO 3.0 Atribución-NoComercial-SinObraDerivada (CC-IGO 3.0 BY-NC-ND) [LICENCIA.md](https://github.com/EL-BID/CLIENTE-SGiS/blob/master/LICENSE.md)

  

## Limitación de responsabilidades

  

El BID no será responsable, bajo circunstancia alguna, de daño ni indemnización, moral o patrimonial; directo o indirecto; accesorio o especial; o por vía de consecuencia, previsto o imprevisto, que pudiese surgir:

I. Bajo cualquier teoría de responsabilidad, ya sea por contrato, infracción de derechos de propiedad intelectual, negligencia o bajo cualquier otra teoría; y/o

II. A raíz del uso de la Herramienta Digital, incluyendo, pero sin limitación de potenciales defectos en la Herramienta Digital, o la pérdida o inexactitud de los datos de cualquier tipo. Lo anterior incluye los gastos o daños asociados a fallas de comunicación y/o fallas de funcionamiento de computadoras, vinculados con la utilización de la Herramienta Digital.
