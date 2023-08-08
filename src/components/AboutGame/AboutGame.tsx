import { Digit, Operator, TileState } from 'types';
import { Tile } from 'components';
import styles from './AboutGame.module.scss';

export const AboutGame = () => {
  return (
    <div className={styles.about}>
      <p>Try to find the hidden calculation in 6 guesses!</p>
      <p>
        After each guess, the color of the tiles will change to show how close
        you are to the solution.
      </p>
      <h3 className={styles.exampleTitle}>Example for equation 9-4+1:</h3>
      <div className={styles.exampleTiles}>
        <Tile content={Digit.KEY_9} state={TileState.CORRECT} />
        <Tile content={Operator.KEY_MULTIPLY} state={TileState.INCORRECT} />
        <Tile content={Digit.KEY_1} state={TileState.MISPLACED} />
        <Tile content={Operator.KEY_ADD} state={TileState.CORRECT} />
        <Tile content={Digit.KEY_4} state={TileState.MISPLACED} />
      </div>
      <ul>
        <li>Green characters are in the correct place.</li>
        <li>
          Yellow characters are in the solution, but in a different place.
        </li>
        <li>Dark gray characters are not in the solution.</li>
      </ul>
      <h3>Additional rules</h3>
      <ul>
        <li>Numbers and operators can appear multiple times.</li>
        <li>Calculate / or * before - or + (order of operations).</li>
        <li>
          Commutative solutions are accepted, for example 20+7+3 and 3+7+20.
        </li>
        <li>
          As soon as you hit a character in the correct place in one of the
          commutitative solution, the game will adapt and guide you toward that
          particular solution.
        </li>
      </ul>
    </div>
  );
};
