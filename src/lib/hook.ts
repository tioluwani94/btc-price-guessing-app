import React, { useEffect, useState } from "react";

export const useGameLogic = () => {
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [btcPrice, setBtcPrice] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);

  async function getBTCPrice() {
    try {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice/BTC.json"
      );

      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      const price = data.bpi?.["USD"]?.rate_float;

      setBtcPrice(price);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getBTCPrice();
    const interval = setInterval(getBTCPrice, 10000); // Update BTC price every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleGuess = async (direction: "up" | "down") => {
    if (guess) {
      setMessage("You have an ongoing guess. Please wait.");
      return;
    }

    setGuess(direction);
    setMessage(`You guessed ${direction}. Waiting for resolution...`);
  };

  return { score, message, btcPrice, guess, handleGuess };
};
