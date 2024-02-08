// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word: ");
   let userInputWord = input.question()
   return userInputWord;
};
let simpleScorer = function(word){
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      letterPoints++;
   }
   return Number(letterPoints);
   };

let vowelBonusScorer= function(word){
   word = word.toUpperCase();
   let letterPoints = 0;
   for (let i = 0; i < word.length; i++) {
      if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
         letterPoints += 3;
      } else {
         letterPoints++;
      }
   }
   return Number(letterPoints);
   };

let scrabbleScorer = function(word){
word = word.toLowerCase();
let letterPoints = 0
for (let i =0 ; i< word.length; i++){
letterPoints += newPointStructure[word[i]];
}
	return Number(letterPoints);
};


const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name:"Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   let userInput;
   do {
    userInput = input.question("Which scoring algorithm would you like to use?\n0 - Simple: One point per character\n1 - Bonus Vowels: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system.\nEnter 0, 1, or 2: ");
  if(userInput === '0') {
     return scoringAlgorithms[0];
   } else if(userInput === '1') {
     return scoringAlgorithms[1];
   } else if(userInput === '2') {
     return scoringAlgorithms[2];
   } else {
       console.log("Invalid input. Please enter 0, 1, or 2.");
     }
   } while (true);
       return scorerPrompt();
     
};

function transform(oldPointStructure) {
   let newPointStructure ={};
   for (let pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {
         let letter = oldPointStructure[pointValue][i].toLowerCase();
         newPointStructure[letter]= Number(pointValue);
       }
      }
      return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  word = initialPrompt();
  let selectedScoringAlgorithm = scorerPrompt(); 
  console.log(`Score for ${word}:\n ${selectedScoringAlgorithm.scorerFunction(word)}`);
}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
