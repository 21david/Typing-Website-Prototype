const NUM_WORDS = 1500;
let currentWordSet = words.english.easy;
let currentDifficulty = 'easy';
let translation = true;
let translationLanguage = 'spanish';
let language = 'english'
let actualTestWords = [];
let userWordsArr = [];
let currWordIdx = 0;
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

// Sets up words and displays them
function setUp() {
    actualTestWords = [];
    actualTestWordsTranslated = [];
    userWordsArr = [];
    wrongArr = [];
    currWordIdx = correctWords = correctLetters = wrongWords = 0;
    testInProgress = showingResults = false;
    textbox.value = '';
    currTestNum += 1;

    // Set up timer
    timerObj.innerHTML = LENGTH_SECONDS;

    // Set up random words
    if (translation)
        translationLanguage = document.getElementById('tooltip-language').value; // get current translation language
    for (let i = 0; i < NUM_WORDS; i++) {
        let randIdx = Math.floor(Math.random() * currentWordSet.length);
        actualTestWords.push(currentWordSet[randIdx].word);
        if (translation)
            actualTestWordsTranslated.push(currentWordSet[randIdx].translations[translationLanguage]);
    }

    // Put it on the HTML
    let words = document.getElementById('words');
    let htmlTestWords = `<span id="0" class="current">${actualTestWords[0]}</span> `;
    for (let i = 1; i < actualTestWords.length; i++) {
        htmlTestWords += `<span id="${i}">${actualTestWords[i]}</span> `;
    }
    words.innerHTML = htmlTestWords;

    textbox.setAttribute('oninput', 'newCharacterInput()');

    resultsDiv.setAttribute('style', 'font-size: 2em;');
    wordsDiv.setAttribute('style', 'padding: 0px 35px;');
    wordsDiv.setAttribute('style', 'max-height: 245px;');
    document.getElementById('words-div').scrollTo(0, 0);

    // Add tooltip on top of word (only for the first word)
    if (translation) {
        currWordElement = document.getElementsByClassName('current')[0];
        let tooltip = document.createElement('span');
        tooltip.setAttribute('class', 'tooltip');
        tooltip.setAttribute('id', 'tooltip');
        tooltip.innerHTML = actualTestWordsTranslated[currWordIdx];
        currWordElement.append(tooltip);
    }

    // Make 2 rows of words visible
    wordsP.children[0].setAttribute('style', 'visibility: visible;');
    let i = 0;
    let currSpan = wordsP.children[i];
    let currOffset = currSpan.offsetTop;
    currSpan = wordsP.children[++i];
    while (currSpan.offsetTop === currOffset) {
        currSpan.setAttribute('style', 'visibility: visible;');
        currSpan = wordsP.children[++i];
    }
    currOffset = currSpan.offsetTop;
    while (currSpan.offsetTop === currOffset) {
        currSpan.setAttribute('style', 'visibility: visible;');
        currSpan = wordsP.children[++i];
    }

    textbox.focus();
}

// When the user types in any character into the textbox
function newCharacterInput() {
    let input = textbox.value;

    // EARTHQUAKE EASTER EGG
    if (input == 'EARTHQUAKE') {
        let earthquakeCss = document.getElementById('earthquake') || document.createElement('link');
        earthquakeCss.setAttribute('id', 'earthquake');
        earthquakeCss.setAttribute('rel', 'stylesheet');
        earthquakeCss.setAttribute('href', 'earthquake.css');
        document.head.appendChild(earthquakeCss);
    }
    else if (input == '!EARTHQUAKE') {
        let earthquakeCss = document.getElementById('earthquake');
        if (earthquakeCss) earthquakeCss.parentNode.removeChild(earthquakeCss);
    }

    if (showingResults) return;

    // Start the test if user input the first letter
    if (!testInProgress && !showingResults) {
        testInProgress = true;
        textbox.setAttribute('placeholder', '');
        startCountdown(currTestNum);
        timer(LENGTH_SECONDS, currTestNum);
    }

    try {
        if (actualTestWords[currWordIdx].indexOf(input) != 0) {  // User misspelled
            document.getElementById(String(currWordIdx)).setAttribute('class', 'current-wrong');
        }
        else {
            document.getElementById(String(currWordIdx)).setAttribute('class', 'current');
        }
    }
    catch (TypeError) { }

    // Reset textbox when user presses space
    if (input.endsWith(' ')) {
        processWord(input);
        textbox.value = '';
        document.getElementById(String(currWordIdx)).setAttribute('class', 'current');
    }
}

// Start the actual timer for the test
function startCountdown(testNum) {
    setTimeout(() => { finishedTest(testNum) }, 1000 * LENGTH_SECONDS);
}

// Executes when the user finishes a word
function processWord(userWord) {
    userWord = userWord.substring(0, userWord.length - 1);
    userWordsArr.push(userWord);
    textbox.value = '';

    // Correct
    if (userWord == actualTestWords[currWordIdx]) {
        document.getElementById(String(currWordIdx)).setAttribute('class', 'done-correct');
        correctWords += 1;
        correctLetters += userWord.length + 1;
    }
    // Wrong
    else {
        document.getElementById(String(currWordIdx)).setAttribute('class', 'done-wrong');
        wrongWords += 1;
        wrongArr.push(' ' + userWord + ' (<strong>' + actualTestWords[currWordIdx] + '</strong>)');
    }

    // Move the line when a row is finished
    let currWordElement = document.getElementById(String(currWordIdx));
    let nextWordElement = document.getElementById(String(currWordIdx + 1));
    if (nextWordElement.offsetTop !== currWordElement.offsetTop) {  // new row
        moveLine();
    }

    currWordIdx += 1;

    if (translation) {
        // remove current tooltip
        let prevTooltip = document.getElementById('tooltip');
        currWordElement.removeChild(prevTooltip);

        // Add tooltip on top of word
        currWordElement = nextWordElement;
        let tooltip = document.createElement('span');
        tooltip.setAttribute('class', 'tooltip');
        tooltip.setAttribute('id', 'tooltip');
        tooltip.innerHTML = actualTestWordsTranslated[currWordIdx];
        currWordElement.append(tooltip);
    }
}

let linesMoved = 0;

// Executes when the user finishes a row
// Bug: Resizing the window messes up the rows
function moveLine() {
    // Make current row invisible
    let currWordIdxCopy = currWordIdx;  // get the new word's index
    let currSpan = wordsP.children[currWordIdxCopy];  // get new word's span element
    wordsDiv.scrollTo(0, currSpan.offsetTop);
    currSpan.setAttribute('style', 'visibility: hidden;');
    let currOffset = currSpan.offsetTop;
    while (currWordIdxCopy > 0 && wordsP.children[--currWordIdxCopy].offsetTop === currOffset) {
        wordsP.children[currWordIdxCopy].setAttribute('style', 'visibility: hidden;');
    }

    // Make the row after the next one visible
    // Bug: if it nears the end, it gives 
    //      TypeError: Cannot read properties of undefined (reading 'offsetTop')
    currWordIdxCopy = currWordIdx + 1;
    currOffset = wordsP.children[currWordIdxCopy].offsetTop;
    while (wordsP.children[currWordIdxCopy++].offsetTop === currOffset);
    currWordIdxCopy--;
    currOffset = wordsP.children[currWordIdxCopy].offsetTop;
    while (wordsP.children[currWordIdxCopy].offsetTop === currOffset) {
        wordsP.children[currWordIdxCopy++].setAttribute('style', 'visibility: visible;');
    }

    linesMoved += 1;
}

// When the user finishes the test
function finishedTest(testNum) {
    // if the user restarted at some point, cancel this function call
    if (testNum !== currTestNum)
        return;

    testInProgress = false;
    let WPM = Math.round((correctLetters / 5) / (LENGTH_SECONDS / 60));

    showingResults = true;
    resultsDiv.setAttribute('style', 'font-size: 1em;');
    wordsDiv.setAttribute('style', 'max-height: 500px; padding: 0px 35px 35px 35px;');

    let message;

    let currLanguageData = translationData[language];
    resultsDiv.innerHTML = `
        <h3>${currLanguageData.part1(WPM)} ${currLanguageData.part2(WPM)}</h3>
        <p><strong>${currLanguageData.correctWords} </strong> ${correctWords}</p>
        <p><strong>${currLanguageData.correctLetters} </strong> ${correctLetters}</p>
        <p><strong>${currLanguageData.wrongWords} </strong> ${wrongWords}</p>
    `;

    if (wrongArr.length) {
        resultsDiv.innerHTML += `
            <p><strong>${currLanguageData.wrongWords} </strong> ${wrongArr}</p>
        `;
    }
}

// This function updates the timer that is displayed
// It may be prone to bugs with reset button, should analyze all edge cases
// including resetting at the last second
function timer(timeLeft, testNum) {
    if (timeLeft === -1 || testNum !== currTestNum)
        return;

    timerObj.innerHTML = timeLeft;
    if (testInProgress)
        setTimeout(() => {
            timer(timeLeft - 1, testNum);
        }, 1000);
}

function changeDifficulty(newDifficulty) {
    currentDifficulty = newDifficulty;
    currentWordSet = words[language][newDifficulty];
    setUp();
}

function changeDuration(newDuration) {
    LENGTH_SECONDS = Number(newDuration);
    setUp();
}

let prevLanguage = 'english';

let languages = {
    english: {
        position: 1,
        nativeLanguageName: 'English'
    },
    spanish: {
        position: 2,
        nativeLanguageName: 'Español'
    },
    french: {
        position: 3,
        nativeLanguageName: 'Français'
    },
    portuguese: {
        position: 4,
        nativeLanguageName: 'Português'
    },
    japanese: {
        position: 5,
        nativeLanguageName: '日本語'
    },
};

function changeLanguage(newLanguage) {
    language = newLanguage;
    currentWordSet = words[language][currentDifficulty];
    translatePage(language);
    setUp();
}

function translatePage(newLanguage) {
    let data = translationData[newLanguage];

    document.getElementById('restart').innerText = data.restart;
    document.getElementById('textbox').setAttribute('placeholder', data.textboxPlaceholder);
    document.getElementById('translation-label').innerText = data.translateToggle;

    // Set difficulty dropdown options
    let currentDifficultyOptions = document.getElementById('difficulty').options;
    let i = 0;
    for (let option of currentDifficultyOptions) {
        option.text = data.difficultyOptions[i++];
    }

    // Set duration dropdown options
    currentDurationOptions = document.getElementById('duration').options;
    i = 0;
    for (let option of currentDurationOptions) {
        option.text = data.durationOptions[i++];
    }

    // Set language dropdown options
    let currLanguagePosition = languages[newLanguage].position - 1;
    let languageObjects = Object.values(languages);
    currentLanguageOptions = document.getElementById('language').options;
    i = 0;
    for (let option of currentLanguageOptions) {
        if (i === currLanguagePosition) {
            option.text = `${data.languageOptions[i++]} `;
            continue;
        }
        option.text = `${data.languageOptions[i]} (${languageObjects[i++].nativeLanguageName})`;
    }

    // Add the previous language to the tooltip language dropdown
    translationLanguageSelectEle = document.getElementById('tooltip-language');
    prevLanguageOption = document.createElement('option');
    prevLanguageOption.setAttribute('value', prevLanguage);
    let prevLanguagePosition = languages[prevLanguage].position - 1;
    prevLanguageOption.text = data.languageOptions[prevLanguagePosition];
    translationLanguageSelectEle.add(prevLanguageOption, prevLanguagePosition);

    // Remove the new/current language from translation dropdown
    var currentLanguageOption = translationLanguageSelectEle.querySelector(`option[value="${newLanguage}"]`);
    translationLanguageSelectEle.removeChild(currentLanguageOption);
    prevLanguage = newLanguage;

    // Translate the rest of the dropdown options
    let currentTooltipLanguageOptions = translationLanguageSelectEle.options;
    i = 0;
    for (let option of currentTooltipLanguageOptions) {
        if (i === currLanguagePosition) // skip current language
            i++;
        option.text = `${data.languageOptions[i]} (${languageObjects[i++].nativeLanguageName})`;
    }

}

function toggleTranslation() {
    translation = !translation;

    if (!translation) {
        document.getElementById('tooltip-language-li').style.visibility = 'hidden';
    }
    else {
        document.getElementById('tooltip-language-li').style.visibility = 'visible';
    }

    setUp();
}

function changeTranslationLanguage(newLanguage) {
    translationLanguage = newLanguage;

    setUp();
}