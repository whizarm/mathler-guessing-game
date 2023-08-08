import { useEffect, useState } from 'react';
import {
  AllowedCharacter,
  GameBoard,
  GameRow,
  InputCharacter,
  SpecialInputCharacter,
} from 'types';
import { Board, ErrorToast, Header, InputPanel } from 'components';
import {
  evaluateGameRow,
  getCurrentPosition,
  getRandomPuzzle,
  initialBoardState,
  initialGameBoard,
  resetThisPuzzle,
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

  const resetGameBoard = () => {
    setGameBoard(initialGameBoard);
    setBoardState(initialBoardState);
    setError('');
  };

  const getNewPuzzle = () => {
    getRandomPuzzle();
    resetGameBoard();
  };

  const tryThisPuzzleAgain = () => {
    resetThisPuzzle();
    resetGameBoard();
  };

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
        if (/^[0-9*/+-]+$/.test(key)) {
          return onKeyInput(key);
        }
    }
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (
      SpecialInputCharacter.KEY_DELETE === key ||
      SpecialInputCharacter.KEY_ENTER === key ||
      /^[0-9*/+-]+$/.test(key)
    ) {
      handleInput(key as InputCharacter);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={styles.game}>
      <Header
        gameState={gameState}
        onNewPuzzle={getNewPuzzle}
        onRetryPuzzle={tryThisPuzzleAgain}
      />
      <Board gameBoard={gameBoard} boardState={boardState} error={error} />
      <InputPanel
        boardState={boardState}
        error={error}
        gameBoard={gameBoard}
        handleInput={handleInput}
      />
      <ErrorToast error={error} />
    </div>
  );
};

export default Mathler;
