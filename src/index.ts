#! /usr/bin/env node --disable-warning=ExperimentalWarning

import { Command } from "commander";

const program = new Command();
const ext = import.meta.url.split(".").pop();

program
  .name("fgs")
  .description("Manage sleeve data for Final Girl board games")
  .version("1.0.0");

program
  .command("list")
  .description("List all game titles; optionally filtered by sleeveType")
  .action(async () => {
    const { default: list } = await import("./commands/list." + ext);
    await list();
  });

program
  .command("detail")
  .description("Show details for given title")
  .action(async () => {
    const { default: detail } = await import("./commands/detail." + ext);
    await detail();
  });

program
  .command("count")
  .description("Show sleeve count totals; optionally filtered by sleeveType")
  .action(async () => {
    const { default: count } = await import("./commands/count." + ext);
    await count();
  });

program
  .command("stats")
  .description("Show current statistics of sleeving")
  .option("--card", "Count by individual cards (default)")
  .option("--box", "Count by game boxes")
  .action(async (options) => {
    const { default: stats } = await import("./commands/stats." + ext);
    await stats(options);
  });

program
  .command("update")
  .description("Update sleeveType for given title")
  .action(async () => {
    const { default: update } = await import("./commands/update." + ext);
    await update();
  });

program.parse();
