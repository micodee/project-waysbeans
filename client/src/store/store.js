import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { waysbeansAPI } from "./waysbeansAPI";
import login from "./reducers/loginSlice";

export const store = configureStore({
  reducer: {
    login,
    [waysbeansAPI.reducerPath]: waysbeansAPI.reducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([waysbeansAPI.middleware])
});

setupListeners(store.dispatch);
