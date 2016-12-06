var questions = [];
var answers = [];

var selectedQ;
var selectedA;

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
		
		$("#submit").click(function() {
			firebaseData();
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

function firebaseData() {
	
	$("#name-modal").css("display", "block");
	
	var database = firebase.database();
	var storageRef = database.ref();
	
	console.log(selectedQ);	
	console.log(selectedA);
	storageRef.push({name: name, email: email, team: team, payment: payment});

}

