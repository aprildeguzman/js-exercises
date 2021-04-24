const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

//this can limit your question just change the quiz.length 
let questionLimit = quiz.length;

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push all the questions into the availableQuestions[] array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])
        
    }

}

//set question number, question, and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

    //setting question text
    //get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q; //di ko alam tong q na to basahin ko laters
    
    //get the position of 'questionIndex' from availableQuestions array
    const index1 = availableQuestions.indexOf(questionIndex);

    //remove the 'questionIndex' from the availableQuestions array, so that questions won't repeat
    availableQuestions.splice(index1,1); //in case makalimutan read more at w3schools splice()
    
    //shows question image if 'img' property exist
    if (currentQuestion.hasOwnProperty("img")) {
        const img = document.createElement("img");
        img.src = currentQuestion.img;
        questionText.appendChild(img);
        //console.log(currentQuestion.img)
    }


    //setting options
    //get the length of option
    const optionLength = currentQuestion.options.length

    //push all options into the availableOptions[] array
    for (let i = 0; i < optionLength; i++) {
        availableOptions.push(i)
    }

    optionContainer.innerHTML = ''; //after clicking next question, this code won't show the option of the next question
    let animationDelay = 0.15; //read more animation (delays the options when displaying)

    //creates option in html
    for (let i = 0; i < optionLength; i++) {
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        //get the position of 'optionIndex' from 'availableOptions'
        const index2 = availableOptions.indexOf(optionIndex);

        //remove the option 'optionIndex' from 'availableOptions' array, so that options won't repeat
        availableOptions.splice(index2,1);
        
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex]; 
        option.id = optionIndex;
        
        //see inspect element to see the result 
        option.style.animationDelay = animationDelay + 's'; //di ko alam yung 's' read more kung anong ginagawa
        animationDelay = animationDelay + 0.15; //read more
        
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)"); //read more about this     
    }
    questionCounter++;
}

//getting the result of current click attempt question
//read more about element is js
function getResult(element){
    const id = parseInt(element.id); //need to parseInt() because it gets the index of the option array, which is integer [0,1,2,3 ...] 
    
    //gets the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        //set the green color to correct option
        element.classList.add("correct");
        //add the indicator mark correct
        updateAnswerIndicator("correct");
        correctAnswers++;
        console.log("correct " +correctAnswers);

    } else {
        //set the red color to incorrect option
        element.classList.add("incorrect");
        //add the indicator mark incorrect
        updateAnswerIndicator("incorrect");

        //if answer is incorrect it will show the correct answer by highlighting green to the correct answer
        const optionLength = optionContainer.children.length;
        for (let index = 0; index < optionLength; index++) {
            if (parseInt(optionContainer.children[index].id) === currentQuestion.answer) {
                optionContainer.children[index].classList.add("correct");
            }
        }
    }

    attempt++;
    unclickableOptions();
}

// make all option unclickable once the user select an option to the question (RESTRICTS USER TO CHANGE OPTION)
function unclickableOptions() {
    const optionLength = optionContainer.children.length;
    for (let index = 0; index < optionLength; index++) {
        optionContainer.children[index].classList.add("already-answered");
    }

}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = ''; 
    const totalQuestion = questionLimit;
    for (let index = 0; index < totalQuestion; index++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
        
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType); // minus 1 since it's question 1-5, it is basically 0-4
}

function next(){
    if (questionCounter === questionLimit) {
        console.log('quiz over')
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    //hide quiz box
    quizBox.classList.add("hide");
    //shows result box
    resultBox.classList.remove("hide");
    quizResult();
}

//get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-incorrect").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/questionLimit) * 100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(3) + "%"; //read more toFixed() para maging 00.00%
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit; 
   
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    //this will allow to reflect number of question if user select "Try again"
    //because if this is not included, it will get all the question and not the intended number of questions
    //availableQuestions = []; 
     
}

function tryAgainQuiz() {
    //hides the resultBox
    resultBox.classList.add("hide");
    //shows the quizBox again
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}

function goToStart() {
    //hides resultBox
    resultBox.classList.add("hide");
    //show homeBox
    homeBox.classList.remove("hide");
    resetQuiz();
}

// STARTING POINT OF THE QUIZ

function startQuiz() {
    // hide homeBox
    homeBox.classList.add("hide");
    // show quizBox
    quizBox.classList.remove("hide");

    //this will first set all questions in availableQuestions array
    setAvailableQuestions();
    //second this will call getNewQuestion(); function
    getNewQuestion();
    //this will create indicator of answers
    answersIndicator();
}

window.onload = function() {
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}