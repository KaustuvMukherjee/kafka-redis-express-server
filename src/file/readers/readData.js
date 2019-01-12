/*
 * Class - ReadData
 */
'use strict'
const fs = require('fs')
const lineReader = require('line-reader')
const logger = require('../../logger/winston')
const dataFilePath = `${fs.realpathSync('src')}/file/data/records`

class ReadData {
    static read(callback) {
        lineReader.eachLine(dataFilePath, function(line, last) {
            callback(line)
        })
    }
}

// let count = 0
// ReadData.read((line) => {
//     count += 1
//     logger.info(`${count} - ${line}`)
// })

module.exports = ReadData
