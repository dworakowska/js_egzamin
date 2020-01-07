// 1) Scale riddle. With 8 balls  EXAM [1,1,2,1,1,1,1,2]. One of the items will be change to two.
// Indexes are to be chosen at random. Use comparison only two times.

// let numbers = [1, 1, 1, 1, 1, 1, 2, 1];

// let index = (function haveFun(array) {
//   let sum1 = array[0] + array[1] + array[2];
//   let sum2 = array[3] + array[4] + array[5];

//   if (sum1 === sum2) {
//     return array[6] > array[7] ? 6 : 7;
//   } else {
//     if (sum1 > sum2) {
//       if (array[0] == array[1]) {
//         return 2;
//       } else {
//         return array[0] > array[1] ? 0 : 1;
//       }
//     } else {
//       if (array[3] == array[4]) {
//         return 5;
//       } else {
//         return array[3] > array[4] ? 3 : 4;
//       }
//     }
//   }
// })(numbers);

// console.log(index);

// 2) Create a solution that will tell us what poker set we have.
// The solution is to deal us 5 cards from the standard 52 card deck.
// After that the solution is to tell us what is the best poker set. EXAM

// 3)(EXAM) Solve sudoku. Start

let grid = [
  [7, 0, 4, 8, 0, 0, 3, 0, 1],
  [8, 2, 0, 5, 0, 0, 0, 4, 0],
  [0, 0, 9, 4, 3, 0, 5, 0, 0],
  [3, 1, 0, 0, 0, 0, 8, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 1, 0],
  [9, 0, 7, 0, 0, 0, 0, 3, 2],
  [0, 0, 6, 0, 1, 5, 4, 0, 0],
  [0, 7, 0, 0, 0, 9, 0, 6, 5],
  [5, 0, 8, 0, 0, 2, 1, 0, 3]
];

function isValid(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
}

function sudokuSolver(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] == 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = k;
            if (sudokuSolver(data)) {
              return true;
            } else {
              data[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

const reducer = (accumulator, currentValue) =>
  accumulator + "\n" + currentValue;

sudokuSolver(grid);
console.log(grid.reduce(reducer));
