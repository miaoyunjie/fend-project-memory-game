/*
 * Create a list that holds all of your cards
 */
 //cards list
var card = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
var cards = card.concat(card);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//restart
function restart(){
	$("ul li").removeClass().addClass("card");
	$(".moves").text(0);
	for (var j = 0; j < 3; j++) {
		$("ul:eq(0) li:eq("+ j +") i").removeClass().addClass("fa").addClass("fa-star");
	}
	var list = shuffle(cards);
	for (var j = 0; j < list.length; j++) {
		$("ul:eq(1) li:eq("+ j +") i").removeClass().addClass("fa").addClass(list[j]);
	}
}

//click restart
$(".restart").on("click",function(){
	restart();
});

//open html load "click" incident
$(".restart").trigger("click");

//click cards
var appearList = [];
var number = 0;
var star_number = 3;

$("ul:eq(1) .card").on("click",function(){
	if($(this).hasClass("open") || $(this).hasClass("match")){
		alert("this is open.")
	} else {
		if (appearList.length % 2 === 0){
			//添加卡片图样到列表
			appearList.push($(this).find("i").removeClass("fa").attr("class"));
			$(this).find("i").addClass("fa");
			$(this).addClass("open show");
			//修改步骤
			number = number + 1;
			if (number % 2 == 0){
				$(".moves").text(number/2);
			}
			//修改星数
			if (number/2 > 10 && number/2 <= 15){
				$("ul:eq(0) li:eq(2) i").removeClass().addClass("fa fa-star-o");
			}else if (number/2 > 15 && number/2 <= 20){
				$("ul:eq(0) li:eq(2) i").removeClass().addClass("fa fa-star-o");
				$("ul:eq(0) li:eq(1) i").removeClass().addClass("fa fa-star-o");
			}else if (number/2 > 20){
				$("ul:eq(0) li i").removeClass().addClass("fa fa-star-o");
			}
		} else {
			//添加卡片图样到列表
			appearList.push($(this).find("i").removeClass("fa").attr("class"));
			$(this).find("i").addClass("fa");
			$(this).addClass("open show");
			//延时0.5s执行，判断是否匹配
			setTimeout(function(){
				if (appearList[appearList.length - 1] === appearList[appearList.length - 2]){
					$("." + appearList[appearList.length - 1]).parent().removeClass().addClass("card match");
					$("." + appearList[appearList.length - 2]).parent().removeClass().addClass("card match");
				} else {
					$("." + appearList[appearList.length - 1]).parent().removeClass().addClass("card");
					$("." + appearList[appearList.length - 2]).parent().removeClass().addClass("card");
					appearList.pop();
					appearList.pop();
				}
			},500);	
			//修改步骤
			number = number + 1;
			if (number % 2 == 0){
				$(".moves").text(number/2);
			}
			//修改星数
			if (number/2 > 10 && number/2 <= 15){
				$("ul:eq(0) li:eq(2) i").removeClass().addClass("fa fa-star-o");
				star_number = 2;
			}else if (number/2 > 15 && number/2 <= 20){
				$("ul:eq(0) li:eq(2) i").removeClass().addClass("fa fa-star-o");
				$("ul:eq(0) li:eq(1) i").removeClass().addClass("fa fa-star-o");
				star_number = 1;
			}else if (number/2 > 20){
				$("ul:eq(0) li i").removeClass().addClass("fa fa-star-o");
			}
			//判断是否成功
			if (appearList.length === 16){
				$("input:eq(0)").attr("value",number/2);
				$("input:eq(1)").attr("value",star_number)
				$(":submit").click();
			}
		}	
	}
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
