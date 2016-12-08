var questions = [];
var answers = [];

var selectedQ;
var selectedA;
var userName;

var fireData = [];

var popular = false;

$(document).ready(function(){
	
	var config = {
		apiKey: "AIzaSyA3VCbCb47zrLWmFzkCcEv1ZgPhxIQ6qMM",
		authDomain: "cards-against-humanity-2bb21.firebaseapp.com",
		databaseURL: "https://cards-against-humanity-2bb21.firebaseio.com",
		storageBucket: "cards-against-humanity-2bb21.appspot.com",
		messagingSenderId: "279033261278"
	};
	
	firebase.initializeApp(config);
	
    var storage = firebase.storage();
	var storageRef = storage.ref();

	getData(function(data) {
		
		foo = data["blackCards"];
		$.each(foo, function(index, item) {
			temp = item["text"];
			questions.push(temp);
		})
		
		bar = data["whiteCards"];
		$.each(bar, function(index, item) {
			answers.push(item);
		})
		
		assignCards();
		
		$("#reshuffle").click(function() {
			location.reload();
		});
		
		$("#submit").click(function(e) {
			submitCards(e);
		}); 
		
		$("#score-board").click(function() {
			loadScores(popular);
		}); 
		
		$("#enter").click(function() {
			$("#name-modal").css("display", "none");	
			userName = $("#nameText").val();
			firebaseData();
		});
		
		$("#exit").click( function() {
			$("#name-modal").css("display", "none");
		});
		
		$("#recent").click(function() {
			$(this).css("background-color", "#F1F0D8");
			$("#popular").css("background-color", "#B8B8B8");
			popular = false;
			loadScores(popular);
		});
		
		$("#popular").click(function() {
			$(this).css("background-color", "#F1F0D8");
			$("#recent").css("background-color", "#B8B8B8");
			popular = true;
			loadScores(popular);	
		});
		
    });
	
	
	$(".back").each(function(index, item) {
		item.innerHTML = "Cards<br> Against<br> Humanity";
	});
	
    $(".card").click(function(index, item){
	    	
	    var whichCard = $(this).parent().attr('class');
	    
	    if (whichCard == "questions") {
		    $(".questions .card .front").each(function(index, item) {
			   if($(item).is(":visible")) {
				   	$(this).toggle();
				   	$(this).siblings('.back').toggle();

				   	$(this).parent().css({	"-moz-box-shadow": "",
									"-webkit-box-shadow": "",
									"box-shadow": ""}); 
			   } 
		    });
		   	selectedQ = $(".front", this).text();

			$(".back", this).toggle();  
			$(".front", this).css("display", "block");
			
			$(this).css({	"-moz-box-shadow": "0 0 4px 6px #D50032",
							"-webkit-box-shadow": "0 0 6px 2px #D50032",
							"box-shadow": "0 0 6px 2px #D50032"}); 
	    }
	    
		else {
				    
		    $(".answers .card .front").each(function(index, item) {
			   if($(item).is(":visible")) {
				   $(this).toggle();
				   $(this).siblings('.back').toggle();
				   $(this).parent().css({	"-moz-box-shadow": "",
										"-webkit-box-shadow": "",
										"box-shadow": ""}); 
			   } 
		    });

		   	selectedA = $(".front", this).text();
		   	
			$(".back", this).toggle();  
			$(".front", this).toggle();
			$(this).css({	"-moz-box-shadow": "0 0 4px 6px #D50032",
							"-webkit-box-shadow": "0 0 6px 2px #D50032",
							"box-shadow": "0 0 6px 2px #D50032"}); 
	    }

 
    });
});

function getData(callback){

	$.getJSON("js/cards.json", function (data) {
        callback(data);
    });
}

function assignCards() {
	
	var qTemp = [];
	var aTemp = [];
	
	$(".questions .front").each(function(index, item) {
		var randomNum = Math.floor(Math.random() * questions.length) + 1;
		randomNum -= 1
		item.innerHTML = questions[randomNum];
	});
	
	$(".answers .front").each(function(index, item) {
		var randomNum = Math.floor(Math.random() * answers.length) + 1;
		randomNum -= 1
		item.innerHTML = answers[randomNum];
	});

}

function submitCards(e) {
	$("#name-modal").css("display", "block");
}

function firebaseData() {
	
	var database = firebase.database();
	var storageRef = database.ref();
	
	storageRef.push({name: userName, question: selectedQ, answer: selectedA, score: 0});

}

function loadScores(popular) {

	$("#loading svg").css("display", "block");		

	$("#score").empty();

	var database = firebase.database();
	var storageRef = database.ref();

	if (popular == true) {
		storageRef.orderByChild("score").on("child_added", function(snapshot) {
			createItems(snapshot);
		});		
	}
	else {
		storageRef.on("child_added", function(snapshot) {
			createItems(snapshot);
		});		
	}

	$("#score-container").css("display", "block");

	$("#exit_score").click(function() {
		$("#score-container").css("display", "none");
	});

	setTimeout(function(){
		if (popular == true) {
			$('#score').append($('ol').find('li').get().reverse());
		}		
		$("#score").css("display", "block");
		$(".vote-button").click(function(e) {
		    e.stopPropagation();
		    
		    var clickedId = $(this).parent().parent().attr('id');
		    console.log(clickedId);
		    
			var currentScore = +($(this).prev().text());
			var newScore = currentScore + 1;
			$(this).prev().text(newScore);
			
			var newRef = firebase.database().ref(clickedId);
			newRef.update({score: newScore});
			
		});
		$("#loading svg").css("display", "none");		
	}, 700);
	
}

function createItems(snapshot) {

	var scoreList = document.getElementById("score");

	var dataId = snapshot.getKey();		

	var name = snapshot.val().name;
	var questionData = snapshot.val().question;
	var answerData = snapshot.val().answer;
	var scoreVal = snapshot.val().score;

	var item = document.createElement('li');

	var questionCard = document.createElement('div');
	var questionText = document.createElement('p');
	questionText.innerHTML = questionData;
	questionCard.appendChild(questionText);
	questionCard.className = "question_score";
	
	var answerCard = document.createElement('div');
	var answerText = document.createElement('p');	
	answerText.innerHTML = answerData;
	answerCard.appendChild(answerText);
	answerCard.className = "answer_score";
	
	
	var displayOther = document.createElement('div');
	
	var displayUserName = document.createElement('p');
	displayUserName.innerHTML = name;
	displayUserName.className = "user-name";
	
	var displayScore = document.createElement('p');
	displayScore.innerHTML = scoreVal;
	displayScore.className = "score-value";
	
	var voteButton = document.createElement('span');
	voteButton.innerHTML = "VOTE";
	voteButton.className = "vote-button";
	
	displayOther.appendChild(displayUserName);
	displayOther.appendChild(displayScore);
	displayOther.appendChild(voteButton);
	displayOther.className = "other_score";
	
	item.appendChild(questionCard);
	item.appendChild(answerCard);
	item.appendChild(displayOther);
	item.id = dataId;

	scoreList.appendChild(item);	
	//counter = counter + 1;
}
