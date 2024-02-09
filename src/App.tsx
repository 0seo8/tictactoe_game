import React, { useState } from 'react';
import Board from '@components/Board';

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState(3);

  return (
    <div className="game">
      <div className="game-board">
        <Board size={boardSize} />
      </div>
      <div className="game-info">
        <div>
          <label>Select Board Size: </label>
          <select
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
          >
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default App;
