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

// Set up random words
let actualTestWords = [];
const NUM_WORDS = 160;
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

let userWordsArr = [];

let startedTest = false;
function newCharacterInput() {
    // Start the test
    if(!startedTest) {
        startedTest = true;
        let textbox = document.getElementById('textbox');
        textbox.setAttribute('placeholder', '');
        setTimeout(doneTyping, 1000 * LENGTH_SECONDS);
    }

    let input = textbox.value;
    
    if (actualTestWords[currWord].indexOf(input) != 0) {  // User misspelled
        document.getElementById(String(currWord)).setAttribute('class', 'current-wrong');
    }
    else {
        document.getElementById(String(currWord)).setAttribute('class', 'current');
    }

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
        let userWord = input.substring(0, input.length-1);
        userWordsArr.push(userWord);
        textbox.value = '';

        let correctlyTyped = userWord == actualTestWords[currWord];
        nextWord(correctlyTyped);
    }
}

let currWord = 0;
function nextWord(correctlyTyped) {
    document.getElementById(String(currWord)).setAttribute('class', correctlyTyped? 'done-correct' : 'done-wrong');
    currWord += 1;
    document.getElementById(String(currWord)).setAttribute('class', 'current');
}

let doneTyping = function() {
    let resultsDiv = document.getElementById('words-div');

    let correctWords = 0;
    let wrongWords = 0;
    let wrongArr = [];

    let correctLetters = 0;
    // let totalLetters = 0;

    for (let i = 0; i < userWordsArr.length; i++) {
        // For each input word, compare it to the corresponding one
        let curWord = userWordsArr[i];
        let actualWord = actualTestWords[i];

        console.log(curWord, 'vs', actualWord);

        // totalLetters += curWord.length;

        if(curWord == actualWord) {
            correctWords += 1;
            correctLetters += curWord.length;
        }
        else {
            // Exception for the last one, in case user was in the middle of typing
            if (!userWordsArr[i+1])
                break;

            wrongWords += 1;
            wrongArr.push(' ' + curWord + ' (<strong>' + actualWord + '</strong>)');
        }
    }

    let WPM = Math.round(correctLetters / 5);

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