var gamePattern = [];
var userPattern = [];
var level = 0;
const buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var i = randomNumber;
  var choosenDiv = "#" + buttonColours[i];
  gamePattern.push(buttonColours[i]);
  $(choosenDiv).addClass("pressed");
  setTimeout(function () {
    $(choosenDiv).removeClass("pressed");
  }, 100);
  level++;
  var choosenDivAudioLink = "./" + "sounds" + "/" + buttonColours[i] + ".mp3";
  var audio = new Audio(choosenDivAudioLink);
  audio.play();
  $("h1").html("level " + level);
}

$(".btn").click(function () {
  var clickedbtn = this.id;
  var clickedDiv = "#" + this.id;
  var clickedDivAudioLink = "./" + "sounds" + "/" + this.id + ".mp3";
  var audio = new Audio(clickedDivAudioLink);
  audio.play();
  userPattern.push(clickedbtn);
  checkAnswer(userPattern.length);
  $(clickedDiv).addClass("pressed");
  setTimeout(function () {
    $(clickedDiv).removeClass("pressed");
  }, 100);
});

$(document).one("keypress", function () {
  nextSequence();
});
function checkAnswer(currentLevel) {
  currentLevel = currentLevel - 1;
  if (gamePattern[currentLevel] != userPattern[currentLevel]) {
    var wrongAudio = "./sounds/wrong.mp3";
    var audio = new Audio(wrongAudio);
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $(document).one("keypress", function () {
      restart();
    });
    $("h1").html("Game Over, Press Any Key to Restart");
  }
  if (gamePattern[currentLevel] == userPattern[currentLevel]) {
    if (gamePattern.length == userPattern.length) {
      setTimeout(nextSequence, 1000);
      userPattern = [];
    }
  }
}
function restart() {
  location.reload();
}
