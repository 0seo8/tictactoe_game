import CustomButton from '@components/ui/CustomButton';
import { useNavigate } from 'react-router-dom';
import SectionBoard from '@components/SectionBoard';
import PlayerInfo from '@components/PlayerInfo';
import { useState } from 'react';
import { useAppSelector } from '@app/hooks';
import ControlGameRevertConfig from '@components/ControlGameRevertConfig';

export default function GameBoard() {
  const navigate = useNavigate();
  const { player1, player2, firstPlayer, isGameOver } = useAppSelector(
    (state) => state.game,
  );
  const [currentPlayer, setCurrentPlayer] = useState(firstPlayer);
  const [stepNumber, setStepNumber] = useState(0);
  const [turnCount, setTurnCount] = useState({
    [player1.symbol]: 0,
    [player2.symbol]: 0,
  });

  const handleUndo = () => {
    if (stepNumber > 0 && turnCount[currentPlayer!.symbol] < 3 && !isGameOver) {
      setStepNumber(stepNumber - 1);
      setCurrentPlayer(currentPlayer === player1 ? player2 : player1);
      setTurnCount({
        ...turnCount,
        [currentPlayer!.symbol]: turnCount[currentPlayer!.symbol] + 1,
      });
    }
  };

  return (
    <section className="w-full max-w-[850px] p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">게임 보드</h1>
      <div className="w-full flex items-center">
        <SectionBoard
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          stepNumber={stepNumber}
          setStepNumber={setStepNumber}
        />
        <div>
          <PlayerInfo currentPlayer={currentPlayer} />
          <ControlGameRevertConfig
            currentPlayer={currentPlayer}
            turnCount={turnCount}
            stepNumber={stepNumber}
            handleUndo={handleUndo}
          />
        </div>
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
