import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@app/hooks';
import CustomButton from '@components/ui/CustomButton';
import { setResetConfig } from '@features/game/gameSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const setUpGameHandler = () => {
    alert('기록된 게임이 있는 경우 게임이 초기화 됩니다.');
    dispatch(setResetConfig());
    navigate('/setup');
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">변형된 Tic Tac Toe 게임</h1>
      <div className="flex justify-between mt-6">
        <CustomButton
          text="게임 시작"
          onClick={setUpGameHandler}
        ></CustomButton>
        <CustomButton
          text="기록된 게임 보기"
          onClick={() => navigate('/records')}
        ></CustomButton>
      </div>
    </main>
  );
}
