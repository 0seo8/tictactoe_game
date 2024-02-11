import React, { useEffect, useState } from 'react';
import Square from '@components/Square';
import calculateWinner from '@helpers/calculateWinner';
import { HistoryItem, Player } from '@features/game/gameSlice';

export default function Board() {
  const [size, setSize] = useState(3);
  const [winningLength, setWinningLength] = useState(3);
  const [squares, setSquares] = useState(Array(size * size).fill(null));
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      squares: Array(size * size).fill(null),
      player: null,
    },
  ]);
  const [firstPlayer, setFirstPlayer] = useState<Player | null>(null);
  const [player1, setPlayer1] = useState<Player>({
    symbol: 'X',
    color: '#0000FF',
  });
  const [player2, setPlayer2] = useState<Player>({
    symbol: 'O',
    color: '#FF0000',
  });

  const [stepNumber, setStepNumber] = useState(0);
  const [turnCount, setTurnCount] = useState({
    [player1.symbol]: 0,
    [player2.symbol]: 0,
  });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    resetGame();
  }, [size, winningLength, player1, player2]);

  const resetGame = () => {
    setSquares(Array(size * size).fill(null));
    setHistory([
      {
        squares: Array(size * size).fill(null),
        player: null,
      },
    ]);
    setStepNumber(0);
    setTurnCount({ [player1.symbol]: 0, [player2.symbol]: 0 });
    setIsGameOver(false);
    if (!firstPlayer) {
      setFirstPlayer(Math.random() < 0.5 ? player1 : player2);
    }
  };

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
      firstPlayer?.symbol === player1.symbol ? player1.symbol : player2.symbol;
    setSquares(newSquares);
    setHistory([
      ...currentHistory,
      {
        squares: newSquares,
        player: firstPlayer,
      },
    ]);
    setStepNumber(currentHistory.length);
    setFirstPlayer(firstPlayer === player1 ? player2 : player1);

    const winner = calculateWinner(newSquares, winningLength);
    if (winner) {
      setIsGameOver(true);
      alert(`게임 종료! 승리자: ${winner}`);
    } else if (currentHistory.length === size * size) {
      setIsGameOver(true);
      alert('게임 종료! 무승부!');
    }
  };

  const handleUndo = () => {
    if (stepNumber > 0 && turnCount[firstPlayer!.symbol] < 3 && !isGameOver) {
      setStepNumber(stepNumber - 1);
      setFirstPlayer(firstPlayer === player1 ? player2 : player1);
      setTurnCount({
        ...turnCount,
        [firstPlayer!.symbol]: turnCount[firstPlayer!.symbol] + 1,
      });
    }
  };

  const winner = calculateWinner(squares, winningLength);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (isGameOver) {
    status = '게임 종료! 무승부!';
  } else {
    status = `Next player: ${firstPlayer?.symbol || player1.symbol}`;
  }
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
      <div>
        <button onClick={handleUndo} disabled={isGameOver || !firstPlayer}>
          Undo ({firstPlayer ? turnCount[firstPlayer!.symbol] : 0}/3)
        </button>
      </div>
    </div>
  );
}
