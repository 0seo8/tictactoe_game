import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Player = {
  symbol: string;
  color: string;
};

export type HistoryItem = {
  squares: (string | null)[];
  player: Player | null;
};

export type GameState = {
  size: number;
  winningLength: number;
  player1: Player;
  player2: Player;
  firstPlayer: Player | null;
  squares: (string | null)[];
  accumulatedHistory: HistoryItem[];
  isGameOver: boolean;
};

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
  accumulatedHistory: [
    {
      squares: [],
      player: null,
    },
  ],
  isGameOver: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameConfig: (state, action: PayloadAction<Partial<GameState>>) => {
      return { ...state, ...action.payload };
    },
    setIsGameOver: (state, action: PayloadAction<boolean>) => {
      state.isGameOver = action.payload;
    },
    setIsGameHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.accumulatedHistory = action.payload;
    },
    setResetConfig: (state) => {
      return { ...state, ...initialState };
    },
  },
});

export const {
  setGameConfig,
  setIsGameOver,
  setIsGameHistory,
  setResetConfig,
} = gameSlice.actions;

export default gameSlice.reducer;
