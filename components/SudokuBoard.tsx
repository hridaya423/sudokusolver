'use client';

import React, { useState } from 'react';
import SudokuCell from './SudokuCell';
import { 
  SudokuGrid, 
  solveSudoku, 
  createEmptyGrid, 
  deepCopyGrid,
  isValidMove
} from '@/lib/sudokuSolver';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  TrashIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons';

const SudokuBoard: React.FC = () => {
  const [grid, setGrid] = useState<SudokuGrid>(createEmptyGrid());
  const [error, setError] = useState<string | null>(null);

  const validateSudokuGrid = (grid: SudokuGrid): boolean => {
    // Check each row, column, and cell for validity
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentNum = grid[row][col];
        
        // Skip empty cells
        if (currentNum === 0) continue;

        // Temporarily remove the current cell to check for duplicates
        grid[row][col] = 0;
        
        // Check if the current number is valid in its position
        if (!isValidMove(grid, row, col, currentNum)) {
          // Restore the cell
          grid[row][col] = currentNum;
          return false;
        }
        
        // Restore the cell
        grid[row][col] = currentNum;
      }
    }
    return true;
  };

  const handleCellChange = (row: number, col: number, value: number) => {
    const newGrid = deepCopyGrid(grid);
    newGrid[row][col] = value;
    
    // Clear any previous errors
    setError(null);
    
    setGrid(newGrid);
  };

  const handleSolve = () => {
    // Reset any previous errors
    setError(null);

    const gridCopy = deepCopyGrid(grid);

    // First, validate the current grid configuration
    if (!validateSudokuGrid(gridCopy)) {
      setError('Invalid Sudoku configuration. Please check your input.');
      return;
    }

    // Attempt to solve the puzzle
    try {
      if (solveSudoku(gridCopy)) {
        setGrid(gridCopy);
        setError(null);
      } else {
        setError('No solution exists for this Sudoku puzzle!');
      }
    } catch (err) {
      setError('An error occurred while solving the puzzle.');
      console.error(err);
    }
  };

  const handleReset = () => {
    setGrid(createEmptyGrid());
    setError(null);
  };


  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-6"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Sudoku Solver
        </h1>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              flex items-center 
              bg-red-100 text-red-700 
              p-3 rounded-lg 
              mb-4 shadow-md
            "
          >
            <ExclamationTriangleIcon className="mr-2" />
            <span>{error}</span>
          </motion.div>
        )}
        <div className="grid grid-cols-9 gap-0 border-4 border-gray-800 rounded-lg overflow-hidden">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <SudokuCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                row={rowIndex}
                col={colIndex}
                editable={true}
                onChange={handleCellChange}
              />
            ))
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <motion.button
            onClick={handleSolve}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-2 
              bg-blue-500 text-white 
              px-4 py-2 rounded-lg 
              hover:bg-blue-600 
              transition-colors
            "
          >
            <PlayIcon /> Solve
          </motion.button>
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center gap-2 
              bg-red-500 text-white 
              px-4 py-2 rounded-lg 
              hover:bg-red-600 
              transition-colors
            "
          >
            <TrashIcon /> Clear
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SudokuBoard;