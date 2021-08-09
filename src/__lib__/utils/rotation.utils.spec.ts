import { rotate, splitArray } from './rotation.utils';

describe('Unit Tests: RotationUtils', () => {
  it('should split array in chunks making it two-dimensional', () => {
    const arr = [1, 2, 3, 4];
    const expected = [[1,2],[3,4]];
    const result = splitArray(arr);

    expect(result).toEqual(expected);
  });

  it('should rotate two-dimensional array data, once, clockwise', () => {
    const arr = [[1, 2], [3, 4]];
    const expected = [[3, 1], [4, 2]];
    const result = rotate(arr);

    expect(result).toEqual(expected);
  });
});
