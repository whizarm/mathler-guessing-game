import {
  BoardState,
  GameBoard,
  InputCharacter,
  SpecialInputCharacter,
} from 'types';
import { Button, Tile } from 'components';
import {
  digitKeys,
  getCurrentPosition,
  operatorAndSpecialKeys,
} from 'modules/mathler';
import { useInputPanel } from './useInputPanel';
import styles from './InputPanel.module.scss';

type InputPanelProps = {
  boardState: BoardState;
  error: string;
  gameBoard: GameBoard;
  handleInput: (key: InputCharacter) => void;
};

export const InputPanel = ({
  handleInput,
  error = '',
  ...boardProps
}: InputPanelProps) => {
  const keysState = useInputPanel(boardProps);
  const { isRowFull } = getCurrentPosition(boardProps);

  return (
    <div className={styles.inputPanel} data-testid="input-panel">
      <div className={styles.digits}>
        {digitKeys.map((key) => (
          <Button key={key} onClick={() => handleInput(key)}>
            <Tile state={keysState[key]} content={key} isWritable={false} />
          </Button>
        ))}
      </div>

      <div className={styles.operators}>
        {operatorAndSpecialKeys.map((key) => (
          <Button
            key={key}
            onClick={() => handleInput(key)}
            className={
              key === SpecialInputCharacter.KEY_DELETE ||
              key === SpecialInputCharacter.KEY_ENTER
                ? styles.wideGridCell
                : ''
            }
          >
            <Tile
              state={
                key !== SpecialInputCharacter.KEY_DELETE &&
                key !== SpecialInputCharacter.KEY_ENTER
                  ? keysState[key]
                  : undefined
              }
              content={key}
              isWritable={false}
              isHighlighted={
                (isRowFull &&
                  error &&
                  key === SpecialInputCharacter.KEY_DELETE) ||
                (isRowFull && !error && key === SpecialInputCharacter.KEY_ENTER)
              }
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InputPanel;
