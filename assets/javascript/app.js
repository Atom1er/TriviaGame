var start = $("#start");
var quiz = $("#quiz");
var question = $("#question");
var qImg = $("#qImg");
var choices = $("#choices");
var choiceA = $("#A");
var choiceB = $("#B");
var choiceC = $("#C");
var timer = $("#timer");
var counter = $("#counter");
var timegauge = $("#timegauge");
var btimeGauge = $("#btimeGauge");
var progress = $("#progress");
var scoreDiv = $("#score");

var score=0;
var count=0;
var questionTime = 10;
var gWidth = 150;
var gUnit =gWidth / questionTime;
var TIMER;

let questions = [
    {
        question: "	Africa is a continent (a very large mass of land) which is made up of many different countries. How many countries make up the continent of Africa?",
        imgSrc: "./assets/images/africa.png",
        choiceA: "Correct",
        choiceB: "wrong",
        choiceC: "wrong",
        correct: "A"

    }, {
        question: "What percentage of all the land on the planet Earth does Africa cover?",
        imgSrc: "./assets/images/africa_world.png",
        choiceA: "wrong",
        choiceB: "Correct",
        choiceC: "wrong",
        correct: "B"

    }, {
        question: "What percentage of all the land on the planet Earth does Africa cover?",
        imgSrc: "./assets/images/africa_world.png",
        choiceA: "wrong",
        choiceB: "wrong",
        choiceC: "Correct",
        correct: "C"

    }
]


var Lquestion = questions.length - 1;
var Rquestion = 0;


function RenderQuestion() {
    var quest = questions[Rquestion];
    question.html("<p>" + quest.question + "</p>");

    var img = $("<img>");
    img.attr('src', quest.imgSrc);
    qImg.append(img);

    choiceA.html(quest.choiceA);
    choiceB.html(quest.choiceB);
    choiceC.html(quest.choiceC);
    $(".choice").on({
        mouseover: function () {
            $(this).css({
                'cursor': 'pointer'
            });
        },
        mouseout: function () {
            $(this).css({
                'cursor': 'default'
            });
        },
    
    })
}

start.on({
    mouseover: function () {
        $(this).css({
            'cursor': 'pointer'
        });
    },
    mouseout: function () {
        $(this).css({
            'cursor': 'default'
        });
    },
    
    click: function(){
    startGame();
}

});
function startGame(){
    start.css('display','none');
    RenderQuestion();
    quiz.css('display','block');
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
    
}


function renderProgress() {
    for (var q = 0; q < questions.length; q++) {
        var p = $("<div>");
        p.attr(
            {
                'class': "test",
                'id': q
            });
        progress.append(p);
    }
}


function renderCounter(){
    if(count<=questionTime){
         // counter.css('display','block');
         var g=count * gUnit;
         timegauge.css('width',g+"px");
        counter.text(count);
        count++;
    }else{
        // count=0;
    }

}

function checker(ans){
    if(ans == questions[Rquestion].correct){
        score++;
        // console.log(score);
        CorrectAns();
    } else{
        WrongAns();
    }
}

function CorrectAns(){
    $("#Rquestion").css('background-color','green');
}
function WrongAns(){
    $("#Rquestion").css('background-color','red');
}