import { readdir } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { styleText } from "util";

export const description = "Show descriptions for all commands";

export default function () {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  console.log("You can run the following commands:");
  console.log("------------------------------------");

  readdir(__dirname, (err, files) => {
    if (err) throw err;

    files.forEach(async (file) => {
      // Only show files
      if (file.indexOf(".") > 0) {
        const module = await import(`./${file}`);
        const descriptionText = module.description
          ? `- ${module.description}`
          : "";

        const command = styleText(
          ["yellow"],
          `pnpm fgs ${file.split(".", 1)[0]} ${module.args ?? ""}`,
        );
        console.log(`* ${command} ${descriptionText}`);
      }
    });
  });
}
