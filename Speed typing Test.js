let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");

let options = {
    method: "GET"
};
let url = "https://apis.ccbp.in/random-quote";

function getQuote() {
    spinnerEl.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            spinnerEl.classList.add("d-none");
            quoteDisplayEl.textContent = jsonData.content;
        });
}

let timerId = null;

function startTimer() {
    let count = 0;
    timerId = setInterval(function() {
        timerEl.textContent = count;
        count = count + 1;
    }, 1000);
}
ClearTimer = function() {
    clearInterval(timerId);
};
submitBtnEl.onclick = function() {
    let userValue = quoteInputEl.value;
    let givenQuote = quoteDisplayEl.textContent;
    resultEl.classList.remove("d-none");
    if (userValue !== givenQuote) {
        resultEl.textContent = "You typied incorrect sentence";
    } else if (userValue === givenQuote) {
        resultEl.textContent = "You typied in " + timerEl.textContent + " seconds";
        ClearTimer();
    }
};
resetBtnEl.addEventListener("click", function(event) {
    getQuote();
    ClearTimer();
    startTimer();
    resultEl.classList.add("d-none");
    quoteInputEl.value = "";
});
startTimer();
getQuote();