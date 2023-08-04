import { useMemo } from 'react';
import { BoardState } from 'types';
import { evaluateGameState } from 'modules/mathler';

export const useGameState = (boardState: BoardState) => {
  const gameState = useMemo(
    () => evaluateGameState(boardState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardState],
  );
  return gameState;
};
