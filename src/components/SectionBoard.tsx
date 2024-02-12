import React, { useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';
import { useAppSelector } from '@app/hooks';
import { HistoryItem, Player, setIsGameOver } from '@features/game/gameSlice';

type Props = {
  currentPlayer: Player | null;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function SectionBoard({
  currentPlayer,
  setCurrentPlayer,
  stepNumber,
  setStepNumber,
}: Props) {
  const { size, player1, player2, winningLength, isGameOver } = useAppSelector(
    (state) => state.game,
  );
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: Array(size * size).fill(null),
      player: null,
    },
  ]);
  const handleClick = (i: number) => {
    if (isGameOver) {
      return alert('게임이 이미 종료되었습니다.');
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
    setSquares(newSquares);
    setHistory([
      ...currentHistory,
      {
        squares: newSquares,
        player: currentPlayer,
      },
    ]);
    setStepNumber(currentHistory.length);
    setCurrentPlayer(currentPlayer === player1 ? player2 : player1);

    const winner = calculateWinner(newSquares, winningLength);
    if (winner) {
      setIsGameOver(true);
      alert(`게임 종료! 승리자: ${winner}`);
    } else if (currentHistory.length === size * size) {
      setIsGameOver(true);
      alert('게임 종료! 무승부!');
    }
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
