// position => x: 0, y: 0
// value => 2, 4, 8 ... 512 & W
function Tile(position, value){ //membuat Tile dengan parameter position x,y dan value
    this.x = position.x;
    this.y = position.y;
    this.value = value || 2;
    this.mergedFrom = null;
    this.previousPosition = null;
    this.newTile = true;
}

///////////////////////////////
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
  this.newTile = false;
};

Tile.prototype.savePosition = function () {
  this.previousPosition = {
    x : this.x,
    y : this.y
  };
};
