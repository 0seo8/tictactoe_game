import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import {
  setIsGameOver,
  setIsGameHistory,
  HistoryItem,
} from '@features/game/gameSlice';
import calculateWinner from '@helpers/calculateWinner';

type UseGameStatusCheckerProps = {
  squares: Array<null | string>;
  history: HistoryItem[];
  stepNumber: number;
};

const useGameStatusChecker = ({
  squares,
  stepNumber,
  history,
}: UseGameStatusCheckerProps) => {
  const { size, winningLength } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const winner = calculateWinner(squares, winningLength);

    if (winner) {
      dispatch(setIsGameOver(true));
      dispatch(setIsGameHistory(history));
      alert(`게임 종료! 승리자: ${winner}`);
    } else if (stepNumber === size * size) {
      dispatch(setIsGameOver(true));
      dispatch(setIsGameHistory(history));
      alert('게임 종료! 무승부!');
    }
  }, [squares, winningLength, stepNumber, size, history, dispatch]);

  return null;
};

export default useGameStatusChecker;
