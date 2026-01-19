import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";          // <-- add
import { store } from "./redux/store";           // <-- add

import './index.css'
import './utils/jquery-setup'; // Initialize jQuery before App
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>                   {/* <-- wrap App */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
