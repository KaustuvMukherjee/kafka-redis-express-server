/*
 * Class - ServerConnectionManager
 */
'use strict'
const logger = require('../../../logger/winston')
const baseServiceClient = require('./baseServiceClient')

const serviceClients = new Map()

class ServerConnectionManager {
    static connected(connection) {
        let wsSrvClient = new baseServiceClient(connection)
        // serviceClients.set(connection.remoteAddress, wsSrvClient)
    }
    static disconnected(connection) {
        // serviceClients.delete(connection.remoteAddress)
    }
}

module.exports = ServerConnectionManager
