import { configureStore } from "@reduxjs/toolkit";
import { hobbiesReducer } from "./slices/used-for-RTK/hobbiesSlice";
import usersSlice from "./slices/used-for-RTK/usersSlice";
import { clientsReducer } from "./slices/used-for-AsyncThunk/clientsSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photoApi";
export const store = configureStore({
  reducer: {
    users: usersSlice,
    hobs: hobbiesReducer,
    clients: clientsReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDeafaultMiddleware) => {
    return getDeafaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from "./slices/used-for-RTK/usersSlice";
export * from "./slices/used-for-RTK/hobbiesSlice";
export * from "./thunks/fetchClients";
export * from "./thunks/addClients";
export * from "./thunks/removeClient";
export * from "./apis/albumsApi";
export * from "./apis/photoApi";
