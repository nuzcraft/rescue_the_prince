const game = require('./game');

test('clamp on -1 between 0 and 1 will return 0', () => {
    expect(game.clamp(-1, 0, 1)).toBe(0);
});

test('clamp on 0 between -1 and 1 will return 0', () => {
    expect(game.clamp(0, -1, 1)).toBe(0);
});

test('clamp on 1 between -1 and 0 will return 0', () => {
    expect(game.clamp(1, -1, 0)).toBe(0);
});

test('passing a string to clamp will return "error"', () => {
    // @ts-ignore
    expect(game.clamp('string', 0, 1)).toBeFalsy();
});

test('passing a string to clamp will return "error"', () => {
    // @ts-ignore
    expect(game.clamp(0, 0, 'string')).toBeFalsy();
});

test('passing a string to clamp will return "error"', () => {
    // @ts-ignore
    expect(game.clamp(0, 'string', 1)).toBeFalsy();
})

test('passing a string to log with priority 0 (logging) returns nothing', () => {
    expect(game.log('string', 0)).toBeFalsy();
});

test('passing a string to log with priority 0 (logging) and forceOutput set to true returns the string', () => {
    expect(game.log('string', 0, true)).toBe("string");
});

test('passing a string to log with priority 1 (info) returns nothing', () => {
    expect(game.log('string', 1)).toBeFalsy();
});

test('passing a string to log with priority 1 (info) and forceOutput set to true returns the string', () => {
    expect(game.log('string', 1, true)).toBe("string");
});

test('passing a string to log with priority 2 (warning) returns the string', () => {
    expect(game.log('string', 2)).toBeFalsy();
});

test('passing a string to log with priority 2 (warning) and forceOutput set to true returns the string', () => {
    expect(game.log('string', 2, true)).toBe("string");
});

test('passing a string to log with priority 3 (error) it returns the string', () => {
    expect(game.log('string', 3)).toBe("string");
});

test('passing a string to log with unknown priority (error) it returns the string', () => {
    // @ts-ignore
    expect(game.log('string', 'string')).toBe("string");
});

test('1 should expand to 001 when zerofilled to 3 places', () => {
    expect(game.zeroFill(1, 3)).toBe('001');
})

test('1000 cannot be zerofilled to 3 places', () => {
    expect(game.zeroFill(1000, 3)).toBeFalsy();
})



