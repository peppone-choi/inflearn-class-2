const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultText = document.getElementById('result');
const leftTxt = document.getElementById('left');
const yourScoreTxt = document.getElementById('you-score');
const computerScoreTxt = document.getElementById('com-score');
const progressBar = document.getElementById('progress-bar');
const restartBtn = document.getElementById('restart');

let playerScore = 0;
let computerScore = 0;
let round = 0;

computerPlay = () => {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

playGame = (playerSelection, computerSelection) => {
  if (playerSelection === computerSelection) {
    return 0;
  }
  if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    return 1;
  }
  return 2;
};

init = () => {
  playerScore = 0;
  computerScore = 0;
  round = 0;
  yourScoreTxt.textContent = 0;
  computerScoreTxt.textContent = 0;
  leftTxt.textContent = 10;
  progressBar.value = 0;
  resultText.textContent = '선택하세요.';
  restartBtn.style.display = 'none';
}

init();

const playRound = (playerSelection) => {
  if (round > 9) {
    return;
  }
  const computerSelection = computerPlay();
  const result = playGame(playerSelection, computerSelection);
  if (result === 0) {
    resultText.textContent = '비겼다!';
    progressBar.className = 'nes-progress';
  } else if (result === 1) {
    resultText.textContent = '이겼다!';
    progressBar.className = 'nes-progress is-success';
    playerScore++;
  } else {
    resultText.textContent = '졌다.';
    progressBar.className = 'nes-progress is-error';
    computerScore++;
  }
  round++;
  yourScoreTxt.textContent = playerScore;
  computerScoreTxt.textContent = computerScore;
  leftTxt.textContent = `${10 - round}`;
  progressBar.value = round;
  if (round === 10) {
    if (playerScore > computerScore) {
      resultText.textContent = '최종적으로 승리하셨습니다.';
      progressBar.className = 'nes-progress is-success';
    } else if (playerScore < computerScore) {
      resultText.textContent = '최종적으로 패배하셨습니다.';
      progressBar.className = 'nes-progress is-error';
    } else {
      resultText.textContent = '최종적으로 비기셨습니다.';
    }
    restartBtn.style.display = 'block';
    return;
  }
};

rockBtn.addEventListener('click', () => {
  playRound('rock');
});

paperBtn.addEventListener('click', () => {
  playRound('paper');
});

scissorsBtn.addEventListener('click', () => {
  playRound('scissors');
});

restartBtn.addEventListener('click', () => {
  init();
});