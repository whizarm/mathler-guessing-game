import { BoardState, GameBoard } from 'types';
import { Tile } from 'components';
import { getCurrentPosition } from 'modules/mathler';
import { useGameState } from 'hooks/useGameState';
import styles from './Board.module.scss';

type BoardProps = {
  boardState: BoardState;
  gameBoard: GameBoard;
  error: string;
};

export const Board = ({ boardState, gameBoard, error }: BoardProps) => {
  const gameState = useGameState(boardState);
  const { currentColumnIndex, currentRowIndex } = getCurrentPosition({
    boardState,
    gameBoard,
  });

  return (
    <div
      className={[styles.board, error ? styles.error : ''].join(' ')}
      data-testid="board"
    >
      {gameBoard.map((gameRow, i) =>
        gameRow.map((gameTile, j) => (
          <Tile
            key={`tile-${i}-${j}`}
            state={boardState?.[i]?.[j] ?? ''}
            content={gameTile}
            isInCurrentRow={gameState === '' && i === currentRowIndex}
            isInCurrentColumn={gameState === '' && j === currentColumnIndex}
            isWithError={gameState === '' && !!error}
          />
        )),
      )}
    </div>
  );
};
