let canvX = 400;
let canvY = 400;

let cellMidX = canvX / 6;
let cellMidY = canvY / 6;

let rows = 3;
let cols = 3;

class myCircle {
  constructor() {
    this.x = cellMidX;
    this.y = cellMidY;
    this.circRadius = canvX / 5;
    this.circHeight = canvY / 5;
    this.addX = 0;
    this.addY = 0;
  }

  moveTO(posROW, posCOL) {
    if (posROW > -1 && posCOL > -1 && posROW < 3 && posCOL < 3) {
      this.addX = posCOL * (canvX / 3);
      this.addY = posROW * (canvY / 3);
      //ADD THIS TO X AND Y HERE TO SAVE COMPUTING EVERYTIME IN SHOW()
      this.x = cellMidX + this.addX;
      this.y = cellMidY + this.addY;
    } else {
      print("ROW/COL must be between 0-2 inorder to move Circle!");
    }
  }

  show() {
    noFill();
    strokeWeight(10);
    stroke(0, 204, 136);
    ellipse(this.x, this.y, this.circRadius, this.circHeight);
  }
}

class myCross {
  constructor() {
    this.lineLeftX = cellMidX - canvX * 0.1;
    this.lineRightX = cellMidX + canvX * 0.1;
    this.lineUpY = cellMidY - canvY * 0.1;
    this.lineDownY = cellMidY + canvY * 0.1;
    this.addX = 0;
    this.addY = 0;
  }

  moveTO(posROW, posCOL) {
    if (posROW > -1 && posCOL > -1 && posROW < 3 && posCOL < 3) {
      this.addX = posCOL * (canvX / 3);
      this.addY = posROW * (canvY / 3);

      //ADD THIS TO X AND Y HERE TO SAVE COMPUTING EVERYTIME IN SHOW()
      this.lineLeftX = cellMidX - canvX * 0.1 + this.addX;
      this.lineRightX = cellMidX + canvX * 0.1 + this.addX;
      this.lineUpY = cellMidY - canvY * 0.1 + this.addY;
      this.lineDownY = cellMidY + canvY * 0.1 + this.addY;
    } else {
      print("ROW/COL must be between 0-2 inorder to move CROSS!");
    }
  }

  show() {
    noFill();
    strokeWeight(10);
    stroke(153, 153, 255);

    line(this.lineLeftX, this.lineUpY, this.lineRightX, this.lineDownY);

    line(this.lineLeftX, this.lineDownY, this.lineRightX, this.lineUpY);
  }
}

class ticTacGame {
  constructor() {
    this.ticTacArray = this.make2Darray();
    this.gameCircles = new myCircle();
    this.gameCrosses = new myCross();
    this.player = "X";
    this.winner = "N";
    this.counter = 0;
  }

  checkForWin() {
    //Very inefficient way probabbly
    for (let row = 0; row < rows; row++) {
      if (
        this.ticTacArray[row][0] == this.ticTacArray[row][1] &&
        this.ticTacArray[row][1] == this.ticTacArray[row][2] &&
        this.ticTacArray[row][0] != " "
      ) {
        this.winner = this.ticTacArray[row][row];
        strokeWeight(12);
        stroke(204, 102, 0, 150);
        line(
          cellMidX * 0.2,
          cellMidY + cellMidY * row * 2,
          cellMidX * 5.8,
          cellMidY + cellMidY * row * 2
        );
        //this.resetGame();
      } else if (
        this.ticTacArray[0][row] == this.ticTacArray[1][row] &&
        this.ticTacArray[1][row] == this.ticTacArray[2][row] &&
        this.ticTacArray[0][row] != " "
      ) {
        this.winner = this.ticTacArray[row][row];
        strokeWeight(12);
        stroke(204, 102, 0, 150);
        line(
          cellMidX + cellMidX * row * 2,
          cellMidY * 0.2,
          cellMidX + cellMidX * row * 2,
          cellMidY * 5.8
        );
        //this.resetGame();
      }
    }
    if (this.ticTacArray[1][1] != " ") {
      if (
        this.ticTacArray[0][0] == this.ticTacArray[1][1] &&
        this.ticTacArray[1][1] == this.ticTacArray[2][2]
      ) {
        this.winner = this.ticTacArray[1][1];
        strokeWeight(12);
        stroke(204, 102, 0, 150);
        line(cellMidX * 0.2, cellMidY * 0.2, cellMidX * 5.8, cellMidY * 5.8);
        //this.resetGame();
      } else if (
        this.ticTacArray[0][2] == this.ticTacArray[1][1] &&
        this.ticTacArray[1][1] == this.ticTacArray[2][0]
      ) {
        this.winner = this.ticTacArray[1][1];

        strokeWeight(12);
        stroke(204, 102, 0, 150);
        line(cellMidX * 0.2, cellMidY * 5.8, cellMidX * 5.8, cellMidY * 0.2);
        //this.resetGame();
      }
      
    }
    else if (this.counter > 8){
      this.winner = "D";
    }
  }

  endScreen() {
    if (this.winner != "N" && this.winner != "D") {
      textSize(32);
      //noFill();
      strokeWeight(5);
      stroke(2, 233, 1);
      fill(125, 25, 255);
      if (ticTac.player == "X") {
        text("Player TWO WINS!", cellMidX, cellMidY * 7);
      } else {
        text("Player ONE WINS!", cellMidX, cellMidY * 7);
      }
    }
    else if(this.winner == "D"){
      textSize(32);
      //noFill();
      strokeWeight(5);
      stroke(2, 233, 1);
      fill(125, 25, 255);
        text("IS A FKIN DRAW!", cellMidX, cellMidY * 7);
      
    }
  }

  userInputByMouse() {
    if (
      mouseIsPressed &&
      this.ticTacArray[getRowFromMouse()][getColFromMouse()] == " "
    ) {
      this.ticTacArray[getRowFromMouse()][getColFromMouse()] = this.player;
      this.counter++;
      if (this.player == "X") {
        this.player = "O";
      } else if(this.player == "O"){
        this.player = "X";
      }
    }
  }

  displayArray() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (this.ticTacArray[row][col] == "X") {
          this.gameCrosses.moveTO(row, col);
          this.gameCrosses.show();
        } else if (this.ticTacArray[row][col] == "O") {
          this.gameCircles.moveTO(row, col);
          this.gameCircles.show();
        }
      }
    }
  }

  resetGame() {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        this.ticTacArray[row][col] = " ";
      }
    }
  }

  make2Darray() {
    let ticTacArr = new Array(rows);
    for (let row = 0; row < rows; row++) {
      ticTacArr[row] = new Array(cols);
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        ticTacArr[row][col] = " ";
      }
    }

    return ticTacArr;
  }
}

function getColFromMouse() {
  if (mouseX > 0 && mouseX < canvX / 3) {
    return 0;
  } else if (mouseX > canvX / 3 && mouseX < canvX - canvX / 3) {
    return 1;
  } else {
    return 2;
  }
}
function getRowFromMouse() {
  if (mouseY > 0 && mouseY < canvY / 3) {
    return 0;
  } else if (mouseY > canvY / 3 && mouseY < canvY - canvY / 3) {
    return 1;
  } else {
    return 2;
  }
}

function drawGrid() {
  strokeWeight(3);
  stroke(0, 255, 255);

  line(canvX / 3, 0, canvX / 3, canvY);
  line(canvX - canvX / 3, 0, canvX - canvX / 3, canvY);
  line(0, canvY / 3, canvX, canvY / 3);
  line(0, canvY - canvY / 3, canvX, canvY - canvY / 3);
}

function bottomText() {
  textSize(32);
  //noFill();
  strokeWeight(5);
  stroke(2, 233, 1);
  fill(125, 25, 255);
  if (ticTac.player == "X") {
    text("Player One's Turn", cellMidX, cellMidY * 7);
  } else {
    text("Player Two's Turn", cellMidX, cellMidY * 7);
  }
}

let ticTac = new ticTacGame();

function setup() {
  createCanvas(canvX, canvY + canvY * 0.3);
}

function draw() {
  background(50);
  drawGrid();

  if (ticTac.winner == "N") {
    bottomText();

    ticTac.userInputByMouse();
  } else {
    ticTac.endScreen();
  }
  ticTac.checkForWin();
  ticTac.displayArray();
  
}
