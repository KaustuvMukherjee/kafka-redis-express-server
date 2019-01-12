const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const consumer = require('./consumer')

let callback = null
class ConsumerClient {
    static start(callback) {
        callback = callback

        consumer.create((event, info) => {
            switch(event) {
                case constants.EVENT.KAFKA_CONSUMER_READY:
                    consumer.subscribe(constants.TOPIC.MASTER)
                    consumer.consume()
                    break
                default:
            }
            callback(event, info)
        })
    }
}

module.exports = ConsumerClient
