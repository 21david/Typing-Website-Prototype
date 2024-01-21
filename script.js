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
let wordsDiv = document.getElementById('words-div');
let wordsP = document.getElementById('words');
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

    resultsDiv.setAttribute('style', 'font-size: 2em;');
    wordsDiv.setAttribute('style', 'padding: 0px 35px;');
    wordsDiv.setAttribute('style', 'max-height: 245px;');
    document.getElementById('words-div').scrollTo(0, 0);

    // Make 2 rows of words visible
    wordsP.children[0].setAttribute('style', 'visibility: visible;');
    let i = 0;
    let currSpan = wordsP.children[i];
    let currOffset = currSpan.offsetTop;
    currSpan = wordsP.children[++i];
    while(currSpan.offsetTop === currOffset) {
        currSpan.setAttribute('style', 'visibility: visible;');
        currSpan = wordsP.children[++i];
    }
    currOffset = currSpan.offsetTop;
    while(currSpan.offsetTop === currOffset) {
        currSpan.setAttribute('style', 'visibility: visible;');
        currSpan = wordsP.children[++i];
    }
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

        // to do, add !EARTHQUAKE to undo it?
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
    
    // Move the line when a row is finished
    let currWordElement = document.getElementById(String(currWord));
    console.log(currWordElement.offsetTop);
    let nextWordElement = document.getElementById(String(currWord+1));
    if (nextWordElement.offsetTop !== currWordElement.offsetTop) {  // new row
        moveLine();
    // wordsDiv.scrollTo(0, currWordElement.offsetTop);

    } 

    currWord += 1;
}

// Executed when the user finishes a row
// Bug: Resizing the window messes up the rows
function moveLine() {
    // Make current row invisible
    let currWordCopy = currWord;
    
    let currSpan = wordsP.children[currWordCopy];
    // console.log(currSpan);
    wordsDiv.scrollTo(0, currSpan.offsetTop);
    currSpan.setAttribute('style', 'visibility: hidden;');
    let currOffset = currSpan.offsetTop;
    // console.log(currOffset);
    // console.log(wordsP.children);
    // console.log(currWordCopy);

    while(currWordCopy > 0 && wordsP.children[--currWordCopy].offsetTop === currOffset) {
        // console.log(wordsP.children[currWordCopy]);
        wordsP.children[currWordCopy].setAttribute('style', 'visibility: hidden;');
    }

    // Make the row after the next one visible
    currWordCopy = currWord+1;
    currOffset = wordsP.children[currWordCopy].offsetTop;
    while(wordsP.children[currWordCopy++].offsetTop === currOffset);
    currWordCopy--;

    currOffset = wordsP.children[currWordCopy].offsetTop;
    while(wordsP.children[currWordCopy].offsetTop === currOffset) {
        // console.log(wordsP.children[currWordCopy]);
        wordsP.children[currWordCopy++].setAttribute('style', 'visibility: visible;');
    }

}

// When the user finishes the test
function doneTyping(testNum) {
    // if the user restarted at some point, cancel this function call
    if(testNum !== currTestNum)
        return;

    textbox.removeAttribute('oninput');

    testInProgress = false;
    let WPM = Math.round(correctLetters / 5);

    showingResults = true;
    resultsDiv.setAttribute('style', 'font-size: 1em;');
    console.log('should add padding');
    wordsDiv.setAttribute('style', 'max-height: 500px; padding: 0px 35px 35px 35px;');

    let message = WPM? 'Great job.' : 'You suck!';
    resultsDiv.innerHTML = `
        <h3>${message} You typed at <strong style="color: green; font-size: 2.1em;"> ${WPM}</strong> WPM!</h3>
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