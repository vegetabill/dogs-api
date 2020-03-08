const { camelize } = require('../src/utils');

describe('camelize', () => {
  it('should camelize a one-level object', () => {
    expect(camelize({ snake_case: 'val' })).toEqual({ snakeCase: 'val' });
  });

  it('should camelize keys of each item in an array of simple objects', () => {
    const arr = [{ first_key: true }, { second_key: -1 }];
    expect(camelize(arr)).toEqual([{ firstKey: true }, { secondKey: -1 }]);
  });

  it('should camelize a two-level object', () => {
    const obj = {
      snake_level_one: {
        snake_level_two: true
      },
      list_of_snakes: [{ array_snake: 123 }]
    };
    expect(camelize(obj)).toEqual({
      snakeLevelOne: {
        snakeLevelTwo: true
      },
      listOfSnakes: [{ arraySnake: 123 }]
    });
  });
});
