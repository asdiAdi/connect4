import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketWrapper>
      <App />
    </SocketWrapper>
  </StrictMode>,
);
