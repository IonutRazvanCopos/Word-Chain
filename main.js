let userLives = 5;
let aiLives = 5;
let currentWord = "";

const userInput = document.getElementById('input');
const submitButton = document.getElementById('submit');
const gameMessage = document.getElementById('game-message');
const userLivesElement = document.getElementById('userLives');
const aiLivesElement = document.getElementById('aiLives');

const aiWords = ["apple", "banana", "cat", "dog", "elephant", "fish", "goat", "house", "igloo", "jacket"];

function getAiResponse(prefix) {
  const possibleWords = aiWords.filter(word => word.startsWith(prefix.toLowerCase()));
  if (possibleWords.length > 0) {
    return possibleWords[Math.floor(Math.random() * possibleWords.length)];
  } else {
    return null;
  }
}

function validateWord(previousWord, newWord) {
  const prefix = previousWord.slice(-2).toLowerCase();
  return newWord.toLowerCase().startsWith(prefix);
}

submitButton.addEventListener('click', () => {
  const userWord = userInput.value.trim().toLowerCase();

  if (!userWord) {
    gameMessage.textContent = "Please enter a valid word.";
    return;
  }

  if (userLives === 0 || aiLives === 0) {
    gameMessage.textContent = "Game over!";
    return;
  }

  if (currentWord && !validateWord(currentWord, userWord)) {
    --userLives;
    userLivesElement.textContent = userLives;
    gameMessage.textContent = `Invalid word! You have ${userLives} lives remaining.`;
    if (userLives === 0) {
      gameMessage.textContent = "You lost all your lives. Game over!";
      return;
    }
  } else {
    currentWord = userWord;
    const aiPrefix = currentWord.slice(-2);
    const aiWord = getAiResponse(aiPrefix);

    if (aiWord && validateWord(currentWord, aiWord)) {
      gameMessage.textContent = `AI's word: ${aiWord}`;
      currentWord = aiWord;
    } else {
      --aiLives;
      aiLivesElement.textContent = aiLives;
      gameMessage.textContent = `AI couldn't find a valid word. AI has ${aiLives} lives remaining.`;
      if (aiLives === 0) {
        gameMessage.textContent = "AI lost all its lives. You win!";
        return;
      }
    }
  }

  userInput.value = "";
});
