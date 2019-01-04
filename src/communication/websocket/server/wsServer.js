/*
 * Class - WSServer
 */
'use strict'
const logger = require('../../../logger/winston')
const wsServer = require('websocket').server
const http = require('http')
const uuidv4 = require('uuid/v4')
const serverConnectionManager = require('./serverConnectionManager')
const redis = require('../../../storage/redis/redisClient')

let wsSvr = null

class WSServer {
    static createWSServer() {
        var server = http.createServer((request, response) => {
            logger.info('Received request for ' + request.url)
            response.writeHead(404)
            response.end()
        })
        server.listen(3000, () => {
            logger.info(' Server is listening on port 3000')
        })

        wsSvr = new wsServer({
            httpServer: server,
            /*
                You should not use autoAcceptConnections for production
                applications, as it defeats all standard cross-origin protection
                facilities built into the protocol and the browser.  You should
                *always* verify the connection's origin and decide whether or not
                to accept it.
            */
            autoAcceptConnections: false
        })
        wsSvr.on('request', (request) => {
            if (!WSServer.originIsAllowed(request.origin)) {
                /*
                    Make sure we only accept requests from an allowed origin.
                */
                logger.info(' Connection from origin ' + request.origin + ' rejected.')
                request.reject();
                return;
            } else {
                logger.info(' Connection from origin ' + request + ' accepted.')
            }

            var connection = request.accept('echo-protocol', request.origin)
            logger.info(' Connection accepted from .' + request.host)
            connection.id = uuidv4()
            serverConnectionManager.connected(connection)
            connection.on('close', function(reasonCode, description) {
                logger.info(' Peer ' + connection.remoteAddress + ' disconnected.')
                serverConnectionManager.disconnected(connection)
            })
        })
    }
    static originIsAllowed(origin) {
        /*
            Put logic here to detect whether the specified origin is allowed.
        */
        return true;
    }
}


// ALL TEMP CALLS
redis.connectRedis()
WSServer.createWSServer()

module.exports = WSServer
