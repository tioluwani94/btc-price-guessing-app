"use client";

import { useGameLogic, useGetLatestBTCPrice } from "@/lib/hook";
import Button from "./button";

export default function GameCard() {
  const { btcPrice } = useGetLatestBTCPrice();
  const { score, userGuess, countDown, startCountDown, message, handleGuess } =
    useGameLogic(btcPrice);

  return (
    <div className="w-full rounded-md bg-white p-4 shadow-md">
      <div className="flex flex-col gap-3 text-gray-900">
        <p className="font-bold">
          Current BTC Price:{" "}
          <span className="font-normal">
            ${new Intl.NumberFormat("en-US").format(btcPrice)}
          </span>
        </p>
        <p className="font-bold">
          Your Score: <span className="font-normal">{score}</span>
        </p>
        <hr />
        <p>
          Will the BTC price go up or down <span role="img">🤷🏼‍♂️</span>?
        </p>
        <p>
          Your guess <span role="img">🙂</span>
        </p>
        <div className="flex gap-2 items-center">
          <Button
            disabled={!!userGuess}
            className="bg-green-600"
            onClick={() => handleGuess("up")}
          >
            Up
          </Button>
          <p className="font-bold">OR</p>
          <Button
            disabled={!!userGuess}
            className="bg-red-700"
            onClick={() => handleGuess("down")}
          >
            Down
          </Button>
        </div>
        {startCountDown && (
          <p className="text-xs text-gray-500">
            You guessed <strong>{userGuess}</strong>. Waiting for resolution in{" "}
            {countDown}s...
          </p>
        )}
        {message && <p className="text-xs text-gray-500">{message}</p>}
      </div>
    </div>
  );
}
