import "bulma/css/bulma.css";
import "bulma-list/css/bulma-list.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
