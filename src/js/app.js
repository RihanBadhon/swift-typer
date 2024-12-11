`use strict`;


//

// Array of words 

const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
  'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
  'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
  'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
  'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
  'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
  'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
  'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
  'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
  'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
  'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
  'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
  'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
  'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
  'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
  'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
  'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
  'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
  'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
  'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
  'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
  'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
  'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
  'film', 'jupiter'
];

// Connecting HTML elements with JavaScript
const displayWord = document.querySelector('.displayWord');
const count = document.querySelector('.count');
const input = document.querySelector('.input');
const startButton = document.querySelector('.startButton');
const playAgain = document.querySelector('.playAgain');
const score = document.querySelector('.score');
const points = document.querySelector('.hits');
const scoreboard = document.querySelector('.scoreboard');





// Game Background Audio
const bgMusic = new Audio('./src/audio/background-audio.mp3');
bgMusic.type = 'Audio/mp3';
bgMusic.volume = 0.5;
bgMusic.loop = true;


// Correct Word Audio
const winWord = new Audio('./src/audio/new bell ring.mp3');
winWord.type = 'Audio/mp3';
winWord.volume = 0.5;

// Game Over Audio
const gameOver = new Audio('./src/audio/game-over.mp3');
gameOver.type = 'Audio/mp3';
gameOver.volume = 0.5;



let countdown = 20;
let hits = 0;
let copy = [...words];
const scoreArray = [];
let gameInterval;
let countdownInterval;
let percentage = ((hits / 90) * 100).toFixed(2);



// Score Class
class Score {
  constructor(date, hits, percentage) {
    this.date = date;
    this.hits = hits;
    this.percentage = percentage;
  }

  getDate() {
    return this.date;
  }

  getHits() {
    return this.hits;
  }

  getPercentage() {
    return this.percentage;
  }
}

const getDate = () => {
  return new Date().toLocaleDateString('en-ca', {
    month: 'short',
    day: 'numeric',
  });
};


  
// Getting a random word
function randomWord() {
    let word = Math.floor(Math.random() * copy.length);
    displayWord.innerText = copy[word];
    copy.splice(word, 1);
};
  
// Checking if words are equal
function checkWord() {
  if(displayWord.innerText === input.value) {
    hits++;
    points.innerText = `Hits: ${hits}`;
    winWord.play();
    percentage = ((hits / 90) * 100).toFixed(2);
    displayWord.innerText = '';
    input.value = '';
    randomWord();
  }
};


// countdown decrement
function time() {
  countdown--;
  count.innerHTML = countdown;
}



// The Function scoreBoardDiv(toString) below used to display high scores
function scoreBoardDiv(toString) {
  scoreboard.innerHTML = '<h3>High Score</h3>';
  const toObject = JSON.parse(toString);
  toObject.forEach(element => {
    scoreboard.innerHTML +=
    `<div class="score-flex">
      <div>#${toObject.indexOf(element) + 1}</div>
      <div>${element.hits}</div>
      <div>${element.percentage}%</div>
     </div>
    `
  });
}



// start button
startButton.addEventListener('click', function() {
  input.focus();
  count.innerHTML = countdown;
  countTime = setInterval(function() { time(); }, 1000);
  bgMusic.play();
  randomWord();
  wordCheck = setInterval(function() { checkWord(); }, 100);
  startButton.style.display = 'none';
  playAgain.style.display = 'block';



// checking when to stop the game
const stop = setInterval(function() {
    if(countdown === 0) {
      gameOver.play();
      bgMusic.pause();
      clearInterval(stop);
      clearInterval(countTime);
      displayWord.innerHTML = '';
      input.value = '';
      count.innerHTML = '0';
      clearInterval(wordCheck);
      score.style.display = 'block';
      playerScore = new Score(getDate(), hits, percentage);
      score.innerHTML = `Date: ${playerScore.date}<br>Hits: ${playerScore.hits}<br>Percentage: ${playerScore.percentage}%`;

      // new score
      const newScore = {
        hits: playerScore.hits,
        percentage: playerScore.percentage
      }

      // pushing the new score
      scoreArray.push(newScore);
      scoreArray.sort((a, b) => b.hits - a.hits);
      scoreArray.splice(9);
      
      const toString = JSON.stringify(scoreArray);
      localStorage.setItem('scoreboard', toString);

      scoreBoardDiv(toString);
      scoreboard.classList.add('active');
    }  
  }, 1000);

});


// Restart Button


playAgain.addEventListener('click', function() {
  clearInterval(stop);
  clearInterval(countTime);
  displayWord.innerHTML = '';
  input.value = '';
  count.innerHTML = `- -`;
  countdown = 20;
  hits = 0;
  clearInterval(wordCheck);
  bgMusic.currentTime = 0;
  score.style.display = 'none';
  points.innerHTML = `Hits: 0`;
  playAgain.style.display = 'none';
  startButton.style.display = 'inline-block';
  scoreboard.classList.remove('active');
  copy = [...words];
});