# Express-File-Logger

A lightweight, plug-and-play library that logs to a file every access made on an Express Server.

## Install

```
npm install express-file-logger
```

## General Info

With this library, all the accesses made on an Express Server will be saved on a text file.

The resulting file will record each access on one or more lines, like the example below:

```
28/03/2021 00:26:15 [::1] (GET) /
28/03/2021 00:26:19 [::1] (POST) /api/user/register
  {"name":"Eduardo","email":"none@moment.com","password":"pass123"}
```

Where:
  * **28/03/2021 00:26:15**: This field represents the timestamp of the log event
  * **[::1]**: This is the IP address of the visitor
  * **(GET)**, **(POST)**, **(ETC)**: This is the HTTP method of the request
  * **/api/user/register**: The path of the endpoint
  * **{"name":"Eduardo","email":"none@moment.com","password":"pass123"}**: The body of the request, if any


## Basic Usage

To use this library, you only need a valid Express Application object.

Before using it, make sure both libraries are installed on your system:

```
npm install express express-file-logger
```

### Simple Example

Below is an example of how to use this tool. 

  1. Import the **express** library
  2. Create an Express Application
  3. Make sure to use the **express.json()** *middleware* before importing this library to have access to the body contents of the requests
  4. Import the **express-file-logger**, passing the reference to the **Express Application** that was created in *step 2*
  5. With the default settings, the log will be saved on your server at **'/logs/general_access.log'**

```javascript
// Import the Express library and get the application reference
const express = require('express')
const app = express()

// This is important if you want the body of the request to be included on the logs
app.use(express.json())

// Import the Express-File-Logger, and initialize it with the Express Application
require('express-file-logger')(app)

app.get('/', (req, res) => {
  res.send('Hi! Very nice to see you around here!')
})

app.listen(3000, console.log('Server is listening on port 3000'))
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
<img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.eduardostuart.pro.br/matomo.php?idsite=8&amp;rec=1" style="border:0" alt="" />

## Changelog

  * Changed the method used to check if the Express Object is valid
  * Fixes on the text that can be printed on console
  * Other minor fixes
  * README.md changed with better examples on how to use the library

## Contact

Hi! My name is Eduardo Stuart and I am a software developer. 

Will love to hear your opinion about this library or any of my others projects!  

Fell free to contact me at the following places:
  * **[WebSite](https://eduardostuart.pro.br/)**
  * **[LinkedIn](https://www.linkedin.com/in/eduardo-stuart/)**
  * **[GitHub](https://github.com/eduardo-stuart/)**