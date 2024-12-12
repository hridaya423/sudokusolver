'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SudokuCellProps {
  value: number;
  row: number;
  col: number;
  editable: boolean;
  onChange: (row: number, col: number, value: number) => void;
}

const SudokuCell: React.FC<SudokuCellProps> = ({ 
  value, 
  row, 
  col, 
  editable, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numValue = inputValue === '' ? 0 : parseInt(inputValue, 10);
    
    if (numValue >= 0 && numValue <= 9) {
      onChange(row, col, numValue);
    }
  };

  const borderClasses = () => {
    const borderRight = col % 3 === 2 ? 'border-r-4 border-r-gray-800' : '';
    const borderBottom = row % 3 === 2 ? 'border-b-4 border-b-gray-800' : '';
    return `${borderRight} ${borderBottom}`;
  };

  return (
    <motion.div 
      className={`
        flex items-center justify-center 
        w-12 h-12 
        border border-gray-300 
        ${borderClasses()}
        ${editable ? 'bg-white' : 'bg-gray-100'}
      `}
      whileHover={editable ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <input 
        type="number" 
        min="0" 
        max="9" 
        value={value || ''} 
        onChange={handleChange}
        disabled={!editable}
        className={`
          w-full h-full text-center text-2xl 
          ${editable ? 'text-blue-800' : 'text-gray-700 font-bold'}
          bg-transparent 
          outline-none 
          appearance-none 
          ${editable ? 'cursor-text' : 'cursor-not-allowed'}
        `}
      />
    </motion.div>
  );
};

export default SudokuCell;