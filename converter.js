//const fetch = require("node-fetch");

async function getConversions() {
  const fetch = (await import("node-fetch")).default;
  const apiKey = "20707639727d2b41edcce321";
  let code = "USD";
  const url = `https://v6.exchangerate-api.com/v6/20707639727d2b41edcce321/latest/${code}`;

  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch exchange rates");
  }

  const responseData = await response.json();
  return responseData;
}

function converter(amount, fromCurrency, toCurrency, exchangeRates) {
  const rate = exchangeRates.conversion_rates[toCurrency];
  if (!rate) {
    throw new Error(`Conversion rate for ${toCurrency} not found`);
  }
  const convertedAmount = amount * rate;
  return convertedAmount;
}

module.exports = {
  converter,
  getConversions,
};
