import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ClientData } from "../slices/used-for-AsyncThunk/clientsSlice";
import { usePause } from "../../hooks/usePause";

export const updateClient = createAsyncThunk(
  "clients/update",
  async (client: ClientData) => {
   const response = await axios.put(`http://localhost:3005/clients/${client.id}`);
    await usePause(1000);
    return response.data;
  }
);
