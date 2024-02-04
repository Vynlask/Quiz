const questions =  [
  {
    question: " Which is the Largest animal in the world?",
    anwsers: [
      { text: "Shark", correct: false},
      { text: "Blue Whale", correct: false},
      { text: "Elephant", correct: true},
      { text: "Giraffe", correct: false},
    ]
  },
  {
    question: " How many years of Highschool is there?",
    anwsers: [
      { text: "five", correct: false},
      { text: "Two", correct: false},
      { text: "Nine", correct: false},
      { text: "Four", correct: true},
    ]
  },
  {
    question: " Who won the SuperBowl last year?",
    anwsers: [
      { text: "Chiefs", correct: true},
      { text: "Patriots", correct: false},
      { text: "Jaguars", correct: false},
      { text: "Panthers", correct: false},
    ]
  },
  {
    question: " Who is the richest person In the U.S as of right now?",
    anwsers: [
      { text: "Mark Zuckerburg", correct: false},
      { text: "Jeff Bezos", correct: false},
      { text: "Elon Musk", correct: true},
      { text: "Bill Gates", correct: false},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
   resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.anwsers.forEach(answer => {
  const button = document.createElement("button");
   button.innerHTML = answer.text;
   button.classList.add("btn");
   answerButtons.appendChild(button);
   if(answer.correct){
    button.dataset.correct = answer.correct;

   }
   button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
   Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;

   })
   nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}! `;
   nextButton.innerHTML = "Play Again"
   nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}


nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();

