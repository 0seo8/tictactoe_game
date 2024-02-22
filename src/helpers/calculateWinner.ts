type SquareValue = string | null;
const checkLine = (squares: SquareValue[], line: number[]): SquareValue => {
  let marker = squares[line[0]];
  let isVictory = line.every((value) => squares[value] === marker);
  if (isVictory) return marker;
  return null;
};

const checkHorizontal = (
  squares: SquareValue[],
  size: number,
  winningLength: number,
): SquareValue => {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winningLength; j++) {
      const horizontalLine = Array.from(
        { length: winningLength },
        (_, index) => i * size + j + index,
      );
      const winner = checkLine(squares, horizontalLine);
      if (winner) return winner;
    }
  }
  return null;
};

const checkVertical = (
  squares: SquareValue[],
  size: number,
  winningLength: number,
): SquareValue => {
  for (let i = 0; i <= size - winningLength; i++) {
    for (let j = 0; j < size; j++) {
      const verticalLine = Array.from(
        { length: winningLength },
        (_, index) => j + (i + index) * size,
      );
      const winner = checkLine(squares, verticalLine);
      if (winner) return winner;
    }
  }
  return null;
};

const checkDiagonals = (
  squares: SquareValue[],
  size: number,
  winningLength: number,
): SquareValue => {
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

      const winner1 = checkLine(squares, diagonal1);
      const winner2 = checkLine(squares, diagonal2);
      if (winner1) return winner1;
      if (winner2) return winner2;
    }
  }
  return null;
};
const calculateWinner = (
  squares: SquareValue[],
  winningLength: number,
): SquareValue => {
  const size = Math.sqrt(squares.length);
  return (
    checkHorizontal(squares, size, winningLength) ||
    checkVertical(squares, size, winningLength) ||
    checkDiagonals(squares, size, winningLength) ||
    null
  );
};

export default calculateWinner;
