const constants = require('../../../constant/constants')
const logger = require('../../../logger/logger')
const producer = require('./producer')
const readData = require('../../../file/readers/readData')

let callback = null
let connected = false
class ProducerClient {
    static start(callback) {
        callback = callback

        producer.create((event, info, error) => {
            switch(event) {
                case constants.EVENT.KAFKA_PRODUCER_DISCONNECTED:
                    connected = false
                    break
                case constants.EVENT.KAFKA_PRODUCER_READY:
                    connected = true
                    readData.read((line) => {
                        producer.write(constants.TOPIC.MASTER, line)
                        return connected
                    })
                    break
                case constants.EVENT.KAFKA_PRODUCER_EVENT_ERROR:
                    connected = false
                    break
                default:
            }
            callback(event, info, error)
        })
    }
}

module.exports = ProducerClient
