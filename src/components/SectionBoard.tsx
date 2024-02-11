import React, { useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';
import { useAppSelector } from '@app/hooks';
import { HistoryItem } from '@features/game/gameSlice';
import CustomButton from '@components/ui/CustomButton';

export default function SectionBoard() {
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
  const { size, player1, player2, firstPlayer, winningLength } = useAppSelector(
    (state) => state.game,
  );
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  const [isGameOver, setIsGameOver] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [turnCount, setTurnCount] = useState({
    [player1.symbol]: 0,
    [player2.symbol]: 0,
  });
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: Array(size * size).fill(null),
      player: null,
    },
  ]);
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

  const handleUndo = () => {
    if (stepNumber > 0 && turnCount[currentPlayer!.symbol] < 3 && !isGameOver) {
      setStepNumber(stepNumber - 1);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
      setTurnCount({
        ...turnCount,
        [currentPlayer!.symbol]: turnCount[currentPlayer!.symbol] + 1,
      });
    }
  };

  return (
    <section className="w-full flex max-w-[850px] p-4">
      {[...Array(size)].map((_, row) => (
        <div key={row} className="flex flex-col">
          {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
        </div>
      ))}
      <div>
        <h2>남은 되돌리기 횟수</h2>
        <div>Player1: ({turnCount[player1!.symbol]} /3)</div>
        <div>Player2: ({turnCount[player2!.symbol]} /3) </div>
      </div>
      {isGameOver ||
        (!firstPlayer && (
          <div className="flex items-center mt-6 justify-center">
            <CustomButton text="되돌리기" onClick={handleUndo} />
          </div>
        ))}
    </section>
  );
}
