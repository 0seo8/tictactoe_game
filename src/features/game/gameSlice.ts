import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PlayerConfig {
  mark: string;
  color: string;
}

export type Player = {
  symbol: string;
  color: string;
};

export type HistoryItem = {
  squares: (string | null)[];
  player: Player | null;
};

export interface GameState {
  size: number;
  winningLength: number;
  player1: Player;
  player2: Player;
  firstPlayer: Player | null;
  squares: (string | null)[];
  history: HistoryItem[];
}

const initialState: GameState = {
  size: 3,
  winningLength: 3,
  player1: {
    symbol: 'X',
    color: '#0000FF',
  },
  player2: {
    symbol: 'O',
    color: '#FF0000',
  },
  firstPlayer: null,
  squares: [],
  history: [
    {
      squares: [],
      player: null,
    },
  ],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameConfig: (state, action: PayloadAction<Partial<GameState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setGameConfig } = gameSlice.actions;

export default gameSlice.reducer;
