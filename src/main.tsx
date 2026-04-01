import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Diagnostic error handler for production debugging
if (import.meta.env.PROD) {
  window.onerror = (event, source, lineno, colno, error) => {
    console.error("Production Runtime Error:", {
      event,
      source,
      lineno,
      colno,
      error,
    });
  };
  window.onunhandledrejection = (event) => {
    console.error("Unhandled Promise Rejection:", event.reason);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
