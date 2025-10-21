import type { Position } from "@/lib/dsa";
import { cn } from "@/lib/utils";

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
      className="w-full h-full grid bg-background"
      style={gridStyle}
    >
      {snakeSegments.map((segment, index) => (
        <div
          key={index}
          className={cn(
            "rounded-sm",
            index === 0
              ? "bg-accent shadow-[0_0_8px_theme(colors.accent)]" // Head
              : "bg-primary" // Body
          )}
          style={{
            gridColumnStart: segment.x + 1,
            gridRowStart: segment.y + 1,
          }}
        />
      ))}
      <div
        className="bg-destructive rounded-full shadow-[0_0_10px_theme(colors.destructive)] animate-pulse"
        style={{
          gridColumnStart: foodPosition.x + 1,
          gridRowStart: foodPosition.y + 1,
        }}
      />
    </div>
  );
};
