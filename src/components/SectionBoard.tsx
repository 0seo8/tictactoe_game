import React, { useState } from 'react';

import { useAppSelector } from '@app/hooks';
import Square from '@components/Square';
import { HistoryItem, Player } from '@features/game/gameSlice';
import calculateWinner from '@helpers/calculateWinner';

import useGameStatusChecker from '@/hooks/useGameStatusCheck';

type Props = {
  currentPlayer: Player | null;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
  records: HistoryItem[];
  setRecords: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
};

export default function SectionBoard({
  currentPlayer,
  setCurrentPlayer,
  stepNumber,
  setStepNumber,
  records,
  setRecords,
}: Props) {
  const { size, player1, player2, winningLength, isGameOver } = useAppSelector(
    (state) => state.game,
  );
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: Array(size * size).fill(null),
      player: null,
    },
  ]);

  useGameStatusChecker({
    squares: history[stepNumber].squares,
    stepNumber,
    history: records,
  });

  const handleClick = (i: number) => {
    if (isGameOver) {
      return;
    }
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const newSquares = current.squares.slice();
    if (calculateWinner(newSquares, winningLength) || newSquares[i]) {
      return alert('game over');
    }
    newSquares[i] =
      currentPlayer?.symbol === player1.symbol
        ? player1.symbol
        : player2.symbol;
    setRecords([
      ...records,
      {
        squares: newSquares,
        player: currentPlayer,
      },
    ]);
    setHistory([
      ...currentHistory,
      {
        squares: newSquares,
        player: currentPlayer,
      },
    ]);
    setStepNumber(currentHistory.length);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
  };
  const renderSquare = (i: number) => (
    <Square
      value={history[stepNumber].squares[i]}
      onClick={() => handleClick(i)}
      playerColor={
        history[stepNumber].squares[i] === player1.symbol
          ? player1.color
          : player2.color
      }
    />
  );

  return (
    <div className="w-full basis-3/5 min-w-0">
      <div className="flex items-center justify-center">
        {[...Array(size)].map((_, row) => (
          <div key={row} className="flex flex-col">
            {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
          </div>
        ))}
      </div>
    </div>
  );
}
