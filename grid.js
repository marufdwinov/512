function Grid(size) { //membuat Grid dengan parameter size
    this.size = size;
    this.cells = this.empty(); //this.cells diisi dengan function empty
}

Grid.prototype.empty = function () {
    var cells = []; //membuat var cells array kosong
    for (var x = 0; x < this.size; x++) { //membuat perulangan x (baris)
        var row = cells[x] = []; //membuat var row yang diisi dengan cells[x] = []
        for (var y = 0; y < this.size; y++) { // membuat perulangan y
            row.push(null); //push ke row
        }
    }
    return cells;
};

Grid.prototype.insertTile = function(tile) { //insert tile
    this.cells[tile.x][tile.y] = tile;
}

Grid.prototype.removeTile = function(tile) { //hapus tile
    this.cells[tile.x][tile.y] = null;
}

Grid.prototype.withinBounds = function (position) { //cek apakah masih dalam kotak
    return position.x >= 0 && position.x < this.size &&
        position.y >= 0 && position.y < this.size;
};

Grid.prototype.cellAvailable = function (cell) {
    return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
    return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
    if (this.withinBounds(cell)) {
        return this.cells[cell.x][cell.y];
    } else {
        return null;
    }
};

/////////////////////////////////////////

Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({
        x : x,
        y : y
      });
    }
  });
  return cells;
};

Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random()*cells.length)];
  }
};

Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};
