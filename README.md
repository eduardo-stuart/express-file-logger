# Express-File-Logger

A lightweight library that logs to a file every access made on an Express server.

## Install

```
npm install express-file-logger
```

## General Info

With this library, all the accesses made on an Express server will be saved on a text file.

The resulting file will save each access on one or more lines, like the example below:

```bash
28/03/2021 00:26:15: [::1] (GET) /
28/03/2021 00:26:19: [::1] (POST) /api/user/register
  {"name":"Eduardo","email":"Nenhum","password":"pass123"}
```

Where:
  * **28/03/2021 00:26:15:** This field represents a timestamp
  * **[::1]**: Is the IP address of the visitor
  * **(GET)**, **(POST)**, **(ETC)**: Is the HTTP method of the request
  * **/api/user/register**: The path of the endpoint
  * **{"name":"Eduardo","email":"Nenhum","password":"pass123"}**: The body of the request, if any


## Basic Usage

To use this library, you only need an Express App object.

```javascript
// Import the Express library and get the application reference
const express = require('express')
const app = express()

// This is important if you want the body of the request to be included on the logs
app.use(express.json())

// Import the Express-File-Logger, and initialize it with the Express Application
require('express-file-logger')(app)

app.get('/', (req, res) => {
  res.send('Hi! Very cool to see you here!')
})

app.listen(3000, console.log('Server is listen on the 3000 port'))
```

## Options

You can set the following options:

  * **basePath**
    - Sets the folder where the log file will be saved.
    - Default value is **_logs_**
  * **fileName**
    - The name used for the file
    - Default value is _**general_access.log**_
  * **ip**
    - Boolean value that indicates if the IP address of the visitor will be logged
    - Default value is **true**
  * **showOnConsole**
    - Boolean that indicates if the record will also be printed on console
    - Default value is **true**

These options can be defined on an object and passed in when importing the library:

```javascript
const express = require('express')
const app = express()
app.use(express.json())

const myOptions = {
  basePath: 'mylogs',
  fileName: 'mysite.log',
  ip: false,
  showOnConsole: false
}
require('express-file-logger')(app, myOptions)
...
```

## Contact

You can find me on:
  * **(LinkedIn)[https://www.linkedin.com/in/eduardo-stuart/]**
  * **(GitHub)[https://github.com/eduardo-stuart/]**