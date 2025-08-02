import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/character';

interface State {
  selected: Character[];
}

const initialState: State = {
  selected: [],
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Character>) {
      const isSelected = state.selected.find(
        (item) => item.id === action.payload.id
      );
      if (isSelected) {
        state.selected = state.selected.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.selected.push(action.payload);
      }
    },
    clearAllSelected(state) {
      state.selected = [];
    },
  },
});

export const { toggleItem, clearAllSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
