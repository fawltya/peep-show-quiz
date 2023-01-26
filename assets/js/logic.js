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
var k = 0;

var timerInterval = setInterval(function() {
    totalTime++
    time.empty()
    time.append(totalTime)

    // timeEl.textContent = totalTime + " seconds left till colorsplosion.";

    // if(totalTime === 0) {
    //   // Stops execution of action at set interval
    //   clearInterval(timerInterval);
    //   // Calls function to create and append image
    //   sendMessage();
    // }
    
  }, 1000);
  

// function myTimer() {
// //   time = k;
//   k++;
//   $(time).empty();
//   time.append(k)  
// }

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

           
} 

startButton.on("click", function(event) {
    event.preventDefault();
    quiz();
    // myInterval = setInterval(myTimer, 1000);
    
})


// console.log(questionArray[0]);

        







// timer(0)




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