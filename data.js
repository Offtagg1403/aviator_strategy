//yarn install fast-csv
const fs = require('fs')
const csv = require('fast-csv');
const data = []

//import { findStreak } from './streak';

//findStreak= require('./streak');
findStreak= require('./martingale');


const BET = 2
const MULTIPLIER = 1.4
const STREAK = 2
let offset = 0

 
fs.createReadStream('./betika_round_fairness.csv')
 .pipe(csv.parse({ headers: true }))
 .on('error', error => console.error(error))
 .on('data', row => {
    var date = new Date(parseInt(row.roundStartDate));
    //console.log(row.roundStartDate,date)
    data.push([date.toLocaleDateString('en-GB'),row.result])
   // console.log(row.result)
 })
 .on('end', (x) => {
    //console.log(data)
    prevDay = data[0][0]
    findStreak(data,BET,MULTIPLIER,STREAK)
 });



 