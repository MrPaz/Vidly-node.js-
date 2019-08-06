const lib = require('./lib');

test('absoluteValue - should return a positive number if input is positive', () => {
    const result = lib.absoluteValue(1);
    expect(result).toBe(1);
});

test('absoluteValue - should return a positive number if input is negative', () => {
    const result = lib.absoluteValue(-1);
    expect(result).toBe(1);
});

test('absoluteValue - should return 0 if input is 0', () => {
    const result = lib.absoluteValue(0);
    expect(result).toBe(0);
});