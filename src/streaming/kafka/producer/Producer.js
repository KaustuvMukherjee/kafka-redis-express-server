const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const Kafka = require('node-rdkafka')

let producer = null
let callback = null
class Producer {
    static createKafka(callback) {
        callback = callback
        producer = new Kafka.Producer({
            'metadata.broker.list': 'localhost:9092'
        })
        producer.connect()

        producer.on('ready', function() {
            logger.info("Producer - EVENT:ready")
            callback('ready', null)
        })
        producer.on('disconnected', function() {
            logger.info("Producer - EVENT:disconnected")
            callback('disconnected', null)
        })
        producer.on('event.error', function(err) {
            logger.error(`Producer - EVENT:error:${err}`)
            callback('event.error', err)
        })
    }

    static write(message) {
        try {
            producer.produce(
                // Topic to send the message to
                'realtime-client-server-topic',
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

    static disconnectKafka() {
        producer.disconnect()
    }
}


module.exports = Producer
