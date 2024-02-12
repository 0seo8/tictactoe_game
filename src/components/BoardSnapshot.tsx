import React from 'react';
import { useAppSelector } from '@app/hooks';

type Props = {
  squares: (string | null)[];
};
export default function BoardSnapshot({ squares }: Props) {
  const { size, player1, player2 } = useAppSelector((state) => state.game);
  return (
    <div className="flex items-center justify-center">
      {[...Array(size)].map((_, row) => (
        <div key={row} className="flex flex-col">
          {[...Array(size)].map((_, col) => (
            <div
              key={col}
              style={{
                color:
                  squares[row * size + col] === player1.symbol
                    ? player1.color
                    : player2.color,
              }}
              className="bg-gray-200 border border-gray-300 w-16 h-16 flex items-center justify-center"
            >
              {squares[row * size + col]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
