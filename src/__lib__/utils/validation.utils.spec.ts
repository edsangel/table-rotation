import fs from 'fs';

import { isPerfectSquare, validateFile } from './validation.utils';

jest.mock('fs');

const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

describe('Unit Tests: ValidationUtils', () => {
  describe('validateFile', () => {
    beforeEach(() => {
      mockFS.existsSync.mockClear();
    });

    it('should throw an error when the filename is not provided', () => {
      expect(() => validateFile('')).toThrowError();
    });

    it('should throw an error when wrong file type is provided', () => {
      expect(() => validateFile('test.txt')).toThrowError();
    });

    it('should throw an error when file doest not exist', () => {
      mockFS.existsSync.mockReturnValue(false);
      expect(() => validateFile('test.csv')).toThrowError();
    });
  });

  it('should validate if the length provided is a perfect square', () => {
    let length = 4;
    let result = isPerfectSquare(length);

    expect(result).toBe(true);

    length = 5;
    result = isPerfectSquare(length);

    expect(result).toBe(false);
  });
});
