import { describe, expect, it } from "vitest";

import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const cwd = resolve(currentDir, "..");
const cli = resolve(cwd, "src/index.ts");

function runCli(args: string[]) {
  return spawnSync(
    process.execPath,
    [
      "--disable-warning=ExperimentalWarning",
      "--experimental-strip-types",
      cli,
      ...args,
    ],
    { cwd, encoding: "utf8" },
  );
}

function assertCliSuccess(result: SpawnSyncReturns<string>) {
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  expect(result.stderr).toBe("");
}

describe("CLI", () => {
  it("root help includes all routes", () => {
    const result = runCli(["--help"]);
    assertCliSuccess(result);

    const output = result.stdout;
    expect(output).toMatch(/\blist\b/);
    expect(output).toMatch(/\bdetail\b/);
    expect(output).toMatch(/\bcount\b/);
    expect(output).toMatch(/\bstats\b/);
    expect(output).toMatch(/\bupdate\b/);
  });

  const routeExtraHelpChecks: Record<string, RegExp[]> = {
    stats: [/--card/, /--box/],
  };

  for (const route of ["list", "detail", "count", "stats", "update"]) {
    it(`${route} route has help output`, () => {
      const result = runCli([route, "--help"]);
      assertCliSuccess(result);
      expect(result.stdout).toMatch(/Usage:/);

      for (const check of routeExtraHelpChecks[route] ?? []) {
        expect(result.stdout).toMatch(check);
      }
    });
  }
});
