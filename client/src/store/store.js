import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { waysbeansAPI } from "./waysbeansAPI";

export const store = configureStore({
  reducer: {
    [waysbeansAPI.reducerPath]: waysbeansAPI.reducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([waysbeansAPI.middleware])
});

setupListeners(store.dispatch);
