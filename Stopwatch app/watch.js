let timer;
let milliseconds = 0;

var timeDisplay = document.getElementById('time-display');
var startBtn = document.getElementById('start-btn');
var stopBtn = document.getElementById('stop-btn');
var resetBtn = document.getElementById('reset-btn');
var stopTimesDiv = document.getElementById('stopTimes');

let stopTimes = []; 

function formatTime(milliseconds) {
    var hrs = Math.floor(milliseconds / 3600000);
    var mins = Math.floor((milliseconds % 3600000) / 60000);
    var secs = Math.floor((milliseconds % 60000) / 1000);
    var ms = Math.floor((milliseconds % 1000) / 10);
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        milliseconds += 10; 
        timeDisplay.textContent = formatTime(milliseconds);
    }, 10);
}

function stopTimer() {
    if (!timer) return;

    clearInterval(timer);
    timer = null;


    var elapsedTime = formatTime(milliseconds);
    stopTimes.push(elapsedTime);
    updateStopTimesList();
}

function resetTimer() {
    stopTimer();
    milliseconds = 0;
    stopTimes = []; 
    timeDisplay.textContent = "00:00:00:00";
    stopTimesDiv.innerHTML = ""; 
}

function updateStopTimesList() {
    stopTimesDiv.innerHTML = ""; 
    stopTimes.forEach((time, index) => {
        var timeElement = document.createElement("div");
        timeElement.textContent = `Stop ${index + 1}: ${time}`;
        stopTimesDiv.appendChild(timeElement);
    });
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
