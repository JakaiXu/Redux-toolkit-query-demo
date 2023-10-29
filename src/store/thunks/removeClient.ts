import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ClientData } from "../slices/used-for-AsyncThunk/clientsSlice";
import { usePause } from "../../hooks/usePause";

// export const removeClient = createAsyncThunk(
//   "clients/remove",
//   async (client: ClientData) => {
//     await axios.delete(`http://localhost:3005/clients/${client.id}`);
//     await usePause(1000);
//     return client;
//   }
// );

const removeClient = createAsyncThunk('clients/remove', async (client) => {
  await axios.delete(`http://localhost:3005/clients/${client.id}`);
  return client;
});

export { removeClient };
