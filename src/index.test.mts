import assert from "node:assert/strict";
import { type SpawnSyncReturns, spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import test from "node:test";
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
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
}

test("root help includes all routes", () => {
  const result = runCli(["--help"]);
  assertCliSuccess(result);

  const output = result.stdout;
  assert.match(output, /\blist\b/);
  assert.match(output, /\bdetail\b/);
  assert.match(output, /\bcount\b/);
  assert.match(output, /\bstats\b/);
  assert.match(output, /\bupdate\b/);
});

const routeExtraHelpChecks: Record<string, RegExp[]> = {
  stats: [/--card/, /--box/],
};

for (const route of ["list", "detail", "count", "stats", "update"]) {
  test(`${route} route has help output`, () => {
    const result = runCli([route, "--help"]);
    assertCliSuccess(result);
    assert.match(result.stdout, /Usage:/);

    for (const check of routeExtraHelpChecks[route] ?? []) {
      assert.match(result.stdout, check);
    }
  });
}
