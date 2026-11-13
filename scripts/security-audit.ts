import fs from 'node:fs';
import path from 'node:path';
import { SCENARIOS } from '../src/data/scenarios';
import {
  safeParseHighScores,
  sanitizeDisplayText,
  stripDangerousKeys,
} from '../src/utils/security';

interface Finding {
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  file: string;
  line: number;
  rule: string;
  message: string;
}

const FINDINGS: Finding[] = [];
const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'src');

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(full));
    } else if (/\.(ts|tsx|js|jsx|html)$/.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function scanSourceFiles() {
  const files = [...collectFiles(SRC_DIR), path.join(ROOT, 'index.html')];

  const rules: {
    id: string;
    severity: Finding['severity'];
    regex: RegExp;
    message: string;
    ignoreFile?: (rel: string) => boolean;
  }[] = [
    {
      id: 'xss-dangerous-dom-sink',
      severity: 'HIGH',
      regex: /dangerouslySetInnerHTML|\.innerHTML\s*=|\.outerHTML\s*=|document\.write\s*\(/,
      message: 'Dangerous raw HTML DOM sink detected.',
    },
    {
      id: 'code-injection-eval',
      severity: 'HIGH',
      regex: /\beval\s*\(|new\s+Function\s*\(/,
      message: 'Dynamic code execution sink (eval/Function) detected.',
    },
    {
      id: 'native-modal-dialog',
      severity: 'MEDIUM',
      regex: /\bwindow\.(alert|confirm|prompt)\s*\(/,
      message: 'Native browser modal dialog detected; prefer sandbox-safe React modals.',
    },
    {
      id: 'unsafe-window-open',
      severity: 'MEDIUM',
      regex: /\bwindow\.open\s*\(/,
      message: 'window.open detected; avoid popup navigation or enforce noopener.',
    },
    {
      id: 'raw-json-parse',
      severity: 'MEDIUM',
      regex: /\bJSON\.parse\s*\(/,
      message: 'Direct JSON.parse outside src/utils/security.ts; use safe schema parser.',
      ignoreFile: (rel) => rel === 'src/utils/security.ts',
    },
    {
      id: 'weak-math-random',
      severity: 'LOW',
      regex: /\bMath\.random\s*\(/,
      message: 'Math.random() detected outside security fallback; prefer Web Crypto CSPRNG.',
      ignoreFile: (rel) => rel === 'src/utils/security.ts',
    },
    {
      id: 'hardcoded-secret-pattern',
      severity: 'HIGH',
      regex: /(AIza[0-9A-Za-z_-]{35}|sk-[0-9A-Za-z]{20,}|ghp_[0-9A-Za-z]{36})/,
      message: 'Potential hardcoded API key or token detected.',
    },
  ];

  for (const filePath of files) {
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of rules) {
        if (rule.ignoreFile?.(rel)) continue;
        if (rule.regex.test(line)) {
          FINDINGS.push({
            severity: rule.severity,
            file: rel,
            line: i + 1,
            rule: rule.id,
            message: rule.message,
          });
        }
      }
    }
  }
}

function verifyRuntimeSecurityControls() {
  // 1. Prototype pollution defense test (Strix prototype_pollution.md verification)
  const poisonedJson =
    '{"__proto__":{"polluted":true},"easy":{"score":500,"accuracy":100,"date":"2026-11-12T00:00:00.000Z"},"normal":{"score":-999,"accuracy":999,"date":"bad"}}';
  const parsed = safeParseHighScores(poisonedJson);
  if (({} as Record<string, unknown>).polluted !== undefined) {
    FINDINGS.push({
      severity: 'HIGH',
      file: 'src/utils/security.ts',
      line: 1,
      rule: 'prototype-pollution-check',
      message: 'Object.prototype was polluted during JSON deserialization test.',
    });
  }
  if (parsed.easy?.score !== 500 || parsed.normal !== null) {
    FINDINGS.push({
      severity: 'HIGH',
      file: 'src/utils/security.ts',
      line: 1,
      rule: 'deserialization-schema-check',
      message: 'safeParseHighScores failed to accept valid entry or reject invalid entry.',
    });
  }

  const stripped = stripDangerousKeys(JSON.parse('{"constructor":{"prototype":{"x":1}},"ok":42}')) as Record<
    string,
    unknown
  >;
  if (Object.hasOwn(stripped, 'constructor') || stripped['ok'] !== 42) {
    FINDINGS.push({
      severity: 'HIGH',
      file: 'src/utils/security.ts',
      line: 1,
      rule: 'prototype-key-strip-check',
      message: 'stripDangerousKeys failed to remove dangerous prototype keys.',
    });
  }

  // 2. Bidi / control char sanitization test
  const maliciousBidi = 'invoice\u202Egpj.exe';
  if (sanitizeDisplayText(maliciousBidi).includes('\u202E')) {
    FINDINGS.push({
      severity: 'HIGH',
      file: 'src/utils/security.ts',
      line: 1,
      rule: 'bidi-sanitization-check',
      message: 'sanitizeDisplayText failed to strip Unicode Bidi override character.',
    });
  }

  // 3. Scenario payload safety check (no script tags / javascript: URLs / Bidi overrides)
  const dangerousPayloadPattern = /<script\b|javascript:|vbscript:|data:text\/html/i;
  for (const s of SCENARIOS) {
    const texts = [s.title, s.senderDisplay, s.senderAddress, s.content, s.urlInfo?.actualUrl ?? ''];
    for (const text of texts) {
      if (dangerousPayloadPattern.test(text)) {
        FINDINGS.push({
          severity: 'MEDIUM',
          file: `src/data/scenarios/${s.difficulty}.ts`,
          line: 1,
          rule: 'scenario-payload-safety',
          message: `Scenario ${s.id} contains potentially active script payload text.`,
        });
      }
    }
  }
}

scanSourceFiles();
verifyRuntimeSecurityControls();

console.log('=== Strix-Aligned Security Audit Report ===');
console.log(`Scanned scenarios: ${SCENARIOS.length}`);
console.log(`Findings count: ${FINDINGS.length}`);

if (FINDINGS.length > 0) {
  for (const f of FINDINGS) {
    console.error(`[${f.severity}] ${f.file}:${f.line} (${f.rule}) - ${f.message}`);
  }
  process.exit(1);
} else {
  console.log('PASS: Zero security findings across static SAST sinks, prototype pollution checks, Bidi sanitization, and scenario payloads.');
}
