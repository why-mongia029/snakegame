"use client";

import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/game-board";
import { GameOverScreen } from "@/components/game-over-screen";
import { useSnakeGame } from "@/hooks/use-snake-game";
import { GRID_SIZE } from "@/lib/constants";
import Image from "next/image";

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

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <div className="relative w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px] aspect-[4/5]">
        <Image
          src="https://picsum.photos/seed/picsum/800/1000"
          alt=""
          width="800"
          height="1000"
          className="absolute inset-0 w-full h-full object-cover"
          data-ai-hint=""
        />

        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-start pt-[15%]">
          <div className="text-center z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-headline tracking-widest uppercase">
              Snake Game
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mt-2 text-white">
              Score: {score}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Use Arrow Keys or W/A/S/D to move
            </p>
          </div>

          <div className="w-full aspect-square max-w-[calc(100%-2rem)] mt-4">
            <div className="relative w-full h-full bg-card/30 rounded-lg overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20">
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
                    Play
                  </Button>
                </div>
              )}
              <GameBoard
                snakeSegments={snakeSegments}
                foodPosition={foodPosition}
                gridSize={GRID_SIZE}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
