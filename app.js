const store = {
    questions: [
    {question: "In the Sorcerer's Stone, how many obstacles (Fluffy being the first) were left out at the end of the movie compared to the book?",
        answers: ["0", "1", "2", "3"],
        correctAnswer: "2"},
    {question: "In the Chamber of Secrets, what plant helped students to recover from the paralysis from the Basilisk?", 
        answers: ["Gillyweed", "Mandrake", "Devil's snare", "Knotgrass"],
        correctAnswer: "Mandrake"},
    {question: " In the Prisoner of Azkaban, which birthday is Harry about to celebrate?", 
        answers: ["11", "12", "13", "14"],
        correctAnswer: "13"},
    {question: "In the Goblet of Fire, who is the only student left standing once the portkey deposits them at the world cup?", 
        answers: ["Cedric", "Harry", "Hermione", "Fred"],
        correctAnswer: "Cedric"},
    {question: "In the Order of the Phoenix, where does Harry first encounter Delores Umbridge?", 
        answers: ["Hogwarts", "12 Grimmauld place", "Little Whinging", "His hearing at the ministry of magic"],
        correctAnswer: "His hearing at the ministry of magic"},
    {question: "In the Half Blood Prince, how old must a student be in order to take an Apparition test?",
        answers: ["14", "15", "16", "17"],
        correctAnswer: "17"},
    {question: "In the Deathly Hallows, what is the very last line in the book?",
        answers: ["All was well", "Dobby was only sleeping", "Harry woke up and realized it was all a dream", "Hermione learned that she was saying 'leviosa' wrong after all these years"],
        correctAnswer: "All was well"}
    ],
    quizStarted: false,
    questionNumber: 0,
    playerScore: 0,
    submittingAnswer: false
};

/********** EVENT HANDLER FUNCTIONS **********/

function startQuiz() {
    $('main').on('click', '#start-btn', function (event){
        event.preventDefault();
        store.quizStarted = true;
        store.submittingAnswer === false;
        renderDom();
    })
}

function submitAnswer() {
    $("main").on('click', '.submit-answer', event => {
        event.preventDefault();
        if(isAnswerSelected()) {
            showCurrentScore();
            showAnswerResult();
            renderDom();
        }
    });
}

function clickNextButton() {
    $('main').on('click', '.next-question', event => {
    event.preventDefault();
    nextQuestion();
    renderDom();
});
}

function clickRestartButton() {
    $('main').on('click', '.restart-quiz', event => {
        event.preventDefault();
        restartQuiz();
        renderDom();
    })
}

function getCurrentQuestion() {
    let index = store.questionNumber;
    let currentQuestion = store.questions[index];
    return {index: index, questionTotal: currentQuestion};
}

/********** TEMPLATE GENERATION FUNCTIONS **********/

function getAnswers() {
        let answerList = "";
        getCurrentQuestion().questionTotal.answers.forEach(answer => {
            answerList += `<li>
            <label>
            <input type="radio" name="answerOptions" value="${answer}"> ${answer}</label>
            </li>`;
        })  
        return answerList;
}

function showAnswerResult() {
    if(isGuessCorrect() === true) {
        return `
        <div class="answer-results">
        <form> <p class='correct'> You're Correct!</p>
        <button type='submit'class="next-question">Next</button>
        </form>
        </div>`;
    }
    else {
        return `<div class="answer-results">
        <form> <p class='incorrect'>You are incorrect. The correct answer is: ${getCurrentQuestion().questionTotal.correctAnswer}</div>
        <button type='submit' class="next-question">Next</button>
        </form>
        </div>`; 
    }
}

function showStartPage() {
    return `
    <div class="start-message">
        <h3>Welcome to my Harry Potter Quiz application!</h3>
        <p> This quiz will test your knowledge of Harry Potter trivia!</p>
           <p> Click the 'Start Quiz' button below to begin!</p>
           <form>
        <button type="button" id="start-btn">Start Quiz</button>
           </form>
     </div>`;
}

function showQuizPage() {
    return `
        <div class="questionAndAnswers">
        <div class="QandA">
        <p>Question ${getCurrentQuestion().index + 1} out of ${store.questions.length}</p>
        <p>Score: ${store.playerScore} / ${store.questions.length}</p>
        </div>
        <br>
            <p class="question">${getCurrentQuestion().questionTotal.question}</p>
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
        <p>Your score is ${store.playerScore} out of ${store.questions.length} which is ${percentage(store.playerScore, store.questions.length)}%!</p>
        <p>${resultMsg()}</p>
        <br>
        <button class="restart-quiz">Restart Quiz</button>
    `;
}

function resultMsg() {
    if(percentage(store.playerScore, store.questions.length) < 70) {
        return 'Did you have a muggle help you with that? Try again!'
    } else {
        return 'Great Job! You are a regular Potterhead!'
    } 
}

/********** OTHER FUNCTIONS **********/

function getChosenAnswer() {
    let selected= $("input[type='radio'][name='answerOptions']:checked");
    let selectedAnswer="";
    if(selected.length > 0) {
        selectedAnswer = selected.val();
        return selectedAnswer;
    } 
}

function isGuessCorrect() {
    let isCorrect = false;
    let correctAnswer = getCurrentQuestion().questionTotal.correctAnswer;
    let selectedAnswer = getChosenAnswer();
    if(selectedAnswer === correctAnswer){
        isCorrect = true;
        store.submittingAnswer = true;
        return isCorrect;
    }
    else {
        store.submittingAnswer = true;
        return isCorrect;
    }
};

function nextQuestion() {
    store.submittingAnswer = false;
    store.questionNumber ++;
}

function restartQuiz() {
    store.questionNumber = 0;
    store.playerScore = 0;
    store.quizStarted = false;
    store.submittingAnswer = false;
}

function showCurrentScore() {
    if (isGuessCorrect() === true) {
        store.playerScore++;
    }
}

function isAnswerSelected() {
    if ($('input:radio[name=answerOptions]').filter(':checked').length === 0) {
        alert('You must select an answer first!');
        store.submittingAnswer = false;
        return false;
    }
    return true;
}

function percentage(partialValue, totalValue) {
    return Math.round((100 * partialValue) / totalValue);
 } 

// shows what is to be displayed on DOM when a certain condition is met
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
// * Your app should include a render() function, that regenerates the view each time the store is updated.
function renderQuiz() {
    renderDom();
    startQuiz();
    submitAnswer();
    clickNextButton();
    clickRestartButton();
}

$(renderQuiz);
