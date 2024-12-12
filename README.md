# Sudoku Solver
A React-based Sudoku Solver application that allows users to input a Sudoku puzzle and automatically solves it.

![Preview](https://cloud-g47l7rtmp-hack-club-bot.vercel.app/0image.png)

## Features

- Clean and intuitive user interface
- Comprehensive input validation to catch invalid Sudoku configurations
- Seamless solving experience with clear success/error messaging
- Smooth animations and responsive design
- Ability to clear the grid and start over

## Usage

Open the Sudoku Solver app in your web browser.
The grid will start with an empty Sudoku board.
Enter the numbers you have in the puzzle by clicking on the cells and typing the values.
Once you've filled in the numbers you have, click the "Solve" button.
If the puzzle is valid, the app will automatically solve the Sudoku grid and display the solution.
If the puzzle is invalid or has no solution, the app will display an error message.
To clear the grid and start a new puzzle, click the "Clear" button.

## Technical Details
The Sudoku Solver is built using Next.js, Tailwind CSS, and the Framer Motion library for animations. It utilizes a recursive backtracking algorithm to solve Sudoku puzzles.
The code is structured into the following main components:

SudokuBoard: The main container component that manages the Sudoku grid state, handles user interactions, and controls the solving process.
SudokuCell: A reusable component representing an individual cell in the Sudoku grid.
sudokuSolver.ts: A utility module containing the core Sudoku solving logic and validation functions.

The app also includes comprehensive error handling to provide clear feedback to the user when invalid inputs or unsolvable puzzles are encountered.

## Getting Started
To run the Sudoku Solver locally, follow these steps:

Clone the repository: git clone https://github.com/hridaya423/sudoku-solver.git
Install dependencies: cd sudoku-solver && npm install
Start the development server: npm run dev
Open the app in your browser at http://localhost:3000
