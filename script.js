const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');
const resultMessage = document.getElementById('result-message');
const choices = document.querySelectorAll('.choice');
const resultBox = document.getElementById('result-box');

let userScoreVal = 0;
let computerScoreVal = 0;

// Eventlistener toevoegen aan elke keuze
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        playGame(choice.id);
    });
});

// Functie om het spel te spelen
function playGame(userChoice) {
    resultMessage.textContent = 'Keuze maken...';
    // Animatie starten terwijl de keuze wordt gemaakt
    const rollingInterval = startRollingAnimation();

    setTimeout(() => {
        clearInterval(rollingInterval);
        const computerChoice = getComputerChoice();
        const winner = determineWinner(userChoice, computerChoice);

        // Scores bijwerken voor de winnaar
        updateScores(winner);
        // Resultaat weergeven
        displayResult(userChoice, computerChoice, winner);
    }, 1000); // Wacht 2 seconden voordat het resultaat opkomt
}

// Functie om de animatie van de keuze te starten
function startRollingAnimation() {
    const choices = ['steen', 'papier', 'schaar'];
    let index = 0;
    // Rollen tussen keuzes met een interval van 50 ms
    return setInterval(() => {
        resultMessage.textContent = `Keuze maken... ${choices[index]}`;
        index = (index + 1) % choices.length;
    }, 50);
}

// Functie om een willekeurige keuze voor de computer op te halen
function getComputerChoice() {
    const choices = ['steen', 'papier', 'schaar'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Functie om de winnaar te kiezen
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

// Functie om scores bij te houden
function updateScores(winner) {
    if (winner === 'user') {
        userScoreVal++;
    } else if (winner === 'computer') {
        computerScoreVal++;
    }
    userScore.textContent = userScoreVal;
    computerScore.textContent = computerScoreVal;
}

// Functie om het resultaat weer te geven
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

    // Resultaat weergeven
    resultBox.textContent = message;
    // Resultaat na 3 seconden verbergen
    setTimeout(() => {
        resultBox.classList.remove('show');
    }, 3000);

    resultMessage.textContent = 'Maak je keuze!';
}
