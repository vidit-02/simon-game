
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level=0;

$(document).keypress(function(){
  if (!start){
    start=true;
    $("#level-title").text("level "+ level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  //Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text("level "+ level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name){
  var audio=new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");    //if error them replace . by #.
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence(),1000);   //try nextseq. function inside function
    }
  }
  else{
    handleWrong();
    restart();
  }
}

function handleWrong(){
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game over, Press any key to restart ")
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

}

function restart(){
 gamePattern=[];
 start=false;
 level=0;
}
