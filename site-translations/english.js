const translationData = {};
translationData.english = {
    durationOptions: ['15 seconds', '30 seconds', '1 minute', '2 minutes', '5 minutes', '10 minutes'],
    difficultyOptions: ['Easy', 'Medium', 'Hard', 'Expert'],
    languageOptions: ['English', 'Spanish', 'French', 'Portuguese', 'Japanese'],
    restart: 'Restart',
    textboxPlaceholder: 'Type the words here',
    translateToggle: 'Translate?',

    // Results
    part1: (WPM) => WPM? 'Great job.' : 'You suck!',
    part2: (WPM) => `You typed at <strong style="color: green; font-size: 2.1em;"> ${WPM}</strong> WPM!`,
    correctWords: 'Correct words:',
    correctLetters: 'Correct letters:',
    wrongWords: 'Wrong words:',

};