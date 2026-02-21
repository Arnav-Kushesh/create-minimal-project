import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

let container = document.getElementById("root");

let Component = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (container.innerHTML.trim()) {
  hydrateRoot(container, Component);
} else {
  createRoot(container).render(Component);
}
