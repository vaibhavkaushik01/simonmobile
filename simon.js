var buttonColours=["red", "blue", "orange", "green", "yellow", "light-green", "purple", "grey", "pink"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;

$("#start-button").click(function(){
    if(!start){
     nextSequence();
     start=true;
    }
 });

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*9);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    randomPress(randomChosenColour);
    playSound(randomChosenColour);

}

$(".btn").click(function(event){
 var userChosenFunction = event.target.id;
 userClickedPattern.push(userChosenFunction);
 animatePress(userChosenFunction);
 playSound(userChosenFunction);
 checkResult(userClickedPattern.length-1);
});

function checkResult(lastColor){
    if(gamePattern[lastColor]===userClickedPattern[lastColor]){
        if(gamePattern.length===userClickedPattern.length){
       setTimeout(function(){nextSequence();},1000);
     }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Start Button To Restart")
        setTimeout(function(){
         $("body").removeClass("game-over")},200);
         startAgain();
    }
}


function animatePress(currentColour){
 $("#"+currentColour).addClass("pressed");
 setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100);
}

function randomPress(randomChosenColour){
    $("#"+randomChosenColour).css("visibility","hidden");
    setTimeout(function(){$("#"+randomChosenColour).css("visibility","visible")},100);
}

function playSound(name){
    var music= new Audio("./sounds/"+name+".mp3");
    music.play();
}

function startAgain(){
level=0;
gamePattern=[];
start=false;
}