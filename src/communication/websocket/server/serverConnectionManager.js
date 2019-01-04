/*
 * Class - ServerConnectionManager
 */
'use strict'
const util = require('util')
const logger = require('../../../logger/winston')
const baseServiceClient = require('./baseServiceClient')
const redis = require('../../../storage/redis/redisClient')

const serviceClients = new Map()

class ServerConnectionManager {
    static connected(connection) {
        let wsSrvClient = new baseServiceClient(connection)
        serviceClients.set(connection.id, wsSrvClient)
    }
    static disconnected(connection) {
        serviceClients.set(connection.id, null)
        serviceClients.delete(connection.id)
    }
}

module.exports = ServerConnectionManager
