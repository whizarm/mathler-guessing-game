import { GameState } from 'types';

type GameResultProps = {
  gameState: GameState;
};

export const GameResult = ({ gameState }: GameResultProps) => {
  if (gameState === 'WON') {
    return "Congratulations! You've won";
  }

  if (gameState === 'LOST') {
    return "Oh no! You've lost";
  }

  return;
};
