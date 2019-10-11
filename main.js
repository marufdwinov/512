document.addEventListener('keydown', function (event) {
    // 38 atas
    // 40 bawah
    // 37 kiri
    // 39 kanan
    // console.log(event.keyCode);
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

function move(direction){
    console.log(direction);
}

function drawGame(game) {
    for (var i = 0; i < game.grid.size; i++) {
        for (var j = 0; j < game.grid.size; j++) {
            var pos = i*game.grid.size + j + 1;
            content = game.grid.cells[i][j];
            if(content){
                document.getElementById("tile-" + pos).innerHTML = content.value;
            }
            else {
                document.getElementById("tile-" + pos).innerHTML = 0;
            }
        }
    }
}

function test(){
    game = new GameManager();
    tile1 = new Tile({x: 0, y: 0}, 2);
    game.grid.insertTile(tile1);
    tile2 = new Tile({x: 3, y: 3}, 2);
    game.grid.insertTile(tile2);
    drawGame(game);
}