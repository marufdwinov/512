document.addEventListener('keydown', function (event) {
  // 38 atas
  // 40 bawah
  // 37 kiri
  // 39 kanan
  event.preventDefault();
  if (event.keyCode == 38 || event.keyCode == 87) {
    move(3);
  } else if (event.keyCode == 40 || event.keyCode == 83) {
    move(1);
  } else if (event.keyCode == 37 || event.keyCode == 65) {
    move(0);
  } else if (event.keyCode == 39 || event.keyCode == 68) {
    move(2);
  }
  // console.log(event.keyCode);
});

function move(direction) {
  // console.log(direction);
  var vector = game.getVector(direction);
  var traversals = game.buildTraversals(vector);
  var moved = false;
  var lastCoordinate, newCoordinate, nextCoordinate, tile;
  game.prepareTiles();
  // console.log(vector);
  // console.table(traversals);
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      lastCoordinate = {
        x: x,
        y: y
      };
      tile = game.grid.cellContent(lastCoordinate);
      if(tile){
        // console.log(game.findFarthestPosition(lastCoordinate, vector));
        var data = game.findFarthestPosition(lastCoordinate, vector);
        newCoordinate = data.farthest;
        nextCoordinate = data.next;

        nextTile = game.grid.cellContent(nextCoordinate);
        if (nextTile && nextTile.value === tile.value && !nextTile.mergedFrom) {
          var mergedTile = new Tile(nextCoordinate, tile.value * 2);
          mergedTile.mergedFrom = [tile, nextTile];

          game.grid.insertTile(mergedTile);
          game.grid.removeTile(tile);

          tile.updatePosition(nextCoordinate);
        }
        else {
          game.moveTile(tile, newCoordinate);
        }
        if (!game.positionsEqual(lastCoordinate, tile)) {
          moved = true;
        }

      }

    });
  });
  if (moved) {
    game.addRandomTile();
  }
  drawGame(game);
}

function drawGame(game) { //fungsi drawGame dengan parameter game
    for (var i = 0; i < game.grid.size; i++) {
        for (var j = 0; j < game.grid.size; j++) {
            var pos = i*game.grid.size + j + 1;
            content = game.grid.cells[i][j];
            if(content){
              if (content.value == 2) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#eee4da";
                document.getElementById("tile-" + pos).style.color = "#776e65";
              } else if (content.value == 4) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#ede0c8";
                document.getElementById("tile-" + pos).style.color = "#776e65";
              } else if (content.value == 8) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#f2b179";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 16) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#f49663";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 32) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#f67c5f";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 64) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#f65e3b";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 128) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#edcf72";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 256) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#edcc61";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == 512) {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#f8c315";
                document.getElementById("tile-" + pos).style.color = "white";
              } else if (content.value == "W") {
                document.getElementById("tile-" + pos).innerHTML = content.value;
                document.getElementById("tile-" + pos).style.backgroundColor = "#57a7d5";
                document.getElementById("tile-" + pos).style.color = "white";
              }
            }
            else {
                document.getElementById("tile-" + pos).innerHTML = "";
                document.getElementById("tile-" + pos).style.backgroundColor = "#b2a596";
                document.getElementById("tile-" + pos).style.color = "black";
            }
        }
    }
}


function test() {
  game = new GameManager();
  game.addRandomTile();
  game.addRandomTile();
  // tile1 = new Tile({x: 0, y: 0}, this.game.addRandomTile());
  // game.grid.insertTile(tile1);
  // tile2 = new Tile({x: 3, y: 3}, this.game.addRandomTile());
  // game.grid.insertTile(tile2);
  // tile3 = new Tile({x: 0, y: 3}, this.game.addRandomTile());
  // game.grid.insertTile(tile3);
  drawGame(game);
}
