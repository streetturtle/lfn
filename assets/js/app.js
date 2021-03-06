document.addEventListener('DOMContentLoaded', function() {

    M.Sidenav.init(document.querySelectorAll('.sidenav'), {});
    M.FormSelect.init(document.querySelectorAll('select'), {});
    M.Collapsible.init(document.querySelectorAll('.collapsible'), {});
    M.Tooltip.init(document.querySelectorAll('.tooltipped'), {});

    document.addEventListener('keyup', handleShortcut, false);

    if (typeof(Storage) !== "undefined") {
        // Store
        let theme = localStorage.getItem("theme");
        if(theme === undefined)
        {
            theme = 'light';
            localStorage.setItem("theme", theme);
        }
        if (theme === 'dark') {
            document.querySelector('#dark-theme').setAttribute('checked', 'true');
            handleThemeChange(document.querySelector('#dark-theme'));
        }
    } else {
        M.toast({html: "Sorry, your browser does not support Web Storage..."})
    }


    setNumber();
});


function setNumber() {
    let min = parseInt(document.querySelector("#from-range").value);
    let max = parseInt(document.querySelector("#to-range").value);
    let number = Math.floor(Math.random() * (max - min + 1)) + min;
    let lang = document.querySelector("#lang-selector").value;
    let writtenNumber1 = writtenNumber(number, {lang: lang});

    // document.querySelector('.current-number').style.display = document.querySelector('is-show-numbers').checked ? 'block' : 'none';
    document.querySelector('#guessedNumberString').style.visibility = 'hidden';
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
    var utterance = new SpeechSynthesisUtterance(document.querySelector('#guessedNumberString').textContent);
    utterance.lang = document.querySelector("#lang-selector").selectedOptions[0].attributes['voice'].value;
    window.speechSynthesis.speak(utterance);
}

function handleUserInput(text) {
    var gn = document.querySelector('#guessedNumberString').textContent;

    if (document.querySelector('#is-ignore-hyphens').checked)
        gn = gn.replace(/-/g,' ');

    if (text.toUpperCase() === gn.toUpperCase()) {
        handleSuccessfulGuess();
    }
}

function handleSuccessfulGuess() {
    document.querySelector('svg.checkmark').style.opacity = 1;
    document.querySelector('svg.checkmark').style.display = 'block';
    setTimeout(function(){
        document.querySelector('#user-input').value='';
        document.querySelector('#guessedNumberString').style.visibility = 'hidden';

        var s = document.querySelector('svg.checkmark').style;
        s.opacity = 1;
        (function fade(){(s.opacity-=.1)<0?s.display="none":setTimeout(fade,40)})();

        setNumber();
    }, 600);
}

function handleIsShowNumChange(el) {
    document.querySelector('.guessed-number').style.display = el.checked ? 'block' : 'none';
}

function handleIsSpeakNumChange(el) {
    if (el.checked)
        speak(document.querySelector('#guessedNumberString').textContent);
}

function showHelp() {
    let currentValue = document.querySelector('#guessedNumberString').style.visibility;
    document.querySelector('#guessedNumberString').style.visibility = currentValue === 'visible' ? 'hidden' : 'visible';
}

function handleLanguageSelect() {
    setNumber();
}

function handleAnimationSelect(animationClassName) {
    document.querySelector('.guessed-number').classList.remove('push', 'slide', 'zoom');
    document.querySelector('.guessed-number').classList.add(animationClassName);
}

function handleIsAccentFoldingChange() {

}

function handleThemeChange(el) {
    if (el.checked) {
        document.querySelector('body').classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.querySelector('body').classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}

function handleShortcut(event) {
    event.preventDefault();
    if (event.altKey && event.keyCode === 72)
        showHelp();
    if (event.altKey && event.keyCode === 74)
        speakk();
    // console.log(event.keyCode);
}
