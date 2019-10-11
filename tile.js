// position => x: 0, y: 0
// value => 2, 4, 8 ... 512 & W
function Tile(position, value){
    this.x = position.x;
    this.y = position.y;
    this.value = value || 2;
}