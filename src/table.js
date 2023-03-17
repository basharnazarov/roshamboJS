// const moves = Object.values(process.argv).splice(2);
const asciiTable = require('ascii-table')

 const tableBuilder = (moves) => {
  const center = Math.round(moves.length / 2)
  const half = (moves.length -1) / 2
  let win
  let lose
  let compMove = moves.map(item => `C: ${item}`)
  compMove.unshift('U-user/C-comp')
  let userMove = []
  for (let j = 0; j < moves.length; j++){
    let args = []
    let i = j + 1
    moves.forEach((_, i)=> {
    args.push(i+1)
  })
    if (i > center) {
      lose = args.splice(i - half - 1, half);
      const idx = args.indexOf(i);
      args.splice(idx, 1);
      win = args;
    } else {
      win = args.splice(i, half);
      const idx = args.indexOf(i);
      args.splice(idx, 1);
      lose = args;
    }
    // console.log(i, win, lose)
    win.f
    let inner = moves.slice()
    inner.splice(j, 1, 'Draw')
    inner.unshift(`U: ${moves[j]}`)
    win.forEach(item => inner[item] = 'Win' )
    lose.forEach(item => inner[item] = 'Lose')
    userMove.push(inner)
  }
  // console.log(userMove)
  
  
  const table = asciiTable.factory({
    title: "Note: Lose/Win refers to User's result",
    heading: compMove,
    rows: userMove
  })
  
 return console.log('' + table)
}

exports.tableBuilder = tableBuilder