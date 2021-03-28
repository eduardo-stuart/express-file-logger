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
  const method = req.method || 'NO METHOD FOUND'
  const url = req.url || 'NO URL FOUND'
  const ip = options.ip 
    ? req.headers['x-forwarded-for'] || req.connection.remoteAddress 
    : null
  const bodyDetails = req.body 
    ? Object.keys(req.body).length > 0 ? `\n  ${JSON.stringify(req.body)}` : ''
    : ''
  const info = `${new Date().toLocaleString()}: ${ip ? '[' + ip +']' : ''} (${method}) ${url}${bodyDetails}` 
  if (options.showOnConsole) console.log(info)
  if (logFile) {
    try {
      logFile.write(`${info}\n`)
    } catch (error) {
      console.log(`Error writing on file ${options.fullPathFileName}: ${error}`)
    }
  }
  next()
}

module.exports = (app, opts) => {
  if (!app) throw new Error('[Express-File-Logger] To use this library, you must pass a reference to the Express Application')
  app.use(saveToLog)
  if(opts) Object.assign(options, opts)
  if(!fs.existsSync(options.basePath)) fs.mkdirSync(options.basePath, { recursive: true })
  options.fullPathFileName = path.join(options.basePath, options.fileName)
  logFile = fs.createWriteStream(options.fullPathFileName, { flags: 'a' })
}
