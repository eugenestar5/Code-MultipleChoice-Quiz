// Defining Quiz Questions
var Quizquestions = [
    {
        question: "IsNan function returns true if the argument is not a  _____ ?",
        choices: ["a. Date", "b. Number", "c. String", "d. Boolean"],
        answer: "b. Number"
    },
    {
        question: "Negative Infinity is a number is JS which can be derived by dividing a negative number by _____ ",
        choices: ["a. one", "b. undefined", "c. zero", "d. three"],
        answer: "c. zero"
    },
    {
        question: "A _____ box allows the user to enter input by providing a text box.",
        choices: ["a. dailog", "b. prompt", "c. text area", "d. alert"],
        answer: "b. prompt"
    },
    {
        question: "A _____ is specific to a page in a session",
        choices: ["a. viewState", "b. SessionState", "c. VariableState", "d. UserState"],
        answer: "a. viewState"
    },
    {
        question: "How is a function created in JavaScript",
        choices: ["a. function : myFunction()", "b. function==myFunction()", "c. function myFunction()", "d. createFunction function()"],
        answer: "c. function myFunction()"
    },
    {
        question: "How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c. myFunctions()"
    },
    {
        question: "What function is used to retrieve an ID attribute of HTML element ____.",
        choices: ["a. getElementbyClass", "b.getElementByID", "c. getElementbyName", "d. getElementbyFunction"],
        answer: "b. getElementByID"
    },
    {
        question: "What is the first index of an array ____.",
        choices: ["a. 2", "b. 3", "c. 0", "d. any"],
        answer: "c. 0"
    },
    {
        question: "What company Developed JavaScript?",
        choices: ["a. Netscape", "b. Microsoft", "c. Google", "d. Amazon"],
        answer: "a. Netscape"
    },
    {
        question: "Identify one looping structure in Javascript?",
        choices: ["a. For", "b. when", "c. where", "d. if"],
        answer: "a. for"
    },
    {
        question: "What function is used to convert numbers between different bases?",
        choices: ["a. while loops", "b. convert", "c. parseNumber", "d. parseInt()"],
        answer: "d. d. parseInt()"
    },
    {
        question: "What will be the result of 3+2+ a string of 7?",
        choices: ["a. 57", "b. 12", "c. 5", "d. undefined"],
        answer: "a. 57"
    }
];




// Declaring and setting variable values through html elements
var timer = document.getElementById("timer");
var timeGone = document.getElementById("timeGone");
var timeLeft = document.getElementById("timeLeft");

var startButton = document.getElementById("start-button");
var startQuiz = document.getElementById("startQuiz");

var questionTag = document.getElementById("questionTag");
var questions = document.getElementById("questions");

var choiceA = document.getElementById("btNum0");
var choiceB = document.getElementById("btNum1");
var choiceC = document.getElementById("btNum2");
var choiceD = document.getElementById("btNum3");
var checkAnswer = document.getElementById("checkAnswer");

var scoreSummary = document.getElementById("scoreSummary");
var finalScore = document.getElementById("finalScore");
var userInitialInput = document.getElementById("userInitialInput");
var submitBtn = document.getElementById("submitBtn");
var highScoreSection = document.getElementById("highScoreSection");
var mainContainer = document.getElementById("mainContainer");
var listOfHighScores = document.getElementById("listOfHighScores");
var backBtn = document.getElementById("backBtn");
var clearScoreBtn = document.getElementById("clearScoreBtn");
var lineBreak = document.getElementById("Break");

var questionNumber = 0;
var correctAnswer = 0;
var questIndex = 0;
var Result;

//When user clicks the start button
var OverallTime = 200;
function Quiz(){
    questIndex = 0;
    OverallTime = 250;
    timeLeft.textContent = OverallTime;
    userInitialInput.textContent = "";

    var timer = setInterval(function(){
        OverallTime--;
        timeLeft.textContent = OverallTime;
        if(OverallTime<=0){
            clearInterval(timer);
            if(questIndex < Quizquestions.length - 1){
                gameEnd();
            }
        }
    },10000);

    showQuestion();
}

function showQuestion() {
    questions.textContent = Quizquestions[questIndex].question;
    choiceA.textContent = Quizquestions[questIndex].choices[0];
    choiceB.textContent = Quizquestions[questIndex].choices[1];
    choiceC.textContent = Quizquestions[questIndex].choices[2];
    choiceD.textContent = Quizquestions[questIndex].choices[3];
}


// Show if anser is correct or wrong
function AnswerValidation(answer) {
    lineBreak.style.display = "block";
    checkAnswer.style.display = "block";

    if (questions[questIndex].answer === questions[questIndex].choices[answer]) {
        // correct answer, add 1 to final score
        correctAnswer++;
        // console.log(correctAns);
        checkAnswer.textContent = "Correct!";
    } else {
        // wrong answer, take 10 second from timer
        totalTime -= 10;
        timeLeft.textContent = OverallTime;
        checkAnswer.textContent = "Wrong! The correct answer is: " + questions[questIndex].answer;
    }

    questIndex++;
    // Show the rest of question
    if (questIndex < Quizquestions.length) {
        showQuestion();
    } else {
        // run game end function if  there is no more questions
        gameEnd();
    }
}


function SelectA() { AnswerValidation(0); }

function SelectB() { AnswerValidation(1); }

function SelectC() { AnswerValidation(2); }

function SelectD() { AnswerValidation(3); }

function gameEnd() {
    scoreSummary.style.display = "block";
    questionTag.style.display = "none";
    startQuiz.style.display = "none";
    timer.style.display = "none";
    timeGone.style.display = "block";
	timeGone.style.color = "red";
    finalScore.textContent = correctAnswer;
}

//store score in local storage
function storeScores(event) {
    event.preventDefault();

    // If user input is blank stop function
    if (userInitialInput.value === "") {
        alert("Please enter your initials!");
        return;
    } 

    startQuiz.style.display = "none";
    timer.style.display = "none";
    timeGone.style.display = "none";
    scoreSummary.style.display = "none";
    highScoreSection.style.display = "block";   

    // store scores into local storage
    var savedScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScores)
    }

    var userScore = {
        initials: userInitialInput.value,
        score: finalScore.textContent
    };

    //console.log(userScore);
    scoresArray.push(userScore);

    // stringify array in order to store in local
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    
    // show current highscores
    showScores();
}

// The function to show scores

function showScores() {

    startQuiz.style.display = "none";
    timer.style.display = "none";
    questionTag.style.display = "none";
    timeGone.style.display = "none";
    summaryScore.style.display = "none";
    highScoreSection.style.display = "block";

    var savedScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedScores === null) {
        return;
    }
    //console.log(savedScores);

    var storedScores = JSON.parse(savedScores);

    for (var i = 0; i < storedScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedScores[i].initials + ": " + storedScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
}


// Event Listeners
startButton.addEventListener("click", Quiz);
choiceA.addEventListener("click", SelectA);
choiceB.addEventListener("click", SelectB);
choiceC.addEventListener("click", SelectC);
choiceD.addEventListener("click", SelectD);

submitBtn.addEventListener("click", function(event){ 
    storeScores(event);
});

var viewScore = document.getElementById("viewScore");
viewScore.addEventListener("click", function(event) { 
    showScores(event);
});

backBtn.addEventListener("click", function() {
    startQuiz.style.display = "block";
    highScoreSection.style.display = "none";
});

clearScoreBtn.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: sans-serif; font-style: italic;")
});