//react
import { useState } from "react";
//mui
import { Box } from "@mui/material";
import { Ticker } from "./submodules/Ticker";
//components
import "./App.css";

export default function App() {
  const [tickers, setTickers] = useState(["AAPL"]);

  const pushTicker = (symbol) => {
    if (confirm(`Add "${symbol}" to Dashboard?`))
      setTickers((prev) => [...prev, symbol]);
  };
  const popTicker = (deleteTicker) => {
    if (confirm(`Delete "${deleteTicker}" from Dashboard?`))
      setTickers((prev) => prev.filter((symbol) => symbol !== deleteTicker));
  };

  return (
    <Box className="container">
      {tickers.map((ticker, i) => (
        <Ticker
          key={i}
          symbol={ticker}
          addNewTicker={(name) => pushTicker(name)}
          deleteSelf={() => popTicker(ticker)}
        />
      ))}
    </Box>
  );
}
