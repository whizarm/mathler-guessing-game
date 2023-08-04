import { useMemo } from 'react';
import { BoardState, GameBoard } from 'types';
import { getKeysState } from 'modules/mathler';

type UseInputPanelProps = {
  boardState: BoardState;
  gameBoard: GameBoard;
};

export const useInputPanel = ({
  boardState,
  gameBoard,
}: UseInputPanelProps) => {
  const keysState = useMemo(
    () => getKeysState({ boardState, gameBoard }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardState],
  );

  return keysState;
};
