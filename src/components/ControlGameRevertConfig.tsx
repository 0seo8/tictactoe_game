import React, { useState } from 'react';
import CustomButton from '@components/ui/CustomButton';
import { useAppSelector } from '@app/hooks';
import { Player } from '@features/game/gameSlice';

type Props = {
  currentPlayer: Player | null;
  turnCount: { [p: string]: number };
  stepNumber: number;
  handleUndo: () => void;
};

export default function ControlGameRevertConfig({
  currentPlayer,
  turnCount,
  stepNumber,
  handleUndo,
}: Props) {
  const { player1, player2, isGameOver } = useAppSelector(
    (state) => state.game,
  );

  return (
    <div className="flex justify-between w-full pr-4 pl-4">
      <div className="p-4">
        <h2>남은 되돌리기 횟수</h2>
        <div>Player1: ({turnCount[player1!.symbol]} /3)</div>
        <div>Player2: ({turnCount[player2!.symbol]} /3)</div>
      </div>
      {(isGameOver && turnCount[currentPlayer!.symbol] !== 0) || (
        <div className="flex items-center mt-6 justify-center">
          {stepNumber !== 0 && (
            <CustomButton text="되돌리기" onClick={handleUndo} />
          )}
        </div>
      )}
    </div>
  );
}
