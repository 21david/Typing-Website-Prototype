// ----- FOURTH TEST -----

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
let words4 = document.getElementById('words4');
let htmlTestWords = `<span id="0" class="current">${actualTestWords[0]}</span> `;
for(let i = 1; i < actualTestWords.length; i++) {
    htmlTestWords += `<span id="${i}">${actualTestWords[i]}</span> `;
}
words4.innerHTML = htmlTestWords;

let userWordsArr = [];

// Reset textbox when user presses space
function newCharacterInput() {
    let input = textbox4.value;
    
    if (actualTestWords[currWord].indexOf(input) < 0) {  // User mispelled
        document.getElementById(String(currWord)).setAttribute('class', 'wrong');
    }
    else {
        document.getElementById(String(currWord)).setAttribute('class', 'current');
    }
    
    let lastChar = input.charAt(input.length-1);
    if(lastChar == ' ') {
        userWordsArr.push(input.substring(0, input.length-1));
        textbox4.value = '';
        nextWord();
    }
}

let currWord = 0;
function nextWord() {
    document.getElementById(String(currWord)).removeAttribute('class');
    currWord += 1;
    document.getElementById(String(currWord)).setAttribute('class', 'current');
}

let doneTyping2 = function() {
    let resultsDiv = document.getElementById('results4');

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
        <p>Great job. You typed at ${WPM} WPM!<p>
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

let textbox4 = document.getElementById('textbox4');
textbox4.onclick = function() {
    textbox4.setAttribute('placeholder', '');
    setTimeout(doneTyping2, 1000 * LENGTH_SECONDS);
}

