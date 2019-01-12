/*
 *
 */
const winston = require('winston')

let logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: false }),
                winston.format.simple()
            )
        })
    ],
    exitOnError: false, // do not exit on handled exceptions
})

module.exports = logger
