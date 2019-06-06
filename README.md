# To-Do App

  Con la intención de contribuir al conocimiento de los alumnos de la UTP haciendo un simple CRUD de tareas utilizando JavaScript. :smiley:

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

## Configuración del Servidor

  Empezaremos por crear la base de datos que se utilizará, en este proyecto se trabajará con MySQL. La base de datos se llamará  `to-do-app`:
  
  ``` SQL
  CREATE DATABASE `to-do-app`
  ```

  Y la única tabla que tendrá la base de datos se llamará `tasks`, los UUID son un número de 16 bytes y se compone por 32 dígitos hexadecimales divididos en cinco grupos separados por guiones (17646d96-9568-4ce0-b710-ab9ffd4a1ca4). En otros gestores de base de datos como PostgreSQL existe el tipo `UUID`, pero en MySQL no, por lo que guardaremos el UUID como varchar(36):

  ``` SQL
  CREATE TABLE `tasks` (
    `id` varchar(36) PRIMARY KEY,
    `title` varchar(20) NOT NULL UNIQUE,
    `description` text,
    `priority` tinyint(4) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT FALSE
  )
  ```

  Ahora crearemos el archivo principal que habíamos declarado en el `main` del `package.json`. Creamos una carpeta llamada `src` y dentro de ella el archivo `app.js`.
  
  En `app.js` importamos el framework que utilizaremos `Express` y luego lo inicializamos:

  ``` JavaScript
  const express = require('express')
  const app = express()
  ```

  Configuramos a `Express` para que las peticiones del lado del cliente se tomen en formato `JSON`:

  ``` JavaScript
  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))
  ```
  
  Y finalmente levantaremos el servidor en el puerto 3000:

  ``` JavaScript
  app.listen(3000, () => {
    console.log('Server on port 3000')
  })
  ```

  Después de esta configuración, desde la consola escribe:

  ``` bash
  node src/app.js
  ```

  Node es el motor que ejecuta JavaScript, así que le decimos que ejecute el archivo que está en la ruta `src/app.js`. Después de esto, entra desde tu navegador a [`http://localhost:3000`](http://localhost:3000) y verás la magia. No mostrará nada interesante aún, pero el servidor ya está levantado.

  ### app.js

  ``` JavaScript
  const express = require('express')

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))

  app.listen(3000, () => {
    console.log('Server on port 3000')
  })
  ```

## Hola Mundo

  Para poder mostrar un `Hola Mundo!!` desde el navegador hay que tener una ruta a la que se acceda, para tener el código ordenado crearemos una carpeta dentro de `src` que se llame `routes`, dentro de esta carpeta crearemos un archivo para las rutas de tareas (En un proyecto grande conviene que tengas tus rutas ordenadas en varios archivos dependiendo de su utilidad), este archivo se va a llamar `taskRoutes.js` y en este archivo empezamos importando el framework que estamos usando (`Express`):

  ``` JavaScript
  const express = require('express')
  const router = express.Router()
  ```

  Al inicializar `Express` lo hacemos con el método Router, ya que sólo esta parte es la que utilizaremos. Router nos permite interactuar con los métodos `HTTP` como `GET`, `POST`, `PUT`, etc.

  Vamos a crear la primera ruta en la raíz:

  ``` JavaScript
  router.get('/', (req, res) => {
    res.send("Hola Mundo!!")
  })
  ```

  Es una ruta con el método `GET` que se llama desde la raíz del nombre de dominio (que en este caso seria [`http://localhost:3000/`](http://localhost:3000/)). Se tiene una función que se desencadena cada vez que se llama a la ruta, estas funciones se conforman por una petición (`Request`) y una respuesta (`Response`) que son las que están como parámetros. Y esta forma de escribir la función con `=>` son las funciones flecha, pero también puedes hacerlo de esta otra forma:

  ``` JavaScript
  router.get('/', function(req, res) {
    res.send("Hola Mundo!!")
  })
  ```

  Cuando se llama la función, manda como respuesta un `Hola Mundo!!`.
  
  Ya estaría todo listo pero antes estas rutas las tenemos que exportar para poderlas importar en el archivo principal (`app.js`), así que para exportarlas agregamos:

  ``` JavaScript
  module.exports = router
  ```

  Y en `app.js` importamos estas rutas:

  ``` JavaScript
  const taskRoutes = require('./routes/taskRoutes')
  ```

  Y ahora se las damos a `Express` para que las lea:

  ``` JavaScript
  app.use(taskRoutes)
  ```

  Ya que todo está en su lugar podemos probarlo, pero tenemos que recargar el proyecto (`ctrl` + `c` y luego correr de nuevo `node src/app.js`), pero para eso nos ayuda `Nodemon`, así que detenemos el servicio y ahora escribimos:

  ``` bash
  npm run dev
  ```

  `npm` que es el gestor de paquetes, le decimos que vamos a correr un script con la opción `run` que se llama `dev` (que fue el que creamos en el `package.json`) el cual hace funcionar a `Nodemon` en este proyecto.
  
  Refresca tu navegador y mira los cambios.

  ### taskRoutes.js

  ``` JavaScript
  const express = require('express')
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send("Hola Mundo!!")
  })

  module.exports = router
  ```

  ### app.js

  ``` JavaScript
  const express = require('express')
  const taskRoutes = require('./routes/taskRoutes')

  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))
  app.use(taskRoutes)

  app.listen(3000, () => {
    console.log('Server on port 3000')
  })
  ```

### Vista de Tareas

  Vamos a mostrar la vista de tareas. Este proyecto es un CRUD (Create - Read - Update - Delete) de tareas, se podrán crear tareas, se verán en una tabla, al marcar como hecha o para rehacer se actualizarán y se podrán eliminar. Empezaremos por mostrar las tareas.

  Una vez que ya tenemos la ruta del “hola mundo!!”, la utilizaremos para renderizar una vista con HTML en lugar de enviar texto plano. EJS nos ayuda para esto, es JavaScript embebido con el cual podremos hacer un ciclo hasta llenar la tabla con las tareas. Pero antes de eso, hay que decirle a “Express” que lo utilizaremos.

  Hay dos cosas a configurar, en “Express” debemos declarar una variable que se llame “view engine” con la cual podemos decirle el motor de plantillas que vamos a usar, hay varios motores de plantillas que puedes buscar en la página de “npm”.

  ``` JavaScript
  app.set('view engine', 'ejs')
  ```

  La segunda cosa a configurar es otra variable en la que “Express” debe buscar las vistas que se llama “views”. A esta variable le vamos a pasar la ruta a la carpeta en la que crearemos nuestras vistas. Para hacerlo utilizaremos un módulo que ya viene integrado con Node que se llama “Path”:

  ``` JavaScript
  const path = require('path')
  ```

  Con él podemos armar las rutas separando los directorios con “/” o con “\” dependiendo en que sistema operativo que nos encontremos y nosotros no tengamos que modificarlo si cambiamos de un sistema operativo a otro:

  ``` JavaScript
  app.set('views', path.join(__dirname, 'views'))
  ```

  Una vez esto configurado, ya podemos renderizar una vista con “Express”, así que vamos a crear nuestra vista. El objetivo de este documento no es explicar HTML, ni Bootstrap, sólo vamos a explicar EJS, la vista la podrás encontrar al final de esta sección o también [aquí](https://github.com/maeneser/to-do-app/blob/master/src/views/index.ejs), vamos a crear una carpeta dentro de “src” que se llame “views”, y dentro de ahí un archivo llamado “index.ejs”.

  La sintaxis de “EJS” es “<% … %>”, en donde en medio va lo que quieras hacer, si quieres imprimir una variable utiliza la sintaxis “<%= variable1 %>”.

  En el “index.ejs” hay una alerta de error en caso de que al momento de renderizar la vista la variable de “err” trajera alguna información:

  ``` HTML
  <% if (err) { %>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <%= err %>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  <% } %>
  ```

  Para renderizar la tabla con la información se hace un “For Each” en caso de que la variable “tasks” trajera información, en caso contrario se renderiza una sola fila para decir que no hay información:

  ``` HTML
  <tbody>
    <% if (tasks.length > 0) { tasks.forEach((task) => { %>
      <tr>
        <!-- Aquí se imprime la información de cada tarea… -->
      </tr>
    <% }) } else { %>
      <tr>
        <th colspan="4">No data</th>
      </tr>
    <% } %>
  </tbody>
  ```

  En caso de que existieran tareas, se imprime la información. Para el caso de las prioridades y el botón de hacer/rehacer se utilizan operadores ternarios para saber los estilos “CSS” que deben usar con “Bootstrap”. Los operadores ternarios son otra forma de hacer condiciones basadas en la estructura:

  Condición ? Verdadero : Falso

  Y en caso de condiciones anidadas:

  Condición 1 ? Verdadero : Condición 2 ? Verdadero : Falso

  Por lo que con “EJS” puedes utilizar esta forma de hacer condiciones para saber qué estilo o que contenido renderizar.

  Se necesita saber qué prioridad tiene cada tarea para saber qué estilos le toca y después saber también qué texto se coloca. En el caso del botón de hacer/rehacer se necesita saber si la tarea está hecha o no para saber si poner un botón verde o gris:

  ``` HTML
  <tr>
    <th><%= task.title %></th>
    <td><%= task.description %></td>
    <td>
      <span class="<%= task.priority == 1 ?
                   'badge badge-primary' :
                   task.priority == 2 ?
                     'badge badge-warning' :
                     'badge badge-danger' %>">
        <%= task.priority == 1 ?
            'Low' :
            task.priority == 2 ?
              'Medium' :
              'High' %>
      </span>
    </td>
    <td>
      <div class="btn-group" role="group">
        <a href="/redo/<%= task.id %>"
          class="<%= task.done ? 'btn btn-secondary' : 'btn btn-success' %>"
          role="button"
          aria-pressed="true">
          <%= task.done ? 'Redo' : 'Done' %>
        </a>
        <a href="/delete/<%= task.id %>" class="btn btn-danger" role="button" aria-pressed="true">Delete</a>
      </div>
    </td>
  </tr>
  ```

  Una vez configurado “EJS” con “Express” y la vista creada, crearemos un nuevo archivo con el fin de tener todo el código organizado, primero creamos una carpeta dentro de “src” llamada “controllers”, y en ella creamos el archivo llamado “taskController.js”. En este archivo crearemos una función para renderizar la vista que como parámetros tiene el “Request” y la “Response” ya que recibirá la petición y dará una respuesta, esta respuesta tiene un estatus 200 que significa que todo salió bien, luego con la función render, renderizará la vista con nombre “index” y como segundo parámetro enviamos la información que necesita la vista para funcionar en formato “JSON”:

  ``` JavaScript
  function Render(req, res) {
    res.status(200).render('index', {
      'err': null,
      'tasks': []
    })
  }
  ```

  Y también la exportamos, pero cómo se harán varias funciones, la exportamos de la siguiente manera:

  ``` JavaScript
  module.exports = {
    Render
  }
  ```

  Sólo queda reemplazar lo que se hará al llamar la ruta principal, en el archivo de rutas (“taskRoutes.js”) importamos el archivo que acabamos de crear:

  ``` JavaScript
  const taskController = require('../controllers/taskController')
  ```

  Reemplazamos la función que tiene para mandar el “Hola Mundo!!” por la función “Render” del archivo “taskController.js”:

  ``` JavaScript
  router.get('/', taskController.Render)
  ```

  Ahora ya está todo bien configurado, pero agregaremos una ruta extra, que nos ayudará en caso de que alguien entre a una ruta que no existe, le mandaremos el famoso error “404 Not Found”:

  ``` JavaScript
  router.all('/*', (req, res) => {
    res.status(404).send("404 Not Found")
  })
  ```

  Ahora guarda todos los cambios y “Nodemon” recargará el servidor y verás los cambios en tu navegador.

  ### app.js

  ``` JavaScript
  const express = require('express')
  const path = require('path')
  const taskRoutes = require('./routes/taskRoutes')

  const app = express()
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, 'views'))
  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))
  app.use(taskRoutes)

  app.listen(3000, () => {
    console.log('Server on port 3000')
  })
  ```

  ### taskController.js

  ``` JavaScript
  function Render(req, res) {
    res.status(200).render('index', {
      'err': null,
      'tasks': []
    })
  }

  module.exports = {
    Render
  }
  ```

  ### taskRoutes.js

  ``` JavaScript
  const express = require('express')
  const taskController = require('../controllers/taskController')

  const router = express.Router()

  router.get('/', taskController.Render)
  router.all('/*', (req, res) => {
    res.status(404).send("404 Not Found")
  })

  module.exports = router
  ```

   ### index.ejs

  ``` HTML
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>To-Do App</title>
  </head>

  <body>
    <div class="container">
      <h1>To-Do App</h1>
      <% if (err) { %>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <%= err %>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      <% } %>
      <div class="row">
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">Add a Task!</div>
            <div class="card-body">
              <form action="/create" method="POST" autocomplete="off">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" id="title" name="title" placeholder="Add a title" required>
                  <small class="form-text text-muted">Title must be unique.</small>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea class="form-control" id="description" name="description"
                    placeholder="Add a description"></textarea>
                </div>
                <div class="form-group">
                  <label for="priority">Priority</label>
                  <select id="priority" name="priority" class="form-control" required>
                    <option disabled selected>Choose...</option>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <% if (tasks.length > 0) { tasks.forEach((task) => { %>
                <tr>
                  <th><%= task.title %></th>
                  <td><%= task.description %></td>
                  <td>
                    <span class="<%= task.priority == 1 ? 'badge badge-primary' : task.priority == 2 ? 'badge badge-warning' : 'badge badge-danger' %>">
                      <%= task.priority == 1 ? 'Low' : task.priority == 2 ? 'Medium' : 'High' %>
                    </span>
                  </td>
                  <td>
                    <div class="btn-group" role="group">
                      <a href="/redo/<%= task.id %>" class="<%= task.done ? 'btn btn-secondary' : 'btn btn-success' %>"
                        role="button" aria-pressed="true"><%= task.done ? 'Redo' : 'Done' %></a>
                      <a href="/delete/<%= task.id %>" class="btn btn-danger" role="button" aria-pressed="true">Delete</a>
                    </div>
                  </td>
                </tr>
              <% }) } else { %>
                <tr>
                  <th colspan="4">No data</th>
                </tr>
              <% } %>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
      integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
      integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
  </body>

  </html>
  ```