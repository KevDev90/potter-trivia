const store = {
    questions: [
    {question: "In the sorcerer's stone, how many obstacles (fluffy being the first) were left out at the end of the movie compared to the book?",
        answers: ["0", "1", "2", "3"],
        correctAnswer: "2"},
    {question: "In the chamber of secrets, what plant helped students to recover from the paralysis from the basilisk?", 
        answers: ["gillyweed", "mandrake", "devil's snare", "knotgrass"],
        correctAnswer: "mandrake"},
    {question: " In the prisoner of Azkaban, which birthday is Harry about to celebrate?", 
        answers: ["11", "12", "13", "14"],
        correctAnswer: "13"},
    {question: "In the goblet of fire, who is the only student left standing once the portkey deposits them at the world cup?", 
        answers: ["cedric", "harry", "hermione", "fred"],
        correctAnswer: "cedric"},
    {question: "In the order of the phoenix, where does harry first encounter delores umbridge?", 
        answers: ["hogwarts", "12 grimmauld place", "little whinging", "his hearing at the ministry of magic"],
        correctAnswer: "his hearing at the ministry of magic"},
    {question: "In the half blood prince, how old must a student be in order to take an Apparition test?",
        answers: ["14", "15", "16", "17"],
        correctAnswer: "17"},
    {question: "In the deathly hallows, that is the very last line in the book?",
        answers: ["All was well", "Dobby was only sleeping", "Harry woke up and realized it was all a dream", "Hermione learned that she was saying 'leviosa' wrong after all these years"],
        correctAnswer: "All was well"}
    ],
    quizStarted: false,
    questionNumber: 0,
    playerScore: 0,
    submittingAnswer: false
};

function getCurrentQuestion() {
    let index = store.questionNumber;
    let currentQuestion = store.questions[index];
    return {index: index, questionTotal: currentQuestion};
}

function getAnswers() {
        let answerList = "";
        getCurrentQuestion().questionTotal.answers.forEach(answer => {
            answerList += `<li>
            <input type="radio" name="answerOptions" value="${answer}"> ${answer} </input>
            </li>`;
        })  
        return answerList;
}

function submitAnswer() {
    console.log('in submitAnswer')
    $("main").on('click', '.submit-answer', event => {
        event.preventDefault();
        getChosenAnswer();
        showCurrentScore();
        showAnswerResult();
        renderDom();
    });
}

function getChosenAnswer() {
    let selected= $("input[type='radio'][name='answerOptions']:checked");
    let selectedAnswer="";
    if (selected.length > 0) {
        selectedAnswer = selected.val();
    } 
    console.log(selectedAnswer, '2')
    return selectedAnswer;
}

function isGuessCorrect() {
    console.log('in guessCorrect');
    let isCorrect = false;
    let correctAnswer = getCurrentQuestion().questionTotal.correctAnswer;
    console.log(correctAnswer)
    let selectedAnswer = getChosenAnswer();
    console.log(selectedAnswer)
    if (selectedAnswer === correctAnswer){
        console.log('correct');
        isCorrect = true;
        store.submittingAnswer = true;
        return isCorrect;
    }
    else {
        console.log('wrongo');
        store.submittingAnswer = true;
        return isCorrect;
    }
};

function showAnswerResult() {
    if (isGuessCorrect() === true) {
        console.log('true result html');
        return `
        <div class="answer-results">
        <form> <p> You're Correct!</p>
        <button type='submit'class="next-question">Next</button>
        </form>
        </div>`;
    }
    else {
        return `<div class="answer-results">
        <form> <p>You are incorrect. The correct answer is ${getCurrentQuestion().questionTotal.correctAnswer}</div>
        <button type='submit' class="next-question">Next</button>
        </form>
        </div>`; 
    }
}

function nextQuestion() {
    store.submittingAnswer = false;
    store.questionNumber ++;
}

function clickNextButton() {
    $('main').on('click', '.next-question', event => {
        console.log('next clicked');
    event.preventDefault();
    nextQuestion();
    renderDom();
});
}

function restartQuiz() {
    
}

function showCurrentScore() {
    if (isGuessCorrect() === true) {
        store.playerScore++;
    }
}

function showStartPage() {
    return `
    <div class="start-message">
        <h3>Welcome!</h3>
        <p>Welcome to my Harry Potter Quiz application! This quiz will test your knowledge of Harry Potter trivia!</p>
           <p> Click the 'Start' button below to begin!</p>
           <form>
        <button type="button" id="start-btn">Start Quiz</button>
           </form>
     </div>`;
}

function showQuizPage() {
    return `
        <div class="questionAndAnswers">
        <p>Question ${getCurrentQuestion().index + 1} out of ${store.questions.length}</p>
        <p>Score: ${store.playerScore} / ${store.questions.length}</p>
        <br>
            ${getCurrentQuestion().questionTotal.question}
        <br>
            <form>
            <ul>
                ${getAnswers()}
            </ul>
            <br>
                  <button type="submit" class="submit-answer">Submit</button>
             </form>
        </div>
        `;
}


function showResultsPage() {
    return `
        <div class="results">
        <h3>Congratulations! You have completed my Harry Potter quiz!</h3>
        <p>Your score is ${store.playerScore} out of ${store.questions.length}!</p>
        <button class="restart-quiz">Restart Quiz</button>
    `;
}

function startQuiz() {
    $('main').on('click', '#start-btn', function (event){
        event.preventDefault();
        store.quizStarted = true;
        store.submittingAnswer === false;
        renderDom();
    })
}

function renderDom() {
    let html = "";
    if (store.quizStarted === false) {
       html = $('main').html(showStartPage());
       return html;
    }
    else if (store.questionNumber < store.questions.length) {
            if (store.submittingAnswer === false){
        html = $('main').html(showQuizPage());
            }
            else {
                html = $('main').html(showAnswerResult());
            }
        return html;
        }
    else {
        html = $('main').html(showResultsPage());
    }
}

function renderQuiz() {
    renderDom();
    startQuiz();
    submitAnswer();
    clickNextButton();
    
}

$(renderQuiz);
