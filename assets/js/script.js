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
const displayFinalScore = document.querySelector("#display-final-score");
const highscoreFormEl = document.querySelector("#form-highscore");


let users = JSON.parse(localStorage.getItem('highscores')) || [];

let currentUserScore = 0;
let currentUserInitials = "";

highscoreFormEl.addEventListener("submit", function(event){
  event.preventDefault();
  

  // get the user input
  currentUserInitials = userInput.value;

  // get the current score
  // store in local storage
  users.push({
    initials: currentUserInitials,
    score: currentUserScore,
  });

  localStorage.setItem('highscores', JSON.stringify(users));

  revealScores();

})


function renderScores() {
  userScores.innerHTML = "";


  for (const i = 0; i < users.length; i++) {
    const user = users[i];

    const li = document.createElement("li");
    li.setAttribute("class", " ")
    li.textContent = user;  
  }
}

function init(){
  renderScores();
}


let shuffledQuestions, currentQuestionIndex;
let timer;
let timeCount;
let correctCounter = 0;



startButton.addEventListener("click", startGame);
answerBtnEl.addEventListener("click", () => {
  currentQuestionIndex++; 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {    
    nextQuestion();
  }else {
    allDone();
  }
});


function revealScores() {
  quizFinished.classList.add("hide");
  highScores.classList.remove("hide");

  const currentUserScores = users.filter(function(user){
    return user.initials === currentUserInitials; 
  });

  // display a listing of highscores

  for (let index = 0; index < currentUserScores.length; index++) {
    const user = currentUserScores[index];
    
    const li = document.createElement('li');
    li.textContent = `${user.initials}: ${user.score}`

    userScores.appendChild(li);


  }

}

restartButton.addEventListener("click", startPage);

function startPage() {
  window.location.reload();
  // highScores.classList.add("hide");
  // initialPage.classList.remove("hide");

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

function stopTimer() {
  clearInterval(timer);
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
    currentUserScore += 1;
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
   displayFinalScore.textContent = currentUserScore;
   stopTimer();
}



