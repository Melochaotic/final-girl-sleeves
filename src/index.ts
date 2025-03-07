import { fileURLToPath } from "url";

(async () => {
  const commandArg = process.argv[2] ?? "help";

  const __filename = fileURLToPath(import.meta.url);
  const ext = __filename.split(".").pop();
  const cmdPath = `./commands/${commandArg}.${ext}`;

  const { default: route } = await import(cmdPath);
  return route();
})();
