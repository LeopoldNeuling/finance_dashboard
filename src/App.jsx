import { useEffect } from "react";
import "./App.css";

export const __key = import.meta.env.VITE_POLYGON_IO_KEY;

const symbol = "AAPL";
const ticker = `https://api.polygon.io/v3/reference/tickers/${symbol}?apiKey=${__key}`;
const relatedTicker = `https://api.polygon.io/v1/related-companies/${symbol}?apiKey=${__key}`;

export default function App() {
  //const [response, setResponse] = useState()
  useEffect(() => {
    const firstFetch = async () => {
      const fetching = await fetch(relatedTicker);
      const response = await fetching.json();
    };
    firstFetch();
  }, []);
}

/**
 * ticker card          (new)<-
 * info                        |
 * related ticker -> onclick ->
 */
