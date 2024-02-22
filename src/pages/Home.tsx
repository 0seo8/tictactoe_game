import React, { useState } from 'react';
import CustomButton from '@components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks';
import { setResetConfig } from '@features/game/gameSlice';
import ModalPortal from '@components/ModalPortal';
import GameModal from '@components/GameModal';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);
  const setUpGameHandler = () => {
    setOpenModal(true);
    dispatch(setResetConfig());
    // navigate('/setup');
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
      {openModal && (
        <ModalPortal>
          <GameModal onClose={() => setOpenModal(false)}>
            기록된 게임이 있는 경우 게임이 초기화 됩니다.
          </GameModal>
        </ModalPortal>
      )}
    </main>
  );
}
