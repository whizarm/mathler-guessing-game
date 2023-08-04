import {
  Digit,
  Operator,
  SpecialInputCharacter,
  TileState,
} from 'config/constants';

export { Digit };
export { Operator };
export { SpecialInputCharacter };
export { TileState };

export type Tuple6<T> = [T, T, T, T, T, T];

export type AllowedCharacter = Digit | Operator;
export type InputCharacter = Digit | Operator | SpecialInputCharacter;

export type GameTile = AllowedCharacter | '';
export type GameRow = Tuple6<GameTile>;
export type GameBoard = Tuple6<GameRow>;

export type RowState = Tuple6<TileState>;
export type BoardState = RowState[];

export type GameState = 'WON' | 'LOST' | '';

export type KeyState = {
  [key in AllowedCharacter]: TileState;
};
