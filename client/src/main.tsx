import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

const rootEl = document.getElementById("root")!;

// If the root element already has children, the server pre-rendered this route.
// Use hydrateRoot to attach React to the existing markup without discarding it.
// For all other routes the root is empty — use createRoot as before.
if (rootEl.hasChildNodes()) {
  hydrateRoot(
    rootEl,
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
} else {
  createRoot(rootEl).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
}
