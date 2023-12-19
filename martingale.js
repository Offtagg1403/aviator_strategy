
 const BASE = {

    profit:0,
    winStreaks:[],
    loseStreaks: [],
    gameNumber: 0,
    prevDay: "",
    dayTotals :[]

}

function findBestBet(loss,bet,multiplier){
    let currentB = bet
    if(loss>0)
    currentB =  (loss/(multiplier-1))
    return currentB
}
function maxLossBudget(bet,multiplier,maxLoseStreak){
    let loss=bet
    for(x=1;x<maxLoseStreak;x++){
        loss += findBestBet(loss,0,multiplier)     
    }
    return loss
}

 function newDay(bet,multiplier){
    const maxLoseStreak = BASE.loseStreaks.map(a => a.length).reduce((a, b) => Math.max(a, b), -Infinity);
    const loss = maxLossBudget(bet,multiplier,maxLoseStreak)
    
    let dayStat = `day ${BASE.prevDay} total games: ${BASE.gameNumber} loseStreak ${BASE.loseStreaks.length} maxLoseStreak ${maxLoseStreak} maxloss ${loss} lose count ${BASE.loseStreaks.flat().length}  winStreak: ${BASE.winStreaks.length} win count: ${BASE.winStreaks.flat().length} BASE.profit: ${BASE.profit}`
    console.log(dayStat)

    BASE.loseStreaks.forEach(l =>{
        const loss = maxLossBudget(bet,multiplier,l.length)
  //      console.log(`streak length: ${l.length} loss: ${loss}`)
    })
    
   

  //  console.log("BASE.loseStreaks")
   // BASE.loseStreaks.forEach(l =>console.log(l.length))
    
    BASE.dayTotals.push(dayStat)

    BASE.loseStreaks = []
    BASE.winStreaks = []
    currentLoseStreak = []
    currentWinStreak = []
    BASE.profit = 0
    
 }

  function findStreak(data,bet,multiplier,streakLength){
 let currentWinStreak = []
 let currentLoseStreak = []
 let prevLoss = 0
 
 BASE.prevDay = data[0][0]
 for (const element of data) {
    if(BASE.prevDay != element[0]){
        newDay(bet,multiplier)
        BASE.prevDay = element[0]

      //  break
    }
    let currentBet = findBestBet(prevLoss,bet,multiplier)

    
   // if(BASE.gameNumber >= offset){

        if(element[1]>=multiplier){

           if(currentLoseStreak.length>0) BASE.loseStreaks.push(currentLoseStreak)
            currentLoseStreak = []
            
            currentWinStreak.push(BASE.gameNumber)

            if(prevLoss>0){//if it was a recovery dont compund cash out
                BASE.profit +=prevLoss
            //    console.log(`%c prevLoss recovered ${prevLoss} BASE.gameNumber: ${BASE.gameNumber} BASE.profit: ${BASE.profit}`,'color: green')
                prevLoss = 0 
                currentWinStreak =[]
                
            }else{
                let potentialprofit =currentBet*(Math.pow(multiplier,currentWinStreak.length)-1)               
              //  console.log(`%c potentialwin BASE.gameNumber: ${BASE.gameNumber} potentialprofit: ${potentialprofit}`,'color: blue')
            }

            

            if(currentWinStreak.length==streakLength){
                BASE.profit +=bet*(Math.pow(multiplier,currentWinStreak.length)-1)     
         //       console.log(`%cday ${element[0]} win BASE.gameNumber: ${BASE.gameNumber} BASE.profit: ${BASE.profit}`,'color: green')
                BASE.winStreaks.push(currentWinStreak)
                currentWinStreak =[]
                
            }
        }else{

            prevLoss += currentBet

            BASE.profit-= currentBet
         //   console.log(`%closs BASE.gameNumber: ${BASE.gameNumber} round lose: ${currentBet} BASE.profit: ${BASE.profit}`,'color: red')
            currentWinStreak =[]
            currentLoseStreak.push(BASE.gameNumber)

        }

    //    }
        
        BASE.gameNumber++

 }
 console.log("------------------")
BASE.dayTotals.forEach(a => console.log(a))

 }

 module.exports = findStreak;
