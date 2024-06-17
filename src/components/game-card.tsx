"use client";

import { useGameLogic } from "@/lib/hook";
import Button from "./button";

export default function GameCard() {
  const { message, score, btcPrice, guess, handleGuess } = useGameLogic();

  return (
    <div className="w-full rounded-md bg-white p-4 shadow-md">
      <div className="flex flex-col gap-3">
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
          Will the price go up or down <span role="img">🤷🏼‍♂️</span>?
        </p>
        <p>
          Your guess <span role="img">🙂</span>
        </p>
        <div className="flex gap-2">
          <Button
            disabled={!!guess}
            className="bg-green-600"
            onClick={() => handleGuess("up")}
          >
            Up
          </Button>
          <Button
            disabled={!!guess}
            className="bg-red-700"
            onClick={() => handleGuess("down")}
          >
            Down
          </Button>
        </div>
        <p className="text-xs text-gray-500">{message}</p>
      </div>
    </div>
  );
}
