const moves = Object.values(process.argv).splice(2);
const asciiTable = require('ascii-table')

// const table = (arr) => {
//   let finalObj = {};
//   for (let i = 0; i < arr.length; i++) {
//     let tempObj = {};
//     for (let j = 0; j < arr.length; j++) {
//       tempObj[`Cm (${j + 1})`] = "draw";
//     }
//     finalObj[`Um(${i+1})`] = tempObj;
//   }
//   console.table(finalObj);
// };

// table(moves);
let compMove = moves.map(item => `cm: ${item}`)
compMove.unshift('')
let userMove = []
moves.forEach(item => {
  let inner = ['  win', '  lose', '  draw']
  inner.unshift(`um: ${item}`)
  userMove.push(inner)

}) 



const table = asciiTable.factory({
  title: 'Note:Lose/Win refers to User(rows for user; columns for comp)',
  heading: compMove,
  rows: userMove
}).setJustify()

console.log('' + table)