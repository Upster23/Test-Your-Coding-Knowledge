const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart-btn");
const initialPage = document.querySelector("#init-page");
const questionContainer = document.querySelector("#question-container");
const questionEl = document.querySelector("#question");
const answerBtnEl = document.querySelector("#answer-buttons");
const answerChecker = document.querySelector("#answer-checker");
const submitScore = document.querySelector("#submit");
const userScores = document.querySelector("#scores");
const wrongEl = document.querySelector("#wrong-choice");
const correctEl = document.querySelector("#correct-choice");
const timerEl = document.querySelector("#time-left");





let shuffledQuestions, currentQuestionIndex;
let timer;
let timeCount;
let correctCounter = 0;

function init(){
  correctAnswers();
}

startButton.addEventListener("click", startGame);
answerBtnEl.addEventListener("click", () => {
  currentQuestionIndex++; 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {    
    nextQuestion();
  }else {
    allDone();
  }
});

submitScore.addEventListener("click", revealScores);

function revealScores() {
  userScores.classList.remove("hide")
}


function startGame(){
  timerCount = 30;
  console.log("started");
  initialPage.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide"); 
  startTimer()
  nextQuestion()
}

function startTimer() {

  // Sets timer
    timer = setInterval(function() {
    timerCount--;
    timerEl.innerText = "Time:  " + timerCount;
    
    if (timerCount >= 0) {
      // Tests if win condition is met   
      if (wrongMessage)
      timerCount-10;  
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);     
    }
  }, 1000);
}

function correctScore() {
correctCounter++
setCorrect()
}

function setCorrect(){
  localStorage.setItem("correctCount", correctCounter);
}


function nextQuestion(){
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text
    button.classList.add("btn");    
    if (answer.correct) {
      button.dataset.correct = answer.correct;   
    }    
    button.addEventListener("click", selectAnswer);
    answerBtnEl.appendChild(button);     
  });
}

function resetState(){
while(answerBtnEl.firstChild){
  answerBtnEl.removeChild(answerBtnEl.firstChild)
}
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct;    
  if (correct) {
    correctMessage();      
  }
  else {
    wrongMessage(); 
}
}

function correctMessage () {
    correctEl.classList.remove("hide");  
    
} 

function wrongMessage () {
  wrongEl.classList.remove("hide"); 
  
} 

function allDone() {
   questionContainer.classList.add("hide");
   answerChecker.classList.add("hide");
   submitScore.classList.remove("hide");


   

 

}

const questions = [
  {
    question:'Commonly used data types DO NOT include:',
    answers: [{text:'1. strings', correct: false},
              {text:'2. booleans', correct: false},
              {text:'3. alerts', correct: true},
              {text:'4. numbers', correct: false}
             ]
  },
  {
    question:'The condition in an if/else statement is enclosed within_______.',
    answers: [{text:'1. quotes', correct: false},
              {text:'2. curly brackets', correct: false},
              {text:'3. parenthesis', correct: true},
              {text:'4. square brackets', correct: false}
             ]
  },
  {
    question:'Arrays in Javascript can be used to store_______.',
    answers: [{text:'1. numbers and strings', correct: false},
              {text:'2. other arrays', correct: false},
              {text:'3. booleans', correct: false},
              {text:'4. all of the above', correct: true}
             ]
  },
  {
    question:'A very useful tool used during development and debugging for printing content to the debugger',
    answers: [{text:'1. Javascript', correct: false},
              {text:'2. terminal/bash', correct: false},
              {text:'3. for loops', correct: false},
              {text:'4. console.log', correct: true}
             ]
  }
];



