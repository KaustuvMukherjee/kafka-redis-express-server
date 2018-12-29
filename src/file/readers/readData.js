/*
 * Class - ReadData
 */
'use strict'
const fs = require('fs')
const lineReader = require('line-reader')
const winston = require('winston')
const utility = require('../../utility/utility')

let size = 10 // should not be more than  26
const prefixLookUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const fields_with_random_alphabets = true
const size_of_each_field = 3
const no_of_fields_per_record = 5
const no_of_records = 100
const dataFilePath = `${fs.realpathSync('src')}/file/data/records`

class ReadData {
    static read(callback) {
        lineReader.eachLine(dataFilePath, function(line, last) {
            callback(line)
        })
    }
}

let count = 0
ReadData.read((line) => {
    count += 1
    console.log(`${count} - ${line}`)
})

module.exports = ReadData
