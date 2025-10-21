"use client";

import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/game-board";
import { GameOverScreen } from "@/components/game-over-screen";
import { useSnakeGame } from "@/hooks/use-snake-game";
import { GRID_SIZE } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    snakeSegments,
    foodPosition,
    score,
    isGameOver,
    isRunning,
    startGame,
    isGameReady,
  } = useSnakeGame();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <header className="w-full max-w-2xl text-center mb-4 md:mb-6">
        <h1 className="text-4xl md:text-6xl font-bold text-accent font-headline tracking-widest">
          Snake Game
        </h1>
        <p className="text-2xl md:text-3xl mt-2 text-primary-foreground">
          Score: {score}
        </p>
      </header>
      
      <p className="mb-4 text-center text-muted-foreground">
        Use Arrow Keys or W/A/S/D to move
      </p>

      <div className="relative w-full max-w-lg lg:max-w-xl aspect-square border-4 border-primary shadow-[0_0_20px_theme(colors.primary)]">
        {isGameOver && (
          <GameOverScreen score={score} onRestart={startGame} />
        )}
        {!isRunning && isGameReady && !isGameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <Button
              onClick={startGame}
              size="lg"
              className="font-headline text-2xl h-16 px-8 rounded-none border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground animate-pulse"
            >
              Start Game
            </Button>
          </div>
        )}
        <GameBoard
          snakeSegments={snakeSegments}
          foodPosition={foodPosition}
          gridSize={GRID_SIZE}
        />
      </div>
    </main>
  );
}
