const __key = import.meta.env.VITE_FINNHUB_KEY;

export async function fetchFromFinnhub(url) {
  const response = await fetch(url + `&token=${__key}`);
  return await response.json();
}
