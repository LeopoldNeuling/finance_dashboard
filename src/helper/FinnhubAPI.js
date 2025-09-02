import moment from "moment";
const __key = import.meta.env.VITE_FINNHUB_KEY;

const today = moment().format("YYYY-MM-DD");
const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
const base = "https://finnhub.io/api/v1/";
const endpoints = {
  profile: "stock/profile2?",
  related: "stock/peers?",
  news: `company-news?from=${yesterday}&to=${today}&`,
};

export async function fetchFromFinnhub(type, symbol) {
  const url = endpoints[type];
  const response = await fetch(base + url + `symbol=${symbol}&token=${__key}`);
  return await response.json();
}
