import GameCard from "../components/game-card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center p-24 bg-slate-100 dark:bg-slate-800">
      <div className="max-w-[360px] w-full mx-auto flex flex-col items-center gap-6">
        <Image
          width={80}
          height={80}
          alt="btc logo"
          src="/bitcoin-btc-logo.svg"
        />
        <h1 className="font-bold text-xl text-center">
          BTC Price Guessing Game
        </h1>
        <GameCard />
      </div>
    </main>
  );
}
