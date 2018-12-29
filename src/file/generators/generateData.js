/*
 * Class - GenerateData
 */
'use strict'
const fs = require('fs')
const winston = require('winston')
const randomstring = require("randomstring")
const utility = require('../../utility/utility')

let size = 10 // should not be more than  26
const prefixLookUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const fields_with_random_alphabets = true
const size_of_each_field = 3
const no_of_fields_per_record = 10
const no_of_records = 1000
const dataPath = `${fs.realpathSync('src')}/file/data`

class GenerateData {
    static generate(sizeOfEachField,
                        noOfFields,
                        noOfRecords) {
        // If data directory does not exists, create it
        try {
            fs.mkdirSync(dataPath)
        } catch (e) {
            winston.info(`Directory exists !!`)
        }
        let outFile = `${dataPath}/records`

        // If data file exists, delete it
        try {
            fs.unlinkSync(outFile)
        } catch (e) {
            winston.info(`File not found !!`)
        }

        if(fields_with_random_alphabets) {
            for(let i = 0; i < noOfRecords; i++) {
                let record = '{'
                for(let j = 0; j < noOfFields; j++) {
                    let value = randomstring.generate({
                        length: sizeOfEachField,
                        charset: 'alphabetic'
                    })
                    let key = `key${j}`
                    record += `\"${key}\": \"${value}\"`
                    if(j !== noOfFields-1) {
                        record += `,`
                    } else {
                        record += '}\n'
                    }
                }
                fs.appendFileSync(outFile, record)
            }
        } else {
            for(let i = 0; i < noOfRecords; i++) {
                let record = '{'
                let index = (i).pad(sizeOfEachField)
                for(let j = 0; j < noOfFields; j++) {
                    let key = `\"key${j}\"`
                    let prefix = prefixLookUp[j%prefixLookUp.length]
                    let value = `\"${prefix}${index}\"`
                    record += `${key}: ${value}`
                    if(j !== noOfFields-1) {
                        record += `,`
                    } else {
                        record += '}\n'
                    }
                }
                fs.appendFileSync(outFile, record)
            }
        }
    }
}


GenerateData.generate(size_of_each_field <= 26 ? size_of_each_field : 26,
    no_of_fields_per_record,
    no_of_records)
