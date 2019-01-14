/*
 * Class - BaseServiceClient
 */
'use strict'
const logger = require('../../../logger/logger')

class BaseServiceClient {
    constructor(connection) {
        this.connection = connection
        this.connection.on('message', (message) => {
            if (message.type === 'utf8') {
                logger.info('Received Message: ' + message.utf8Data + ' from client id: ' + this.connection.id)
                this.connection.sendUTF(message.utf8Data)
            }
            else if (message.type === 'binary') {
                logger.info('Received Binary Message of ' + message.binaryData.length + ' bytes')
                this.connection.sendBytes(message.binaryData);
            }
        })
    }
}

module.exports = BaseServiceClient
