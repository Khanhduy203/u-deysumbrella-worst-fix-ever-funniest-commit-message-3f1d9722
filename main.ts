import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a fix so thorough it deleted the feature it was fixing.
// The logout crash is gone — because nobody can log out anymore.
const ENTRY = "fixed the crash on logout by removing the logout button";

// The bounty gates: exactly one line, between 1 and 100 characters.
function validateEntry(message: string): void {
  if (message.length < 1 || message.length > 100) {
    throw new Error(
      `entry must be 1-100 chars, got ${message.length}: ${message}`,
    );
  }
  if (message.includes("\n") || message.includes("\r")) {
    throw new Error(`entry must be a single line: ${message}`);
  }
}

function writeEntry(outDir: string, message: string): void {
  validateEntry(message);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), message, "utf8");
}

writeEntry(process.env.MAKEFUN_OUTPUT_DIR || "/output", ENTRY);
