import {
  getObjectWithMaxValue,
  getPermutations,
  getUniqueValues,
  hasSamePrimitiveValues,
} from '../arrays';

describe('getUniqueValues', () => {
  test('should return an empty array when input array is empty', () => {
    const input: number[] = [];
    const uniqueValues = getUniqueValues(input);
    expect(uniqueValues).toEqual([]);
  });

  test('should return an array with unique values when input has duplicates', () => {
    const input: number[] = [1, 2, 3, 2, 4, 1, 5];
    const uniqueValues = getUniqueValues(input);
    expect(uniqueValues).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('hasSamePrimitiveValues', () => {
  test('should return true for arrays with same primitive values', () => {
    const array1: (string | number)[] = [1, 'two', 3, 'four'];
    const array2: (string | number)[] = ['two', 3, 1, 'four'];
    const result = hasSamePrimitiveValues(array1, array2);
    expect(result).toBe(true);
  });

  test('should return false for arrays with different primitive values', () => {
    const array1: (string | number)[] = [1, 2, 3];
    const array2: (string | number)[] = ['one', 'two', 'three'];
    const result = hasSamePrimitiveValues(array1, array2);
    expect(result).toBe(false);
  });

  test('should return false for arrays with different lengths', () => {
    const array1: (string | number)[] = [1, 2, 3];
    const array2: (string | number)[] = [1, 2];
    const result = hasSamePrimitiveValues(array1, array2);
    expect(result).toBe(false);
  });
});

describe('getObjectWithMaxValue', () => {
  test('should return the object with the maximum value for the specified key', () => {
    const data = [
      { name: 'A', score: 85 },
      { name: 'B', score: 92 },
      { name: 'C', score: 78 },
    ];

    const result = getObjectWithMaxValue(data, 'score');
    expect(result).toEqual({ name: 'B', score: 92 });
  });

  test('should return the last object when multiple objects have the same maximum value', () => {
    const data = [
      { name: 'A', score: 85 },
      { name: 'B', score: 92 },
      { name: 'C', score: 92 },
    ];

    const lastObjectWithMaxScore = data[2];
    const result = getObjectWithMaxValue(data, 'score');
    expect(result).toEqual(lastObjectWithMaxScore);
  });
});

describe('getPermutations', () => {
  test('should return all permutations of an array', () => {
    const input = [1, 2, 3];
    const expectedPermutations = [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ];
    const result = getPermutations(input);
    expect(result).toHaveLength(6);
    expectedPermutations.forEach((p) => expect(result).toContainEqual(p));
  });

  test('should return an empty array for an empty input array', () => {
    const input: number[] = [];
    const result = getPermutations(input);
    expect(result).toHaveLength(0);
  });

  test('should return an array of single-element arrays for an input array with one element', () => {
    const input = [1];
    const result = getPermutations(input);
    expect(result).toHaveLength(1);
    expect(result).toContainEqual([1]);
  });

  test('should handle an input array with repeated elements', () => {
    const input = [1, 2, 2];
    const expectedPermutations = [
      [1, 2, 2],
      [1, 2, 2],
      [2, 1, 2],
      [2, 2, 1],
      [2, 1, 2],
      [2, 2, 1],
    ];
    const result = getPermutations(input);
    expect(result).toHaveLength(6);
    expectedPermutations.forEach((p) => expect(result).toContainEqual(p));
  });
});
