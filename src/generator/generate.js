/*
 * Class - Generate
 */
'use strict'
const fs = require('fs')
const winston = require('winston')
const utility = require('../utility/utility')

let size = 10
const prefixLookUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                        'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const srcPath = fs.realpathSync('src')

class Generate {
    static generateData(noOfFields, noOfRecords) {
        // If data directory does not exists, create it
        try {
            fs.mkdirSync(`${srcPath}/data`)
        } catch (e) {
            winston.info(`Directory exists !!`)
        }
        let dataPath = `${srcPath}/data`
        let outFile = `${dataPath}/records`

        // If data file exists, delete it
        try {
            fs.unlinkSync(outFile)
        } catch (e) {
            winston.info(`File not found !!`)
        }

        for(let i = 0; i < noOfRecords; i++) {
            let record = ''
            let index = (i).pad(size)
            for(let j = 0; j < noOfFields; j++) {
                let prefix = prefixLookUp[j%prefixLookUp.length]
                record += `${prefix}${index}`
                if(j !== noOfFields-1) {
                    record += `,`
                } else {
                    record += `\n`
                }
            }
            fs.appendFileSync(outFile, record)
        }
    }
}

module.exports = Generate
