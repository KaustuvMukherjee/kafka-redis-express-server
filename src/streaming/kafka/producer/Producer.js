const constants = require('../../../constant/constants')
const logger = require('../../../logger/logger')
const Kafka = require('node-rdkafka')

let producer = null
let callback = null
class Producer {
    static create(callback) {
        callback = callback

        producer = new Kafka.Producer({
            'metadata.broker.list': constants.BROKER.HOST,
            dr_cb: true,
            event_cb: true
        })
        producer.connect()
        producer.setPollInterval(100)

        producer.on('disconnected', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_DISCONNECTED)
        })

        producer.on('ready', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_READY)
        })

        producer.on('event', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_EVENT)
        })
        producer.on('event.log', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_EVENT_LOG)
        })

        producer.on('event.stats', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_EVENT_STATS)
        })

        producer.on('event.error', function(err) {
            callback(constants.EVENT.KAFKA_PRODUCER_EVENT_ERROR, null, err)
        })
        producer.on('event.throttle', function() {
            callback(constants.EVENT.KAFKA_PRODUCER_EVENT_THROTTLE)
        })

        producer.on('delivery-report', function(err, report) {
            callback(constants.EVENT.KAFKA_PRODUCER_DELIVERY_REPORT, report, err)
        })
    }

    static write(topic, message) {
        logger.debug(`Producer - WRITE: TOPIC - ${topic} MESSAGE - ${message}`)
        try {
            producer.produce(
                // Topic to send the message to
                topic,
                // optionally we can manually specify a partition for the message
                // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
                null,
                // Message to send. Must be a buffer
                Buffer.from(message),
                // for keyed messages, we also specify the key - note that this field is optional
                null,
                // you can send a timestamp here. If your broker version supports it,
                // it will get added. Otherwise, we default to 0
                Date.now(),
                // you can send an opaque token here, which gets passed along
                // to your delivery reports
            );
        } catch (err) {
            logger.error(`Producer - WRITE:error:${err}`)
        }
    }

    static disconnect() {
        logger.debug("Producer - DISCONNECT")
        producer.disconnect()
    }
}


module.exports = Producer
