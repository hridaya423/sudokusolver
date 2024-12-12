export type SudokuGrid = number[][];

export function isValidMove(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  // Check if the input is valid
  if (row < 0 || row >= 9 || col < 0 || col >= 9 || num < 0 || num > 9) {
    throw new Error("Invalid input: row, column, or number is out of range");
  }

  // No-op if the number is 0
  if (num === 0) return true;

  // Check row
  for (let x = 0; x < 9; x++) {
    if (x !== col && grid[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (x !== row && grid[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = row - row % 3;
  const startCol = col - col % 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const currentRow = startRow + i;
      const currentCol = startCol + j;
      if (
        (currentRow !== row || currentCol !== col) && 
        grid[currentRow][currentCol] === num
      ) return false;
    }
  }

  return true;
}

export function solveSudoku(grid: SudokuGrid): boolean {
  // Check if the input grid is valid
  if (grid.length !== 9 || grid.some(row => row.length !== 9)) {
    throw new Error("Invalid Sudoku grid: must be a 9x9 grid");
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(grid, row, col, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid)) {
              return true;
            }

            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function createEmptyGrid(): SudokuGrid {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

export function deepCopyGrid(grid: SudokuGrid): SudokuGrid {
  return grid.map(row => [...row]);
}