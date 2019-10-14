function GameManager(){
    this.size = 4;
    this.grid = new Grid(4);
}

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
    var value = Math.random() < 0.9 ? 2 : 4;
    var tile = new Tile(this.grid.randomAvailableCell(), value);
    this.grid.insertTile(tile);
  }
};

GameManager.prototype.prepareTiles = function () {
  this.grid.eachCell(function(x,y,tile){
    if (tile) {
      tile.mergedFrom = null;
      tile.savePosition();
    }
  })
};
