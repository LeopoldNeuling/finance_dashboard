//react
import { createRoot } from "react-dom/client";
//mui
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
//components
import App from "./App.jsx";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

createRoot(document.getElementById("root")).render(
  <ThemeProvider
    theme={createTheme({
      palette: {
        mode: isDarkMode ? "dark" : "light",
      },
    })}
  >
    <CssBaseline />
    <App />
  </ThemeProvider>
);
