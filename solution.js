/**
 * README
 * My approach was transform the columns and sub-boxes into rows and handle the validation always using rows, since the arrays work easily with lines.
 * Besides, I follow the single responsibility role and aimed to reuse functions.
 * I also added more test cases to:
 *  1. Validate the function responsible to verify the board's structure;
 *  2. Validate the function responsible to verify the board's sub-boxes;
 *     I found a test that already was supposed to validate this scenario (non_valid_board_4) but this test wasn't working properly, it does not have two 1s in the same sub-box.
 *     For this reason, I created another test case (non_valid_board_5).
 */ 

function isValidSudoku(board) {
  if (!isValidBoard(board)) return false;

  if (!hasValidRows(board)) return false;
  if (!hasValidColumns(board)) return false;
  if (!hasValidSubboxes(board)) return false;
  
  return true;
}

// Checks if the board has a valid structure
function isValidBoard(board) {
  if (!Array.isArray(board)) return false;

  const hasCorrectAmountOfRows = board.length === 9;
  
  const columnsValidationResults = board.map(row => Array.isArray(row) && row.length === 9);
  const hasCorrectAmountOfColumns = !columnsValidationResults.some(result => result === false);

  return hasCorrectAmountOfRows && hasCorrectAmountOfColumns;
}

// Checks if the board's rows are valid
function hasValidRows(board) {
  return validateArrayValues(board);
}

// Checks if the board's columns are valid
function hasValidColumns(board) {
  const transposedArray = transposeArray(board);
  
  // After transposing the array (turning his columns into rows) we can use the same method (hasValidSubboxes) to validate if the rows (representing the columns) has duplicated values
  return validateArrayValues(transposedArray);
}

// Checks if the board's sub-boxes are valid
function hasValidSubboxes(board) {
  const chunkedBoard = chunkBoard(board, 3);
  const transposedBoard = transposeArray(chunkedBoard); 

  const boardWithoutSubarrays = transposedBoard.map(row => row.flat());
  let boardSeparatedIntoSubboxes = chunkBoard(boardWithoutSubarrays, 9);
  boardSeparatedIntoSubboxes = boardSeparatedIntoSubboxes.flat();

  // Now that each sub-box is a row we can use the same method (validateArrayValues) to validate if the rows (representing the sub-boxes) has duplicated values
  return validateArrayValues(boardSeparatedIntoSubboxes);
}

// Checks if the array does not have duplicated values and if the values are between 1 and 9
function validateArrayValues(array) {
  for (const row of array) {
    const rowOnlyWithNumbers = row.filter(column => !Number.isNaN(Number(column)));

    const rowHasValuesOutsideRange = rowOnlyWithNumbers.some(value => value < 1 || value > 9);
    if (rowHasValuesOutsideRange) return false;

    const rowWithUniqueValues = new Set(rowOnlyWithNumbers);
    if (rowOnlyWithNumbers.length !== rowWithUniqueValues.size) return false;
  }

  return true;
}

// Turn the columns of the array into rows
function transposeArray(board) {
  // Get the board's first row to determine the amount of columns
  const firstRow = board[0];

  return firstRow.map((column, columnIndex) => board.map(row => row[columnIndex]));
}

// Break the board's array into subarrays
function chunkBoard(board, chunkSize) {
  let chunkedBoard = [];

  board.forEach((row, rowIndex) => {
    chunkedBoard[rowIndex] = [];

    for (let chunkIndex = 0; chunkIndex < row.length; chunkIndex += chunkSize) {
      const chunk = row.slice(chunkIndex, (chunkIndex + chunkSize));

      chunkedBoard[rowIndex].push(chunk);
    }
  })

  return chunkedBoard;
}

// Tests Section

const valid_board_1 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const valid_board_2 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_1 = [
  ["8", "3", ".", ".", "7", ".", ".", ".", "."], // 8 in 1st column
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"], // 8 in 1st column
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_2 = [
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["5", ".", ".", ".", "7", ".", ".", ".", "5"], // two 5s: 1st column and 9th column of 4th row
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "."],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_3 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "9"], // 9 in 9th column
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  ["9", ".", ".", ".", "8", ".", ".", "7", "9"], // two 9s: 1st column and 9th column of 9th row or second 9 in 9th column
];

// In my point of view this test is not working properly, it should have the number 1 in one sub-box and the number 1 again in the same sub-box but it does not have
// I created another test case for this situation, the non_valid_board_5
const non_valid_board_4 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "6"], // 1 in sub-box
  ["7", ".", ".", ".", "2", ".", "1", ".", "6"], // 1 in same sub-box
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_5 = [
  ["5", "3", "4", ".", "7", ".", ".", ".", "."], // 4 in sub-box
  ["6", "4", ".", "1", "9", "5", ".", ".", "."], // 4 in same sub-box
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_6 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "13", "5", ".", ".", "."], // Number greater than 9
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "0.5", ".", "3", ".", ".", "1"], // Number smaller than 0
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_7 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."], // This board has only 7 rows
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_8 = [
  ["5", "3", ".", ".", "7", ".", ".", "."],      // This row has only 8 columns
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "6"],
  ["7", ".", ".", ".", "2", ".", "1", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [, ".", "4", "1", "9", ".", ".", "5"],         // This row has only 7 columns
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_9 = [
  '1,2,3',                                       // This row is not an array
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "6"],
  ["7", ".", ".", ".", "2", ".", "1", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];

const non_valid_board_10 = 'Testing function';    // This board is not an array

var assert = require('assert');

assert(isValidSudoku(valid_board_1) === true);
assert(isValidSudoku(valid_board_2) == true); // true
assert(isValidSudoku(non_valid_board_1) == false); // false
assert(isValidSudoku(non_valid_board_2) == false); // false
assert(isValidSudoku(non_valid_board_3) == false); // false
assert(isValidSudoku(non_valid_board_4) == false); // false
assert(isValidSudoku(non_valid_board_5) == false); // false
assert(isValidSudoku(non_valid_board_6) == false); // false
assert(isValidSudoku(non_valid_board_7) == false); // false
assert(isValidSudoku(non_valid_board_8) == false); // false
assert(isValidSudoku(non_valid_board_9) == false); // false
assert(isValidSudoku(non_valid_board_10) == false); // false

console.log("OK!");
