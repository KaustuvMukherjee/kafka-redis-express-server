const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const producer = require('./producer')
const readData = require('../../../file/readers/readData')

class ProducerClient {
    static start() {
        producer.createKafka((event, err) => {
            if(event === 'ready') {
                readData.read((line) => {
                    producer.write(line)
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
