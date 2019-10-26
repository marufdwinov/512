function GameManager(){
    this.size = 4;
    this.grid = new Grid(4);
    this.score = 0;
    this.step = 0;
    this.win = false;
    this.lose = false;
    this.finished = false;
    var bestScoreData = localStorage.getItem("best");
    if(bestScoreData){
      this.bestScore = bestScoreData;
    }
    else {
      localStorage.setItem("best", 0);
      this.bestScore = 0;
    }
}

GameManager.prototype.setScore = function (score) {
  this.score += score;
  if(this.score > this.bestScore){
    this.bestScore = this.score;
    localStorage.setItem("best", this.bestScore);
  }
};

GameManager.prototype.getVector = function (direction) { //membuat peta vektor arah
    // Vectors representing tile movement
    var map = {
        0: {
            x: 0,
            y: -1
        },
        1: {
            x: 1,
            y: 0
        },
        2: {
            x: 0,
            y: 1
        },
        3: {
            x: -1,
            y: 0
        }
    };

    return map[direction];
};

GameManager.prototype.buildTraversals = function (vector) {
    var traversals = {
        x: [0,1,2,3],
        y: [0,1,2,3]
    };

    // for (var pos = 0; pos < this.size; pos++) {
    //     traversals.x.push(pos);
    //     traversals.y.push(pos);
    // }

    if (vector.x === 1) traversals.x = traversals.x.reverse();
    if (vector.y === 1) traversals.y = traversals.y.reverse();

    return traversals;
};


GameManager.prototype.findFarthestPosition = function (cell, vector) {
    var previous;

    do {
        previous = cell;
        cell = {
            x: previous.x + vector.x,
            y: previous.y + vector.y
        };
    } while (this.grid.withinBounds(cell) &&
        this.grid.cellAvailable(cell));

    return {
        farthest: previous,
        next: cell
    };
};


////////////////////////////
GameManager.prototype.moveTile = function (lastPosition, newPosition) {
  this.grid.cells[lastPosition.x][lastPosition.y] = null;
  this.grid.cells[newPosition.x][newPosition.y] = lastPosition;
  lastPosition.updatePosition(newPosition);
};

GameManager.prototype.positionsEqual = function (first, second) {
  return first.x === second.x && first.y === second.y;
};

GameManager.prototype.addRandomTile = function () {
  if (this.grid.cellsAvailable()) {
    if(this.step >= 8){
      this.step = 0;
      var value = "W";
    }
    else {
      var value = Math.random() < 0.9 ? 2 : 4;
    }
    var tile = new Tile(this.grid.randomAvailableCell(), value);
    this.grid.insertTile(tile);
  }
};

GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function(x,y,tile){
    if (tile) {
      tile.mergedFrom = null;
      tile.newTile = false;
      tile.savePosition();
    }
  });
};

GameManager.prototype.stillCanMove = function () {
  for(var x = 0; x < 4; x++){
    for(var y = 0; y < 4; y++){
      var coordinate = {
        x: x,
        y: y
      };
      tile = this.grid.cellContent(coordinate);
      if(tile === null || tile.value === "W"){
        return true; // Masih ada kotak yang kosong atau masih ada kotak Wild
      }

      // Cek setiap arah
      for(var move = 0; move < 4; move++){
        vector = this.getVector(move);
        nextCoordinate = {
          x: x+vector.x,
          y: y+vector.y
        };

        nextTile = this.grid.cellContent(nextCoordinate);

        if (nextTile && nextTile.value === tile.value) {
          return true; // Masih ada yang bisa di gabung
        }
      }
    }
  }
  return false;
};