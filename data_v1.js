//yarn install fast-csv
const fs = require('fs')
const csv = require('fast-csv');
const data = []


 
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
    findStreak(MULTIPLIER,STREAK)
 });


const BET = 1
const MULTIPLIER = 1.5
const STREAK = 2
let offset = 0

let profit = 0
let winStreaks =[]
let loseStreaks = []
let gameNumber = 0
let prevDay = ""
 let dayTotals = []

 function newDay(){
    let dayStat = `day ${prevDay} total games: ${gameNumber} loseStreak ${loseStreaks.length} lose count ${loseStreaks.flat().length}  winStreak: ${winStreaks.length} win count: ${winStreaks.flat().length} profit: ${profit}`
    console.log(dayStat)

    console.log("loseStreaks")
    loseStreaks.forEach(l =>console.log(l.length))
    
    dayTotals.push(dayStat)

    loseStreaks = []
    winStreaks = []
    currentLoseStreak = []
    currentWinStreak = []
    profit = 0
    
 }

 function findStreak(min,streakLength){
 let currentWinStreak = []
 let currentLoseStreak = []
 for (const element of data) {
    if(prevDay != element[0]){
        newDay()

        break
    }
    if(gameNumber >= offset){

        if(element[1]>=min){

            loseStreaks.push(currentLoseStreak)
            currentLoseStreak = []
            
            currentWinStreak.push(gameNumber)
                let potentialprofit =BET*(Math.pow(min,currentWinStreak.length)-1)
                
                console.log(`%c potentialwin gameNumber: ${gameNumber} potentialprofit: ${potentialprofit}`,'color: blue')
            if(currentWinStreak.length==streakLength){
                profit +=BET*(Math.pow(min,currentWinStreak.length)-1)     
                console.log(`%cday ${element[0]} win gameNumber: ${gameNumber} profit: ${profit}`,'color: green')
                winStreaks.push(currentWinStreak)
                currentWinStreak =[]
            }
        }else{
            let lose =  BET
            profit-= lose
            console.log(`%closs gameNumber: ${gameNumber} round lose: ${lose} profit: ${profit}`,'color: red')
            currentWinStreak =[]
            currentLoseStreak.push(gameNumber)

        }

        }
        
        gameNumber++

 }
 console.log(dayTotals.toString())

 }