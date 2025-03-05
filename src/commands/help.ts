import { readdir } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { styleText } from "util";

export default function help() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  console.log("You can run the following commands:");
  console.log("------------------------------------");

  readdir(__dirname, (err, files) => {
    if (err) throw err;
    files.forEach((file) =>
      // TODO: each command file should export help text
      console.log("* " + styleText(["yellow"], file.split(".", 1)[0])),
    );
  });
}
