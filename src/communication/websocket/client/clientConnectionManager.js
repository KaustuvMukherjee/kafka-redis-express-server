/*
 * Class - ClientConnectionManager
 */
'use strict'
const logger = require('../../../logger/logger')
const baseClient = require('./baseClient')

let client = null

class ClientConnectionManager {
    static connected(connection) {
        client = new baseClient(connection)
    }
    static disconnected(connection) {
        client = null
    }
}

module.exports = ClientConnectionManager
