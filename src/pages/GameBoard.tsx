import React, { useState } from 'react';
import Square from '@components/Square';
import { useAppSelector } from '@app/hooks';
import CustomButton from '@components/ui/CustomButton';
import calculateWinner from '@helpers/calculateWinner';
import { HistoryItem } from '@features/game/gameSlice';
import { useNavigate } from 'react-router-dom';
import SectionBoard from '@components/SectionBoard';

export default function GameBoard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">게임 보드</h1>
      <SectionBoard />
      <div className="flex items-center mt-6 justify-center">
        <CustomButton
          text="홈으로"
          onClick={() => navigate('/')}
        ></CustomButton>
      </div>
    </div>
  );
}
