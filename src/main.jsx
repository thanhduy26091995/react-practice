import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Game from "./TicTacToe.jsx";
import App from "./FilterableProduct.jsx";
import Stopwatch from "./App.jsx";
import UseEffectExampleApp from "./use-effect-example.jsx";
import UseCallbackExampleApp from "./use-callback-example.jsx";
import UseMemoExampleApp from "./use-memo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UseMemoExampleApp />
  </StrictMode>
);
