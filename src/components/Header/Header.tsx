import { currentGame } from 'modules/mathler';
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>Mathler</h1>
    <div>
      Guess the hidden calculation that equals{' '}
      <span className={styles.valueToGuess}>{currentGame.valueToGuess}</span>
    </div>
  </header>
);
