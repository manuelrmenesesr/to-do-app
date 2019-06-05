# To-Do App

  Con la intención de contribuir al conocimiento de los alumnos de la UTP haciendo un simple CRUD de tareas utilizando JavaScript.

  ![To-Do App](images/to-do-app.png)

  03 / junio / 2019

  ## Prerrequisitos

  * Fundamentos de JavaScript
  * Fundamentos de SQL
  * Herramientas instaladas
    * Node js
    * MySQL
    * Editor de texto

## Configuración Inicial

  Node es un motor de JavaScript, lo que significa que gracias a él podemos usar JavaScript fuera del navegador, ya que este lenguaje fue pensado para usarse en los navegadores. Node se desarrolló con base al motor V8, que es el motor de JavaScript para Google Chrome.

  Para comenzar, vamos a crear una carpeta con el nombre `to-do-app` que será donde esté alojado el proyecto. En una terminal, dentro de la ubicación de la carpeta que recién creamos escribimos el siguiente comando:

  ``` bash
  npm init
  ```

  `npm` significa `Node Package Manager` y es el sistema de gestión de paquetes por defecto para node. Con él podemos descargar módulos para hacer funcionar nuestro proyecto como frameworks o librerías. `npm init` ayuda a crear un archivo llamado `package.json` a partir de los datos que insertes (también es posible crear el archivo manualmente), este archivo es el que tiene la información del proyecto.

  Una vez escrito `npm init` nos pedirá los datos del proyecto. Puedes meter los datos que desees, sólo que en `entry point` escribe `src/app.js`, que será el punto de partida del proyecto (que aún no creamos). En caso de que se te haya pasado, puedes abrir el archivo `package.json` y cambiarlo manualmente en `main`.

  Ahora vamos a instalar las dependencias que utilizará el proyecto, en este ejemplo utilizaremos el framework `Express` que hará el proceso más rápido. Instalaremos el módulo de MySQL para node para conectar a la base de datos. Instalaremos el módulo `UUID` para generar UUID y evitar los ID incrementales y el último módulo es `EJS` que es un motor de plantillas, este en particular significa Embedded JavaScript que como su nombre lo dice, JavaScript estará embebido en el documento HTML para rellenar datos.

  Para instalarlos utilizaremos `npm` de la siguiente manera:

  ``` bash
  npm install express mysql uuid ejs --save
  ```

  La opción `--save` permite registrar las dependencias en el `package.json`, puedes abrir este archivo y ahora verás las dependencias.

  Existen otras tipo de dependencias que son las de desarrollo, a diferencia de las anteriores que le sirven al proyecto para funcionar, estas dependencias ayudan al desarrollador para trabajar fácilmente. Para este proyecto utilizaremos `Nodemon` que ayuda a recargar automáticamente el servidor cada que existan nuevos cambios. Para instalarlo escribimos el siguiente comando, y se guardará como dependencia de desarrollo con `--save-dev`:

  ``` bash
  npm install nodemon --save-dev
  ```

  Crearemos un script que correrá `Nodemon` en el proyecto. En el `package.json` hay ya un script que dice `test`, vamos a reemplazar el `test` por `dev` (aunque le puedes poner el nombre que gustes), y en el contenido reemplazamos lo que tiene por `nodemon` y al final te quedará algo parecido a esto:

  ``` json
  {
    "name": "to-do-app",
    "version": "1.0.0",
    "description": "To-Do App",
    "main": "src/app.js",
    "scripts": {
      "dev": "nodemon"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/maeneser/to-do-app.git"
    },
    "author": "Manuel Meneses",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/maeneser/to-do-app/issues"
    },
    "homepage": "https://github.com/maeneser/to-do-app#readme",
    "dependencies": {
      "ejs": "^2.6.1",
      "express": "^4.17.1",
      "mysql": "^2.17.1",
      "uuid": "^3.3.2"
    },
    "devDependencies": {
      "nodemon": "^1.19.1"
    }
  }
  ```