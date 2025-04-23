document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-btn');
    const guessInput = document.getElementById('guess');
    const resultDisplay = document.getElementById('result');
    const attemptsDisplay = document.getElementById('attempts');
    const messageDisplay = document.getElementById('message');
    const body = document.body;
    const winSound = document.getElementById('win-sound');
    const loseSound = document.getElementById('lose-sound');
    const backgroundMusic = document.getElementById('background-music');
    const number = Math.floor(Math.random() * 100) + 1;
    let count = 1;
    let isMusicPlaying = false;

    function createSpark() {
        const spark = document.createElement('div');
        spark.classList.add('spark');
        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;
        body.appendChild(spark);
        setTimeout(() => spark.remove(), 1500);
    }

    submitButton.addEventListener('click', () => {
        if (!isMusicPlaying) {
            backgroundMusic.volume = 0.5;
            backgroundMusic.play();
            isMusicPlaying = true;
        }

        const guessed = parseInt(guessInput.value);

        if (isNaN(guessed)) {
            resultDisplay.textContent = "Please enter a valid number!";
            return;
        }

        if (guessed < 1 || guessed > 100) {
            resultDisplay.textContent = "Please enter a number between 1 and 100.";
            return;
        }

        if (guessed === number) {
            resultDisplay.textContent = `Hurray! You guessed the number in ${count} attempts!`;
            messageDisplay.textContent = "Thank you for playing!";
            body.classList.add('win-background');
            submitButton.disabled = true;
            winSound.play();
            for (let i = 0; i < 50; i++) {
                createSpark();
            }
            backgroundMusic.pause();
        } else if (guessed < number) {
            resultDisplay.textContent = "You're too low! Try again.";
        } else {
            resultDisplay.textContent = "You're too high! Try again.";
        }

        if (count === 5 && guessed !== number) {
            resultDisplay.textContent = "Sorry, you've used all attempts. You lose!";
            messageDisplay.textContent = `The correct number was ${number}.`;
            body.classList.add('loss-background');
            submitButton.disabled = true;
            loseSound.play();
            backgroundMusic.pause();
        }

        attemptsDisplay.textContent = `Attempts: ${count}`;
        count++;
    });
});
