import { describe, expect, it } from 'vitest';
import { parseEnvSeed, quoteEnv } from '../server/envseed.js';

describe('envseed parsing', () => {
  it('parses labeled values without losing colons', () => expect(parseEnvSeed('username: pilot\npassword: a:b:c')).toEqual({ username: 'pilot', password: 'a:b:c' }));
  it('rejects missing values', () => expect(() => parseEnvSeed('username: pilot')).toThrow(/password/));
  it('escapes dotenv-sensitive characters', () => expect(quoteEnv('a"b\\c')).toBe('"a\\"b\\\\c"'));
});
