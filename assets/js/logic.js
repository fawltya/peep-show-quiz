// Create a code quiz that contains the following requirements:
// A start button that when clicked a timer starts and the first question appears.
// Questions contain buttons for each answer.
// When answer is clicked, the next question appears
// If the answer clicked was incorrect then subtract time from the clock
// The quiz should end when all questions are answered or the timer reaches 0.
// When the game ends, it should display their score and give the user the ability to save their initials and their score

var startButton = $('#start')
var startScreen = $('#start-screen')
var endScreen = $('#end-screen')
var questions = $('#questions')
var question = $('question-title')
var choices = $('#choices')
var time = $('#time')
var i = 0
var totalTime = 0;

function quiz() {
    questions.removeClass('hide');
    startScreen.addClass('hide');
    $('#question-title').text(questionArray[i].question);
    for (var j = 0; j < questionArray[i].choices.length; j++) {
        var correctAnswer = questionArray[i].choices[questionArray[i].answer]
        if (questionArray[i].choices[j] == correctAnswer) {
            var trueButton = $('<button class="answer-button true">' + questionArray[i].choices[j] + '</button>')
        }   else {
            var falseButton = $('<button class="answer-button false">' + questionArray[i].choices[j] + '</button>')
            }
        choices.append(trueButton, falseButton);
    }  

    $('.true').on('click', function(event) {
        event.preventDefault();
        i++;
        $('#choices').empty();
        quiz()
    })

    $('.false').on('click', function(event) {
        event.preventDefault();
        totalTime += 10;
        // time.append(time + 10)
    })
    console.log(totalTime)
    console.log(questionArray[i].question)
    if (questionArray[i].question > questionArray[i].question.length) {
    return endgame()
    }
           
}

startButton.on("click", function(event) {
    event.preventDefault();
    quiz();
    // myInterval = setInterval(myTimer, 1000);
    setInterval(function() {
        totalTime++
        time.empty()
        time.append(totalTime)
      }, 1000);
})

function endgame() {
    endScreen.removeClass('hide');
    questions.addClass('hide');
}

// Dark mode toggle
function darkMode () {
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }    
}

const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
}
darkMode()