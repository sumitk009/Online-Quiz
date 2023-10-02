const container = document.querySelector('.container');
const question = document.querySelector('.question');
const choise = document.querySelector('.choise');
const nBTN = document.querySelector('.nBTN');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBTN = document.querySelector('.startBTN');
const timer = document.querySelector('.timer');




const quiz = [
    {
        question:"Q. Which among the following is the brightest planet?",
        choise: ["Mercury", "Venus", "Mars", "Neptune"],
        answer: "Venus",

    },
    {
        question:"Q. Which among the  following is the nearest to earth planet?",
        choise: ["Venus", "Mars", "Neptune", "Mercury"],
        answer: "Venus",

    },
    {
        question:"Q. Indian Institute of Chemical Biology is located in ......",
        choise: ["Nagpur", "Kolkata", "Hyderabad", "Bhopal"],
        answer: "Kolkata",

    },
    {
        question:"Q. Red Indian is a tribe to .....",
        choise: ["Africa", "South America", "North America", "Asia"],
        answer: "North America",

    },
];


let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 30;
let timerID = null;

const showQuestions = () =>{
    // console.log("Question");
    const questionDetails = quiz[currentQuestionIndex];
    question.textContent = questionDetails.question;
    choise.textContent = "";
    for(let i=0; i<questionDetails.choise.length; i++){
        const currentChoise =questionDetails.choise[i];
        const choiseDiv = document.createElement('div');
        choiseDiv.classList.add('choises');
        choiseDiv.textContent = currentChoise;
        choise.appendChild(choiseDiv);

        choiseDiv.addEventListener('click', ()=>{
            if(choiseDiv.classList.contains('selected')){
                choiseDiv.classList.remove('selected');
            }
            else{
                choiseDiv.classList.add('selected');

            }

        });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
    
}

const checkAnswer = () =>{
    const selectedChoice = document.querySelector('.choises.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("Correct!");
        displayAlert("Correct Answer!");
        score++;
    }
    else{
        // alert("wrong");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`)
    }
    timeLeft = 30;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        
        
    }
}

const showScore = () =>{
    question.textContent = "";
    choise.textContent = "";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz");
    nBTN.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
    
}

const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
   }, 2000);
}

const startTimer = () =>{
    clearInterval(timerID);
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 30;
                startQuiz();
            }
            else{
                startBTN.style.display = "block";
                container.style.display = "none";
                return;
            }

        }

    }
    timerID = setInterval(countDown, 1000);
}

const stopTimer = () =>{
    clearInterval(timerID);

}


const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

const startQuiz = ()=>{

    timeLeft = 30;
    timer.style.display = "flex";
    shuffleQuestions();

}

startBTN.addEventListener('click', ()=>{
    startBTN.style.display = "none";
    container.style.display = "block";
    startQuiz();

   
});
nBTN.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choises.selected');
    if(!selectedChoice && nBTN.textContent === "Next"){
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
        
            nBTN.textContent = "Next";
            scoreCard.textContent = "";
            currentQuestionIndex = 0;
            quizOver = false;
            score = 0;
            startQuiz();
    }
    else{
        checkAnswer();

    }
   
});

