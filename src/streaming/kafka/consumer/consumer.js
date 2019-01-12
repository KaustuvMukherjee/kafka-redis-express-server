const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const Kafka = require('node-rdkafka')

let consumer = null
let callback = null
class Consumer {
    static create(callback) {
        callback = callback

        consumer = new Kafka.KafkaConsumer({
            'group.id': constants.CONSUMER.GROUP_ID,
            'metadata.broker.list': constants.BROKER.HOST,
        }, {})
        consumer.connect()

        consumer.on('data', function(data) {
            callback(constants.EVENT.KAFKA_CONSUMER_DATA, data.value.toString())
        })

        consumer.on('disconnected', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_DISCONNECTED, null)
        })

        consumer.on('ready', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_READY, null)
        })

        consumer.on('event', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT, null)
        })

        consumer.on('event.log', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_LOG, null)
        })

        consumer.on('event.stats', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_STATS, null)
        })

        consumer.on('event.error', function(err) {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_ERROR, err)
        })

        consumer.on('event.throttle', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_THROTTLE, null)
        })
    }

    static subscribe(topic) {
        logger.debug(`Consumer - SUBSCRIBED:${topic}`)
        consumer.subscribe([topic])
    }

    static consume() {
        logger.debug(`Consumer - CONSUME`)
        consumer.consume()
    }

    static disconnect() {
        logger.debug(`Consumer - DISCONNECT`)
        producer.disconnect()
    }
}

module.exports = Consumer
