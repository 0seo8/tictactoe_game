const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines: number[][] = [];

  // 가로
  for (let i = 0; i < Math.sqrt(squares.length); i++) {
    const row = [];
    for (let j = 0; j < Math.sqrt(squares.length); j++) {
      row.push(i * Math.sqrt(squares.length) + j);
    }
    lines.push(row);
  }

  // 세로
  for (let i = 0; i < Math.sqrt(squares.length); i++) {
    const col = [];
    for (let j = 0; j < Math.sqrt(squares.length); j++) {
      col.push(i + Math.sqrt(squares.length) * j);
    }
    lines.push(col);
  }

  // 대각선
  const diagonal1 = [];
  const diagonal2 = [];
  for (let i = 0; i < Math.sqrt(squares.length); i++) {
    diagonal1.push(i * (Math.sqrt(squares.length) + 1));
    diagonal2.push((i + 1) * (Math.sqrt(squares.length) - 1));
  }
  lines.push(diagonal1, diagonal2);

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as string;
    }
  }

  return null;
};

export default calculateWinner;
