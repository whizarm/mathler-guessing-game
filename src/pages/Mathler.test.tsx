import { fireEvent, render, screen, within } from '@testing-library/react';
import Mathler from './Mathler';
import { currentGame } from 'modules/mathler';
import puzzles from 'config/puzzles';

const { getByTestId, getByText } = screen;

describe('Mathler', () => {
  const getBoardContents = (board: HTMLElement) =>
    board.innerText.replace(/[\n\t\r]/g, '');
  const getBoardRow = (board: HTMLElement, index: number) =>
    getBoardContents(board).slice(index * 6, index * 6 + 6);
  const typeStringOnKeyboard = (
    inputPanel: HTMLElement,
    input: string | { key: string },
  ) => {
    if (typeof input === 'object') {
      fireEvent.keyDown(inputPanel, input);
      return;
    }
    for (let i = 0; i < input.length; i++) {
      fireEvent.keyDown(inputPanel, { key: input[i] });
    }
  };

  beforeEach(() => {
    render(<Mathler />);
    currentGame.bestFittedEquation = '';
    currentGame.gameResult = '';
  });

  test('renders Mathler component correctly', () => {
    getByText(/Guess the hidden calculation that equals/i);
  });

  describe('user input', () => {
    test('of numbers and operators using keyboard gets reflected on the board', () => {
      const inputPanel = getByTestId('input-panel');
      fireEvent.keyDown(inputPanel, { key: '1' });
      fireEvent.keyDown(inputPanel, { key: '+' });
      fireEvent.keyDown(inputPanel, { key: '5' });

      const board = getByTestId('board');

      expect(getBoardContents(board)).toEqual('1+5');
    });

    test('of numbers and operators using mouse gets reflected on the board', () => {
      const inputPanel = within(getByTestId('input-panel'));
      fireEvent.click(inputPanel.getByText('1'));
      fireEvent.click(inputPanel.getByText('+'));
      fireEvent.click(inputPanel.getByText('5'));

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1+5');
    });

    test('is allowed only up to a full row without submitting', () => {
      const inputPanel = getByTestId('input-panel');

      typeStringOnKeyboard(inputPanel, '1+5+11+3');

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1+5+11');
    });

    test('can be deleted using keybaord', () => {
      const inputPanel = getByTestId('input-panel');

      typeStringOnKeyboard(inputPanel, '1+5+11');
      typeStringOnKeyboard(inputPanel, { key: 'Backspace' });
      typeStringOnKeyboard(inputPanel, { key: 'Backspace' });

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1+5+');
    });

    test('can be deleted using mouse', () => {
      const inputPanel = within(getByTestId('input-panel'));
      fireEvent.click(inputPanel.getByText('1'));
      fireEvent.click(inputPanel.getByText('+'));
      fireEvent.click(inputPanel.getByText('5'));
      fireEvent.click(inputPanel.getByText('Backspace'));
      fireEvent.click(inputPanel.getByText('Backspace'));

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1');
    });

    test('of enter does nothing if row is not full', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, '1+5');
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1+5');
    });

    test('of backspace does nothing if row is empty', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, { key: 'Backspace' });

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('');
    });

    test('of a non-allowed character does nothing', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, '1+5thisinputdoesnotmatter+11');

      const board = getByTestId('board');
      expect(getBoardContents(board)).toEqual('1+5+11');
    });

    test('is allowed to go to the next row after pressing enter', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, '1+5+11');
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });
      typeStringOnKeyboard(inputPanel, '1+6+10');

      const board = getByTestId('board');
      expect(getBoardRow(board, 0)).toEqual('1+5+11');
      expect(getBoardRow(board, 1)).toEqual('1+6+10');
    });
  });

  describe('error', () => {
    test('is displayed after user submits incorrect calculation', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, '1+0+10');
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText(`Equation result does not equal ${currentGame.valueToGuess}`);
    });

    test('is displayed after user submits incorrect equation', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, '1+0+++');
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText('Incorrect equation');
      typeStringOnKeyboard(inputPanel, { key: 'Backspace' });
    });
  });

  describe('game', () => {
    test('can be lost', () => {
      const inputPanel = getByTestId('input-panel');
      for (let i = 0; i < currentGame.equationToGuess.length; i++) {
        typeStringOnKeyboard(inputPanel, '1+5+11');
        typeStringOnKeyboard(inputPanel, { key: 'Enter' });
      }

      getByText(/oh no! you've lost/i);
    });

    test('can be restarted after losing daily challenge', () => {
      const originalValueToGuess = currentGame.valueToGuess;
      const instructionElement = getByText(
        /Guess the hidden calculation that equals/i,
      );
      expect(instructionElement.innerText).toContain(originalValueToGuess);

      const inputPanel = getByTestId('input-panel');
      for (let i = 0; i < currentGame.equationToGuess.length; i++) {
        typeStringOnKeyboard(inputPanel, '1+5+11');
        typeStringOnKeyboard(inputPanel, { key: 'Enter' });
      }

      getByText(/oh no! you've lost/i);

      const newGameButton = getByText('Try again?');
      fireEvent.click(newGameButton);

      expect(instructionElement.innerText).toContain(originalValueToGuess);

      const board = getByTestId('board');
      expect(getBoardContents(board)).toBe('');
    });

    test('can be won', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText(/congratulations! you've won/i);
    });

    test('displays game results modal automatically after game ends', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText(/congratulations! you've won/i);
    });

    test('can be started with a new puzzle after winning daily challenge', () => {
      const originalValueToGuess = currentGame.valueToGuess;
      const instructionElement = getByText(
        /Guess the hidden calculation that equals/i,
      );
      expect(instructionElement.innerText).toContain(originalValueToGuess);

      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText(/congratulations! you've won/i);

      const newGameButton = getByText('Play a random puzzle');
      fireEvent.click(newGameButton);

      expect(instructionElement.innerText).not.toContain(originalValueToGuess);
      expect(instructionElement.innerText).toContain(currentGame.valueToGuess);

      const board = getByTestId('board');
      expect(getBoardContents(board)).toBe('');
    });

    test('can be started with a random previously solved equation if all puzzles are solved', () => {
      const puzzlesPlayed = [];
      for (let i = 0; i < puzzles.length; i++) {
        puzzlesPlayed.push(currentGame.equationToGuess);

        const inputPanel = getByTestId('input-panel');
        typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
        typeStringOnKeyboard(inputPanel, { key: 'Enter' });

        getByText(/congratulations! you've won/i);

        const newGameButton = getByText('Play a random puzzle');
        fireEvent.click(newGameButton);
      }

      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });

      getByText(/congratulations! you've won/i);

      expect(puzzlesPlayed.includes(currentGame.equationToGuess)).toBe(true);
    });

    test("displays help info in a modal after clicking '?' button", () => {
      const openModalButton = getByText('?');
      fireEvent.click(openModalButton);

      getByText('?');
    });

    test('does not allow input after it ends', () => {
      const inputPanel = getByTestId('input-panel');
      typeStringOnKeyboard(inputPanel, currentGame.equationToGuess);
      typeStringOnKeyboard(inputPanel, { key: 'Enter' });
      const board = getByTestId('board');
      const originalBoardContents = getBoardContents(board);

      typeStringOnKeyboard(inputPanel, '1+5+11+3');

      expect(getBoardContents(board)).toEqual(originalBoardContents);
    });
  });
});
