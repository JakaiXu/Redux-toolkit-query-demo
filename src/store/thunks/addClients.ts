import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { usePause } from "../../hooks/usePause";

export const addClients = createAsyncThunk("clients/add", async () => {
  const response = await axios.post("http://localhost:3005/clients", {
    name: faker.person.firstName(),
  });
  await usePause(1000);
  return response.data;
});
