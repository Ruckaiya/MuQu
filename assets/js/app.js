// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

$('#hint').hide();
$('#refs').hide();

// If the timer is over, then go to the next question
function nextQuestion() {
    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        // TODO
        console.log('Game is over!!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }

}

// Start a 30 seconds timer for user to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    lost++;

    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter + 's');

    if (counter === 0) {
        timeUp();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; // 
    const choices = quizQuestions[currentQuestion].choices; // 

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
        <h1 style="text-align: left; padding: 30px 0; color: #000; font-size: 34px;">${question}</h1>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);
    $('#hint').show();
    $('#refs').hide();

}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

    return result;
}

// Either correct/wrong choice selected, go to the next question
// Event Delegation
$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        console.log('Winsss!!!!');
        preloadImage('win');
        setTimeout(nextQuestion, 5 * 1000);
    } else {
        lost++;
        console.log('Lost!!!!');
        preloadImage('lost');
        setTimeout(nextQuestion, 5 * 1000);
    }
});


function displayResult() {
    const result = `
            <p>Total questions: ${quizQuestions.length} <br> </p>

        <p>You got ${score} questions right!</p>
        <p>You missed ${lost} questions!</p>
        <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
    $('#refs').hide();
}


$(document).on('click', '#reset', function () {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;
    loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return ` <p style="padding-top:20px;"> Remaining Questions: ${remainingQuestion}/${totalQuestion} </p>`;
}


function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;
}


// Display a funny giphy for correct and wrong answers
function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    $('#hint').hide();
    $('#game').html(`
            <div style= "padding-top: 30px;"> </div>
      
        `);
    if (status === 'win') {
        $('#game').html(`
            <p class="preload-image">Congratulations, you picked the corrrect answer!</p>
            <p class="preload-image">The correct answer is <b>${correctAnswer}.</b></p>
            <img src="${randomImage(funImages)}" />
           
        `);


    } else {
        $('#game').html(`
            <p class="preload-image">The correct answer was <b>${correctAnswer}.</b></p>
            <p class="preload-image">You lost pretty bad!</p>
            <img src="${randomImage(sadImages)}" />  
        `);


    }
    $('#refs').show();
}

$('#start').click(function () {
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});