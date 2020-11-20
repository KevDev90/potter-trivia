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
};


function startQuiz() {
  
}

function changeQuestion () {
    
}

function changeAnswerChoices () {
    
}

function submitAnswer () {

}

function nextQuestion () {
    
}

function displayResults () {
   
}

function restartQuiz () {
    
}

function showCurrentScore () {
    
}

function showCurrentQuestion () {
    
} 

function showStartPage() {
    console.log('1')
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
        <div class="quiz-page">
        <p>Question $(store.questions.index + 1) out of $(store.questions.length)</p>
        <p>Score: $(store.playerScore) / $(store.questions.length)</p>
        <br>
            $(currentQuestion)
        <br>
            <form>
                 $(currentAnswers)
            <br>
                  <button type="submit" class="submit-answer">Submit</button>
                  <button type="button" class="next-answer">Next</button>
             </form>
        </div>
        `
}


function showResultsPage() {
    return `
        <div class="results-page">
        <h3>Congrats! You have completed the Harry Potter Quiz!</h3>
        <p>Your score is $(store.playerScore) out of $(store.questions.length)!</p>
        <button type="button" id="restart-quiz">Restart Quiz</button>
    `
}



function userClicksStart() {
    $('main').on('click', '#start-btn', function (event){
        event.preventDefault();
        store.quizStarted = true;
        renderDom();
    })
}

function renderDom() {
    let html = "";
    if(store.quizStarted === false) {
       html = $('main').html(showStartPage());
       return html;
    }
    if(store.quizStarted === true) {
        html = $('main').html(showQuizPage());
        return html;
    }
    else {
        html = $('main').html(showResultsPage())
        return html;
    }
}

function renderQuiz() {
    renderDom();
    showStartPage();
    showQuizPage()
    showResultsPage()
    userClicksStart()
}

$(renderQuiz);