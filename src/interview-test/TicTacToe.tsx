import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index: number) {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div style={styles.container}>
      <h2>{status}</h2>

      <div style={styles.board}>
        {board.map((value, index) => (
          <button
            key={index}
            style={styles.square}
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button onClick={resetGame} style={styles.reset}>
        Reset
      </button>
    </div>
  );
}

/* Winner calculation */
function calculateWinner(board: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

/* Inline styles for simplicity */
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center' as const,
    marginTop: 40,
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 80px)',
    gap: 8,
    justifyContent: 'center',
    margin: '20px 0',
  },
  square: {
    width: 80,
    height: 80,
    fontSize: 32,
    cursor: 'pointer',
  },
  reset: {
    marginTop: 10,
    padding: '8px 16px',
    cursor: 'pointer',
  },
};
