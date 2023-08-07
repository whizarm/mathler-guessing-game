import puzzles from 'config/puzzles';
import {
  BoardState,
  Digit,
  GameBoard,
  GameState,
  GameRow,
  KeyState,
  Operator,
  RowState,
  SpecialInputCharacter,
  TileState,
} from 'types';
import {
  getObjectWithMaxValue,
  getPermutations,
  getUniqueValues,
  hasSamePrimitiveValues,
} from 'modules/arrays';

export const initialGameBoard: GameBoard = [
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
  ['', '', '', '', '', ''],
];
Object.freeze(initialGameBoard);
export const initialBoardState: BoardState = [];

export const digitKeys = Object.values(Digit);
export const operatorKeys = Object.values(Operator);
export const operatorAndSpecialKeys = [
  SpecialInputCharacter.KEY_DELETE,
  ...operatorKeys,
  SpecialInputCharacter.KEY_ENTER,
];

export const getEquivalentEquations = (equationToGuess: string) => {
  const valueToGuess = eval(equationToGuess);

  const validPermutations = getPermutations(equationToGuess.split('')).filter(
    (chars) => validateEquationString(chars.join('')),
  );
  const equivalentEquations = validPermutations
    .filter((chars) => {
      try {
        const equation = chars.join('');
        const result = eval(equation);
        if (result !== valueToGuess) {
          return false;
        }
        if (
          !hasSamePrimitiveValues(
            getNumbersFromEquation(equation),
            getNumbersFromEquation(equationToGuess),
          )
        ) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    })
    .map((equation) => equation.join(''));

  return getUniqueValues(equivalentEquations);
};

export const getNumbersFromEquation = (equation: string) =>
  equation.split(/[+\-*/]/).map(Number);

export const validateEquationString = (equation: string) => {
  const equationPattern = /^\d+([+\-*/]\d+)+$/;
  const noDivideByZero = /^(?!.*\/0).*$/;
  return equationPattern.test(equation) && noDivideByZero.test(equation);
};

export const getEquationError = (
  row: GameRow,
  validateFunction: (equation: string) => boolean = validateEquationString,
) => {
  try {
    const equation = row.join('');
    if (!validateFunction(equation)) {
      return 'Incorrect equation';
    }

    const result = eval(equation);
    if (result !== currentGame.valueToGuess) {
      return `Equation result does not equal ${currentGame.valueToGuess}`;
    }
  } catch (err) {
    return 'Incorrect equation';
  }
};

export const getRowState = (row: GameRow, guessedEquation: string) => {
  const equationGuess = row.map((tile, i) => {
    if (tile === guessedEquation[i]) {
      return TileState.CORRECT;
    }
    if (guessedEquation.includes(tile)) {
      return TileState.MISPLACED;
    }
    return TileState.INCORRECT;
  });

  return equationGuess as RowState;
};

export const getBestFittedRowState = (row: GameRow): RowState => {
  const equationsGuesses = currentGame.equivalentEquations.map((equation) => {
    const guess = getRowState(row, equation);
    return {
      guess,
      numberOfCorrect: guess.filter((state) => state === TileState.CORRECT)
        .length,
      equation,
    };
  });
  const bestFittingEquation = getObjectWithMaxValue(
    equationsGuesses,
    'numberOfCorrect',
  );
  if (bestFittingEquation.numberOfCorrect > 0) {
    currentGame.bestFittedEquation = bestFittingEquation.equation;
  }
  return bestFittingEquation.guess;
};

export const evaluateGameState = (boardState: BoardState): GameState => {
  const lastState = boardState.at(-1);
  if (!lastState) {
    return '';
  }
  if (lastState.every((tile) => tile === TileState.CORRECT)) {
    return (currentGame.gameResult = 'WON');
  }
  if (boardState.length === initialGameBoard.length) {
    return (currentGame.gameResult = 'LOST');
  }
  return '';
};

export const evaluateGameRow = (row: GameRow) => {
  const error = getEquationError(row);
  if (error) {
    return { error };
  }

  const rowState = currentGame.bestFittedEquation
    ? getRowState(row, currentGame.bestFittedEquation)
    : getBestFittedRowState(row);
  return { error: '', rowState };
};

export const getKeysState = ({
  boardState,
  gameBoard,
}: {
  boardState: BoardState;
  gameBoard: GameBoard;
}) => {
  const keysState = Object.fromEntries(
    [...digitKeys, ...operatorKeys].map((key) => [key, TileState.DEFAULT]),
  ) as KeyState;

  boardState.forEach((rowState, i) =>
    rowState.forEach((tileState, j) => {
      const key = gameBoard[i][j];
      if (key !== '' && tileState > keysState[key]) {
        keysState[key] = tileState;
      }
    }),
  );
  return keysState;
};

export const getCurrentColumnIndex = (row: GameRow) => {
  const emptyValueIndex = row?.findIndex((val) => !val);
  if (emptyValueIndex === -1) {
    return row.length;
  }
  return emptyValueIndex;
};

export const getCurrentPosition = ({
  boardState,
  gameBoard,
}: {
  boardState: BoardState;
  gameBoard: GameBoard;
}) => {
  const currentRowIndex = boardState.length;
  const currentRow = gameBoard[currentRowIndex];
  const currentColumnIndex = getCurrentColumnIndex(currentRow);
  const isRowFull = !!currentRow?.length && currentRow.at(-1) !== '';
  const isRowEmpty = currentColumnIndex === 0;

  return {
    currentRowIndex,
    currentRow,
    currentColumnIndex,
    isRowFull,
    isRowEmpty,
  };
};

/* to be changed to be a different puzzle every day */
const getDailyPuzzle = () => puzzles[0];

const equationToGuess = getDailyPuzzle();

export const currentGame = {
  equationToGuess,
  valueToGuess: eval(equationToGuess),
  equivalentEquations: getEquivalentEquations(equationToGuess),
  bestFittedEquation: '',
  gameResult: '',
};
