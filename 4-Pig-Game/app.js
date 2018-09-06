//get 1st alert - rules
var modal = document.getElementById('myModal');
//2nd alert - set score
var modal2 = document.getElementById('myModal2');
//3rd alert - you lose
var modal3 = document.getElementById('myModal3');

var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("close2")[0];
var span3 = document.getElementsByClassName("close3")[0];


span.onclick = function(event) {
    modal.style.display = "none";
    modal2.style.display = "block";
}

span2.onclick = function(event) {
        modal2.style.display = "none";
}

span3.onclick = function(event) {
        modal3.style.display = "none";
        nextPlayer();
}

var isblocked=false;

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal2.style.display = "block";
// Block game if score is not set
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
    	if (isblocked == false) {
    		modal3.style.display = "none";
    	} 
   }
} 


var scores, roundScore, activePlayer, gamePlaying;
start();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
			var dice1 = Math.floor(Math.random() * 6) + 1;
			var dice2 = Math.floor(Math.random() * 6) + 1;

		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		

		if (dice1 !== 1 && dice2 !== 1) {
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;

		} else {
			setTimeout(function(){ 
				modal3.style.display = 'block';
				isblocked = true;
				/*nextPlayer();*/
/*Alert should block game. Close alert before next player*/
			}, 1000);
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
			scores[activePlayer] += roundScore;

		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.new-score').value;
		var winningScore;

		if(input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}

		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.getElementById('dice-1').style.display = 'none';
			document.getElementById('dice-2').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		document.getElementById('dice-1').style.display = 'none';
		document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', start);


function start() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;


	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';

	document.getElementById('score-0').innerHTML = '0';
	document.getElementById('score-1').innerHTML = '0';
	document.getElementById('current-0').innerHTML = '0';
	document.getElementById('current-1').innerHTML = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');

}













