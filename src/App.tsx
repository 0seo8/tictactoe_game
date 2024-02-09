import Board from '@components/Board';

const App: React.FC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default App;
