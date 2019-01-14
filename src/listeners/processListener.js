/*
 * Class - ProcessListener
 */
'use strict'
const logger = require('../logger/logger')

class ProcessListener {
    static listen() {
        process.on('exit', (code) => {
            logger.info(`EXIT CODE: ${code}`)
        })
        //
        process.on('message', (msg) => {
            logger.info(`MESSAGE: ${msg}`)
        })
        //
        process.on('rejectionHandled', (reason, promise) => {
            logger.info(`REJECTION HANDLED at: ${promise} reason: ${reason}`)
        })
        //
        process.on('uncaughtException', (err) => {
            logger.info(`UNCAUGHT EXCEPTION: ${err}`)
        })
        //
        process.on('unhandledRejection', (reason, promise) => {
            logger.info(`UNHANDLED REJECTION at: ${promise} reason: ${reason}`)
        })
        //
        process.on('warning', (warning) => {
            logger.info(`WARNING: ${warning}`)
        })
    }
}

module.exports = ProcessListener
