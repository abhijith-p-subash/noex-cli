import os from "os";
import chalk from "chalk";
import { exec } from "child_process";
import { promisify } from "util";
import {
  companyName,
  developerName,
  gitRepoLink,
  linkedinLink,
  website,
} from "./constants.js";
import inquirer from "inquirer";

const execAsync = promisify(exec);

export function Info() {
  return `${chalk.green("Version")}: ${chalk.red("0.0.1")} \n${chalk.green(
    "Developer"
  )}: ${chalk.red(developerName)}\n ${chalk.green("Linkedin")}: ${chalk.red(
    linkedinLink
  )}\n${chalk.green("Website")}: ${chalk.red(website)}\n`;
}

export function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function toExecute(): Promise<void> {
  return new Promise<void>((resolve) => {});
}

export async function promptQuestion(
  name: string,
  type: any,
  message: string,
  choices: string[]
) {
  return inquirer.prompt({
    name,
    type,
    message,
    choices,
  });
}

export async function gitClone(db: string, name: string) {
  try {
    let branch = db === "MongoDB" ? "master" : "v2_sql";
    await execAsync(
      `git clone --single-branch --branch ${branch} ${gitRepoLink} ${name}`
    );
    return {
      res: null,
      err: false,
      msg: "Project Created Successfully...👍",
    };
  } catch (err) {
    return {
      res: err,
      err: true,
      msg: "💀💀💀 Failed to create",
    };
  }
}

export async function removeGitFolder(testFolderPath: string) {
  try {
    // await execAsync(`rm -fr ${testFolderPath}/.git`);
    // await execAsync(`rmdir /s /q "${testFolderPath}\\.git"`);
    let removeCommand = "";

    // Determine the operating system and set the appropriate remove command
    if (os.platform() === "win32") {
      // Windows uses "rmdir /s /q" command to remove directories
      removeCommand = `rmdir /s /q "${testFolderPath}\\.git"`;
    } else {
      // Unix-like systems (Linux, macOS) use "rm -rf" command to remove directories
      removeCommand = `rm -rf "${testFolderPath}/.git"`;
    }

    await execAsync(removeCommand);
    console.log(chalk.greenBright("Setting up the project\n"));
  } catch (err) {
    console.log(chalk.redBright("Git Setup failed\n"));
    console.error(chalk.redBright(err));
  }
}

export async function initializeGit(testFolderPath: string) {
  console.log("Im in theGitInIt");

  try {
    await execAsync(`git init`, { cwd: testFolderPath });
    console.log(chalk.greenBright("Git initialized successfully\n"));
  } catch (err) {
    console.log(chalk.redBright("Failed to initialize Git\n"));
    console.error(chalk.redBright(err));
  }
}

export async function initializeNpmInstall(testFolderPath: string) {
  console.log("Im in NPM");
  try {
    await execAsync(`npm install`, { cwd: testFolderPath });
    console.log(chalk.greenBright("npm install completed successfully\n"));
  } catch (err) {
    console.log(chalk.redBright("Failed to initialize npm install\n"));
    console.error(chalk.redBright(err));
  }
}
