#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import path from "path";
import { Command } from "commander";

const program = new Command();

console.log(
  chalk.red(figlet.textSync("pizza-cli", { horizontalLayout: "full" }))
);

program
  .version("0.0.1")
  .description("An example CLI for ordering pizza's")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq", "Add bbq sauce")
  .option("-c, --cheese <type>", "Add the specified type of cheese [marble]")
  .option("-C, --no-cheese", "You do not want any cheese")
  .parse(process.argv);
