let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById('lap');
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer;
let previousLapTime;
let isRunning = false;
let lapCount=1;

startStopBtn.addEventListener('click', function () {
  if (isRunning) {
    stopTimer();
    isRunning = false;
    startStopBtn.textContent = 'Start';
  } else {
    startTimer();
    isRunning = true;
    startStopBtn.textContent = 'Stop';
  }
});

resetBtn.addEventListener('click', function () {
  stopTimer();
  resetTimer();
});

lapBtn.addEventListener('click', function () {
  if (isRunning) {
    let lapTime = formatTime(hour, minute, second, count);
    let lapItem = document.createElement('li');
    
    document.getElementById('lapList').appendChild(lapItem);
    if (previousLapTime) {
      let lapDiff = calculateTimeDifference(previousLapTime, lapTime);
      let lapDiffItem = document.createElement('li');
      lapDiffItem.textContent = "Lap" + lapCount++ +"-" + lapDiff;
      lapItem.appendChild(lapDiffItem);
    }
    previousLapTime = lapTime;
  }
});

function startTimer() {
  timer = setInterval(function () {
    count++;
    if (count === 100) {
      second++;
      count = 0;
    }
    if (second === 60) {
      minute++;
      second = 0;
    }
    if (minute === 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    updateTimerDisplay();
 }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  hour = 0;
  minute = 0;
  second = 0;
  count = 0;
  previousLapTime = undefined;
  updateTimerDisplay();
  clearLapList();
}

function updateTimerDisplay() {
  document.getElementById('hr').textContent = padZero(hour);
  document.getElementById('min').textContent = padZero(minute);
  document.getElementById('sec').textContent = padZero(second);
  document.getElementById('count').textContent = padZero(count);
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function clearLapList() {
  let lapList = document.getElementById('lapList');
  while (lapList.firstChild) {
    lapList.removeChild(lapList.firstChild);
  }
}

function formatTime(hour, minute, second, count) {
  let hrString = padZero(hour);
  let minString = padZero(minute);
  let secString = padZero(second);
  let countString = padZero(count);
  return `${hrString}:${minString}:${secString}:${countString}`;
}

function calculateTimeDifference(startTime, endTime) {
  let startParts = startTime.split(':');
  let endParts = endTime.split(':');
  let startMillis = parseInt(startParts[0]) * 3600000 + parseInt(startParts[1]) * 60000 + parseInt(startParts[2]) * 1000 + parseInt(startParts[3]);
  let endMillis = parseInt(endParts[0]) * 3600000 + parseInt(endParts[1]) * 60000 + parseInt(endParts[2]) * 1000 + parseInt(endParts[3]);
  let diffMillis = endMillis - startMillis;

  let diffHour = Math.floor(diffMillis / 3600000);
  let diffMin = Math.floor((diffMillis % 3600000) / 60000);
  let diffSec = Math.floor((diffMillis % 60000) / 1000);
  let diffCount = Math.floor(diffMillis % 1000 / 10);

  let diffString = padZero(diffHour) + ':' + padZero(diffMin) + ':' + padZero(diffSec) + ':' + padZero(diffCount);
  return diffString;
}