export async function getBTCPrice() {
  try {
    const res = await fetch(
      "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
    );

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data.bpi?.["USD"]?.rate_float;
  } catch (error) {
    return error;
  }
}
