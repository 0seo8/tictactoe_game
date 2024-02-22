// FIXME: 대각선, 세로, 가로 함수 분리

const calculateWinner = (
  squares: (string | null)[],
  winningLength: number,
): string | null => {
  const size = Math.sqrt(squares.length);
  const checkLine = (line: number[]): string | null => {
    let marker = squares[line[0]];
    let isVictory = line.every((value) => squares[value] === marker);
    if (isVictory) return marker;
    return null;
  };

  // 가로, 세로, 대각선
  for (let i = 0; i < size; i++) {
    // 가로
    for (let j = 0; j <= size - winningLength; j++) {
      const horizontalLine = Array.from(
        { length: winningLength },
        (_, index) => i * size + j + index,
      );
      const winner = checkLine(horizontalLine);
      if (winner) {
        return winner;
      }
    }

    // 세로
    for (let j = 0; j <= size - winningLength; j++) {
      const verticalLine = Array.from(
        { length: winningLength },
        (_, index) => i + (j + index) * size,
      );
      const winner = checkLine(verticalLine);
      if (winner) {
        return winner;
      }
    }
  }

  // 대각선
  for (let i = 0; i <= size - winningLength; i++) {
    for (let j = 0; j <= size - winningLength; j++) {
      const diagonal1 = Array.from(
        { length: winningLength },
        (_, index) => (i + index) * size + j + index,
      );
      const diagonal2 = Array.from(
        { length: winningLength },
        (_, index) => (i + index) * size + (j + winningLength - 1 - index),
      );
      const winner1 = checkLine(diagonal1);
      const winner2 = checkLine(diagonal2);
      if (winner1) {
        return winner1;
      }
      if (winner2) {
        return winner2;
      }
    }
  }

  return null;
};

export default calculateWinner;
