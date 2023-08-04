import { useState } from 'react';
import {
  AllowedCharacter,
  GameBoard,
  GameRow,
  InputCharacter,
  SpecialInputCharacter,
} from 'types';
import { Board, GameResult, InputPanel } from 'components';
import {
  currentGame,
  evaluateGameRow,
  getCurrentPosition,
  initialBoardState,
  initialGameBoard,
} from 'modules/mathler';
import { useGameState } from 'hooks/useGameState';
import styles from './Mathler.module.scss';

const Mathler = () => {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [boardState, setBoardState] = useState(initialBoardState);
  const [error, setError] = useState('');
  const gameState = useGameState(boardState);
  const {
    currentColumnIndex,
    currentRow,
    currentRowIndex,
    isRowEmpty,
    isRowFull,
  } = getCurrentPosition({ boardState, gameBoard });

  const onSubmitInput = () => {
    if (!isRowFull) {
      return;
    }

    const { error, rowState } = evaluateGameRow(currentRow);
    if (error) {
      return setError(error);
    }

    if (rowState) {
      setBoardState([...boardState, rowState]);
    }
  };

  const onDeleteInput = () => {
    if (isRowEmpty) {
      return;
    }

    const newRow: GameRow = [...currentRow];
    newRow[Math.min(currentColumnIndex, currentRow.length) - 1] = '';

    const newGameBoard: GameBoard = [...gameBoard];
    newGameBoard[currentRowIndex] = newRow;

    setGameBoard(newGameBoard);
  };

  const onKeyInput = (key: AllowedCharacter) => {
    if (isRowFull) {
      return;
    }

    const newRow: GameRow = [...currentRow];
    newRow[currentColumnIndex] = key;

    const newGameBoard: GameBoard = [...gameBoard];
    newGameBoard[currentRowIndex] = newRow;

    setGameBoard(newGameBoard);
  };

  const handleInput = (key: InputCharacter) => {
    if (gameState) {
      return;
    }
    setError('');

    switch (key) {
      case SpecialInputCharacter.KEY_ENTER:
        return onSubmitInput();
      case SpecialInputCharacter.KEY_DELETE:
        return onDeleteInput();
      default:
        return onKeyInput(key);
    }
  };

  return (
    <div className={styles.game}>
      Try to guess the equation which result is {currentGame.valueToGuess}
      <Board gameBoard={gameBoard} boardState={boardState} error={error} />
      <InputPanel
        boardState={boardState}
        error={error}
        gameBoard={gameBoard}
        handleInput={handleInput}
      />
      <GameResult gameState={gameState} />
      {error}
    </div>
  );
};

export default Mathler;
