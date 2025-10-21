import { Button } from "./ui/button";

type GameOverScreenProps = {
  score: number;
  onRestart: () => void;
};

export const GameOverScreen = ({ score, onRestart }: GameOverScreenProps) => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm gap-6">
      <h2 className="text-6xl font-bold text-destructive-foreground animate-pulse font-headline tracking-widest">
        GAME OVER
      </h2>
      <p className="text-3xl text-primary-foreground">Final Score: {score}</p>
      <Button
        onClick={onRestart}
        size="lg"
        className="font-headline text-2xl h-16 px-8 rounded-none border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground"
      >
        Restart
      </Button>
    </div>
  );
};
