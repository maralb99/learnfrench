const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    scoreText = document.querySelector(".score b");

let correctWord, timer, score = 0, usedWords = [];

const initTimer = (maxTime) => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj;
    do {
        randomObj = words[Math.floor(Math.random() * words.length)];
    } while (usedWords.includes(randomObj.word));

    usedWords.push(randomObj.word);
    if (usedWords.length === words.length) {
        usedWords = [];
    }

    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return alert("Please enter the word to check!");
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not the correct word`);

    score++;
    scoreText.innerText = score;

    if (score % 5 === 0) {
        alert("Bravo! Keep up the good work!");
    }

    // Trigger confetti effect
    triggerConfetti();

    // Delay the alert to allow confetti to show
    setTimeout(() => {
        alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
        initGame();
    }, 1000); // Delay for 1 second
}

// Function to trigger confetti effect
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Event listener for Enter key to check the word
inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        checkWord(); // Call checkWord function
    }
});

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);




