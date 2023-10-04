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
        question:"Q. C++ does not supports the following",
        choise: ["Multilevel inheritance", "Hierarchical inheritance", "Hybrid inheritance", "None of these"],
        answer: "None of these",

    },
    {
        question:"Q. 'cin' is an .........",
        choise: ["Class", "Object", "Package", "Namespace"],
        answer: "Object",

    },
    {
        question:"Q. The following operator can be used to calculate the value of one number raised to another.",
        choise: ["^", "**", "^^", "None of the above"],
        answer: "None of the above",

    },
    {
        question:"Q. Following is the invalid inclusion of a file to the current program. Identify it",
        choise: ["#include <file>", "#include 'file'", "#include <file", "All of the above are invalid"],
        answer: "#include <file",

    },
    {
        question:"Q. C++ is a __________ programming language.",
        choise: ["general-purpose", "procedural and functional", "object-oriented, generic and modular", "All of the above"],
        answer: "All of the above",

    },
    {
        question:"Q. Who was developed C++",
        choise: ["Bjarne Stroustrup", "Dennis Ritchie", "Guido van Rossum", "James Gosling"],
        answer: "Bjarne Stroustrup",

    },
    {
        question:"Q. When C++ was developed?",
        choise: ["1975", "1976", "1979", "1980"],
        answer: "1979",

    },
    {
        question:"Q. 'cout' stands for ........",
        choise: ["character input", "character output", "Both of above", "None of the above"],
        answer: "character output",

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
