//react
import { Fragment, useEffect, useState } from "react";
//mui
import { Box } from "@mui/material";
//components
import Ticker from "./submodules/Ticker";
import TickerNews from "./submodules/TickerNews";
import "./App.css";

export default function App() {
  const [tickers, setTickers] = useState(["AAPL"]);
  useEffect(() => console.log(tickers), [tickers]);

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
        <Fragment key={i}>
          <Ticker
            symbol={ticker}
            addNewTicker={(symbol) => pushTicker(symbol)}
            deleteSelf={(symbol) => popTicker(symbol)}
          />
          <TickerNews symbol={ticker} />
        </Fragment>
      ))}
    </Box>
  );
}
