/*
 * Class - WSClient
 */
'use strict'
const logger = require('../../../logger/winston')
const wsClient = require('websocket').client
const clientConnectionManager = require('./clientConnectionManager')

let wsClnt = null
class WSClient {
    static createWSClient() {
        wsClnt = new wsClient()
        wsClnt.on('connectFailed', function(error) {
            logger.info('Connect Error: ' + error.toString())
        })
        wsClnt.on('connect', (connection) => {
            logger.info('WebSocket Client Connected')
            clientConnectionManager.connected(connection)
            //
            connection.on('error', (error) => {
                logger.info('Connection Error: ' + error.toString())
                clientConnectionManager.disconnected(connection)
            })
            connection.on('close', () => {
                logger.info('echo-protocol Connection Closed')
                clientConnectionManager.disconnected(connection)
            })
        })
    }
}

WSClient.createWSClient()
wsClnt.connect('ws://localhost:3000', 'echo-protocol')

module.exports = WSClient
