const constants = require('../../constant/constants')
const Redis = require('redis')
const {promisify} = require('util')
const logger = require('../../logger/logger')

let connectionString = 'redis://localhost:6379'
let redis = null
let callback = null

class RedisClient {

    static connect(callback) {
        callback = callback

        redis = Redis.createClient(connectionString)

        redis.on("ready", function () {
            callback(constants.EVENT.REDIS_READY, null)
        })

        redis.on("connect", function () {
            callback(constants.EVENT.REDIS_CONNECT, null)
        })

        redis.on("reconnecting", function () {
            callback(constants.EVENT.REDIS_RECONNECTING, null)
        })

        redis.on("error", function (err) {
            callback(constants.EVENT.REDIS_ERROR, err)
        })

        redis.on("end", function () {
            callback(constants.EVENT.REDIS_END, null)
        })

        redis.on("warning", function (err) {
            callback(constants.EVENT.REDIS_WARNING, null)
        })
        return {status: "SUCCESS"}
    }

    static disconnect() {
        redis.quit()
        return {status: "SUCCESS"}
    }

    static async update_CLIENT_UUID(uuid,
                                    keyType,
                                    key,
                                    val) {
        let keyVal = ''
        switch(keyType){
            case constants.HASH_CLIENT_UUID.TIMESTAMP:
                keyVal = `${constants.HASH_CLIENT_UUID.TIMESTAMP}:${key}`
            case constants.HASH_CLIENT_UUID.SUBSCRIPTION_TYPE:
                keyVal = HASH_CLIENT_UUID.SUBSCRIPTION_TYPE
        }
        try {
            const setAsync = promisify(redis.hset).bind(redis)
            let hashKey = `CLIENT:${uuid}`
            await setAsync(hashKey, key, val)
            return {status: "SUCCESS"}
        } catch (e) {
            return {status: "FAILED"}
        }
    }

    static async update_RECORDS_TABLENAME(tableName,
                                    primaryKey,
                                    record) {
        try {
            const setAsync = promisify(redis.hset).bind(redis)
            let hashKey = `RECORDS:${tableName}`
            await setAsync(hashKey, primaryKey, record)
            return {status: "SUCCESS"}
        } catch (e) {
            return {status: "FAILED"}
        }
    }

    static async update_UPDATES_TABLENAME(tableName,
                                    primaryKey,
                                    timeStamp) {
        try {
            const setAsync = promisify(redis.hset).bind(redis)
            let hashKey = `UPDATES:${tableName}`
            await setAsync(hashKey, primaryKey, timeStamp)
            return {status: "SUCCESS"}
        } catch (e) {
            return {status: "FAILED"}
        }
    }
}

module.exports = RedisClient
