export enum Digit {
  KEY_0 = '0',
  KEY_1 = '1',
  KEY_2 = '2',
  KEY_3 = '3',
  KEY_4 = '4',
  KEY_5 = '5',
  KEY_6 = '6',
  KEY_7 = '7',
  KEY_8 = '8',
  KEY_9 = '9',
}

export enum Operator {
  KEY_ADD = '+',
  KEY_SUBSTRACT = '-',
  KEY_MULTIPLY = '*',
  KEY_DIVIDE = '/',
}

export enum SpecialInputCharacter {
  KEY_DELETE = 'Backspace',
  KEY_ENTER = 'Enter',
}

export enum TileState {
  DEFAULT = 0,
  INCORRECT = 1,
  MISPLACED = 2,
  CORRECT = 3,
}
