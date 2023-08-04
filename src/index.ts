#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import boxen from "boxen";
import { createSpinner } from "nanospinner";
import { Command } from "commander";
import { exec } from "child_process";
import { promisify } from "util";

import {
  Info,
  delay,
  gitClone,
  initializeGit,
  initializeNpmInstall,
  promptQuestion,
  removeGitFolder,
} from "./utils/helper.js";
import path from "path";
import cliProgress from "cli-progress";

const program = new Command();
const execAsync = promisify(exec);

console.log(gradient.cristal(figlet.textSync("NOEX - CLI")));

program
  .name("NOEX CLI")
  .description("Create Nodejs Express project with minimum effort")
  .version("noex v1.2.3", "-v, --version", "output the the version number");

program
  .command("info")
  .description("Generate info about NOEX CLI")
  .action(() => {
    try {
      // Read the JSON data from the file
      const jsonData = fs.readFileSync("data.json", "utf-8");

      // Parse the JSON data back to an object
      const data = JSON.parse(jsonData);

      // Log the data
      console.log("Data from the JSON file:");
      console.log(data);
    } catch (error: any) {
      // If the file doesn't exist or there's an error reading the file, handle the error here
      console.error("Error reading data.json:", error.message);
    }

    console.log(
      boxen(Info(), {
        padding: 1,
      })
    );
  });

program
  .command("new <name>")
  .description("Generate NOEX Application")
  .action(async (name) => {
    const db = await promptQuestion("database", "list", "Select DataBase\n", [
      "MongoDB",
      "MySQL",
    ]);
    const isGitInit = await promptQuestion(
      "gitInit",
      "list",
      "Do you want to initialize Git (Recommended*)\n",
      ["Yes", "No"]
    );
    const isNpmInit = await promptQuestion(
      "npmInit",
      "list",
      "Do you want to install node module (Recommended*)\n",
      ["Yes", "No"]
    );

    const spinner = createSpinner("Project Creating...\n").start();

    try {
      await gitClone(db.database, name);

      await removeGitFolder(name);

      const tasks = [];
      if (isGitInit.gitInit === "Yes") {
        tasks.push(initializeGit(name));
      }
      if (isNpmInit.npmInit === "Yes") {
        tasks.push(initializeNpmInstall(name));
      }
      await Promise.all(tasks);

      const noexConfig = {
        name: "NOEX FRAME_WORK V2",
        db: db.database,
        git: isGitInit.gitInit === "Yes" ? true : false,
        npm: isNpmInit.npmInit === "Yes" ? true : false,
        created_at: new Date().toISOString(),
      };

      const configFilePath = path.join(name, "noex.config.json");

      fs.writeFileSync(configFilePath, JSON.stringify(noexConfig, null, 2));

      spinner.success({
        text: chalk.greenBright("Project Created Successfully...👍"),
      });

      process.exit(0);
    } catch (err) {
      spinner.error({ text: chalk.redBright("💀💀💀 Failed to create") });
      console.error(chalk.redBright(err));
      process.exit(1);
    }
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
