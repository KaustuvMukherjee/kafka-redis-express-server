/*
 * Class - Generator
 */
'use strict'
const winston = require('winston')
const generate = require('./generate')

const size_of_each_field = 30
const no_of_fields_per_record = 2
const no_of_records = 100

generate.generateData(size_of_each_field <= 26 ? size_of_each_field : 26,
    no_of_fields_per_record,
    no_of_records)
