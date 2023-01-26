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
           
} 

startButton.on("click", function(event) {
    event.preventDefault();
    quiz();
})
console.log($('div#choices'))


// console.log(questionArray[0]);

        





// function timer(timerLength) {
//     // var timeAmount = setInterval(timerLength, 1000);
//     time.append(timerLength)
// }

// timer(0)
// setInterval(timer(200000000000), 1000)



// var counter = 0;

// for (counter < 100 ) {
//     var interval = setInterval(function () {
//         counter++;
//       }, 1000);
// }


// // time.text(interval)
// console.log(interval)



// to stop the counter
// clearInterval(inteval);