// Data generator
exports.DATA_GENERATOR = {
    RANDOM_ALPHABETS: true,
    FIELD_SIZE: 3,
    FIELDS_PER_RECORD: 10,
    NO_OF_RECORDS: 100
}

// Redis
exports.HASH_CLIENT_UUID = {
    TIMESTAMP: 'Timestamp',
    SUBSCRIPTION_TYPE: 'Subscription-Type'
}

// Kafka
exports.BROKER = {
    HOST: 'localhost:9092'
}
exports.TOPIC = {
    MASTER:'topic_master_data'
}
exports.CONSUMER = {
    GROUP_ID:'group_master',
    AUTO_RESET_OFFSET: 'earliest'
}

// Events (All)
exports.EVENT = {
    REDIS_READY: 'event.redis.ready',
    REDIS_CONNECT: 'event.redis.connect',
    REDIS_RECONNECTING: 'event.redis.reconnecting',
    REDIS_ERROR: 'event.redis.error',
    REDIS_END: 'event.redis.end',
    REDIS_WARNING: 'event.redis.warning',
    KAFKA_PRODUCER_DISCONNECTED: 'event.kafka.producer.disconnected',
    KAFKA_PRODUCER_READY: 'event.kafka.producer.ready',
    KAFKA_PRODUCER_EVENT: 'event.kafka.producer.event',
    KAFKA_PRODUCER_EVENT_LOG: 'event.kafka.producer.event.log',
    KAFKA_PRODUCER_EVENT_STATS: 'event.kafka.producer.event.stats',
    KAFKA_PRODUCER_EVENT_ERROR: 'event.kafka.producer.event.error',
    KAFKA_PRODUCER_EVENT_THROTTLE: 'event.kafka.producer.event.throttle',
    KAFKA_PRODUCER_DELIVERY_REPORT: 'event.kafka.producer.delivery.report',
    KAFKA_CONSUMER_DATA: 'event.kafka.consumer.data',
    KAFKA_CONSUMER_DISCONNECTED: 'event.kafka.consumer.disconnected',
    KAFKA_CONSUMER_READY: 'event.kafka.consumer.ready',
    KAFKA_CONSUMER_EVENT: 'event.kafka.consumer.event',
    KAFKA_CONSUMER_EVENT_LOG: 'event.kafka.consumer.event.log',
    KAFKA_CONSUMER_EVENT_STATS: 'event.kafka.consumer.event.stats',
    KAFKA_CONSUMER_EVENT_ERROR: 'event.kafka.consumer.event.error',
    KAFKA_CONSUMER_EVENT_THROTTLE: 'event.kafka.consumer.event.throttle'

}
