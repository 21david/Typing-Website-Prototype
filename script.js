const commonWords = [ 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 
'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out', 
'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year', 'your', 
'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 
'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'am', 'are', 'was', 'were', 
'being', 'been', 'have', 'had', 'has', 'do', 'does', 'did', 'done', 'get', 'got', 'getting', 'gets', 'go', 'goes', 'going', 'gone', 'make', 'makes', 'making', 
'made', 'look', 'looks', 'looking', 'looked', 'take', 'takes', 'taking', 'took', 'come', 'comes', 'coming', 'came', 'think', 'thinks', 'thinking', 'thought', 
'want', 'wants', 'wanting', 'wanted', 'use', 'uses', 'using', 'used', 'work', 'works', 'working', 'worked', 'first', 'seconds', 'minute', 'minutes', 'hour', 
'hours', 'day', 'days', 'week', 'weeks', 'month', 'months', 'year', 'years', 'a', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 
'eleven', 'twelve', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion', 'trillion', 
'first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

const NUM_WORDS = 160;
let actualTestWords = [];
let userWordsArr = [];
let currWord = 0;
let correctWords = 0;
let correctLetters = 0;
let wrongWords = 0;
let wrongArr = [];
let testInProgress = false;
let showingResults = false;
let currTestNum = 0;  // added for timer to reset on a new test

let textbox = document.getElementById('textbox');
let resultsDiv = document.getElementById('words');
let timerObj = document.getElementById('timer');

function setUp() {
    actualTestWords = [];
    userWordsArr = [];
    wrongArr = [];
    currWord = correctWords = correctLetters = wrongWords = 0;
    testInProgress = showingResults = false;
    textbox.value = '';
    currTestNum += 1;
    
    // Set up timer
    timerObj.innerHTML = LENGTH_SECONDS;
    
    // Set up random words
    for(let i = 0; i < NUM_WORDS; i++) {
        let randIdx = Math.floor(Math.random() * commonWords.length);
        actualTestWords.push(commonWords[randIdx]);
    }

    // Put it on the HTML
    let words = document.getElementById('words');
    let htmlTestWords = `<span id="0" class="current">${actualTestWords[0]}</span> `;
    for(let i = 1; i < actualTestWords.length; i++) {
        htmlTestWords += `<span id="${i}">${actualTestWords[i]}</span> `;
    }
    words.innerHTML = htmlTestWords;

    textbox.setAttribute('oninput', 'newCharacterInput()');
}

// When the user types in any character into the textbox
function newCharacterInput() {
    // Start the test
    if(!testInProgress && !showingResults) {
        testInProgress = true;
        textbox.setAttribute('placeholder', '');
        startCountdown(currTestNum);
        timer(LENGTH_SECONDS, currTestNum);
    }

    let input = textbox.value;
    
    try {
        if (actualTestWords[currWord].indexOf(input) != 0) {  // User misspelled
            document.getElementById(String(currWord)).setAttribute('class', 'current-wrong');
        }
        else {
            document.getElementById(String(currWord)).setAttribute('class', 'current');
        }
    }
    catch (TypeError) {}

    // EARTHQUAKE EASTER EGG
    if(input == 'EARTHQUAKE') {
        let earthquakeCss = document.createElement('link');
        earthquakeCss.setAttribute('rel', 'stylesheet');
        earthquakeCss.setAttribute('href', 'earthquake.css');
        document.head.appendChild(earthquakeCss);
    }
    
    // Reset textbox when user presses space
    let lastChar = input.charAt(input.length-1);
    if(lastChar == ' ') {
        processWord(input);
        textbox.value = '';
        document.getElementById(String(currWord)).setAttribute('class', 'current');
    }
}

// Start the actual timer for the test
function startCountdown(testNum) {
    setTimeout(() => { doneTyping(testNum) }, 1000 * LENGTH_SECONDS);
}

// When the user finishes a word
function processWord(userWord) {
    userWord = userWord.substring(0, userWord.length-1);
    userWordsArr.push(userWord);
    textbox.value = '';

    // Correct
    if(userWord == actualTestWords[currWord]) {
        document.getElementById(String(currWord)).setAttribute('class', 'done-correct');
        correctWords += 1;
        correctLetters += userWord.length;
    }
    // Wrong
    else {
        document.getElementById(String(currWord)).setAttribute('class', 'done-wrong');
        wrongWords += 1;
        wrongArr.push(' ' + userWord + ' (<strong>' + actualTestWords[currWord] + '</strong>)');
        console.log(userWord);
    }

    currWord += 1;
}

// When the user finishes the test
function doneTyping(testNum) {
    // if the user restarted at some point, cancel this invokation
    if(testNum !== currTestNum)
        return;

    textbox.removeAttribute('oninput');

    testInProgress = false;
    let WPM = Math.round(correctLetters / 5);

    showingResults = true;
    resultsDiv.innerHTML = `
        <h3>Great job. You typed at <strong>${WPM} WPM!</strong></h3>
        <p><strong>Correct words: </strong> ${correctWords}</p>
        <p><strong>Correct letters: </strong> ${correctLetters}</p>
        <p><strong>Wrong words: </strong> ${wrongWords}</p>
    `;
    if(wrongArr.length) {
        resultsDiv.innerHTML += `
        <p><strong>Wrong words: </strong> ${wrongArr}</p>
        `;
    }
}

// This function updated the timer that is displayed
// It may be prone to bugs with reset button, should analyze all edge cases
// including resetting at the last second
function timer(timeLeft, testNum) {
    if(timeLeft === -1 || testNum !== currTestNum)
        return;

    timerObj.innerHTML = timeLeft;
    if(testInProgress)
        setTimeout(() => {
            timer(timeLeft - 1, testNum);
        }, 1000);
}