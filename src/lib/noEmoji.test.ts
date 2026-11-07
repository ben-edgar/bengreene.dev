import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const SOURCE_ROOT = join(process.cwd(), 'src');
const EMOJI = /\p{Extended_Pictographic}/u;
// The same characters written as escapes, which read as plain ASCII in the source.
const EMOJI_ESCAPE = /\\u\{1F[0-9A-F]{3}\}|\\uD83[C-E]/i;

// Plain text symbols that Unicode also classes as pictographic.
const ALLOWED = /[©®™]/gu;

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) return sourceFiles(path);

    return /\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

describe('site copy', () => {
  it('uses drawn icons, never emoji', () => {
    const offenders = sourceFiles(SOURCE_ROOT).filter((file) => {
      const source = readFileSync(file, 'utf8').replace(ALLOWED, '');

      return EMOJI.test(source) || EMOJI_ESCAPE.test(source);
    });

    expect(offenders).toEqual([]);
  });
});
