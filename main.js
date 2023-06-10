const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition',
    'champion',
    'ghost',
    'fierce'
];

window.addEventListener('load',init);

//levels
const levels = {
    easy : 5,
    medium : 3,
    hard : 1
};

const seconds = document.querySelector('#seconds');
let currentLevel = 5;

const select = document.querySelector('select');
select.addEventListener('change',(e)=>{
    let v1 = e.target.value;
    currentLevel = levels[v1];
    seconds.innerHTML = currentLevel;
});

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const highScore = document.querySelector('#high-score');

//iniialize game
function init() {
    // Load word from array
    showWord(words);
    //Start Matching 
    wordInput.addEventListener('input',startMatch);
    //CountDown
    setInterval(countDown,1000);
    //Check Status
    setInterval(checkStatus,50);
}

let maxi = 0;

//Start Match
function startMatch() {
    if(matchWords()){
        isPlaying = true;
        time = currentLevel+1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }
    else{
        scoreDisplay.innerHTML = score;
    }
}
//Match Words
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!'
        return true;
    }
    else{
        message.innerHTML = '';
        return false;
    }
}

//Pick & show word
function showWord(words) {
    const index = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[index];
}
//CountDown timer
function countDown() {
    if(time > 0){
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}
//Check Status
function checkStatus() {
    if(!isPlaying && time === 0){
        message.innerHTML = 'Game Over!';
        if(score > maxi){
            maxi = score;
            addToLocalStorage(maxi);
        }
        score = -1;
    } 
    highScore.innerHTML = getLocalStorage();
}
function addToLocalStorage(){
    localStorage.setItem('item',JSON.stringify(maxi));
}
function getLocalStorage(){
    if(JSON.parse(localStorage.getItem('item'))){
        return JSON.parse(localStorage.getItem('item'));
    }
    else{
        return 0;
    }
}