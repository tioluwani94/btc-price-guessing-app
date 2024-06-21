import { useCallback, useEffect, useRef, useState } from "react";
import { getBTCPrice } from "./api-client";

const useCountDown = () => {
  const [countDown, setCountDown] = useState(60);
  const [startCountDown, setStartCountDown] = useState(false);

  useEffect(() => {
    if (startCountDown) {
      const interval = setInterval(() => {
        if (countDown !== 0) {
          setCountDown(countDown - 1);
        } else {
          setCountDown(60);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDown, startCountDown]);

  return { countDown, startCountDown, setCountDown, setStartCountDown };
};

const useLocalStorageState = (
  key: string,
  defaultValue: any = "",
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
  const [state, setState] = useState(() => {
    const localStorageValue = window?.localStorage?.getItem(key) ?? "0";

    if (localStorageValue) {
      try {
        return deserialize(localStorageValue);
      } catch (error) {
        window?.localStorage?.removeItem(key);
      }
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = useRef(key);

  useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  return [state, setState];
};

export const useGetLatestBTCPrice = () => {
  const [btcPrice, setBtcPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchLatestBTCPrice() {
    try {
      const res = await getBTCPrice();

      setBtcPrice(res);
    } catch (error: any) {
      setErrorMessage(error?.message ?? error);
    }
  }

  useEffect(() => {
    fetchLatestBTCPrice();
    const interval = setInterval(fetchLatestBTCPrice, 10000); // Update BTC price every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return {
    btcPrice,
    errorMessage,
  };
};

export const useGameHook = (latestBTCPrice: number) => {
  const [message, setMessage] = useState("");
  const [score, setScore] = useLocalStorageState("btc-game", 0);

  const [userGuess, setUserGuess] = useState<string | null>(null);

  const { countDown, startCountDown, setCountDown, setStartCountDown } =
    useCountDown();

  const btcPriceOnUserGuess = useRef<number | undefined>();

  const handleGuess = (direction: "up" | "down") => {
    btcPriceOnUserGuess.current = latestBTCPrice;

    setMessage("");
    setUserGuess(direction);
    setStartCountDown(true);
  };

  const handleReset = useCallback(() => {
    setCountDown(60);
    setStartCountDown(false);
    setUserGuess(null);
  }, [setCountDown, setStartCountDown]);

  const handleUpdateScore = useCallback(() => {
    const check =
      btcPriceOnUserGuess.current &&
      ((userGuess === "up" && latestBTCPrice > btcPriceOnUserGuess.current) ||
        (userGuess === "down" && latestBTCPrice < btcPriceOnUserGuess.current));

    if (check) {
      setScore(score + 1);
      setMessage("Hurray! you guessed right 🎉");
    } else {
      setScore(score - 1);
      setMessage("Sorry you guessed wrong 😢");
    }

    handleReset();
  }, [handleReset, latestBTCPrice, score, setScore, userGuess]);

  useEffect(() => {
    if (countDown === 0) {
      handleUpdateScore();
    }
  }, [countDown, handleUpdateScore]);

  return {
    score,
    message,
    userGuess,
    countDown,
    startCountDown,
    btcPriceOnUserGuess,
    handleGuess,
  };
};
