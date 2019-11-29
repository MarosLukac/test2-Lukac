// ----- MODEL --------
export const TileStateEnum = { OPEN: 1, CLOSED: 2 };
export const GameStateEnum = { PLAYING: 1, WON: 2, LOST: 3 };
export class Tile {
  constructor(state = TileStateEnum.OPEN) {
    this.state = state;
  }
}
export class Puzzle extends Tile {
  constructor(value, state) {
    super(state);
    this.value = value;
  }
}
export class Field {
  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    //this.puzzleCount = puzzleCount;
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;
    this.generate();
  }

  generate() {
    this.field = [];
    this.gameState = GameStateEnum.PLAYING;

    for (let row = 0; row < this.rowCount; row++) {
      this.field.push([]);
      this.field[row].length = this.colCount;
    }
    let randomRow, randomCol;
    let counter = 0;
    let puzzleCount = this.rowCount * this.colCount - 1;

    do {
      randomRow = Math.floor(Math.random() * this.rowCount);
      randomCol = Math.floor(Math.random() * this.colCount);

      if (!this.field[randomRow][randomCol]) {
        this.field[randomRow][randomCol] = new Puzzle(counter);

        counter++;
      }
    } while (counter <= puzzleCount);

    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (this.field[row][col].value === 0) {
          this.field[row][col].state = TileStateEnum.CLOSED;
        }
      }
    }
  }

  changePosition(row, col) {
    let actRow = 0,
      actCol = 0;

    for (let r = -1; r <= 1; r++) {
      actRow = row + r;
      if (actRow >= 0 && actRow < this.rowCount) {
        if (this.field[actRow][col] && this.field[actRow][col].value === 0) {
          this.field[actRow][col].value = this.field[row][col].value;
          this.field[row][col].value = 0;
        }
      }
    }

    for (let c = -1; c <= 1; c++) {
      actCol = col + c;
      if (actCol >= 0 && actCol < this.colCount) {
        if (this.field[row][actCol] && this.field[row][actCol].value === 0) {
          this.field[row][actCol].value = this.field[row][col].value;
          this.field[row][col].value = 0;
        }
      }
    }
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (this.field[row][col].value === 0) {
          this.field[row][col].state = TileStateEnum.CLOSED;
        } else {
          this.field[row][col].state = TileStateEnum.OPEN;
        }
      }
    }
    if (this.isGameWon()) {
      this.gameState = GameStateEnum.WON;

      
    }
  }

  isGameWon() {
    let count = 1;
    for (let row = 0; row < this.rowCount; row++) {
      for (let col = 0; col < this.colCount; col++) {
        if (
          this.field[row][col].value - count !== 0 &&
          this.field[row][col].value !== 0
        ) {
          return false;
        }
        count++;
      }
    }
    return true;
  }
}

// ----- END MODEL ----------
