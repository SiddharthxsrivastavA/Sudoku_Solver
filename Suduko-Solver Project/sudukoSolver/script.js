var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudukoSolver(board, 0, 0, 9);
};

function isSafe(board,row,col,val,n) {
	for (let i = 0; i<n; i++) {
	  // row check
	  if (board[row][i] == val || board[i][col]==val)
		return false;
	  // col check
	//   if (board[i][col] == val)
	// 	return false;
	  // 3*3matrix check
	//   if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == val)
	// 	return false;
	}
	//submatrix check
	let rn=Math.sqrt(n);
	let si= row-row%rn;
	let sj= col-col%rn;
	for(let x=si; x<si+rn; x++){
		for(let y=sj; y<sj+rn; y++){
			if(board==val){
				return false;
			}
		}
	}
	return true;
  }

function sudukoSolver(board,row,col,n) {
	// base case
	if (row == n) {
	  //print(board, n);
	  FillBoard(board)
	  return true;
	}
	// if we at last col
	if (col == n) {
	  return sudukoSolver(board, row + 1, 0, n);
	}
	// if cell is already filled
	if (board[row][col] != 0) {
	  return sudukoSolver(board, row, col + 1, n);
	}
	for (let val = 1; val <= 9; val++) {
	  // check val is safe or not?
	  if (isSafe(board, row, col, val, n)) {
		board[row][col] = val;
		// recursive call
		let aagesolpossible = sudukoSolver(board, row, col + 1, n);
		if (aagesolpossible) {
		  return true;
		} 
		// backtracking
		board[row][col] = 0;
	  }
	}
	return false;
  }
  
  
  