document.addEventListener('DOMContentLoaded', function() {

    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.FormSelect.init(document.querySelectorAll('select'), {});

    setNumber();
});

function setNumber() {
    min = parseInt(document.querySelector("#from-range").value);
    max = parseInt(document.querySelector("#to-range").value);
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('guessedNumber').innerText = number;
    var lang = document.querySelector("#lang-selector").value;
    var writtenNumber1 = writtenNumber(number, {lang: lang});
    document.querySelector('#guessedNumberString').style.display = 'none';
    document.querySelector('#guessedNumberString').innerText = writtenNumber1;
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

function handleChange(text) {
    var gn = document.querySelector('#guessedNumberString').innerText;

    if (text === gn) {
        handleSuccessfullGuess();
    }
}

function handleSuccessfullGuess() {
    setTimeout(function(){
        document.querySelector('#user-input').value='';
        document.querySelector('#guessedNumberString').style.display = 'none';
        setNumber();
    }, 600);
}

function handleIsShowNumChange(el) {
    document.querySelector('#guessedNumber').style.display = el.checked ? 'block' : 'none';
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