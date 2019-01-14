const util = require('util')
const argv = require('yargs').argv
const constants = require('../constant/constants')
const logger = require('../logger/logger')
const processListener = require('../listeners/processListener')
const redis = require('../storage/redis/redisClient')
const producerClient = require('../streaming/kafka/producer/producerClient')
const consumerClient = require('../streaming/kafka/consumer/consumerClient')

let messageCount = 0

class Application {
    static run() {

        // Set log level
        logger.setLevel({info: true, debug: true, error: false, colorize: true})
        // Listen to process notifications / unhandled exceptions
        processListener.listen()
        // Initialize redis
        redis.connect(Application.handleCallbacks)
    }
    //
    static handleCallbacks(event, info, error) {
        switch(event) {
            case constants.EVENT.REDIS_READY:
                logger.info(event)
                if(argv.mode === 'producer') {
                    producerClient.start(Application.handleCallbacks)
                } else {
                    consumerClient.start(Application.handleCallbacks)
                }
                break
            case constants.EVENT.REDIS_CONNECT:
                logger.info(event)
                break
            case constants.EVENT.REDIS_RECONNECTING:
                logger.info(event)
                break
            case constants.EVENT.REDIS_ERROR:
                logger.error(event)
                break
            case constants.EVENT.REDIS_END:
                logger.info(event)
                break
            case constants.EVENT.REDIS_WARNING:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_DISCONNECTED:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_READY:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_LOG:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_STATS:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_ERROR:
                logger.error(`${event}: ${error}`)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_THROTTLE:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_DELIVERY_REPORT:
                logger.info(`${event}: ${util.inspect(info)}`)
                break
            case constants.EVENT.KAFKA_CONSUMER_DATA:
                // messageCount += 1
                // logger.info(`${messageCount}. ${event}: ${info}`)
                // if(messageCount === constants.DATA_GENERATOR.NO_OF_RECORDS) {
                //     logger.info(`Received all messages.`)
                // } else if(messageCount%1000000 === 0) {
                //     logger.info(`Received ${messageCount} messages.`)
                // }
                break
            case constants.EVENT.KAFKA_CONSUMER_DISCONNECTED:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_READY:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_LOG:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_STATS:
                logger.info(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_ERROR:
                logger.error(`${event}: ${error}`)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_THROTTLE:
                logger.info(event)
                break
            default:
        }
    }
}

module.exports = Application
