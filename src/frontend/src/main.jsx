import React from "react";
import ReactDOM from "react-dom";
import { DNAProvider } from "./component/Provider";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
ReactDOM.render(
  <React.StrictMode>
    <DNAProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DNAProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
