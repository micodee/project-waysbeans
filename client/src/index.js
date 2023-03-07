import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/contextUser";

import MainApp from "./router/MainApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <MainApp />
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
