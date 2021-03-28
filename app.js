'use strict'

const path = require('path')
const fs = require('fs')

const options = {
  basePath: 'logs',
  fileName: 'general_access.log',
  ip: true,
  showOnConsole: true
}

let logFile = null

const saveToLog = (req, _, next) => {
  // Only proceeds if there is a valid logFile
  if (!logFile) return
  const method = req.method || 'NO METHOD FOUND'
  const url = req.url || 'NO URL FOUND'
  const ip = options.ip 
    ? req.headers['x-forwarded-for'] || req.connection.remoteAddress 
    : null
  const bodyDetails = req.body 
    ? Object.keys(req.body).length > 0 ? `\n  ${JSON.stringify(req.body)}` : ''
    : ''
  const info = `${new Date().toLocaleString()} ${ip ? '[' + ip +']' : ''} (${method}) ${url}${bodyDetails}` 
  if (options.showOnConsole) console.log(info)
  try {
    logFile.write(`${info}\n`)
  } catch (error) {
    console.log(`Error writing on file ${options.fullPathFileName}: ${error}`)
  }
  next()
}

module.exports = (app, opts) => {
  // Test if there is already a log file ─ if there is, print a message to the console
  if (logFile !== null){
    console.log(`[Ecpress-File-Logger WARNING]: there is already a file used to record the log. The current settings will not change:\n${JSON.stringify(options, null, 4)}`)
    return
  }
  // Test if the required object is present ─ if not, print a message to the console warning about the problem
  if (!app || typeof (app.locals) === 'undefined') {
    console.log(`[Express-File-Logger ERROR]: to use this library, you must pass a reference to the Express App used by your application. No log will be registered for this session.`)
    return 
  }
  // This function will be called everytime a endpoint is visited
  app.use(saveToLog)
  // There is any custom options?
  if(opts) Object.assign(options, opts)
  if(!fs.existsSync(options.basePath)) fs.mkdirSync(options.basePath, { recursive: true })
  options.fullPathFileName = path.join(options.basePath, options.fileName)
  // This is the file that will be used to record the logs
  logFile = fs.createWriteStream(options.fullPathFileName, { flags: 'a' })
}
