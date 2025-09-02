//react
import { useEffect, useState } from "react";
//mui
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
//components
import { fetchFromFinnhub } from "../helper/FinnhubAPI";

function Article({ data }) {
  const openArticle = () => {
    window.open(data.url, "_blank");
  };

  return (
    <Card>
      {data.source !== "Yahoo" && (
        <CardMedia
          component="img"
          image={data.image}
          sx={{ maxHeight: "40vh" }}
        />
      )}
      <CardContent>
        <Typography variant="h5">{data.headline}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {data.summary}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Author: {data.source}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={openArticle} endIcon={<OpenInNew />}>
          Read Online
        </Button>
      </CardActions>
    </Card>
  );
}

export default function TickerNews({ symbol }) {
  const [news, setNews] = useState([]);
  const [newsArray, setNewsArray] = useState([]);
  const [newsPointer, setNewsPointer] = useState(0);

  const checkForNoImage = (pointerIdx) =>
    news[pointerIdx].source === "Yahoo" &&
    news[pointerIdx + 1] &&
    news[pointerIdx + 1].source === "Yahoo";

  useEffect(() => {
    const buffer = [];

    if (news[newsPointer]) {
      buffer.push(<Article data={news[newsPointer]} />);

      if (checkForNoImage(newsPointer)) {
        buffer.push(<Article data={news[newsPointer + 1]} />);
      }
      if (checkForNoImage(newsPointer + 1)) {
        buffer.push(<Article data={news[newsPointer + 2]} />);
      }
    }

    setNewsArray(buffer);
  }, [newsPointer, news]);

  useEffect(() => {
    const getNews = async () => {
      const response = await fetchFromFinnhub("news", symbol);
      setNews(response);
    };
    getNews();
  }, []);

  return (
    <Card sx={{ position: "relative" }}>
      {news && (
        <>
          <CardContent>
            {newsArray.map((item, i) => (
              <div key={i} style={{ marginBottom: "1vh" }}>
                {item}
              </div>
            ))}
          </CardContent>
          <CardActions sx={{ position: "absolute", bottom: 0 }}>
            <Pagination
              count={news.length - 1}
              page={newsPointer + 1}
              onChange={(_, pageNum) => setNewsPointer(pageNum - 1)}
            />
          </CardActions>
        </>
      )}
    </Card>
  );
}
