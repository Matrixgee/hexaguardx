import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./Function/Store.tsx";
import { ThemeProvider } from "./Context/theme.tsx";
import "./styles/custom.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
