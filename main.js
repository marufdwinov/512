document.addEventListener('keydown', function (event) {
  // 38 atas
  // 40 bawah
  // 37 kiri
  // 39 kanan
  event.preventDefault();
  if (event.keyCode == 38) {
    move(3);
  } else if (event.keyCode == 40) {
    move(1);
  } else if (event.keyCode == 37) {
    move(0);
  } else if (event.keyCode == 39) {
    move(2);
  }
});

function move(direction) {
  console.log(direction);
  var vector = game.getVector(direction);
  var traversals = game.buildTraversals(vector);
  // console.log(vector);
  // console.table(traversals);
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      coordinate = {
        x: x,
        y: y
      };
      tile = game.grid.cellContent(coordinate);
      // console.log(x, y, game.getTile(coordinate));
      if(tile){
        // console.log(game.findFarthestPosition(coordinate, vector));
        var data = game.findFarthestPosition(coordinate, vector);
        game.grid.removeTile(coordinate);
        game.grid.insertTile(new Tile(data.farthest, tile.value));
      }
    });
  });
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
                document.getElementById("tile-" + pos).innerHTML = 0;
            }
        }
    }
}

function test() {
  game = new GameManager();
  tile1 = new Tile({x: 0, y: 0}, 2);
  game.grid.insertTile(tile1);
  tile2 = new Tile({x: 3, y: 3}, 2);
  game.grid.insertTile(tile2);
  tile3 = new Tile({x: 0, y: 3}, 2);
  game.grid.insertTile(tile3);
  drawGame(game);
}
