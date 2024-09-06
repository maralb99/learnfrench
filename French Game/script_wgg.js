// Array of words to choose from
const words = [
    "canard",
    "poule",
    "vache",
    "souris",
    "cheval",
    "cochon",
    "chat",
    "chien",
];

let selectedWord;
let guessedLetters;
let displayWord;
let score = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    initializeGame();
    document.getElementById("score").textContent = `Score: ${score}`;

    // Add event listener to input field for Enter key press
    document.getElementById("letter-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            guessLetter();
        }
    });
});

function initializeGame() {
    // Get a random word from the list
    let randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex];

    // Reset the guessed letters array
    guessedLetters = [];

    // Initialize displayWord with underscores
    displayWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
        displayWord += "_ ";
    }
    document.getElementById("displayWord").textContent = displayWord.trim();
}

// Function to check guessed letter
function guessLetter() {
    let inputElement = document.getElementById("letter-input");

    // Check for empty input
    if (!inputElement.value) {
        alert("Empty Input box. Please add input letter");
        return;
    }

    let letter = inputElement.value.toLowerCase();

    // Clear the input field
    inputElement.value = "";

    // Check if the letter has already been guessed
    if (guessedLetters.includes(letter)) {
        alert("You have already guessed that letter!");
        return;
    }

    // Add the letter to the guessed letters array
    guessedLetters.push(letter);

    // Update the word display based on the guessed letters
    let updatedDisplay = "";
    let allLettersGuessed = true;
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessedLetters.includes(selectedWord[i])) {
            updatedDisplay += selectedWord[i] + " ";
        } else {
            updatedDisplay += "_ ";
            allLettersGuessed = false;
        }
    }
    document.getElementById("displayWord").textContent = updatedDisplay.trim();

    // Update the score if all letters are guessed
    if (allLettersGuessed) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;

        // Show the complete word
        document.getElementById("displayWord").textContent = selectedWord.split("").join(" ");

        // Check if score is a multiple of 10
        if (score % 10 === 0) {
            alert("Bravo! Keep up the good work!");
        }

        // Trigger confetti effect
        triggerConfetti();

        // Alert the user and start a new game
        setTimeout(() => {
            alert("Congratulations! You guessed the word correctly: " + selectedWord);
            initializeGame(); // Start a new game with a new word
        }, 1000); // Delay for 1 second to show the full word before starting a new game
    }
}

// Function to trigger confetti effect
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}





