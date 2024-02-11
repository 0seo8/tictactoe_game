import React from 'react';
import CustomButton from '@components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <main>
      <h1 className="text-3xl font-bold">변형된 Tic Tac Toe 게임</h1>
      <div className="flex justify-between mt-6">
        <CustomButton
          text="게임 시작"
          onClick={() => navigate('/setup')}
        ></CustomButton>
        <CustomButton
          text="기록된 게임 보기"
          onClick={() => navigate('/records')}
        ></CustomButton>
      </div>
    </main>
  );
}
