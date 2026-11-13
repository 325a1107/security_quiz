import { Difficulty } from '../types/game';

export const ALLOWED_DIFFICULTIES: readonly Difficulty[] = ['easy', 'normal', 'hard'] as const;

export interface HighScoreEntry {
  score: number;
  accuracy: number;
  date: string;
}

export type HighScoreMap = Record<Difficulty, HighScoreEntry | null>;

const MAX_STORAGE_PAYLOAD_LENGTH = 16384;
const MAX_SCORE_VALUE = 100000;
const DANGEROUS_PROTO_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function createEmptyHighScores(): HighScoreMap {
  return {
    easy: null,
    normal: null,
    hard: null,
  };
}

/**
 * Recursively clones plain JSON objects while stripping prototype-pollution keys
 * (__proto__, constructor, prototype).
 */
export function stripDangerousKeys(value: unknown, depth = 0): unknown {
  if (depth > 8 || value === null || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => stripDangerousKeys(item, depth + 1));
  }

  const safeObj: Record<string, unknown> = Object.create(null);
  for (const key of Object.keys(value)) {
    if (DANGEROUS_PROTO_KEYS.has(key)) {
      continue;
    }
    safeObj[key] = stripDangerousKeys((value as Record<string, unknown>)[key], depth + 1);
  }
  return safeObj;
}

function isValidHighScoreEntry(entry: unknown): entry is HighScoreEntry {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    return false;
  }
  const candidate = entry as Record<string, unknown>;

  if (
    typeof candidate.score !== 'number' ||
    !Number.isFinite(candidate.score) ||
    candidate.score < 0 ||
    candidate.score > MAX_SCORE_VALUE
  ) {
    return false;
  }

  if (
    typeof candidate.accuracy !== 'number' ||
    !Number.isFinite(candidate.accuracy) ||
    candidate.accuracy < 0 ||
    candidate.accuracy > 100
  ) {
    return false;
  }

  if (
    typeof candidate.date !== 'string' ||
    candidate.date.length === 0 ||
    candidate.date.length > 64 ||
    Number.isNaN(Date.parse(candidate.date))
  ) {
    return false;
  }

  return true;
}

/**
 * Safely parses and schema-validates high scores loaded from localStorage.
 * Protects against tampered storage values, prototype pollution, and invalid types.
 */
export function safeParseHighScores(raw: string | null): HighScoreMap {
  const result = createEmptyHighScores();
  if (!raw || raw.length > MAX_STORAGE_PAYLOAD_LENGTH) {
    return result;
  }

  try {
    const parsed = JSON.parse(raw);
    const cleaned = stripDangerousKeys(parsed);
    if (!cleaned || typeof cleaned !== 'object' || Array.isArray(cleaned)) {
      return result;
    }

    const record = cleaned as Record<string, unknown>;
    for (const diff of ALLOWED_DIFFICULTIES) {
      const entry = record[diff];
      if (isValidHighScoreEntry(entry)) {
        result[diff] = {
          score: Math.round(entry.score),
          accuracy: Math.round(entry.accuracy),
          date: entry.date,
        };
      }
    }
    return result;
  } catch {
    return result;
  }
}

export function safeSaveHighScores(storageKey: string, scores: HighScoreMap): boolean {
  try {
    const sanitized: HighScoreMap = createEmptyHighScores();
    for (const diff of ALLOWED_DIFFICULTIES) {
      const entry = scores[diff];
      if (isValidHighScoreEntry(entry)) {
        sanitized[diff] = {
          score: Math.round(entry.score),
          accuracy: Math.round(entry.accuracy),
          date: entry.date,
        };
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(sanitized));
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates an unbiased random integer in [0, maxExclusive) using Web Crypto CSPRNG.
 */
export function secureRandomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive <= 0) {
    throw new RangeError('maxExclusive must be a positive integer');
  }
  if (maxExclusive === 1) {
    return 0;
  }

  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const range = 0x100000000; // 2^32
    const limit = Math.floor(range / maxExclusive) * maxExclusive;
    const buf = new Uint32Array(1);
    while (true) {
      globalThis.crypto.getRandomValues(buf);
      const value = buf[0];
      if (value < limit) {
        return value % maxExclusive;
      }
    }
  }

  // Fallback only if Web Crypto is unavailable in a non-browser runtime
  return Math.floor(Math.random() * maxExclusive);
}

/**
 * Unbiased Fisher-Yates shuffle backed by Web Crypto CSPRNG.
 */
export function secureShuffleArray<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Unicode directional overrides & unsafe ASCII control chars (keeps \t, \n, \r)
const UNSAFE_CONTROL_AND_BIDI_REGEX =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

/**
 * Strips invisible control characters and Unicode Bidi override characters
 * to prevent visual spoofing (Trojan Source / filename reversal).
 */
export function sanitizeDisplayText(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(UNSAFE_CONTROL_AND_BIDI_REGEX, '');
}

/**
 * Validates that a URL uses an explicit safe HTTP/HTTPS scheme.
 */
export function isSafeHttpUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
