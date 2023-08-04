export const getUniqueValues = <T>(arr: T[]) => Array.from(new Set(arr));

export const hasSamePrimitiveValues = (
  array1: (string | number)[],
  array2: (string | number)[],
) => [...array1].sort().toString() == [...array2].sort().toString();

export const getObjectWithMaxValue = <T>(data: T[], key: keyof T) =>
  data.reduce((prev, current) => (prev[key] > current[key] ? prev : current));

export const getPermutations = <T>(arr: T[]): T[][] => {
  const result = [];

  for (let i = 0; i < arr.length; i = i + 1) {
    const rest = getPermutations(arr.slice(0, i).concat(arr.slice(i + 1)));

    if (!rest.length) {
      result.push([arr[i]]);
    } else {
      for (let j = 0; j < rest.length; j = j + 1) {
        result.push([arr[i]].concat(rest[j]));
      }
    }
  }
  return result;
};
