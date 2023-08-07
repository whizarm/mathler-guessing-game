import {
  BoardState,
  GameBoard,
  InputCharacter,
  SpecialInputCharacter,
} from 'types';
import { Button, Tile } from 'components';
import { digitKeys, operatorAndSpecialKeys } from 'modules/mathler';
import { useInputPanel } from './useInputPanel';
import styles from './InputPanel.module.scss';

type InputPanelProps = {
  gameBoard: GameBoard;
  boardState: BoardState;
  error: string;
  handleInput: (key: InputCharacter) => void;
};

export const InputPanel = ({ handleInput, ...restProps }: InputPanelProps) => {
  const keysState = useInputPanel(restProps);

  return (
    <div className={styles.inputPanel} data-testid="input-panel">
      <div className={styles.digits}>
        {digitKeys.map((key) => (
          <Button key={key} onClick={() => handleInput(key)}>
            <Tile state={keysState[key]} content={key} />
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
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InputPanel;
