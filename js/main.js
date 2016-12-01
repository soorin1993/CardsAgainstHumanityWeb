var questions = [];
var answers = [];

$(document).ready(function(){
	
	getData(function(data) {
		
		foo = data["blackCards"];
		$.each(foo, function(index, item) {
			temp = item["text"]
			console.log(temp);
			questions.push(temp)
		})
		
		bar = data["whiteCards"];
		$.each(bar, function(index, item) {
			temp = item["text"]
			answers.push(temp)
		})
		assignCards()
    });
	
	
	$(".back").each(function(index, item) {
		item.innerHTML = "Cards<br> Against<br> Humanity";
	});
	
    $(".card").click(function(){
	    $(".back", this).toggle();  
	    $(".front", this).toggle();  
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
	
	$(".front").each(function(index, item) {
		var randomNum = Math.floor(Math.random() * questions.length) + 1;
		randomNum -= 1
		console.log(randomNum);
		console.log(questions[randomNum]);
		item.innerHTML = questions[randomNum];
	});
	
	for(var i = 0; i < 5; i++) {
		aTemp.push(Math.floor(Math.random() * answers.length) + 1)
	}
	
}