
const BET = 1
const MULTIPLIER = 1.5
const STREAK = 2
let offset = 0

 const BASE = {

    profit:0,
    winStreaks:[],
    loseStreaks: [],
    gameNumber: 0,
    prevDay: "",
    dayTotals :[]

}



 function newDay(){
    let dayStat = `day ${BASE.prevDay} total games: ${BASE.gameNumber} loseStreak ${BASE.loseStreaks.length} lose count ${BASE.loseStreaks.flat().length}  winStreak: ${BASE.winStreaks.length} win count: ${BASE.winStreaks.flat().length} BASE.profit: ${BASE.profit}`
    console.log(dayStat)

    console.log("BASE.loseStreaks")
    BASE.loseStreaks.forEach(l =>console.log(l.length))
    
    BASE.dayTotals.push(dayStat)

    BASE.loseStreaks = []
    BASE.winStreaks = []
    currentLoseStreak = []
    currentWinStreak = []
    BASE.profit = 0
    
 }

  function findStreak(data,min,streakLength){
 let currentWinStreak = []
 let currentLoseStreak = []
 BASE.prevDay = data[0][0]
 for (const element of data) {
    if(BASE.prevDay != element[0]){
        newDay()

        break
    }
    if(BASE.gameNumber >= offset){

        if(element[1]>=min){

           if(currentLoseStreak.length>0) BASE.loseStreaks.push(currentLoseStreak)
            currentLoseStreak = []
            
            currentWinStreak.push(BASE.gameNumber)
                let potentialprofit =BET*(Math.pow(min,currentWinStreak.length)-1)
                
                console.log(`%c potentialwin BASE.gameNumber: ${BASE.gameNumber} potentialprofit: ${potentialprofit}`,'color: blue')
            if(currentWinStreak.length==streakLength){
                BASE.profit +=BET*(Math.pow(min,currentWinStreak.length)-1)     
                console.log(`%cday ${element[0]} win BASE.gameNumber: ${BASE.gameNumber} BASE.profit: ${BASE.profit}`,'color: green')
                BASE.winStreaks.push(currentWinStreak)
                currentWinStreak =[]
            }
        }else{
            let lose =  BET
            BASE.profit-= lose
            console.log(`%closs BASE.gameNumber: ${BASE.gameNumber} round lose: ${lose} BASE.profit: ${BASE.profit}`,'color: red')
            currentWinStreak =[]
            currentLoseStreak.push(BASE.gameNumber)

        }

        }
        
        BASE.gameNumber++

 }
 console.log(BASE.dayTotals.toString())

 }

 module.exports = findStreak;