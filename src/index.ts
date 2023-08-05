#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";
import { createSpinner } from "nanospinner";
import { Command } from "commander";

import {
  Info,
  createModule,
  gitClone,
  initializeGit,
  initializeNpmInstall,
  promptQuestion,
  removeGitFolder,
} from "./utils/helper.js";
import path from "path";

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
    try {
      const jsonData = fs.readFileSync("noex.config.json", "utf-8");
      const data = JSON.parse(jsonData);
      let dbType =
        data.db === "MySQL"
          ? await promptQuestion("database", "list", "Select Database\n", [
              "MongoDB",
              "MySQL",
            ])
          : data.db;
      if (dbType === "MongoDB") {
        await createModule(module_name, dbType);
      } else if (dbType === "MySQL") {
        await createModule(module_name, dbType);
      } else {
        console.log(chalk.red("Please Select the correct Database"));
      }
    } catch (error: any) {
      console.error(
        chalk.redBright(
          "noex.config.json file is not found...!\nYou may be in the wrong directory or the file may be deleted.\n"
        )
      );
      console.error(chalk.redBright(error.message));
      process.exit(1);
    }
  });

program.parse(process.argv);
