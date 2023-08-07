import { TileState, GameTile, InputCharacter } from 'types';
import styles from './Tile.module.scss';

export const getTileTypeClass = (state: TileState) => {
  switch (state) {
    case TileState.CORRECT:
      return styles.correct;
    case TileState.MISPLACED:
      return styles.misplaced;
    case TileState.INCORRECT:
      return styles.incorrect;
    case TileState.DEFAULT:
    default:
      return '';
  }
};

type TileProps = {
  content: GameTile | InputCharacter;
  isWritable?: boolean;
  isInCurrentColumn?: boolean;
  isInCurrentRow?: boolean;
  isWithError?: boolean;
  state?: TileState;
};

export const Tile = ({
  content,
  isWritable = true,
  isInCurrentColumn = false,
  isInCurrentRow = false,
  isWithError = false,
  state = TileState.DEFAULT,
}: TileProps) => (
  <div
    className={[
      styles.tile,
      getTileTypeClass(state),
      isInCurrentRow ? styles.isInCurrentRow : '',
      isInCurrentColumn && isInCurrentRow ? styles.isCurrentTile : '',
      isInCurrentRow && isWithError ? styles.isWithError : '',
      !isWritable ? styles.isNotWritable : '',
      isWritable && content ? styles.filled : '',
    ].join(' ')}
  >
    {content}
  </div>
);
