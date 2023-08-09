import {
  TileState,
  GameTile,
  InputCharacter,
  SpecialInputCharacter,
} from 'types';
import { Icon } from 'components';
import styles from './Tile.module.scss';

export const getTileTypeClass = (state: TileState | undefined) => {
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
  isHighlighted?: boolean;
  state?: TileState;
};

export const Tile = ({
  content,
  isWritable = true,
  isInCurrentColumn = false,
  isInCurrentRow = false,
  isWithError = false,
  isHighlighted = false,
  state,
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
      isHighlighted ? styles.isHighlighted : '',
      state === undefined ? styles.specialCharacter : '',
    ].join(' ')}
  >
    {content === SpecialInputCharacter.KEY_ENTER && (
      <Icon icon="enter" height="25" />
    )}
    {content === SpecialInputCharacter.KEY_DELETE && (
      <Icon icon="delete" height="25" />
    )}
    {content !== SpecialInputCharacter.KEY_DELETE &&
      content !== SpecialInputCharacter.KEY_ENTER &&
      content}
  </div>
);
