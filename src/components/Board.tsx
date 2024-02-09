import React, { useEffect, useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';

type Props = {
  size: number;
};
export default function Board({ size }: Props) {
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
  }, [size]);

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };
  const winner = calculateWinner(squares);
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
      {[...Array(size)].map((_, row) => (
        <div key={row}>
          {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
        </div>
      ))}
    </div>
  );
}
