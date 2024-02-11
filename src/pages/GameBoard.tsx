import CustomButton from '@components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';
import SectionBoard from '@components/SectionBoard';
import PlayerInfo from '@components/PlayerInfo';
import { useState } from 'react';
import { useAppSelector } from '@app/hooks';

export default function GameBoard() {
  const navigate = useNavigate();
  const { firstPlayer } = useAppSelector((state) => state.game);
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  return (
    <section className="w-full max-w-[850px] p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">게임 보드</h1>
      <div className="w-full flex">
        <SectionBoard
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
        />
        <PlayerInfo currentPlayer={currentPlayer} />
      </div>
      <div className="flex items-center mt-6 justify-center">
        <CustomButton
          text="홈으로"
          onClick={() => navigate('/')}
        ></CustomButton>
      </div>
    </section>
  );
}
