/*!
 * express-file-logger
 * Copyright(c) 2021-2022 Eduardo Stuart
 * https://eduardostuart.pro.br
 * https://www.linkedin.com/in/eduardo-stuart/
 * 
 * MIT Licensed
 */

'use strict'

const path = require('path')
const fs = require('fs')

const options = {
  basePath: 'logs',
  fileName: 'general_access.log',
  ip: true,
  showOnConsole: true,
  bodyDetails: true,
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
  const bodyDetails = options.bodyDetails ?
    req.body
      ? Object.keys(req.body).length > 0 ? `\n \u2514\u2500${JSON.stringify(req.body)}` : ''
      : ''
    : ''
  const info = `${new Date().toLocaleString()} ${ip ? '[' + ip + ']' : ''} (${method}) ${url}${bodyDetails}`
  if (options.showOnConsole) console.log(info)
  try {
    logFile.write(`${info}\n`)
  } catch (error) {
    console.log(`Error writing to file ${options.fullPathFileName}: ${error}`)
  }
  next()
}

module.exports = (app, opts) => {
  // Test if there is already a log file ─ if there is, print a message to the console informing the client
  if (logFile !== null) {
    console.log(`[Express-File-Logger WARNING]: there is already a file used to record the log. The current settings will not change:\n${JSON.stringify(options, null, 4)}`)
    return
  }
  // Test if the required object is present ─ if not, print a message to the console warning about the problem
  if (!app || typeof (app.use) !== 'function') {
    console.log(`[Express-File-Logger ERROR]: to use this library, you must pass a reference to the Express App used by your application. No log will be registered for this session.`)
    return
  }
  // This function will be called everytime a endpoint is visited
  app.use(saveToLog)
  // There is any custom options?
  if (opts) Object.assign(options, opts)
  // Create the log folder if it not exists
  if (!fs.existsSync(options.basePath)) fs.mkdirSync(options.basePath, { recursive: true })
  options.fullPathFileName = path.join(options.basePath, options.fileName)
  // This is the file that will be used to record the logs
  logFile = fs.createWriteStream(options.fullPathFileName, { flags: 'a' })
}
