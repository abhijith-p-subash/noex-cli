import chalk from "chalk";
import {
  companyName,
  developerName,
  gitRepoLink,
  linkedinLink,
  website,
} from "./constants.js";

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
