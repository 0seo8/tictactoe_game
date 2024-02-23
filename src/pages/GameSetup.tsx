import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@app/hooks';
import CustomButton from '@components/ui/CustomButton';
import { Player, setGameConfig } from '@features/game/gameSlice';

export default function GameSetup() {
  const [size, setSize] = useState(3);
  const [winningLength, setWinningLength] = useState(3);
  const [firstPlayer, setFirstPlayer] = useState<Player | null>(null);
  const [player1, setPlayer1] = useState<Player>({
    symbol: 'X',
    color: '#0000FF',
  });
  const [player2, setPlayer2] = useState<Player>({
    symbol: 'O',
    color: '#FF0000',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleStartGame = () => {
    dispatch(
      setGameConfig({
        size,
        winningLength,
        firstPlayer: !firstPlayer
          ? Math.random() < 0.5
            ? player1
            : player2
          : firstPlayer,
        player1,
        player2,
      }),
    );
    navigate('/game');
  };

  return (
    <main className="p-10 bg-gray-100 flex flex-col text-center gap-3">
      <h1 className="text-3xl font-bold mb-4">게임 설정</h1>
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
      <div className="flex items-center mt-6 justify-center">
        <CustomButton text="시작" onClick={handleStartGame}></CustomButton>
      </div>
    </main>
  );
}
