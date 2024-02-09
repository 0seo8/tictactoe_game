import React from 'react';

type Props = {
  value: string | null;
  onClick: () => void;
};
export default function Square({ value, onClick }: Props) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}
