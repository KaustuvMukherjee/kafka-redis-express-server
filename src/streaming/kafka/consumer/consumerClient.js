const constants = require('../../../constant/constants')
const logger = require('../../../logger/winston')
const consumer = require('./consumer')

class ConsumerClient {
    static start() {
        consumer.create((event, err) => {
            if(event === 'ready') {
                consumer.subscribe(constants.TOPIC.MASTER)
                consumer.consume()
            } else if(event === 'data') {
                logger.info("Consumer - EVENT:data")
            } else if(event === 'event.error') {
                logger.error(`Consumer - EVENT:error:${err}`)
            }
        })
    }
}

ConsumerClient.start()

module.exports = ConsumerClient
