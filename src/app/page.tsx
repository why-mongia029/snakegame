"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GameBoard } from "@/components/game-board";
import { GameOverScreen } from "@/components/game-over-screen";
import { useSnakeGame } from "@/hooks/use-snake-game";
import { GRID_SIZE } from "@/lib/constants";

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
          src="https://storage.googleapis.com/project-spark-348519-2dcc2.appspot.com/a8837269-a2a9-4676-a077-8c2014a22606.webp"
          alt="Arcade Machine"
          fill
          priority
          className="object-contain pointer-events-none"
        />

        <div className="absolute top-[16.5%] left-1/2 -translate-x-1/2 w-[65%] h-[12%] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline tracking-widest uppercase">
            Snake Game
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-1 text-white">
            Score: {score}
          </p>
        </div>

        {/* Game Screen Area */}
        <div className="absolute top-[31%] left-1/2 -translate-x-1/2 w-[59%] aspect-square">
          <div className="relative w-full h-full bg-card/30 rounded-[4%] overflow-hidden">
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

        <div className="absolute bottom-[17%] left-1/2 -translate-x-1/2 w-[65%] text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Use Arrow Keys or W/A/S/D to move
          </p>
        </div>
      </div>
    </main>
  );
}
