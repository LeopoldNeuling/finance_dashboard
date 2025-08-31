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
import { SecText, HText } from "../helpers/TextElements";

const __key = import.meta.env.VITE_FINNHUB_KEY;

const fetchFromFinnhub = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

export function Ticker({ symbol, addNewTicker, deleteSelf }) {
  const tickerURL = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${__key}`;
  const relatedTickerURL = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${__key}`;

  const [tickerContent, setTickerContent] = useState();
  const [relatedTickerContent, setRelatedContent] = useState([]);

  const getTickerInfo = async () => {
    const response = await fetchFromFinnhub(tickerURL);
    setTickerContent(response);
  };

  const getRelatedTicker = async () => {
    const response = await fetchFromFinnhub(relatedTickerURL);
    setRelatedContent(response);
  };

  useEffect(() => {
    getTickerInfo();
    getRelatedTicker();
  }, []);

  return (
    <Card>
      {tickerContent && (
        <>
          <CardMedia component="img" image={tickerContent.logo} height={250} />

          <CardContent>
            <HText link={tickerContent.weburl}>{tickerContent.name}</HText>
            <br />

            <Divider textAlign="left">
              <Typography color="text.secondary">Details</Typography>
            </Divider>
            <SecText>
              <span>Market Cap: {tickerContent.marketCapitalization}</span>
              <br />
              <span>Exchange: {tickerContent.exchange}</span>
              <br />
              <span>Industry: {tickerContent.finnhubIndustry}</span>
              <br />
            </SecText>
            <br />

            <Divider textAlign="left">
              <Typography color="text.secondary">Related Ticker</Typography>
            </Divider>
            {relatedTickerContent && (
              <>
                {relatedTickerContent.map((item, idx) => (
                  <Button key={idx} onClick={() => addNewTicker(item)}>
                    {item}
                  </Button>
                ))}
              </>
            )}
          </CardContent>

          <CardActions>
            <Button
              fullWidth
              color="error"
              variant="outlined"
              onClick={deleteSelf}
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
