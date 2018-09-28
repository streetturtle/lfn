document.addEventListener('DOMContentLoaded', function() {

    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.FormSelect.init(document.querySelectorAll('select'), {});
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {});

    setNumber();
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/lfn/assets/js/sw.js');
}

function setNumber() {
    let min = parseInt(document.querySelector("#from-range").value);
    let max = parseInt(document.querySelector("#to-range").value);
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    let lang = document.querySelector("#lang-selector").value;
    let writtenNumber1 = writtenNumber(number, {lang: lang});

    document.querySelector('#guessedNumberString').style.display = 'none';
    document.querySelector('#guessedNumberString').innerText = writtenNumber1;

    let vi = document.querySelector('.number-wrapper > .current-number');
    let hi = document.querySelector('.number-wrapper > .prev-number');

    vi.classList.remove('current-number');
    vi.classList.add('prev-number');
    vi.classList.add('prev-number');

    hi.classList.remove('prev-number');
    hi.textContent = number;
    hi.classList.add('current-number');

    speak(writtenNumber1);
}

function speak(whatToSay) {
    if (document.querySelector("#is-say-numbers").checked) {
        var utterance = new SpeechSynthesisUtterance(whatToSay);
        utterance.lang = document.querySelector("#lang-selector").selectedOptions[0].attributes['voice'].value;
        window.speechSynthesis.speak(utterance);
    }
}

function speakk() {
    var utterance = new SpeechSynthesisUtterance(document.querySelector('#guessedNumberString').innerText);
    utterance.lang = document.querySelector("#lang-selector").selectedOptions[0].attributes['voice'].value;
    window.speechSynthesis.speak(utterance);
}

function handleUserInput(text) {
    var gn = document.querySelector('#guessedNumberString').innerText;

    if (text.toUpperCase() === gn.toUpperCase()) {
        handleSuccessfulGuess();
    }
}

function handleSuccessfulGuess() {
    document.querySelector('svg.checkmark').style.opacity = 1;
    document.querySelector('svg.checkmark').style.display = 'block';
    setTimeout(function(){
        document.querySelector('#user-input').value='';
        document.querySelector('#guessedNumberString').style.display = 'none';

        var s = document.querySelector('svg.checkmark').style;
        s.opacity = 1;
        (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,40)})();

        setNumber();
    }, 600);
}

function handleIsShowNumChange(el) {
    document.querySelector('.current-number').style.display = el.checked ? 'block' : 'none';
}

function handleIsSpeakNumChange(el) {
    if (el.checked)
        speak(document.querySelector('#guessedNumberString').innerText);
}

function showHelp() {
    document.querySelector('#guessedNumberString').style.display = 'block';
}

function handleLanguageSelect() {
    setNumber();
}

function handleAnimationSelect() {

}
