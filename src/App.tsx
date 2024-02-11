import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import GameSetup from '@/pages/GameSetup';
import GameBoard from '@/pages/GameBoard';
import GameRecord from '@/pages/GameRecord';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="setup" element={<GameSetup />} />
      <Route path="game" element={<GameBoard />} />
      <Route path="records" element={<GameRecord />} />
    </Routes>
  );
};

export default App;
