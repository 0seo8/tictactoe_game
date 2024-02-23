import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@app/hooks';
import BoardSnapshot from '@components/BoardSnapshot';
import CustomButton from '@components/ui/CustomButton';

export default function GameRecord() {
  const { accumulatedHistory, player1 } = useAppSelector((state) => state.game);
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">기록된 게임 보기</h2>
      <ul>
        {accumulatedHistory.map((step, move) => (
          <li key={move} className="mb-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Turn {move + 1}</span>
              <span className="text-gray-600">
                {step.player?.symbol === player1.symbol
                  ? 'player1'
                  : 'player2' || '무승부'}
              </span>
            </div>
            <div className="mt-2">
              <BoardSnapshot squares={step.squares} />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center mt-6 justify-center">
        <CustomButton
          text="홈으로"
          onClick={() => navigate('/')}
        ></CustomButton>
      </div>
    </div>
  );
}
