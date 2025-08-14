document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    const buttons = document.querySelectorAll('.choice');
    const playerChoiceElement = document.getElementById('player-choice');
    const computerChoiceElement = document.getElementById('computer-choice');
    const resultElement = document.getElementById('result');
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const drawScoreElement = document.getElementById('draw-score');

    let playerScore = 0;
    let computerScore = 0;
    let drawScore = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const playerChoice = button.id;
            const computerChoice = getComputerChoice();
            const result = determineWinner(playerChoice, computerChoice);

            if (result === 'You win!') {
                playerScore++;
            } else if (result === 'Computer wins!') {
                computerScore++;
            } else if (result === 'It\'s a tie!') {
                drawScore++;
            }

            // Update player and computer choices with images and labels
            updateChoiceImage(playerChoiceElement, playerChoice, 'You chose:');
            updateChoiceImage(computerChoiceElement, computerChoice, 'Computer chose:');
            resultElement.textContent = `Result: ${result}`;

            // Update scores
            playerScoreElement.textContent = `Player Score: ${playerScore}`;
            computerScoreElement.textContent = `Computer Score: ${computerScore}`;
            drawScoreElement.textContent = `Draws: ${drawScore}`;

            // Check if a winner is declared
            if (playerScore === 5 || computerScore === 5 || drawScore === 5) {
                declareWinner(playerScore, computerScore);
            }
        });
    });

    function getComputerChoice() {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            return 'It\'s a tie!';
        }
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'You win!';
        }
        return 'Computer wins!';
    }

    function updateChoiceImage(element, choice, label) {
        element.innerHTML = ''; 

        // Add label text
        const text = document.createElement('p');
        text.textContent = label;
        text.style.margin = '0 0 5px 0';
        text.style.fontWeight = 'bold';

        // Add image for the choice
        const img = document.createElement('img');
        img.src = `${choice}.jpg`;
        img.alt = choice;
        img.width = 100;
        img.height = 100;
        img.style.borderRadius = '50%';

        element.appendChild(text);
        element.appendChild(img);
    }

    function declareWinner(playerScore, computerScore) {
        // Update UI with the latest choices and result
        if (playerScore === 5) {
            resultElement.textContent = 'Result: You won the game!';
        } else if (computerScore === 5) {
            resultElement.textContent = 'Result: Computer won the game!';
        } else {
            resultElement.textContent = 'Result: It\'s a draw!';
        }
    
        // Delay alert to ensure UI updates
        setTimeout(() => {
            if (playerScore === 5) {
                alert('You won the game!');
            } else if (computerScore === 5) {
                alert('Computer won the game!');
            } else {
                alert('It\'s a draw!');
            }
            resetGame();
        }, 0);
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        drawScore = 0;
        playerScoreElement.textContent = 'Player Score: 0';
        computerScoreElement.textContent = 'Computer Score: 0';
        drawScoreElement.textContent = 'Draws: 0';
        resultElement.textContent = 'Result: ';
        playerChoiceElement.innerHTML = '';
        computerChoiceElement.innerHTML = '';
    }
});
