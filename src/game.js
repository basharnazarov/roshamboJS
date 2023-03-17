const moves = Object.values(process.argv).splice(2);
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const { randomBytes, createHmac } = require("node:crypto");
const {tableBuilder} = require('./table')


const duplicates = moves.filter((item, index) => moves.indexOf(item) !== index)

if(duplicates.length !== 0){
  console.log("\x1b[31m", 'Arguments must be unique!', "\x1b[0m")
  process.exit()
} else if(moves.length % 2 === 0){
  console.log("\x1b[31m",'The amount of arguments must be odd!', "\x1b[0m")
  process.exit()
} else if(moves.length < 3) {
  console.error("\x1b[31m",'The amount of arguments must be equal or more than 3!', "\x1b[0m")
  process.exit()
} else {

let args = [];
let lose; 
let win;

const comMove = Math.floor(Math.random() * moves.length) + 1;
let userMove;

let randomKey = "";
let hash;

const steps = {
  start: async () => {
    steps.showHMAC();
    return steps.seeOptions();
  },
  seeOptions: async () => {
    const question = (str) =>
      new Promise((resolve) => readline.question(str, resolve));
    console.log("Available moves:");
    moves.forEach((e, i) => {
      console.log(`${i + 1} - ${e}`);
      args.push(i + 1);
    });
    console.log(`0 - exit \n? - help  `);
    half = (args.length - 1) / 2;
    center = Math.round(args.length / 2);

    const option = await question("Enter your move: ");
    if (option === "?" || args.includes(Number(option))) {
      userMove = option === "?" ? option : Number(option);
      return steps.end();
    } else if (option === "0") {
      userMove = option;
      return steps.end();
    } else {
      args = [];
      return steps.seeOptions();
    }
  },
  showHMAC: () => {
     const buf = randomBytes(32)
      randomKey = buf.toString("hex");
      hash = createHmac("SHA3-256", randomKey)
        .update(moves[comMove - 1].toString())
        .digest("hex");
      console.log("HMAC: ", hash);
  },
  end: async () => {
    readline.close();
  },
};

steps.start();

readline.on("close", () => {
  if (userMove === "0") {
    process.exit();
  } else if (userMove === "?") {
    tableBuilder(moves)
  } else {
    if (comMove > center) {
      lose = args.splice(comMove - half - 1, half);
      const idx = args.indexOf(comMove);
      args.splice(idx, 1);
      win = args;
    } else {
      win = args.splice(comMove, half);
      const idx = args.indexOf(comMove);
      args.splice(idx, 1);
      lose = args;
    }

    // console.log(
    //   "half:",
    //   half,
    //   "Computer's move:",
    //   comMove,
    //   "center:",
    //   center,
    //   "win:",
    //   win,
    //   "lose:",
    //   lose
    // );

    console.log(
      `Your move: ${moves[userMove - 1]}`,
      
      `\nComputer's move: ${moves[comMove - 1]}`,
      
      comMove === userMove
        ? "\nDraw!!!"
        : win.includes(userMove)
        ? "\nComputer wins!"
        : "\nYou win!",
        `\nHMAC Key: ${randomKey}`
    );
  }
});
}

