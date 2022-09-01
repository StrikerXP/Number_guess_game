let secretNumber = Math.trunc (Math.random () * 20) + 1;
let bestResult = Number (0);
let score = 20;

const guessMess = function(message) {
  document.querySelector ('.guess-message').textContent = message;
}

function limiter (input) {
  if (input.value > 20) {
    input.value = 20;
  } else if (input.value < 1) {
    input.value = 1;
  }
}

let cookieBestResult = document.cookie
  .split (';')
  .find (row => row.startsWith ('best='))
  ?.split ('=') [1];

cookieBestResult = Number(cookieBestResult);

function result () {
  if (!isNaN(cookieBestResult)) {
    bestResult = cookieBestResult;
  } else {
    bestResult;
  }
}

result();

document.querySelector ('.highscore').textContent = bestResult;
document.querySelector ('.score').textContent = score;
document.querySelector ('.check').addEventListener ('click', function() {

  const guessingNumber = Number (document.querySelector ('.number-input').value);

  // No input
  if (!guessingNumber) {
    guessMess('Enter number!');

    //Player won
  } else if (guessingNumber === secretNumber) {
    guessMess('Right!');
    document.querySelector ('.check').textContent = 'Congratulation:)';
    document.querySelector ('.question').textContent = secretNumber;
    document.querySelector ('.check').style.backgroundColor = '#fff';
    document.querySelector ('body').style.backgroundColor = 'rgb(23, 224, 15)';
    document.querySelector ('.question').style.width = '60rem';
    document.querySelector ('.number-input').setAttribute ('disabled', '');
    if (score > bestResult) {
      bestResult = score;
      document.cookie = 'best='+ bestResult +';';
    }
    document.querySelector ('.highscore').textContent = bestResult;

    //Number < or >
  } else if (guessingNumber !== secretNumber && score > 0) {
    guessMess(guessingNumber > secretNumber ? 'Too big!' : 'Too small!');
    score--;
    document.querySelector ('.score').textContent = score;
  }

    // Player lost
  else
    if (score === 0) {
      guessMess('Yo did NOT guess! Game over.');
      document.querySelector ('body').style.backgroundColor = 'red';
      document.querySelector ('.check').textContent = 'Game Over';
      document.querySelector ('.check').style.backgroundColor = '';
    }
  }
)

// Restart button
  document.querySelector ('.again').addEventListener ('click', function() {
    score = 20;
    document.querySelector ('.score').textContent = score;
    document.querySelector ('body').style.backgroundColor = '';
    document.querySelector ('.question').textContent = '???';
    document.querySelector ('.check').textContent = 'Check!';
    guessMess('Start guessing!');
    document.querySelector ('.question').style.width = '25rem';
    document.querySelector ('.number-input').removeAttribute ('disabled');
    document.querySelector ('.number-input').value = '';
    secretNumber = Math.trunc (Math.random () * 20) + 1;
  });

