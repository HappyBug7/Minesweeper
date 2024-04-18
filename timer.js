let startTime;
let timerInterval;
let records = [];

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const recordButton = document.getElementById('record');
const timerDisplay = document.getElementById('timer');
const recordsList = document.getElementById('records');

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
recordButton.addEventListener('click', recordTime);

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10); // 更新频率改为10毫秒
}

function stopTimer() {
    clearInterval(timerInterval);
    updateTimer();
}

function updateTimer() {
    const elapsedTime = new Date(Date.now() - startTime);
    const minutes = elapsedTime.getUTCMinutes();
    const seconds = elapsedTime.getUTCSeconds();
    const milliseconds = elapsedTime.getUTCMilliseconds();
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function recordTime() {
    records.push(timerDisplay.textContent);
    const newRecordItem = document.createElement('li');
    newRecordItem.textContent = timerDisplay.textContent;
    recordsList.appendChild(newRecordItem);
}