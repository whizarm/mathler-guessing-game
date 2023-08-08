import { GameState } from 'types';
import styles from './GameResult.module.scss';

type GameResultProps = {
  gameState: GameState;
};

export const GameResult = ({ gameState }: GameResultProps) => {
  return (
    <div
      className={[styles.gameResult, gameState !== '' ? styles.show : ''].join(
        ' ',
      )}
    >
      <h3>
        {gameState === 'WON' && "Congratulations! You've won 🎉"}
        {gameState === 'LOST' && "Oh no! You've lost 🥹"}
      </h3>
    </div>
  );
};
