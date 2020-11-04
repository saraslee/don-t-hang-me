const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const givenWord = document.getElementById("word");
const incorrectLetters = document.getElementById("wrong-letters");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "developer",
  "birthday",
  "gruesome",
  "concentration",
  "clout",
  "halloween",
  "github",
  "dalmation",
  "jacket",
  "yellow",
  "eucalyptus",
  "chrysanthemum",
  "dizzy",
  "chicken",
  "mercury"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Displays the hidden word
function displayWord() {
  givenWord.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  const innerWord = givenWord.innerText.replace(/[ \n]/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "You won.";
    popup.style.display = "flex";

    playable = false;
  }
}

// Update the wrong letters
function updateIncorrectLetters() {
  // Display wrong letters
  incorrectLetters.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You lost";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";

    playable = false;
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown letter press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateIncorrectLetters();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener("click", () => {
  playable = true;

  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateIncorrectLetters();

  popup.style.display = "none";
});

displayWord();
