
const util = require('util')
const constants = require('../../../constant/constants')
const logger = require('../../../logger/logger')
const Kafka = require('node-rdkafka')

let consumer = null
let callback = null
class Consumer {
    static create(callback) {
        callback = callback

        consumer = new Kafka.KafkaConsumer({
            'group.id': constants.CONSUMER.GROUP_ID,
            'metadata.broker.list': constants.BROKER.HOST,
            'auto.offset.reset': constants.CONSUMER.AUTO_RESET_OFFSET,
            'enable.auto.commit': true
        }, {})
        consumer.connect()

        consumer.on('data', function(data) {
            callback(constants.EVENT.KAFKA_CONSUMER_DATA, data.value.toString())
        })

        consumer.on('disconnected', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_DISCONNECTED)
        })

        consumer.on('ready', function() {
            global.readyToConsume = true
            Consumer.subscribe(constants.TOPIC.MASTER)
            Consumer.consume()
            callback(constants.EVENT.KAFKA_CONSUMER_READY)
        })

        consumer.on('event', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT)
        })

        consumer.on('event.log', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_LOG)
        })

        consumer.on('event.stats', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_STATS)
        })

        consumer.on('event.error', function(err) {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_ERROR, null, err)
        })

        consumer.on('event.throttle', function() {
            callback(constants.EVENT.KAFKA_CONSUMER_EVENT_THROTTLE)
        })
    }

    static subscribe(topic) {
        logger.debug(`Consumer - SUBSCRIBED:${topic}`)
        consumer.subscribe([topic])
    }

    static consume() {
        logger.debug(`Consumer - CONSUME`)

        setInterval(function() {
            if(global.readyToConsume === true) {
                consumer.consume(1, (err, message) => {
                    if (message.length != 0) {
                        // global.readyToConsume = false
                        logger.info(`CONSUME CALLBACK: ${err}: ${message[0].value}`)
                    } else {
                        logger.info(`CONSUME CALLBACK: ${err}`)
                    }

                })
            } else {
                logger.info('Consumer is not ready to consume.')
            }
        }, 1000);
    }

    static disconnect() {
        logger.debug(`Consumer - DISCONNECT`)
        producer.disconnect()
    }
}

module.exports = Consumer
