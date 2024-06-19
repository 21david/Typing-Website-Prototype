const NUM_WORDS = 1500;
let currentWordSet = easy;
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
        translationLanguage = document.getElementById('translation-language').value; // get current translation language
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

    switch (language) {
        case 'english':
            message = WPM ? 'Great job.' : 'You suck!';
            resultsDiv.innerHTML = `
            <h3>${message} You typed at <strong style="color: green; font-size: 2.1em;"> ${WPM}</strong> WPM!</h3>
            <p><strong>Correct words: </strong> ${correctWords}</p>
            <p><strong>Correct letters: </strong> ${correctLetters}</p>
            <p><strong>Wrong words: </strong> ${wrongWords}</p>
            `;
            if (wrongArr.length) {
                resultsDiv.innerHTML += `
                    <p><strong>Wrong words: </strong> ${wrongArr}</p>
                `;
            }
            break;

        case 'spanish':
            message = WPM ? '¡Buen trabajo!' : 'Lastima.';
            resultsDiv.innerHTML = `
                <h3>${message} Escribiste a <strong style="color: green; font-size: 2.1em;"> ${WPM}</strong> palabras por minuto. </h3>
                <p><strong>Palabras correctas: </strong> ${correctWords}</p>
                <p><strong>Letras correctas: </strong> ${correctLetters}</p>
                <p><strong>Palabras incorrectas: </strong> ${wrongWords}</p>
            `;
            if (wrongArr.length) {
                resultsDiv.innerHTML += `
                    <p><strong>Palabras incorrectas: </strong> ${wrongArr}</p>
                `;
            }
            break;
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

function changeDifficulty(option) {
    switch (option) {
        case 'easy':
            currentWordSet = easy;
            break;

        case 'medium':
            currentWordSet = easy.concat(medium);
            break;

        case 'hard':
            currentWordSet = medium.concat(hard);
            break;

        case 'expert':
            currentWordSet = hard.concat(expert);
            break;
    }

    setUp();
}

function changeDuration(option) {
    LENGTH_SECONDS = Number(option);
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
};

function changeLanguage(option) {
    let newDurationOptions;
    let currentDurationOptions;
    let i;
    let prevLanguageOption, translationLanguageSelectEle;

    switch (option) {
        case 'english':
            language = 'english';
            currentWordSet = easy;
            document.getElementById('restart').innerText = 'Restart';
            document.getElementById('textbox').setAttribute('placeholder', 'Type the words here');
            document.getElementById('difficultyLi').style.display = "";
            document.getElementById('translation-label').innerText = 'Translate?'

            // Set duration dropdown options
            newDurationOptions = ['15 seconds', '30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes'];
            currentDurationOptions = document.getElementById('duration').options;
            i = 0;
            for (let option of currentDurationOptions) {
                option.text = newDurationOptions[i++];
            }

            // Add the previous language to the dropdown
            translationLanguageSelectEle = document.getElementById('translation-language');
            prevLanguageOption = document.createElement('option');
            prevLanguageOption.setAttribute('value', prevLanguage);
            prevLanguageOption.text = prevLanguage[0].toUpperCase() + prevLanguage.substring(1);
            // if (prevLanguage != language)
                prevLanguageOption.text += ` (${languages[prevLanguage].nativeLanguageName})`;
            translationLanguageSelectEle.add(prevLanguageOption, languages[prevLanguage].position - 1);
            prevLanguage = 'english';

            // Remove english from translation dropdown
            var englishOption = translationLanguageSelectEle.querySelector('option[value="english"]');
            if (englishOption) {
                translationLanguageSelectEle.removeChild(englishOption);
            }

            break;

        case 'spanish':
            language = 'spanish';
            currentWordSet = easySpanish;
            document.getElementById('restart').innerText = 'Reiniciar';
            document.getElementById('textbox').setAttribute('placeholder', 'Escribe las palabras aqui');
            document.getElementById('difficultyLi').style.display = "none";
            document.getElementById('translation-label').innerText = '¿Traducir?'

            // Set duration options
            newDurationOptions = ['15 segundos', '30 segundos', '1 minuto', '2 minutos', '5 minutos', '10 minutos'];
            currentDurationOptions = document.getElementById('duration').options;
            i = 0;
            for (let option of currentDurationOptions) {
                option.text = newDurationOptions[i++];
            }

            // Add the previous language to the dropdown
            translationLanguageSelectEle = document.getElementById('translation-language');
            prevLanguageOption = document.createElement('option');
            prevLanguageOption.setAttribute('value', prevLanguage);
            prevLanguageOption.text = prevLanguage[0].toUpperCase() + prevLanguage.substring(1);
            // if (prevLanguage != language)
                prevLanguageOption.text += ` (${languages[prevLanguage].nativeLanguageName})`;
            translationLanguageSelectEle.add(prevLanguageOption, languages[prevLanguage].position - 1);
            prevLanguage = 'spanish';

            // Remove spanish from translation dropdown
            var spanishOption = translationLanguageSelectEle.querySelector('option[value="spanish"]');
            if (spanishOption) {
                translationLanguageSelectEle.removeChild(spanishOption);
            }

            break;
    }
    setUp();
}

function toggleTranslation() {
    translation = !translation;

    if (!translation) {
        document.getElementById('translation-language-li').style.visibility = 'hidden';
    }
    else {
        document.getElementById('translation-language-li').style.visibility = 'visible';
    }

    setUp();
}

function changeTranslationLanguage(language) {
    translationLanguage = language;

    setUp();
}