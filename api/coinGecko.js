export const fetchTopCoins = async (currency = "usd") => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};


