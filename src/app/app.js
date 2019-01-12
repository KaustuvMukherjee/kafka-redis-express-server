const constants = require('../constant/constants')
const logger = require('../logger/logger')
const processListener = require('../listeners/processListener')
const redis = require('../storage/redis/redisClient')
const producerClient = require('../streaming/kafka/producer/producerClient')
const consumerClient = require('../streaming/kafka/consumer/consumerClient')


class Application {
    static run() {

        // Set log level
        logger.setLevel({info: true, debug: false, error: false, colorize: true})
        // Listen to process notifications / unhandled exceptions
        processListener.listen()
        // Initialize redis
        redis.connect(Application.handleCallbacks)
    }
    //
    static handleCallbacks(event, info) {
        switch(event) {
            case constants.EVENT.REDIS_READY:
                logger.debug(event)
                consumerClient.start(Application.handleCallbacks)
                producerClient.start(Application.handleCallbacks)
                break
            case constants.EVENT.REDIS_CONNECT:
                logger.debug(event)
                break
            case constants.EVENT.REDIS_RECONNECTING:
                logger.debug(event)
                break
            case constants.EVENT.REDIS_ERROR:
                logger.error(event)
                break
            case constants.EVENT.REDIS_END:
                logger.debug(event)
                break
            case constants.EVENT.REDIS_WARNING:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_DISCONNECTED:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_READY:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_LOG:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_STATS:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_ERROR:
                logger.error(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_EVENT_THROTTLE:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_PRODUCER_DELIVERY_REPORT:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_DATA:
                logger.info(`${event}: ${info}`)
                break
            case constants.EVENT.KAFKA_CONSUMER_DISCONNECTED:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_READY:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_LOG:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_STATS:
                logger.debug(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_ERROR:
                logger.error(event)
                break
            case constants.EVENT.KAFKA_CONSUMER_EVENT_THROTTLE:
                logger.debug(event)
                break
            default:
        }
    }
}

module.exports = Application
