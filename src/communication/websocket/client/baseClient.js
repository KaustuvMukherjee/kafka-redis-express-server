/*
 * Class - BaseClient
 */
'use strict'
const logger = require('../../../logger/logger')

let conn = null
function sendNumber() {
    if (conn.connected) {
        var number = Math.round(Math.random() * 0xFFFFFF);
        conn.sendUTF(number.toString());
        setTimeout(sendNumber, 5000);
    }
}
class BaseClient {
    constructor(connection) {
        conn = connection
        conn.on('message', (message) => {
            if (message.type === 'utf8') {
                logger.info('Received: ' + message.utf8Data)
            }
        })
        sendNumber()
    }
}

module.exports = BaseClient
