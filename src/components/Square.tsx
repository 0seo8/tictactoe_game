import React from 'react';

type Props = {
  value: string | null;
  onClick: () => void;
  playerColor: string;
};
export default function Square({ value, onClick, playerColor }: Props) {
  const style = value ? { color: playerColor } : {};

  return (
    <div
      className="bg-gray-200 border border-gray-300 w-16 h-16 flex items-center justify-center hover:cursor-pointer hover:bg-gray-300"
      onClick={onClick}
      style={style}
    >
      {value}
    </div>
  );
}
