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

type TileProps = { content: GameTile | InputCharacter; state?: TileState };

export const Tile = ({ content, state = TileState.DEFAULT }: TileProps) => (
  <div className={[styles.tile, getTileTypeClass(state)].join(' ')}>
    {content}
  </div>
);
