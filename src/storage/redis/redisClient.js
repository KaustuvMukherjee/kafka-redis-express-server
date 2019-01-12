const constants = require('../../constant/constants')
const Redis = require('redis')
const {promisify} = require('util')
const logger = require('../../logger/winston')

let connectionString = 'redis://localhost:6379'
let redis = null

class RedisClient {

    static connect() {

        redis = Redis.createClient(connectionString)

        redis.on("ready", function () {
            logger.info(`Redis Client - EVENT:ready`)
        })

        redis.on("connect", function () {
            logger.info(`Redis Client - EVENT:connect`)
        })

        redis.on("reconnecting", function () {
            logger.info(`Redis Client - EVENT:reconnecting`)
        })

        redis.on("error", function (err) {
            logger.error(`Redis Client - EVENT:error:${err}`)
        })

        redis.on("end", function () {
            logger.info(`Redis Client - EVENT:end`)
        })

        redis.on("warning", function (err) {
            logger.info(`Redis Client - EVENT:warning:${err}`)
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

    // for reference only
    // static async getConfig(hashKey, key) {
    //     try {
    //         const getAsync = promisify(redisClient.hget).bind(redisClient)
    //         let result = await getAsync(hashKey, key)
    //         return result
    //     } catch (e) {
    //         return {"status": "FAILED"}
    //     }
    // }
    //
    // static async getConfigAll(hashKey) {
    //     try {
    //         const getAllAsync = promisify(redisClient.hgetall).bind(redisClient)
    //         let result = await getAllAsync(hashKey)
    //         return result
    //     } catch (e) {
    //         return {"status": "FAILED"}
    //     }
    // }
    //
    // static async setConfig(hashKey, key, val) {
    //     try {
    //         const setAsync = promisify(redisClient.hset).bind(redisClient)
    //         await setAsync(hashKey, key, val)
    //         return {"status": "SUCCESS"}
    //     } catch (e) {
    //         return {"status": "FAILED"}
    //     }
    // }
    //
    // static async deleteConfig(hashKey, key) {
    //     try {
    //         const delAsync = promisify(redisClient.hdel).bind(redisClient)
    //         await delAsync(hashKey, key)
    //         return {"status": "SUCCESS"}
    //     } catch (e) {
    //         return {"status": "FAILED"}
    //     }
    // }
    //
    // static async deleteConfigAll(hashKey) {
    //     try {
    //         const delAllAsync = promisify(redisClient.del).bind(redisClient)
    //         await delAllAsync(hashKey)
    //         return {"status": "SUCCESS"}
    //     } catch (e) {
    //         return {"status": "FAILED"}
    //     }
    // }
}

module.exports = RedisClient
