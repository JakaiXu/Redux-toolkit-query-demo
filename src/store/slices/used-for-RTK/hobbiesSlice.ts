import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

interface InitialState {
  id: string;
  hob: string;
}

const initialState = [
  {
    id: nanoid(),
    hob: "Music",
  },
];

const hobbiesSlice = createSlice({
  name: "hob",
  initialState,
  reducers: {
    addHob: {
      reducer: (state, action: PayloadAction<InitialState>) => {
        state.push(action.payload);
      },
      prepare: (value) => {
        return {
          payload: {
            ...value,
            id: nanoid(),
          },
        };
      },
    },
    removeHob: (state, action) => {
      return state.filter((hob) => hob.id !== action.payload.hob);
    },
  },
});

export default hobbiesSlice;
export const hobbiesReducer = hobbiesSlice.reducer
export const { addHob, removeHob } = hobbiesSlice.actions;
