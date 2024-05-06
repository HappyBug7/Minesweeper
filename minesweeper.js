let startTime;
let timerInterval;
let records = [];
const timerDisplay = document.getElementById('timer');
const recordsList = document.getElementById('records');
mineNum = 10;

let mines = [];
let matrix = [];
let clicked = [];
let fcnt = 0;
let err = 0;
let isStart = false;

function initialize() {
  const dom = document.getElementById("maindiv");
  difficulty = document.getElementById("difficulty-choose").value;
  if (difficulty == "easy") {
    mineNum = 10;
  }
  if (difficulty == "medium") {
    mineNum = 15;
  }
  if (difficulty == "hard") {
    mineNum = 20;
  }
  for (let i = 0; i < mineNum; i++) {
    const row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < mineNum; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = i + "-" + j;
      cell.addEventListener('click', function() {
        click(this);
      });
      cell.addEventListener('contextmenu', function(event) {
        flag(this);
        event.preventDefault(); 
      });
      row.appendChild(cell);
    }
    dom.appendChild(row);
  }
  setMines();
}

function flag(cell) {
  const id = cell.id.split("-");
  const i = parseInt(id[0]);
  const j = parseInt(id[1]);
  if (cell.className == "cellflaged") {
    cell.className = "cell";
    cell.innerHTML = "";
    if (mines[i][j] == 1) {
      fcnt--;
    } else {
      err--;
    }
  } else {
    cell.className = "cellflaged";
    cell.innerHTML = "F";
    if (mines[i][j] == 1) {
      fcnt++;
    } else {
      err++;
    }
    if (fcnt == mineNum && err == 0) {
      alert("You Win!");
      stopTimer();
      recordTime();
    }
  }
}

function click(cell) {
  const id = cell.id.split("-");
  const i = parseInt(id[0]);
  const j = parseInt(id[1]);
  cell.className = "cellclicked";
  clicked[i][j] = 1;
  if (!isStart) {
    isStart = true;
    startTimer();
  }
  if (mines[i][j] == 1) {
    cell.className = "cellbomb";
    alert("Game Over!");
    reset();
  } else {
    let count = matrix[i][j];
    if (count == 0) {
      dfs(i, j);
      cell.innerHTML = " ";
      return;
    }
    cell.innerHTML = count;
  }
}

function dfs(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i >= mineNum) {
      continue;
    }
    if (clicked[i][y] != 1) {
      if (matrix[i][y] != -1) {
        document.getElementById(i + "-" + y).click();
      }
    }
  }
  for (let i = y - 1; i <= y + 1; i++) {
    if (i < 0 || i >= mineNum) {
      continue;
    }
    if (clicked[x][i] != 1) {
      if (matrix[x][i] != -1) {
        document.getElementById(x + "-" + i).click();
      }
    }
  }
}

function setMines() {
  for (let i = 0; i < mineNum; i++) {
    mines[i] = Array(mineNum).fill(0);
    matrix[i] = Array(mineNum).fill(0);
    clicked[i] = Array(mineNum).fill(0);
  }
  let num = 0;
  for (; num < mineNum;) {
    const x = Math.floor(Math.random() * mineNum);
    const y = Math.floor(Math.random() * mineNum);
    if (mines[x][y] == 1) {
      continue;
    }
    mines[x][y] = 1;
    num++;
  }
  for (let i = 0; i < mineNum; i++) {
    for (let j = 0; j < mineNum; j++) {
      if (mines[i][j] == 1) {
        matrix[i][j] = -1;
        continue;
      }
      let count = 0;
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          if (x >= 0 && x < mineNum && y >= 0 && y < mineNum) {
            count += mines[x][y];
          }
        }
      }
      matrix[i][j] = count;
    }
  }
}

function reset() {
  for (let i = 0; i < mineNum; i++) {
    for (let j = 0; j < mineNum; j++) {
      const cell = document.getElementById(i + "-" + j);
      cell.className = "cell";
      cell.innerHTML = "";
      clicked[i][j] = 0;
    }
  }
  isStart = false;
  stopTimer();
  timerDisplay.textContent = '00:00.000';
  fcnt = 0;
  err = 0;
  setMines();
}

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
    updateRecords(records);
}

function sort(){
  let record = [];
  copy(record, records);
  choose = document.getElementById("sort").value;
  if(choose == "time"){
    record.sort();
  }
  updateRecords(record);
}

function updateRecords(list){
  while (recordsList.firstChild) {
    recordsList.removeChild(recordsList.firstChild);
  }
  for (var i = 0; i < list.length; i++) {
    const newRecordItem = document.createElement('li');
    newRecordItem.textContent = list[i];
    recordsList.appendChild(newRecordItem);
  }
}

function copy(copylist, orilist){
  for(var i = 0; i < orilist.length; i++){
    copylist.push(orilist[i]);
  }
}

function test(){
  for(i = 0; i < mineNum; i++){
    for(j = 0; j < mineNum; j++){
      if(mines[i][j] == 1){
        flag(document.getElementById(i + "-" + j));
      }else{
        click(document.getElementById(i + "-" + j));
      }
    }
  }
}

function difficultyUpdate() {
  for (let i = 0; i < mineNum; i++) {
    for (let j = 0; j < mineNum; j++) {
      const cell = document.getElementById(i + "-" + j);
      cell.parentNode.removeChild(cell);
    }
  }
  initialize();
}
initialize();
console.log(mines);
console.log(matrix);

