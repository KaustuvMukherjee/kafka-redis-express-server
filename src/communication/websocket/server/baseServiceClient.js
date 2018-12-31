/*
 * Class - BaseServiceClinet
 */
'use strict'
const logger = require('../../../logger/winston')

class BaseServiceClinet {
    constructor(connection) {
        this.connection = connection
        connection.on('message', (message) => {
            if (message.type === 'utf8') {
                logger.info('Received Message: ' + message.utf8Data)
                connection.sendUTF(message.utf8Data)
            }
            else if (message.type === 'binary') {
                logger.info('Received Binary Message of ' + message.binaryData.length + ' bytes')
                connection.sendBytes(message.binaryData);
            }
        })
    }
}

module.exports = BaseServiceClinet
