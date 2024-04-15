var mines = [];
for (var i = 0; i < 10; i++) {
  mines[i] = [];
  for (var j = 0; j < 10; j++) {
    mines[i][j] = 0;
  }
}
num = 0
for (;num < 10;) {
  var x = Math.floor(Math.random() * 10);
  var y = Math.floor(Math.random() * 10);
  if (mines[x][y] == 1) {
    continue;
  }
  mines[x][y] = 1;
  num++;
}

var matrix = [];
for (var i = 0; i < 10; i++) {
  matrix[i] = [];
  for (var j = 0; j < 10; j++) {
    matrix[i][j] = 0;
  }
}
var count = 0;
for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    if(mines[i][j] == 1){
      matrix[i][j] = -1;
      continue;
    }
    count = 0;
    for (var x = i - 1; x <= i + 1; x++) {
      for (var y = j - 1; y <= j + 1; y++) {
        if (x >= 0 && x < 10 && y >= 0 && y < 10) {
          count += mines[x][y];
        }
      }
    }
    matrix[i][j] = count;
  }
}

var clicked = [];
for (var i = 0; i < 10; i++) {
  clicked[i] = [];
  for (var j = 0; j < 10; j++) {
    clicked[i][j] = 0;
  }
}

fcnt = 0;

function __init__(){
  dom = document.getElementById("maindiv");
  for (var i = 0; i < 10; i++) {
    var row = document.createElement("div");
    row.className = "row";
    for (var j = 0; j < 10; j++) {
      var cell = document.createElement("div");
      cell.className = "cell";
      cell.id = i + "-" + j;
      cell.onclick = function() { click(this); };
      cell.addEventListener('contextmenu', function(event) {
        flage(this);
        event.preventDefault(); 
        });
      row.appendChild(cell);
    }
    dom.appendChild(row);
  }
}

function flage(cell){
  var id = cell.id.split("-");
  var i = parseInt(id[0]);
  var j = parseInt(id[1]);
  if (cell.className == "cellflaged") {
    cell.className = "cell";
    cell.innerHTML = "";
    if(mines[i][j] == 1){
      fcnt--;
    }
  } else {
    cell.className = "cellflaged";
    cell.innerHTML = "F";
    if(mines[i][j] == 1){
      fcnt++;
    }
    if (fcnt == 10) {
      alert("You Win!");
    }
  }
}

function click(cell){
  var id = cell.id.split("-");
  var i = parseInt(id[0]);
  var j = parseInt(id[1]);
  cell.className = "cellclicked";
  clicked[i][j] = 1;
  if (mines[i][j] == 1) {
    cell.className = "cellbomb";
    alert("Game Over!");
  } else {
    count = matrix[i][j];
    if(count == 0){
      dfs(i, j);
      cell.innerHTML = " ";
      return
    }
    cell.innerHTML = count;
  }
}

function dfs(x,y){
  for (var i = x-1; i <= x+1; i++) {
    if(i<0 || i>=10){
      continue;
    }
    if (clicked[i][y] != 1){
      if(matrix[i][y] != -1){
        document.getElementById(i + "-" + y).click();
      }
    }
  }
  for (var i = y-1; i <= y+1; i++){
    if(i<0 || i>=10){
      continue;
    }
    if (clicked[x][i] != 1){
      if(matrix[x][i] != -1){
        document.getElementById(x + "-" + i).click();
      }
    }
  }
}

function reset(){
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      clicked[i][j] = 0;
      document.getElementById(i + "-" + j).className = "cell";
      document.getElementById(i + "-" + j).innerHTML = "";
    }
  }
  fcnt = 0;
  for (var i = 0; i < 10; i++) {
    mines[i] = [];
    for (var j = 0; j < 10; j++) {
      mines[i][j] = 0;
    }
  }
  num = 0
  for (;num < 10;) {
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    if (mines[x][y] == 1) {
      continue;
    }
    mines[x][y] = 1;
    num++;
  }
  for (var i = 0; i < 10; i++) {
    matrix[i] = [];
    for (var j = 0; j < 10; j++) {
      matrix[i][j] = 0;
    }
  }
  var count = 0;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      if(mines[i][j] == 1){
        matrix[i][j] = -1;
        continue;
      }
      count = 0;
      for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
          if (x >= 0 && x < 10 && y >= 0 && y < 10) {
            count += mines[x][y];
          }
        }
      }
      matrix[i][j] = count;
    }
  }
  console.log(mines);
  console.log(matrix);
}



__init__();
console.log(mines);
console.log(matrix);

