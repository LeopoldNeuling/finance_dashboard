//react
import { useState, useEffect } from "react";
//mui
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
//components
import { fetchFromFinnhub } from "../helper/FinnhubAPI";

function TickerHeader({ children, link }) {
  const openLink = () => {
    window.open(link, "__blank");
  };

  return (
    <>
      <Button onClick={openLink}>
        <Typography variant="h4" color="text.main" minHeight={100}>
          {children}
        </Typography>
      </Button>
      <br />
    </>
  );
}

function TickerDataDisplay({ data }) {
  return (
    <>
      <Divider textAlign="left">
        <Typography color="text.secondary">Details</Typography>
      </Divider>
      <Typography variant="overline" color="text.secondary">
        <span className="data-display">
          <b>Exchange:</b> {data.exchange}
        </span>
        <span className="data-display">
          <b>Market Cap:</b>{" "}
          <div>
            {data.marketCapitalization.toFixed(2)}
            <i>{` [${data.currency}]`}</i>
          </div>
        </span>
        <span className="data-display">
          <b>Outstanding Shares:</b> {data.shareOutstanding.toFixed(2)}
        </span>
        <span className="data-display">
          <b>Industry:</b> {data.finnhubIndustry}
        </span>
      </Typography>
    </>
  );
}

function RelatedTicker({ symbol, add }) {
  const [relatedTickerContent, setRelatedContent] = useState([]);

  useEffect(() => {
    const getRelatedTicker = async () => {
      const response = await fetchFromFinnhub("related", symbol);
      setRelatedContent(response);
    };
    getRelatedTicker();
  }, []);

  return (
    <>
      <Divider textAlign="left">
        <Typography color="text.secondary">Related Ticker</Typography>
      </Divider>
      {relatedTickerContent.map((item, idx) => (
        <Button key={idx} onClick={() => add(item)}>
          {item}
        </Button>
      ))}
    </>
  );
}

export default function Ticker({ symbol, addNewTicker, deleteSelf }) {
  const [tickerContent, setTickerContent] = useState();

  useEffect(() => {
    const getTickerInfo = async () => {
      const response = await fetchFromFinnhub("profile", symbol);
      setTickerContent(response);
    };
    getTickerInfo();
  }, []);

  return (
    <Card>
      {tickerContent && (
        <>
          <CardMedia component="img" image={tickerContent.logo} height={250} />

          <CardContent>
            <TickerHeader link={tickerContent.weburl}>
              {tickerContent.name}
            </TickerHeader>
            <br />
            <TickerDataDisplay data={tickerContent} />
            <br />
            <RelatedTicker
              symbol={symbol}
              add={(newSymbol) => addNewTicker(newSymbol)}
            />
          </CardContent>

          <CardActions>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={() => deleteSelf(symbol)}
              endIcon={<DeleteForever />}
            >
              Delete
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
}
