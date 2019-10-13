function Grid(size) {
    this.size = size;
    this.cells = this.empty();
}

Grid.prototype.empty = function () {
    var cells = [];
    for (var x = 0; x < this.size; x++) {
        var row = cells[x] = [];
        for (var y = 0; y < this.size; y++) {
            row.push(null);
        }
    }
    return cells;
};

Grid.prototype.insertTile = function (tile) {
    this.cells[tile.x][tile.y] = tile;
}

Grid.prototype.removeTile = function (tile) {
    this.cells[tile.x][tile.y] = null;
}

Grid.prototype.withinBounds = function (position) {
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