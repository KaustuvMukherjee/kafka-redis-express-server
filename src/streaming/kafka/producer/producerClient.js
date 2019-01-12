const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const producer = require('./producer')
const readData = require('../../../file/readers/readData')

class ProducerClient {
    static start() {
        producer.create((event, err) => {
            if(event === 'ready') {
                logger.info("Producer - EVENT:ready")
                readData.read((line) => {
                    producer.write(constants.TOPIC.MASTER, line)
                })
            } else if(event === 'disconnected') {
                logger.info("Producer - EVENT:disconnected")
            } else if(event === 'event.error') {
                logger.error(`Producer - EVENT:error:${err}`)
            }
        })
    }
}

ProducerClient.start()

module.exports = ProducerClient
