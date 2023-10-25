import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
}
const initialState = [
  {
    id: nanoid(),
    name: "Mary",
  },
];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // addUser:(state, action: PayloadAction<User>) => {
    //     state.push(action.payload);
    // }
    addUser: {
      reducer: (state, action: PayloadAction<User>) => {
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
    removeUser: (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export default usersSlice.reducer;
export const { addUser, removeUser } = usersSlice.actions;
