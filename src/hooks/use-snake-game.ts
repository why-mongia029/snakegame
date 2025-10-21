"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { LinkedList, Position } from "@/lib/dsa";
import { GRID_SIZE, GAME_SPEED_MS } from "@/lib/constants";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const getRandomPosition = (gridSize: number, snake: Position[] = []): Position => {
  const snakePositions = new Set(snake.map(p => `${p.x},${p.y}`));
  let newFoodPosition: Position;
  do {
    newFoodPosition = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snakePositions.has(`${newFoodPosition.x},${newFoodPosition.y}`));
  return newFoodPosition;
};

const getInitialSnake = () => {
    const center = Math.floor(GRID_SIZE / 2);
    return new LinkedList({ x: center, y: center });
}

export const useSnakeGame = () => {
  const [snake, setSnake] = useState(getInitialSnake());
  const [foodPosition, setFoodPosition] = useState({ x: -1, y: -1 });
  const directionRef = useRef<Direction>("RIGHT");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameReady, setIsGameReady] = useState(false);

  useEffect(() => {
    setFoodPosition(getRandomPosition(GRID_SIZE, snake.toArray()));
    setIsGameReady(true);
  }, []);

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const newSnake = new LinkedList({x: -1, y: -1});
      newSnake.head = prevSnake.head;
      newSnake.tail = prevSnake.tail;
      newSnake.length = prevSnake.length;

      const head = newSnake.getHeadPosition();
      if (!head) return newSnake;

      let newHead: Position;
      switch (directionRef.current) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }
      
      // Wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setIsGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      newSnake.addToHead(newHead);

      // Self collision
      if (newSnake.collidesWithSelf()) {
        setIsGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }
      
      // Food collision
      if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        setScore((prev) => prev + 1);
        setFoodPosition(getRandomPosition(GRID_SIZE, newSnake.toArray()));
      } else {
        newSnake.removeTail();
      }

      return newSnake;
    });
  }, [foodPosition]);

  useEffect(() => {
    if (!isRunning) return;

    const gameInterval = setInterval(moveSnake, GAME_SPEED_MS);
    return () => clearInterval(gameInterval);
  }, [isRunning, moveSnake]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    const currentDirection = directionRef.current;

    if (["ArrowUp", "w", "ArrowDown", "s", "ArrowLeft", "a", "ArrowRight", "d"].includes(key.toLowerCase())) {
      e.preventDefault();
    }

    if (key === "ArrowUp" || key.toLowerCase() === "w") {
      if (currentDirection !== "DOWN") directionRef.current = "UP";
    } else if (key === "ArrowDown" || key.toLowerCase() === "s") {
      if (currentDirection !== "UP") directionRef.current = "DOWN";
    } else if (key === "ArrowLeft" || key.toLowerCase() === "a") {
      if (currentDirection !== "RIGHT") directionRef.current = "LEFT";
    } else if (key === "ArrowRight" || key.toLowerCase() === "d") {
      if (currentDirection !== "LEFT") directionRef.current = "RIGHT";
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const startGame = () => {
    setSnake(getInitialSnake());
    setFoodPosition(getRandomPosition(GRID_SIZE, getInitialSnake().toArray()));
    directionRef.current = "RIGHT";
    setScore(0);
    setIsGameOver(false);
    setIsRunning(true);
    setIsGameReady(false);
  };

  useEffect(() => {
    if(isGameOver) {
        setIsGameReady(true);
    }
  }, [isGameOver])

  return {
    snakeSegments: snake.toArray(),
    foodPosition,
    score,
    isGameOver,
    isRunning,
    startGame,
    isGameReady,
  };
};
