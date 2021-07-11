const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart-btn");
const initialPage = document.querySelector("#init-page");
const questionContainer = document.querySelector("#question-container");
const questionEl = document.querySelector("#question");
const answerBtnEl = document.querySelector("#answer-buttons");
const answerChecker = document.querySelector("#answer-checker");
const submitScore = document.querySelector("#submit-btn");
const quizFinished = document.querySelector("#quiz-finished");
const highScores = document.querySelector("#scores");
const userInput = document.querySelector("#user-initials");
const userScores = document.querySelector("#user-scores");
const wrongEl = document.querySelector("#wrong-choice");
const correctEl = document.querySelector("#correct-choice");
const timerEl = document.querySelector("#time-left");

let users = [];

function renderScores() {
  userScores.innerHTML = "";


  for (const i = 0; i < users.length; i++) {
    const user = users[i];

    const li = document.createElement("li");
    li.textContent = user;
    li.setAttribute("data-index", i);
  }
}

function init(){

  const storedUsers = JSON.parse(localStorage.getItem("users"));

  if (storedUsers !== null) {
    users = storedUsers;
  }
  renderScores();
}

function storeUsers () {
  localStorage.setItem("users", JSON.stringify(users));
  submitScore.addEventListener("click", function(event){
    const userInitials = userInput.nodeValue.trim();
    if (userInitials === "") {
      return;
    }
    users.push(userInitials);
    userInput.value = "";
    storeUsers();
    renderScores();
  });
}


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

function revealScores(event) {
  event.preventDefault();  
  quizFinished.classList.add("hide");
  highScores.classList.remove("hide");
}

restartButton.addEventListener("click", startPage);

function startPage() {
  highScores.classList.add("hide");
  initialPage.classList.remove("hide");

}

function startGame(){
  timerCount = 9;
  console.log("started");
  initialPage.classList.add("hide"); 
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide"); 
  startTimer()
  nextQuestion()
}

function startTimer() { 
    timer = setInterval(function() {
    timerCount--;
    timerEl.innerText = "Time:  " + timerCount;
    
    if (timerCount === 0) {             
        clearInterval(timer);
        allDone();
    }    
  }, 1000);
}

function correctScore() {
correctCounter++
setCorrect();
}

function setCorrect(){
  localStorage.setItem("correctCount", +correctCounter);
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
  console.log("corr")
    correctEl.classList.remove("hide");
    wrongEl.classList.add("hide");
} 

function wrongMessage () {
  console.log("wron")
  wrongEl.classList.remove("hide");
  correctEl.classList.add("hide");
} 

function allDone() {  
   questionContainer.classList.add("hide");
   answerChecker.classList.add("hide");
   quizFinished.classList.remove("hide");
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



