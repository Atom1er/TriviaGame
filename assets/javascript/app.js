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
var mood = $("#mood");
var timerInterval = 0;
var end;
var selected;
var status = 1;
var score=0;
var win = 0;
var fail = 0;
var count=0;
var end = false;
var questionTime = 20;
var gWidth = 300;
var gUnit;
var Lquestion;
var Rquestion = 0

 function test(){
     console.log("function: test");
    selected = 0;
    status = 1;
    score=0;
    win = 0;
    fail = 0;
    count=0;
    end = false;
    questionTime = 20;
    gWidth = 300;
    gUnit =gWidth / questionTime;
    Lquestion = questions.length - 1;
    Rquestion = 0;
 }
function restart(){
    
    console.log("function: restart");
    startGame();
}


let questions = [
    {
        question: "	Africa is a continent (a very large mass of land) which is made up of many different countries. How many countries make up the continent of Africa?",
        imgSrc: "./assets/images/africa.png",
        choiceA: "24",//value 1
        choiceB: "54",//value 2
        choiceC: "84",//value 3
        correct: 2

    }, {
        question: "What percentage of all the land on the planet Earth does Africa cover?",
        imgSrc: "./assets/images/africa_world.png",
        choiceA: "20%",
        choiceB: "10%",
        choiceC: "30%",
        correct: 1

    }, {
        question: "What is the meaning of the name 'Africa'? The name has its origins in a small country in the North of Africa (Tunisia) and it means:",
        imgSrc: "./assets/images/afroca_name_origine.gif",
        choiceA: "Sunny place",
        choiceB: "Enormous place",
        choiceC: "Dangerous place",
        correct: 1

    }, {
        question: "In 1950, about 221 million people lived in Africa, how many people live in Africa today?",
        imgSrc: "./assets/images/population.jpg",
        choiceA: "500 million people",
        choiceB: "750 million people",
        choiceC: "more than 1000 million (a billion) people",
        correct: 3

    }, {
        question: "What is the distance from the top of Africa (i.e. its most northerly point) to the bottom of Africa (its most southerly point)?",
        imgSrc: "./assets/images/World_Map.png",
        choiceA: "1000 miles (1600km)",
        choiceB: "5000 miles (8000km)",
        choiceC: "10000 miles (16000km)",
        correct: 2

    },
]

function printdebug(){
    console.log({
        end: end,
        timerInterval: timerInterval,
        questions: questions
    })
}




//---------->Function start<-------------------/////////////////////////////////
function startGame(){
    printdebug();
    console.log("function: startGame");
    test();
    end = false;
    $("#score").css('display','none');
    start.css('display','none');
    mood.css('display', 'block');
    quiz.css('display','block');
    RenderQuestion();
    renderProgress();
    renderCounter();
    timerInterval = setInterval(renderCounter, 1000);
    console.log(timerInterval)
    checker();
    printdebug();
    
}


// Start the Game by press the button 'start'////////////////////////////////////
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

//DISPLAYING QUESTIONS

function RenderQuestion() {
    
    console.log("function: RenderQuestion");
    if(score<5){
    var quest = questions[Rquestion];
    question.html("<p>" + quest.question + "</p>");

    var img = $("<img>");
    img.attr({
        src : quest.imgSrc,
        width: '100%',
        height: '60%'
    });
    qImg.html(img);
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
} else{
    end=true;
    $(".ques").css('display','none');
    $("#score").css('display', 'block');
    $("#score1").html('<div><h3>Correct answer '+win+'<br>Wrong Answer '+fail+"</h3></div>");
    $("#restart").on('click', function(){
        alert('test');
     restart();
    });

}
}

//-------------->Showing your Result while still playing<----------------///////
function renderProgress() {
    for (var q = 0; q < questions.length; q++) {
        var p = $("<div>");
        p.attr(
            {
                'class': "test",
                'id': q
            });
        progress.prepend(p);
    }
}

//----------------> Gauge Counter<-------------------------------////////////////
function renderCounter(){
    
    console.log("function: renderCounter");
    if(count<=questionTime && score < 5 && !end){
         var g=count * gUnit;
         timegauge.css('width',g+"px");
        counter.text(count);
        count++;
    }else{
        count=0;
        Ans(selected, Rquestion);
        Rquestion++;
        RenderQuestion();
    }

}
//-----------------------> Checking User Answer <----------/////
function checker(){
        
     console.log("function: checker");
    $("#submit").on('click', function(){
        count=0;

    //User have to choose only one of shown  noptions
    $(".UserChoice").on('change', function(){
        $(".UserChoice").not(this).prop('checked', false);
    });

//--------------------->restart the gauge and send userChoice to Ans()<---//////
    if(!end){
        selected = $('input[name="UserCheckChoice"]:checked').val();
        console.log(selected);
        renderCounter()
        Ans(selected, Rquestion);
        Rquestion++;
        RenderQuestion();
    } else if (score == 5){
        end =true;
        score = 0;
        clearInterval(timerInterval);
    }
    else{
        console.log("score: " + score);
    }
    ;
    
    alert

    });
};

//////-----------> Checking User choice
function Ans(elem1 , elem2){

    //If UserChoice is Right show green light else red Light
    if(!end){
    if(elem1 == questions[elem2].correct){
        $("#"+Rquestion).css('background-color','green');
        win++;
        score = fail + win;
        console.log(score);
    }else{
        $("#"+Rquestion).css('background-color','red');
        status++;
        fail++;
        score = fail + win;
        console.log(score);
        if(status<6){
            $(".mood").attr('src','./assets/images/'+status+'.png');
        }else if(status == 6){
            status=status-1;
            $(".mood").attr('src','./assets/images/'+status+'.png');
        }
        
    }

}

}


