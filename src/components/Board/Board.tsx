import { BoardState, GameBoard } from 'types';
import { Tile } from 'components';
import styles from './Board.module.scss';

type BoardProps = {
  boardState: BoardState;
  gameBoard: GameBoard;
  error: string;
};

export const Board = ({ boardState, gameBoard }: BoardProps) => (
  <div className={styles.board}>
    {gameBoard.map((gameRow, i) =>
      gameRow.map((gameTile, j) => (
        <Tile
          key={`tile-${i}-${j}`}
          state={boardState?.[i]?.[j] ?? ''}
          content={gameTile}
        />
      )),
    )}
  </div>
);
