import { GameState } from 'types';
import { Button } from 'components';
import styles from './GameResult.module.scss';

type GameResultProps = {
  gameState: GameState;
  onNewPuzzle: () => void;
  onRetryPuzzle: () => void;
};

export const GameResult = ({
  gameState,
  onNewPuzzle,
  onRetryPuzzle,
}: GameResultProps) => {
  return (
    <div className={styles.results}>
      {gameState === 'WON' && (
        <>
          <h3 className={styles.success}>Congratulations! You&#39;ve won 🎉</h3>
          <Button onClick={onNewPuzzle} className={styles.button}>
            Play a random puzzle
          </Button>
        </>
      )}
      {gameState === 'LOST' && (
        <>
          <h3 className={styles.error}>Oh no! You&#39;ve lost 🥹</h3>
          <Button onClick={onRetryPuzzle} className={styles.button}>
            Try again?
          </Button>
        </>
      )}
    </div>
  );
};
