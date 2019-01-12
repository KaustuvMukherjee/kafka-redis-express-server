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

        consumer.on('ready', function() {
            logger.info("Consumer - EVENT:ready")
            callback('ready', null)
        })
        consumer.on('data', function(data) {
            logger.info("Consumer - EVENT:data")
            logger.info(`DATA: ${data.value.toString()}`)
            callback('data', data.value.toString())
        })
        consumer.on('event.error', function(err) {
            logger.error(`Consumer - EVENT:error:${err}`)
            callback('event.error', err)
        })
    }

    static subscribe(topic) {
        logger.info(`Consumer - SUBSCRIBED:${topic}`)
        consumer.subscribe([topic])
    }

    static consume() {
        logger.info(`Consumer - CONSUME`)
        consumer.consume()
    }

    static disconnect() {
        logger.info(`Consumer - DISCONNECT`)
        producer.disconnect()
    }
}

module.exports = Consumer
