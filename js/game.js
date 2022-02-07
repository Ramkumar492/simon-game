let gameArray = [];
let userClickedPattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let gameStart = false;
let level = 0;

const greenAudio = new Audio("sounds/green.mp3");
const redAudio = new Audio("sounds/red.mp3");
const yellowAudio = new Audio("sounds/yellow.mp3");
const blueAudio = new Audio("sounds/blue.mp3");
const wrongAudio = new Audio("sounds/wrong.mp3");

$(".stbtn").click(function(){

  startGame();
  $(".stbtn").css('display','none');
})

function blink(color) {
  $(`.${color}`).fadeTo(100, 0.3, function() {
    $(this).fadeTo(500, 1.0);
  });
}

$('.btn').click(function() {

  blink(this.id);

  playAudio(this.id);
  userClickedPattern.push(this.id);

  if (gameStart) {
    checkAnswer(userClickedPattern.length - 1);
  }


  $(this).addClass('pressed');

  $(this).removeClass('pressed').delay(200);
});

function playAudio(color) {

  $('document').ready(function() {

    if (color === 'green') {
      greenAudio.play();
    }
    if (color === 'blue') {
      blueAudio.play();
    }
    if (color === 'red') {
      redAudio.play();
    }
    if (color === 'yellow') {
      yellowAudio.play();
    }

  });
}

function sequenceShow(color) {
  blink(color);
  playAudio(color);
}

function checkAnswer(index) {
  if (userClickedPattern[index] === gameArray[index]) {

    if (userClickedPattern.length === gameArray.length) {
      userClickedPattern = [];
      level++;

      setTimeout(nextSequence, 1500);
    }
  } else {
    $('#level-title2').text(`Wrong Answer try Again`);
    wrongAudio.play();


    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over')
    }, 400);

    // $('body').removeClass('game-over').delay(30000);

    setTimeout(function() {
      $('#level-title2').text(`Press any Key to Start`);
      endgame();
        $(".stbtn").css('display','inline');
    }, 2000);


  }




}

function endgame() {
  gameStart = false;
  gameArray = [];
  userClickedPattern = [];
}

function nextSequence() {

  $('#level-title2').text(`Level ${level}`);
  const random = Math.floor(Math.random() * 4);
  gameArray.push(buttonColours[random]);
  sequenceShow(buttonColours[random]);


}

$(document).keypress(function() {

startGame();


});


function startGame()
{
  if (!gameStart) {
    gameArray = [];
    userClickedPattern = [];
    level = 0;
    nextSequence();
    gameStart = true;

  }
}
