import React from 'react';
import { useAppSelector } from '@app/hooks';
import styled from 'styled-components';
import { Player } from '@features/game/gameSlice';

const DynamicColorText = styled.div`
  font-size: large;
  font-weight: bold;
  color: ${(props) => props.color};
`;

const DynamicColorBg = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

type Props = {
  currentPlayer: Player | null;
};

export default function PlayerInfo({ currentPlayer }: Props) {
  const { player1, player2, firstPlayer } = useAppSelector(
    (state) => state.game,
  );
  return (
    <div className="basis-2/5 ml-8">
      <ul className="flex flex-col gap-2">
        <li className="flex gap-2">
          <DynamicColorText>Player1: </DynamicColorText>
          <div className="flex gap-2 items-center justify-center">
            <span className="font-bold">{player1.symbol}</span>
            (<DynamicColorBg color={player1.color} />)
          </div>
        </li>
        <li className="flex gap-2">
          <DynamicColorText>Player2: </DynamicColorText>
          <div className="flex gap-2 items-center justify-center">
            <span className="font-bold">{player2.symbol}</span>(
            <DynamicColorBg color={player2.color}></DynamicColorBg>)
          </div>
        </li>
        <li className="flex gap-2">
          <DynamicColorText>FirstPlayer: </DynamicColorText>
          <span>
            {firstPlayer?.symbol === player1.symbol ? 'player1' : 'player2'}
          </span>
        </li>
        <li className="flex gap-2">
          <DynamicColorText>Turn: </DynamicColorText>
          <span>
            {currentPlayer?.symbol === player1.symbol ? 'player1' : 'player2'}
          </span>
        </li>
      </ul>
    </div>
  );
}
