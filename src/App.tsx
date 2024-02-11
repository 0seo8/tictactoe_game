import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import GameSetup from '@/pages/GameSetup';
import GameBoard from '@/pages/GameBoard';
import GameRecord from '@/pages/GameRecord';

const App: React.FC = () => {
  return (
    <main className="w-full flex justify-center pt-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="setup" element={<GameSetup />} />
        <Route path="game" element={<GameBoard />} />
        <Route path="records" element={<GameRecord />} />
      </Routes>
    </main>
  );
};

export default App;
