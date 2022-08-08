/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag ) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //Below code line create empty array HEIGHT x WIDTH should work
  //but NOOO!!! it's create empty array not array with undifined value
  //so when empty array work with Boolean(in this Case is .every())
  //empty array will be truthy not falsy(falsy mean 0,"",false,NaN,undefined,null)
  //so new Array() create empty array, array are object, object are truly
  //but comparision if([]==false) answer true so [] is false because comparsion
  //will convert both side to string and number so [].toString is "" and 0
  //mean [].toString()->""->0 final comparision 0==false
  //------------------------------------------------------------------------
  //board = Array.from(new Array(HEIGHT), () => new Array(WIDTH));
  //------------------------------------------------------------------------
  //Array.from(convert Array like Object,MAP)-->{}.toString-->[object object]
  //Below code work with .every() Because Array.from({length:WIDTH})
  //create array with undifined value not empty array and so undefined is falsy
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
  //take me almost week to figure out. should have explain this in the first place
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let board = document.querySelector("#board");

  // TODO: add comment for this code
  let top = document.createElement("tr"); //create row element<tr>
  top.setAttribute("id", "column-top"); //set atribute id=column=top
  top.addEventListener("click", handleClick); //add evenetlistener;

  //for loop create  <td> inside <tr>
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //create <td>
    headCell.setAttribute("id", x); //set id for each <td>
    top.append(headCell); //add cell to row
  }
  board.append(top); //add row header to gameboard

  // TODO: add comment for this code
  //create new row for play area of  gameboard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr"); //create row <tr>
    //create cells <td>
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); //create uniqe id for reference to cell(by X and Y 2Dimension)
      row.append(cell); //add cell <td> to row
    }
    board.append(row); //add row to table
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //check which y position are empty from bottom to top
  for (let y = HEIGHT - 1; y >= 0; y--)
    if (!board[y][x]) {
      //if board empty(undefind) is true, return y position
      return y; //return y position
    }
  return null; //y Excess position return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //TODO: make a div and insert into correct table cell
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add("p" + currPlayer);
  const yxPosition = document.getElementById(`${y}-${x}`);

  yxPosition.append(piece);
  //yxPosition.style.backgroundColor = "red";
  // const piece = document.createElement("div");
  // piece.classList.add("piece");
  // piece.classList.add(`p${currPlayer}`);
  // // piece.style.top = -50 * (y + 2);//style does't effect anything???

  // const spot = document.getElementById(`${y}-${x}`);
  // spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return; //if Y is null :mean no more position to fill so do not thing
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  //this code not work with empty array that create
  //with new Array() because empty array[] will alway be truethy
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame("Tie!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    //check array position have same player
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    //WIDTH-3 for prevent go beyond array limit??//does not work because if click [7,6] not go to for loop
    //***if still want to use sliding window (with -3) have to seperate for loosp each Horiz,Ver,diagR,digL
    //*** OR Use IF check boundery IF(X>(WIDTH-3))--> FOR(X<WIDTH-3) elese-->FOR(X<WIDTH)
    for (let x = 0; x < WIDTH; x++) {
      //WIDTH-3 for prevent go beyound array limit??//does not work because if click last cell not go to forloop
      //check horizontal  if x position have same player all 4 position that player win
      let horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      //check vertical if y position have same player all 4 position that player win
      let vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      //check diagonal right if diagonal ringht  have same player all 4 position that player win
      let diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      //check diagonal left if diagonal left have same player all position that player win
      let diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];
      //check for at at lease one true then retrun true(mean win)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
