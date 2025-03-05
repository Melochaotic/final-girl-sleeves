const commandArg = process.argv[2] ?? "help";

(async () => {
  let cmd;
  const cmdPath = `./commands/${commandArg}`;

  try {
    // Check if TS compiled to JS
    cmd = await import(`${cmdPath}.js`);
  } catch {
    // else try TS extension
    cmd = await import(`${cmdPath}.ts`);
  }

  return cmd.default();
})();
