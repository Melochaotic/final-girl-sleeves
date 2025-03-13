(async () => {
  const commandArg = process.argv[2] ?? "help";

  const ext = import.meta.url.split(".").pop();
  const cmdPath = `./commands/${commandArg}.${ext}`;

  const { default: route } = await import(cmdPath);
  return route();
})();
