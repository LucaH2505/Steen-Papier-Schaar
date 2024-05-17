const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const choices = document.querySelectorAll('.choice');
const resultBox = document.getElementById('result-box');

let userScoreVal = 0;
let computerScoreVal = 0;

choices.forEach(choice => {
    choice.addEventListener('click', () => {
        playGame(choice.id);
    });
});

function playGame(userChoice) {
    resultMessage.textContent = 'Keuze maken...';
    const rollingInterval = startRollingAnimation();

    setTimeout(() => {
        clearInterval(rollingInterval);
        const computerChoice = getComputerChoice();
        const winner = determineWinner(userChoice, computerChoice);

        updateScores(winner);
        displayResult(userChoice, computerChoice, winner);
    }, 2000);
}

function startRollingAnimation() {
    const choices = ['steen', 'papier', 'schaar'];
    let index = 0;
    return setInterval(() => {
        resultMessage.textContent = `Keuze maken... ${choices[index]}`;
        index = (index + 1) % choices.length;
    }, 50);
}

function getComputerChoice() {
    const choices = ['steen', 'papier', 'schaar'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(user, computer) {
    if (user === computer) {
        return 'draw';
    }
    if (
        (user === 'steen' && computer === 'schaar') ||
        (user === 'schaar' && computer === 'papier') ||
        (user === 'papier' && computer === 'steen')
    ) {
        return 'user';
    } else {
        return 'computer';
    }
}

function updateScores(winner) {
    if (winner === 'user') {
        userScoreVal++;
    } else if (winner === 'computer') {
        computerScoreVal++;
    }
    userScore.textContent = userScoreVal;
    computerScore.textContent = computerScoreVal;
}

function displayResult(userChoice, computerChoice, winner) {
    let message;
    if (winner === 'draw') {
        message = `Het is gelijk spel! Jullie hebben allebei ${userChoice} gekozen.`;
        resultBox.className = 'result-box show draw';
    } else if (winner === 'user') {
        message = `Je wint! ${userChoice} wint over ${computerChoice}.`;
        resultBox.className = 'result-box show win';
    } else {
        message = `Je verliest! ${computerChoice} wint over ${userChoice}.`;
        resultBox.className = 'result-box show lose';
    }

    resultBox.textContent = message;
    setTimeout(() => {
        resultBox.classList.remove('show');
    }, 3000);

    resultMessage.textContent = 'Maak je keuze!';
}
