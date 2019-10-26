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
  if (game.finished) {
    return;
  }
  var vector = game.getVector(direction);
  var traversals = game.buildTraversals(vector);
  var moved = false;
  var lastCoordinate, newCoordinate, nextCoordinate, tile;
  game.prepareTiles();
  // console.log(vector);
  // console.table(traversals);
  traversals.x.forEach(function (x) {
    traversals.y.forEach(function (y) {
      var scoreFactor = 1;
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
        if(nextTile && tile.value === "W" && !nextTile.mergedFrom){
          scoreFactor = 2; // Twice the score if Wild tile combined
          tile.value = nextTile.value;
        }
        if(nextTile && nextTile.value === "W" && !nextTile.mergedFrom){
          scoreFactor = 2; // Twice the score if Wild tile combined
          nextTile.value = tile.value;
        }
        if (nextTile && nextTile.value === tile.value && !nextTile.mergedFrom) {
          var mergedTile = new Tile(nextCoordinate, tile.value * 2);
          mergedTile.mergedFrom = [tile, nextTile];

          game.grid.insertTile(mergedTile);
          game.grid.removeTile(tile);

          tile.updatePosition(nextCoordinate);
          // game.score += tile.value * 2;
          game.setScore(tile.value * 2 * scoreFactor);
          if (tile.value * 2 === 512) {
            game.win = true;
            game.finished = true;
          }
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
    moveAudio.play();
    game.step += 1;
    game.addRandomTile();
    if(!game.stillCanMove()){
      game.lose = true;
      game.finished = true;
    }
  }
  drawGame(game);
}

function drawGame(game) { //fungsi drawGame dengan parameter game
    var lastScore = document.getElementById("score").innerHTML;
    var difference = game.score - lastScore;
    document.getElementById("score").innerHTML = game.score;

    if(difference > 0){
      var addition = document.createElement("div");
      addition.classList.add("score-addition");
      addition.textContent = "+" + difference;
      document.querySelector("#score-container-box").appendChild(addition);
    }

    if(document.getElementById("best-score").innerHTML != game.bestScore){
      document.getElementById("best-score").innerHTML = game.bestScore;
      var addition = document.createElement("div");
      addition.classList.add("score-addition");
      addition.textContent = game.bestScore;
      document.querySelector("#best-container-box").appendChild(addition);
    }

    for (var i = 0; i < game.grid.size; i++) {
        for (var j = 0; j < game.grid.size; j++) {
            var pos = i*game.grid.size + j + 1;
            content = game.grid.cells[i][j];
            if(document.getElementById("tile-"+pos).classList.contains("tile-merged")){
              document.getElementById("tile-"+pos).classList.remove("tile-merged");
            }
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

              if(content.newTile){
                document.getElementById("tile-"+pos).classList.add("tile-merged");
              }
            }
            else {
                document.getElementById("tile-" + pos).innerHTML = "";
                document.getElementById("tile-" + pos).style.backgroundColor = "#b2a596";
                document.getElementById("tile-" + pos).style.color = "black";
            }
        }
    }
    if (game.win) {
      gameWin();
    }
    if (game.lose) {
      gameLose();
    }
}

var bgAudio = new Audio('sounds/background.mp3');
var moveAudio = new Audio('sounds/move.mp3');
var muted = false;
bgAudio.volume = 0.5;

function test() {
  // audio.play();

  document.getElementById("end-game-container").style.display = "none";

  document.getElementById("start-container").style.width = "0px";
  document.getElementById("start-container").style.padding = "0px";
  game = new GameManager();
  // tile1 = new Tile({x:0,y:3}, 2);
  // game.grid.insertTile(tile1);
  // tile2 = new Tile({x:1,y:2}, 4);
  // game.grid.insertTile(tile2);
  game.addRandomTile();
  game.addRandomTile();

  drawGame(game);
}

function gameWin() {
  document.getElementById("end-game-container").style.display = "block";
  document.getElementById("end-game-page").innerHTML = "You Win :)";
}

function gameLose() {
  document.getElementById("end-game-container").style.display = "block";
  document.getElementById("end-game-page").innerHTML = "You Lose :(";
}

function toogleAudio() {
  // console.log(muted);
  if (muted) {
    bgAudio.pause();
    document.getElementById("audio-on").style.display = "none";
    document.getElementById("audio-off").style.display = "block";
  }
  else {
    bgAudio.play();
    document.getElementById("audio-on").style.display = "block";
    document.getElementById("audio-off").style.display = "none";
  }
  muted = !muted;
}

function testLose(){
  game = new GameManager();
  // var tile = [2,4,2,4,4,2,4,2,2,4,2,4,4,2,4,2];
  var tile = [2,4,2,16,32,64,128,256,2,4,8,16,32,64,128];
  var i = 0;
  for(var x = 0; x < 4; x++){
    for(var y = 0; y < 4; y++){
      if(i>14){
        break;
      }
      newTile = new Tile({x:x,y:y}, tile[i++]);
      game.grid.insertTile(newTile);
    }
  }

  drawGame(game);
}