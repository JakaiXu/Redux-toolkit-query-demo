import { createSlice } from "@reduxjs/toolkit";
import { fetchClients } from "../../thunks/fetchClients";
import { addClients } from "../../thunks/addClients";
import { removeClient } from "../../thunks/removeClient";
import { updateClient } from "../../thunks/updateClient";

export interface ClientData {
  id: number;
  name: string;
}
interface InitialStateProps {
  data: ClientData[];
  isLoading: boolean;
  error: string | null | undefined;
}

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  } as InitialStateProps,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchClients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error ? action.error.message : null;
    });
    builder.addCase(addClients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addClients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addClients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error ? action.error.message : null;
    });
    builder.addCase(removeClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((client) => {
        return client.id !== action.payload.id;
      });
    });
    builder.addCase(removeClient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error ? action.error.message : null;
    });
    builder.addCase(updateClient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedIndex = state.data.findIndex(
        (i) => i.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = action.payload;
      }
    });
    builder.addCase(updateClient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error ? action.error.message : null;
    });
  },
});

export const clientsReducer = clientsSlice.reducer;
