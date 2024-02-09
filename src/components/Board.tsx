import React, { useEffect, useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';

type Player = {
  symbol: string;
  color: string;
};

export default function Board() {
  const [size, setSize] = useState(3);
  const [winningLength, setWinningLength] = useState(3);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [firstPlayer, setFirstPlayer] = useState<Player | null>(null);

  const [player1, setPlayer1] = useState<Player>({
    symbol: 'X',
    color: '#0000FF',
  });
  const [player2, setPlayer2] = useState<Player>({
    symbol: 'O',
    color: '#FF0000',
  });

  useEffect(() => {
    resetGame();
  }, [size, winningLength, player1, player2]);

  const resetGame = () => {
    setSquares(Array(size * size).fill(null));
    if (!firstPlayer) {
      setFirstPlayer(Math.random() < 0.5 ? player1 : player2);
    }
  };

  const handleClick = (i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares, winningLength) || newSquares[i]) {
      return;
    }
    newSquares[i] =
      firstPlayer?.symbol === player1.symbol ? player1.symbol : player2.symbol;
    setSquares(newSquares);
    setFirstPlayer(firstPlayer === player1 ? player2 : player1);
  };
  const winner = calculateWinner(squares, winningLength);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next player: ${firstPlayer?.symbol || player1.symbol}`;
  }
  const renderSquare = (i: number) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
      playerColor={
        squares[i] === player1.symbol ? player1.color : player2.color
      }
    />
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
      <div>
        <label>Player 1 Symbol: </label>
        <input
          type="text"
          value={player1.symbol}
          onChange={(e) => setPlayer1({ ...player1, symbol: e.target.value })}
        />
        <label>Player 1 Color: </label>
        <input
          type="color"
          value={player1.color}
          onChange={(e) => setPlayer1({ ...player1, color: e.target.value })}
        />
      </div>
      <div>
        <label>Player 2 Symbol: </label>
        <input
          type="text"
          value={player2.symbol}
          onChange={(e) => setPlayer2({ ...player2, symbol: e.target.value })}
        />
        <label>Player 2 Color: </label>
        <input
          type="color"
          value={player2.color}
          onChange={(e) => setPlayer2({ ...player2, color: e.target.value })}
        />
      </div>
      <div>
        <label>First Player: </label>
        <select
          value={firstPlayer?.symbol || ''}
          onChange={(e) =>
            setFirstPlayer(
              e.target.value === player1.symbol ? player1 : player2,
            )
          }
        >
          <option value={player1.symbol}>{player1.symbol}</option>
          <option value={player2.symbol}>{player2.symbol}</option>
        </select>
      </div>
      {[...Array(size)].map((_, row) => (
        <div key={row}>
          {[...Array(size)].map((_, col) => renderSquare(row * size + col))}
        </div>
      ))}
    </div>
  );
}
