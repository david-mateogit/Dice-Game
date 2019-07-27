var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice1, lastDice2, winningScore;

//RESET GAME WHEN YOU ADD A NEW SCORE.
document.querySelector('.setScore').addEventListener('change', function() {
  winningScore = document.querySelector('.setScore').value;
  init();
});

document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    //1. random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    let diceDom1 = document.querySelector('.dice-1');
    let diceDom2 = document.querySelector('.dice-2');
    diceDom1.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom1.src = '/resources/images/dice-' + dice1 + '.png';
    diceDom2.src = '/resources/images/dice-' + dice2 + '.png';

    //3. Update the round score If the rolled number was NOT a 1;

    if ((dice1 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6)) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }

    lastDice1 = dice1;
    lastDice2 = dice2;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice-1').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }

    winningScore = document.querySelector('.setScore').value;
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
}

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-1').style.display = 'none';
  document.querySelector('.dice-2').style.display = 'none';
}
