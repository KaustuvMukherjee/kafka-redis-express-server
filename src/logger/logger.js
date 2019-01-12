const chalk = require('chalk')

let level = {info: false, debug: false, error: false, colorize: false}
class Logger {
    static setLevel(option) {
        if('info' in option) {
            level.info = option.info
        }
        if('debug' in option) {
            level.debug = option.debug
        }
        if('error' in option) {
            level.error = option.error
        }
        if('colorize' in option) {
            level.colorize = option.colorize
        }
    }

    static info(message) {
        if(level.info) {
            if(level.colorize) {
                console.log(chalk.green.bold(`INFO: `) + `${message}`)
            } else {
                console.log(`INFO: ` + `${message}`)
            }
        }
    }

    static debug(message) {
        if(level.debug) {
            if(level.colorize) {
                console.log(chalk.yellow.bold(`DEBUG: `) + `${message}`)
            } else {
                console.log(`DEBUG: ` + `${message}`)
            }
        }
    }

    static error(message) {
        if(level.error) {
            if(level.colorize) {
                console.log(chalk.red.bold(`ERROR: `) + `${message}`)
            } else {
                console.log(`ERROR: ` + `${message}`)
            }
        }
    }
}

module.exports = Logger
