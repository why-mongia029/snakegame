import type { Position } from "@/lib/dsa";
import { cn } from "@/lib/utils";
import { Apple } from "lucide-react";

type GameBoardProps = {
  snakeSegments: Position[];
  foodPosition: Position;
  gridSize: number;
};

export const GameBoard = ({
  snakeSegments,
  foodPosition,
  gridSize,
}: GameBoardProps) => {
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return (
    <div
      className="w-full h-full grid bg-card/50"
      style={gridStyle}
    >
      {snakeSegments.map((segment, index) => (
        <div
          key={index}
          className={cn(
            "transform transition-transform duration-100 ease-in-out",
            index === 0
              ? "bg-gradient-to-br from-green-400 to-green-600 scale-110 rounded-sm shadow-[0_0_8px_#22c55e]" // Head
              : "bg-gradient-to-br from-green-500 to-green-700 rounded-md" // Body
          )}
          style={{
            gridColumnStart: segment.x + 1,
            gridRowStart: segment.y + 1,
            transform: `scale(${1 - (index * 0.02)})`
          }}
        />
      ))}
      <div
        className="flex items-center justify-center"
        style={{
          gridColumnStart: foodPosition.x + 1,
          gridRowStart: foodPosition.y + 1,
        }}
      >
        <Apple className="w-full h-full text-red-500 animate-pulse" />
      </div>
    </div>
  );
};
