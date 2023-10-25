import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { usePause } from "../../hooks/usePause";

export const fetchClients = createAsyncThunk("clients/fetch", async () => {
  const response = await axios.get("http://localhost:3005/clients");
  await usePause(1000);
  return response.data;
});
