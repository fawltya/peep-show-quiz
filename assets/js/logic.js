var startButton = $("#start");
var startScreen = $("#start-screen");
var endScreen = $("#end-screen");
var questions = $("#questions");
var question = $("question-title");
var choices = $("#choices");
var time = $("#time");
var i = 0;
var totalTime = 0;
var interval;

function quiz() {
  questions.removeClass("hide");
  startScreen.addClass("hide");
  // Show Title
  $("#question-title").text(questionArray[i].question);
  // Iterate through questions and create buttons for each with data index of position
  for (var j = 0; j < questionArray[i].choices.length; j++) {
    var button = $(
      '<button class="answer-button" id="answer-btn-' +
        j +
        '" data-index=' +
        j +
        ">" +
        questionArray[i].choices[j] +
        "</button>"
    );
    choices.append(button);
    // Check if correct answer is the current answer and if so go to the next question.
    function handleAnswer(event) {
      var currentAnswer = event.target.getAttribute("data-index");

      if (parseInt(currentAnswer) === questionArray[i].answer) {
        i++;
        $("#choices").empty();
        if (i >= questionArray.length) {
          // when all questions done go to endgame
          return endgame();
        }
        quiz();
      } else {
        totalTime += 10; // if wrong answer clicked add 10 to the total time
      }
    }

    $("#answer-btn-" + j).on("click", handleAnswer);
  }
}
// start timer
startButton.on("click", function (event) {
  event.preventDefault();
  quiz();
  interval = setInterval(function () {
    totalTime++;
    time.empty();
    time.append(totalTime);
  }, 1000);
});
// Reveal highscore page
$("#highscore-btn").on("click", function (event) {
  event.preventDefault();
  startScreen.addClass("hide");
  endgame();
});

function endgame() {
  endScreen.removeClass("hide");
  questions.addClass("hide");
  // Capture total time and display
  var finalScore = totalTime;
  $("#final-score").text(finalScore);
  // stop timer
  clearInterval(interval);
  // Capture initials
  $("#submit").on("click", function (event) {
    event.preventDefault();
    var initials = $("#initials").val();
    // Create object in array of initials and time score, push to highscores array
    highscores.push({ initials, finalScore });
    // Save to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));
    // Clear the current list ready to display updated version
    $("#highscore-list").empty();
    // Order the list of highscores low to high
    highscores.sort(
      (a, b) => parseFloat(a.finalScore) - parseFloat(b.finalScore)
    );
    // Iterate through the highscores array and create list item for each
    for (let i = 0; i < highscores.length; i++) {
      var highscoreListItem = $(`<li>`);
      highscoreListItem.text(
        `${highscores[i].initials}: ${highscores[i].finalScore}secs`
      );
      // Append list items to the high score list
      $("#highscore-list").append(highscoreListItem);
    }
  });
}
// Show highscores before new submission
var highscores =
  JSON.parse(localStorage.getItem("highscores", highscores)) || [];
console.log(highscores);
highscores.sort((a, b) => parseFloat(a.finalScore) - parseFloat(b.finalScore));
for (let i = 0; i < highscores.length; i++) {
  var highscoreListItem = $(`<li>`);
  highscoreListItem.text(
    `${highscores[i].initials}: ${highscores[i].finalScore}secs`
  );
  $("#highscore-list").append(highscoreListItem);
}
// Delete high score records from page and local storage
$("#clear").on("click", function (event) {
  event.preventDefault();
  localStorage.removeItem("highscores"); // Only removes highscore local storage data to keep dark mode localstorage
  $("#highscore-list").empty();
});

// Dark mode toggle (swaps variables)
function darkMode() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  toggleSwitch.addEventListener("change", switchTheme, false);

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); //add this
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); //add this
    }
  }

  const currentTheme = localStorage.getItem("theme")
    ? localStorage.getItem("theme")
    : null;

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }
}
darkMode();
