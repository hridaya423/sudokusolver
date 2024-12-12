'use client'
import dynamic from 'next/dynamic';

const SudokuBoard = dynamic(() => import('@/components/SudokuBoard'), {
  ssr: false
});
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <SudokuBoard />
    </div>
  )
}