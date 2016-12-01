var questions = [];
var answers = [];

$(document).ready(function(){
	
	getData(function(data) {
		
		foo = data["blackCards"];
		$.each(foo, function(index, item) {
			temp = item["text"]
			questions.push(temp)
		})
		
		bar = data["whiteCards"];
		$.each(bar, function(index, item) {
			answers.push(item)
		})
		
		assignCards()
    });
	
	
	$(".back").each(function(index, item) {
		item.innerHTML = "Cards<br> Against<br> Humanity";
	});
	
    $(".card").click(function(index, item){
	    	
	    var whichCard = $(this).parent().attr('class');
	    
	    if (whichCard == "questions") {
	    	console.log(this)
		    $(".questions .card .front").each(function(index, item) {
			   if($(item).is(":visible")) {
				   $(this).toggle();
				   $(this).siblings('.back').toggle();
				   $(this).parent().css({	"-moz-box-shadow": "",
									"-webkit-box-shadow": "",
									"box-shadow": ""}); 
			   } 
		    });
			$(".back", this).toggle();  
			$(".front", this).css("display", "block");
			
			$(this).css({	"-moz-box-shadow": "0 0 4px 6px #FF2A00",
							"-webkit-box-shadow": "0 0 6px 2px #FF2A00",
							"box-shadow": "0 0 6px 2px #FF2A00"}); 
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

			$(".back", this).toggle();  
			$(".front", this).toggle();
			$(this).css({	"-moz-box-shadow": "0 0 4px 6px #FF2A00",
							"-webkit-box-shadow": "0 0 6px 2px #FF2A00",
							"box-shadow": "0 0 6px 2px #FF2A00"}); 
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