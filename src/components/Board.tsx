import React, { useEffect, useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';

export default function Board() {
  const [size, setSize] = useState(3);
  const [winningLength, setWinningLength] = useState(3);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    resetGame();
  }, [size, winningLength]);

  const resetGame = () => {
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  };

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares, winningLength) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  const winner = calculateWinner(squares, winningLength);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  return (
    <div>
      <div>{status}</div>
      <div>
        <label>Select Board Size: </label>
        <input
          type="number"
          value={size}
          min="3"
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Select Winning Length: </label>
        <input
          type="number"
          value={winningLength}
          min="3"
          max={size}
          onChange={(e) => setWinningLength(Number(e.target.value))}
        />
      </div>
      {[...Array(size)].map((_, row) => (
        <div key={row}>
          {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
        </div>
      ))}
    </div>
  );
}
