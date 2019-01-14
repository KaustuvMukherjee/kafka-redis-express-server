const constants = require('../../../constant/constants')
const logger = require('../../../logger/logger')
const consumer = require('./consumer')
const redis = require('../../../storage/redis/redisClient')

let callback = null
class ConsumerClient {
    static start(callback) {
        callback = callback

        consumer.create((event, info) => {
            switch(event) {
                case constants.EVENT.KAFKA_CONSUMER_READY:
                    break
                case constants.EVENT.KAFKA_CONSUMER_DATA:
                    // logger.info(`${messageCount}. ${event}: ${info}`)
                    // if(messageCount === constants.DATA_GENERATOR.NO_OF_RECORDS) {
                    //     logger.info(`Received all messages.`)
                    // } else if(messageCount%1000000 === 0) {
                    //     logger.info(`Received ${messageCount} messages.`)
                    // }
                    // consumer.consume()
                    break
                default:
            }
            callback(event, info)
        })
    }
}

module.exports = ConsumerClient
