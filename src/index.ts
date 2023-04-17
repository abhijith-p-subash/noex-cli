#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import boxen from "boxen";
import { createSpinner } from "nanospinner";
import { Command } from "commander";
import { exec } from "child_process";

import { Info, delay } from "./utils/helper.js";

const program = new Command();

console.log(gradient.cristal(figlet.textSync("NOEX - CLI")));

program
  .name("NOEX CLI")
  .description("Create Nodejs Express project with minimum effort")
  .version("noex v1.2.3", "-v, --version", "output the the version number");

program
  .command("info")
  .description("Generate info about NOEX CLI")
  .action(() => {
    console.log(
      boxen(Info(), {
        padding: 1,
      })
    );
  });

program
  .command("new <name>")
  .description("Generate NOEX Application") // Define an option for the command
  .action(async (name) => {
    // const db = await inquirer.prompt({
    //   name: "database",
    //   type: "list",
    //   message: "Select DataBase\n",
    //   choices: ["MongoDB", "MySQL"],
    // });
    const spinner = createSpinner("Project Creating...").start();
    exec(
      `git clone https://github.com/sixbeeshades/nox_framework.git ${name}`,
      (err, stdout, stderr) => {
        if (err) {
          spinner.error({ text: chalk.redBright(`💀💀💀 Failed to create`) });
          console.log(chalk.redBright(err));
          process.exit(1);
          return;
        }
        spinner.success({
          text: chalk.greenBright("Project Created Successfully...👍"),
        });
        process.exit(0);
      }
    );
  });

program
  .command("generate <module_name>")
  .description("Create New Module in NOEX Application(MongoDB and MySQL)")
  .action(async (module_name) => {
    console.log(module_name);
    const db = await inquirer.prompt({
      name: "database",
      type: "list",
      message: "Select DataBase\n",
      choices: ["MongoDB", "MySQL"],
    });

    console.log(db.database);

    if (db.database === "MongoDB") {
      const spinner = createSpinner(
        `${module_name} Creating.. Please wait... `
      ).start();
      exec(`gulp new -module ${module_name} -mongo`, (err, stdout, stderr) => {
        if (err) {
          spinner.error({ text: chalk.redBright(`💀💀💀 Failed to create`) });
          console.log(chalk.redBright(err));
          process.exit(1);
          return;
        }
        spinner.success({
          text: chalk.greenBright(`${module_name} Created Successfully...👍`),
        });
        process.exit(0);
      });
    } else if (db.database === "MySQL") {
      const spinner = createSpinner(
        `${module_name.upp} Creating.. Please wait... `
      ).start();
      exec(`gulp new -module ${module_name}`, (err, stdout, stderr) => {
        if (err) {
          spinner.error({ text: chalk.redBright(`💀💀💀 Failed to create`) });
          console.log(chalk.redBright(err));
          process.exit(1);
          return;
        }
        spinner.success({
          text: chalk.greenBright(`${module_name} Created Successfully...👍`),
        });
        process.exit(0);
      });
    } else {
      console.log(chalk.red("Please Select correct Database"));
    }
  });

program
  .command("init")
  .description("Setup NOEX Application")
  .action(async () => {
    try {
      const spinner = createSpinner(
        "Setting up the project.. Please wait..."
      ).start();
      exec("npm install", async (err, stdout, stderr) => {
        if (err) {
          spinner.warn({ text: "Something went worng.." });
          console.log(chalk.yellow(err));
          await delay(2000);
          spinner.start({ text: " please wait.." });
          exec("npm install --legacy-peer-deps", (err) => {
            if (err) {
              console.log(chalk.redBright(err));
            } else {
              spinner.success({ text: "Setup Completed...👍" });
            }
          });
        } else {
          spinner.success({ text: "Setup Completed...👍" });
        }
      });
    } catch (error) {
      console.log(chalk.redBright(error));
    }
  });

program.parse(process.argv);
