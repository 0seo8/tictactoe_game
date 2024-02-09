import React from 'react';

type Props = {
  value: string | null;
  onClick: () => void;
  playerColor: string;
};
export default function Square({ value, onClick, playerColor }: Props) {
  const style = value ? { color: playerColor } : {};

  return (
    <button className="square" onClick={onClick} style={style}>
      {value}
    </button>
  );
}
