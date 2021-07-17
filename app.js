
var Score = 0;
var Stage = 0;
var Timer = 50;
var Interval = 1500;
var soundInterval = 0.7
var addTimerNumber = 7
var randomWord = null
var Words = []
var intervalTimer
var beginTimer
var beginCounter = 3
var endgame = false


var ScoreData = $('.score')
var timerData = $('.timer')
var addTimerData = $('.add-timer')
var stageData = $('.stage')
var beginTimerElem = $('.modal-cont-begin h1')


var bgMusic = document.createElement('audio');
bgMusic.setAttribute('src', 'bgmusic.mp3');
bgMusic.setAttribute('autoplay', 'autoplay');
$.get();
bgMusic.addEventListener("load", function() {
    bgMusic.play();
}, true);
bgMusic.playbackRate = soundInterval

var loseSound = document.createElement('audio');
loseSound.setAttribute('src', 'lose.mp3');
$.get();
loseSound.addEventListener("load", function() {
    loseSound.pause();
    alert()
}, true);

var scoreSound = document.createElement('audio');
scoreSound.setAttribute('src', 'score.mp3');
$.get();
scoreSound.addEventListener("load", function() {
    scoreSound.pause();
}, true);

var counterSound = document.createElement('audio');
counterSound.setAttribute('src', 'count.mp3');
$.get();
counterSound.addEventListener("load", function() {
    counterSound.pause();
}, true);



beginTimer()


document.querySelector('input').addEventListener('keyup', function() {
    SecurityKey = true
    if (document.querySelector('input').value === randomWord) {
        if (Score % 10 == 0) {
            addStage()
        }
        document.querySelector('input').value = ''
        setRandomWord()
        Score++
        scoreSound.volume = 1
        scoreSound.play()
        ScoreData.addClass('green')
        ScoreData.css('transform', 'scale(1.2)')
        Timer += addTimerNumber
        ScoreData.html("Score " + Score)
        timerData.addClass('green')
        timerData.html(Timer + "s")
        addTimerData.css('display', 'flex')
        addTimerData.html('+ ' + addTimerNumber)
        setTimeout(() => {
            timerData.removeClass('green')
            addTimerData.css('display', 'none')
            ScoreData.removeClass('green')
            ScoreData.css('transform', 'scale(1)')
        }, 600);
    } 
})

function addStage() {
    soundInterval += 0.05
    Interval -= 20
    console.log(Interval)
    bgMusic.playbackRate = soundInterval
    console.log(soundInterval)
    Stage++
    stageData.css('transform', 'scale(1.2)')
    stageData.html("Stage  " + Stage)
    startTimer()
    setTimeout(() => {
        stageData.css('transform', 'scale(1)')
    }, 600);
}


function beginTimer() {
    bgMusic.pause()
    beginTimer = setInterval(beginFun, 1000)
}
function beginFun() {
    counterSound.play()
    if (beginCounter === 0) {
        clearInterval(beginTimer)
        setDefData()
        beginCounter = 0
        bgMusic.play()
        $('.modal-cont-begin').css('display', 'none')
        return beginTimerElem.html(beginCounter)
    }
    beginCounter--
    beginTimerElem.html(beginCounter)
}


function setDefData() {
    ScoreData.html("Score " + Score)
    stageData.html("Stage  " + Stage) 
    startTimer()
    setRandomWord()
}


function setRandomWord() {
    $.getJSON("words.json", function(data){
        Words = data
        randomWord = Words[Math.floor(Math.random()*Words.length)]
        $('.word').html(randomWord)
    }).fail(function(){
        console.log("An error has occurred.");
    });
}


function timerSetting() {
    if (endgame) {
        return clearInterval(intervalTimer)
    }
    if (Timer < 10) {
        timerData.addClass('red')
    }
    if (Timer <= 0) {
        gameOver()
    } else {
        Timer--
        timerData.html(Timer + "s")
    }
}


function startTimer() {
    intervalTimer = setInterval(timerSetting, Interval)
}


function gameOver() {
    endgame = true
    clearInterval(intervalTimer)
    loseSound.play()
    bgMusic.pause();
    $('.modal-cont').css('display', 'flex')
    $('.your-time').html('Your score is ' + Score)
    $('.your-stage').html('Your stage is ' + Stage)
    $('.modal-cont .modal-box').css('display', 'flex')
    document.querySelector('input').setAttribute('disabled', true)
    setTimeout(() => {
        
    }, 500);
}


function Repeat() {
    window.location = 'index.html'
}