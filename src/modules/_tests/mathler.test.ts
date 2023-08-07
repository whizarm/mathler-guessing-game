import {
  BoardState,
  Digit,
  GameBoard,
  GameRow,
  Operator,
  RowState,
  TileState,
} from 'types';
import * as mathler from '../mathler';
const {
  currentGame,
  evaluateGameRow,
  evaluateGameState,
  getCurrentPosition,
  getEquationError,
  getEquivalentEquations,
  getKeysState,
  getNumbersFromEquation,
  initialGameBoard,
  validateEquationString,
} = mathler;

describe('mathler module', () => {
  const emptyGameBoard: GameBoard = [...initialGameBoard];
  const emptyRow: GameRow = ['', '', '', '', '', ''];
  const partiallyFilledRow: GameRow = [
    Digit.KEY_9,
    Digit.KEY_0,
    Operator.KEY_DIVIDE,
    Digit.KEY_9,
    '',
    '',
  ];
  const filledRow: GameRow = [
    Digit.KEY_9,
    Digit.KEY_0,
    Operator.KEY_DIVIDE,
    Digit.KEY_9,
    Operator.KEY_ADD,
    Digit.KEY_7,
  ]; // result === 17
  const filledRowState: RowState = [
    TileState.CORRECT,
    TileState.CORRECT,
    TileState.CORRECT,
    TileState.CORRECT,
    TileState.CORRECT,
    TileState.CORRECT,
  ];
  const filledWrongRow: GameRow = [
    Digit.KEY_9,
    Digit.KEY_8,
    Operator.KEY_DIVIDE,
    Digit.KEY_7,
    Operator.KEY_ADD,
    Digit.KEY_3,
  ]; // result !== 17
  const filledWrongRowState: RowState = [
    TileState.CORRECT,
    TileState.INCORRECT,
    TileState.CORRECT,
    TileState.MISPLACED,
    TileState.CORRECT,
    TileState.INCORRECT,
  ];

  const initialCurrentGame: typeof currentGame = JSON.parse(
    JSON.stringify(currentGame),
  );

  beforeEach(() => {
    currentGame.bestFittedEquation = initialCurrentGame.bestFittedEquation;
    currentGame.equivalentEquations = initialCurrentGame.equivalentEquations;
    currentGame.gameResult = initialCurrentGame.gameResult;
  });

  describe('getEquivalentEquations', () => {
    test('should return an array of equivalent equations for a valid equation', () => {
      const equationToGuess = '10+2+3';
      const equivalentEquations = getEquivalentEquations(equationToGuess);
      expect(equivalentEquations).toEqual(
        expect.arrayContaining(['2+3+10', '3+2+10', '3+10+2']),
      );
    });

    test('should return an array with 1 element for an equation with no valid equivalent permutations', () => {
      const equationToGuess = '10/2-3';
      const equivalentEquations = getEquivalentEquations(equationToGuess);
      expect(equivalentEquations).toEqual(['10/2-3']);
    });
  });

  describe('getNumbersFromEquation', () => {
    test('should correctly extract numbers from a valid equation', () => {
      const numbers = getNumbersFromEquation(currentGame.equationToGuess);
      expect(numbers).toEqual([90, 9, 7]);
    });
  });

  describe('validateEquationString', () => {
    test('should return true for a correct equation', () => {
      const correctEquation = '90/9+7';
      const result = validateEquationString(correctEquation);
      expect(result).toBe(true);
    });

    test('should return false for an equation starting with a divide operator', () => {
      const incorrectEquation = '/9/9+7';
      const result = validateEquationString(incorrectEquation);
      expect(result).toBe(false);
    });

    test('should return false for an equation with a divide by zero', () => {
      const incorrectEquation = '90/9/0';
      const result = validateEquationString(incorrectEquation);
      expect(result).toBe(false);
    });

    test('should return false for an equation with invalid characters', () => {
      const invalidEquation = '90a/9+7';
      const result = validateEquationString(invalidEquation);
      expect(result).toBe(false);
    });
  });

  describe('getEquationError', () => {
    test('should return undefined for a correct equation', () => {
      const error = getEquationError(filledRow);
      expect(error).toBeUndefined();
    });

    test('should return "Incorrect equation" for an incorrect equation', () => {
      const badDataRow: GameRow = [...filledRow];
      badDataRow[0] = Operator.KEY_ADD;

      const error = getEquationError(badDataRow);
      expect(error).toBe('Incorrect equation');
    });

    test('should return "Incorrect equation" for an equation with divide by 0', () => {
      const badDataRow: GameRow = [...filledRow];
      badDataRow[badDataRow.length - 2] = Operator.KEY_DIVIDE;
      badDataRow[badDataRow.length - 1] = Digit.KEY_0;

      const error = getEquationError(badDataRow);
      expect(error).toBe('Incorrect equation');
    });

    test('should return "Incorrect equation" for an equation that passed validation test but cannot be evaluated', () => {
      const badDataRow: GameRow = [...filledRow];
      badDataRow[0] = Operator.KEY_DIVIDE;

      const error = getEquationError(badDataRow, () => true);
      expect(error).toBe('Incorrect equation');
    });

    test('should return "Equation result does not equal..." for an equation with incorrect result', () => {
      const incorrectCalculationRow: GameRow = [...filledRow];
      incorrectCalculationRow[0] = Digit.KEY_1;

      const error = getEquationError(incorrectCalculationRow);
      expect(error).toBe('Equation result does not equal 17');
    });
  });

  describe('evaluateGameState', () => {
    const currentGame = {
      gameResult: '',
    };

    test('should return "WON" when the last row is all CORRECT tiles', () => {
      const boardStateWon = [filledRowState];
      const result = evaluateGameState(boardStateWon);
      expect(result).toBe('WON');
    });

    test('should return "LOST" when the board is completely filled and not all tiles are CORRECT', () => {
      const boardStateLost = [
        filledWrongRowState,
        filledWrongRowState,
        filledWrongRowState,
        filledWrongRowState,
        filledWrongRowState,
        filledWrongRowState,
      ];
      const result = evaluateGameState(boardStateLost);
      expect(result).toBe('LOST');
    });

    test('should return an empty string for an ongoing game', () => {
      const boardStateInProgress = [filledWrongRowState];
      const result = evaluateGameState(boardStateInProgress);
      expect(result).toBe('');
      expect(currentGame.gameResult).toBe('');
    });

    test('should return an empty string for an empty board state', () => {
      const result = evaluateGameState([]);
      expect(result).toBe('');
      expect(currentGame.gameResult).toBe('');
    });
  });

  describe('evaluateGameRow', () => {
    test('should return error if there is an equation error', () => {
      const badDataRow: GameRow = [...filledRow];
      badDataRow[0] = Operator.KEY_ADD;

      const result = evaluateGameRow(badDataRow);
      expect(result.error).toEqual(
        expect.stringContaining('Incorrect equation'),
      );
    });

    test('should return correct row state if no error and no best fitted equation', () => {
      const result = evaluateGameRow(filledRow);
      expect(result.error).toBe('');
      expect(result.rowState).toEqual(filledRowState);
    });

    test('should return row state if no error and best fitted equation is present', () => {
      currentGame.bestFittedEquation = currentGame.equivalentEquations[0];
      const result = evaluateGameRow(filledRow);
      expect(result.error).toBe('');
      expect(result.rowState).toEqual(filledRowState);
    });

    test('should return correct row state if no error and best fitted equation and the guess is wrong', () => {
      currentGame.bestFittedEquation = currentGame.equivalentEquations[0];
      const result = evaluateGameRow(filledWrongRow);
      expect(result.error).toBe('');
      expect(result.rowState).toEqual(filledWrongRowState);
    });
  });

  describe('getKeysState', () => {
    test('should return information about all presesed keys presence in final solution', () => {
      const i = 0;
      const gameBoard: GameBoard = [...emptyGameBoard];
      gameBoard[i] = filledWrongRow;
      const boardState: BoardState = [filledWrongRowState];

      const result = getKeysState({
        boardState,
        gameBoard,
      });

      const {
        '3': stateOf3,
        '7': stateOf7,
        '8': stateOf8,
        '9': stateOf9,
        '/': stateOfDivide,
        '+': stateOfAdd,
        ...otherCharacters
      } = result;

      Object.values(otherCharacters).forEach((c) => expect(c).toBe(0));
      expect(stateOf3).toBe(TileState.INCORRECT);
      expect(stateOf7).toBe(TileState.MISPLACED);
      expect(stateOf8).toBe(TileState.INCORRECT);
      expect(stateOf9).toBe(TileState.CORRECT);
      expect(stateOfDivide).toBe(TileState.CORRECT);
      expect(stateOfAdd).toBe(TileState.CORRECT);
    });
  });

  describe('getCurrentPosition', () => {
    test('should return current position information for a filled row', () => {
      const i = 2;
      const gameBoard: GameBoard = [...emptyGameBoard];
      for (let index = 0; index <= i; index++) {
        gameBoard[index] = filledRow;
      }
      gameBoard[i] = filledRow;
      const boardState: BoardState = [filledRowState, filledRowState];

      const result = getCurrentPosition({
        boardState,
        gameBoard,
      });

      expect(result.currentRowIndex).toBe(i);
      expect(result.currentRow).toEqual(filledRow);
      expect(result.currentColumnIndex).toBe(6);
      expect(result.isRowFull).toBeTruthy();
      expect(result.isRowEmpty).toBeFalsy();
    });

    test('should return current position information for an empty row', () => {
      const i = 0;
      const gameBoard: GameBoard = [...emptyGameBoard];
      gameBoard[i] = emptyRow;
      const boardState: BoardState = [];

      const result = getCurrentPosition({
        boardState,
        gameBoard,
      });

      expect(result.currentRowIndex).toBe(i);
      expect(result.currentRow).toEqual(emptyRow);
      expect(result.currentColumnIndex).toBe(0);
      expect(result.isRowFull).toBeFalsy();
      expect(result.isRowEmpty).toBeTruthy();
    });

    test('should return current position information for a row that is partially filled', () => {
      const i = 0;
      const gameBoard: GameBoard = [...emptyGameBoard];
      gameBoard[i] = partiallyFilledRow;
      const boardState: BoardState = [];

      const result = getCurrentPosition({
        boardState,
        gameBoard,
      });

      expect(result.currentRowIndex).toBe(i);
      expect(result.currentRow).toEqual(partiallyFilledRow);
      expect(result.currentColumnIndex).toBe(4);
      expect(result.isRowFull).toBeFalsy();
      expect(result.isRowEmpty).toBeFalsy();
    });
  });

  describe('currentGame', () => {
    test('check default puzzle', () => {
      expect(currentGame.equationToGuess).toEqual('90/9+7');
      expect(currentGame.valueToGuess).toEqual(17);
      expect(currentGame.equivalentEquations).toEqual(['90/9+7', '7+90/9']);
    });

    test('set best fitted equation properly', () => {
      currentGame.bestFittedEquation = currentGame.equivalentEquations[0];
      expect(currentGame.bestFittedEquation).toEqual('90/9+7');
    });

    test('set gameResult properly', () => {
      expect(currentGame.gameResult).toEqual('');
      currentGame.gameResult = 'WON';
      expect(currentGame.gameResult).toEqual('WON');
    });
  });
});
