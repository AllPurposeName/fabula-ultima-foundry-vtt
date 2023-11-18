import gulp from "gulp";
import chalk from "chalk";
import { writeFileSync, symlinkSync, existsSync, readFileSync, readdirSync } from "fs";
import { copy, ensureDir, remove } from "fs-extra";
import { glob } from "fs-extra-plus";
import path from "path";
import { execa } from "execa";
import semver from "semver";
import esBuild from "./esbuild.config.js";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

/********************/
/*  CONFIGURATION   */
/********************/
const production = process.env.NODE_ENV === "production";
const repoName = "fabula-ultima";
const sourceDirectory = "./src";
const distDirectory = "./dist";
const stdio = "inherit";
const templateExt = "hbs";
const getDownloadURL = (tag) =>
  `https://github.com/AllPurposeName/fabula-ultima-foundry-vtt/releases/download/v${tag}/dist.zip`;
const packageJson = JSON.parse(readFileSync("package.json"));
const { version } = packageJson;
const argv = yargs(hideBin(process.argv)).argv
const staticFiles = readdirSync(`./static`).map((file) => `static/${file}`);
staticFiles.push("README.md", "LICENSE", "static/system.json");

/********************/
/*      BUILD       */
/********************/

/**
 * Build the distributable JavaScript code
 */
// eslint-disable-next-line no-shadow
async function buildSource({ watch } = {}) {
  await esBuild({ production, watch });
}

/**
 * Copy other source files
 */
async function pipeTemplates() {
  const templateFiles = await glob([`${sourceDirectory}/**/*.${templateExt}`]);
  if (templateFiles && templateFiles.length > 0) {
    for (const file of templateFiles) {
      await copy(
        file,
        `${distDirectory}/templates/${file.replace(`${sourceDirectory}/`, "").replace("templates/", "")}`,
      );
    }
  }
}

/**
 * Copy other source files
 */
async function pipeStatics() {
  for (const file of staticFiles) {
    await copy(file, `${distDirectory}/${file.replace(/static\//, "")}`, { recursive: true }).catch((err) => {
      console.log(err);
    });
  }
}

/**
 * Watch for changes for each build step
 */
function buildWatch() {
  buildSource({ watch: true });
  gulp.watch(`${sourceDirectory}/**/*.${templateExt}`, { ignoreInitial: false }, pipeTemplates);
  gulp.watch(staticFiles, { ignoreInitial: false }, pipeStatics);
}

/********************/
/*      CLEAN       */
/********************/

/**
 * Remove built files from `dist` folder while ignoring source files
 */
async function cleanDist() {
  if (existsSync(`./dist`)) await remove(`./dist`);
}

/********************/
/*       LINK       */
/********************/

/**
 * Get the data path of Foundry VTT based on what is configured in `foundryconfig.json`
 */
function getDataPath() {
  const config = JSON.parse(readFileSync("foundryconfig.json"));

  if (config?.dataPath) {
    if (!existsSync(path.resolve(config.dataPath))) {
      throw new Error("User Data path invalid, no Data directory found");
    }

    return path.resolve(config.dataPath);
  } else {
    throw new Error("No User Data path defined in foundryconfig.json");
  }
}

/**
 * Link build to User Data folder
 */
async function linkUserData() {
  let destinationDirectory;
  if (existsSync(path.resolve("static/system.json"))) destinationDirectory = "systems";
  else throw new Error(`Could not find ${chalk.blueBright("system.json")}`);

  console.log("destination directory: " + destinationDirectory)
  const linkDirectory = path.resolve(getDataPath(), destinationDirectory, repoName);
  console.log("link directory: " + linkDirectory)

  if (!existsSync(linkDirectory)) {
    console.log(chalk.green(`Linking dist to ${chalk.blueBright(linkDirectory)}.`));
    await ensureDir(path.resolve(linkDirectory, ".."));
    symlinkSync(path.resolve(distDirectory), linkDirectory);
  }
}

/********************/
/*    VERSIONING    */
/********************/

/**
 * Get the target version based on on the current version and the argument passed as release.
 */
// eslint-disable-next-line no-shadow
function getTargetVersion(currentVersion, release) {
  if (["major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"].includes(release)) {
    return semver.inc(currentVersion, release);
  } else {
    return semver.valid(release);
  }
}

async function changelog() {
  await execa("npx", ["standard-version", "--skip.bump", "--skip.tag", "--skip.commit"], { stdio });
}

/**
 * Commit and push release to Github Upstream
 */
async function commitTagPush() {
  const commitMsg = `chore(release): Release ${version}`;
  await execa("git", ["add", "-A"], { stdio });
  await execa("git", ["commit", "--message", commitMsg], { stdio });
  await execa("git", ["tag", `v${version}`], { stdio });
  await execa("git", ["push", "upstream"], { stdio });
  await execa("git", ["push", "upstream", "--tag"], { stdio });
}

/**
 * Update version and download URL.
 */
 async function bumpVersion(cb) {
   try {
     // eslint-disable-next-line no-shadow
     const release = argv.release || argv.r;

     if (!release) {
       return cb(Error("Missing release type"));
     }

     const currentVersion = version;

     const targetVersion = getTargetVersion(currentVersion, release);

     if (!targetVersion) {
       return cb(new Error(chalk.red("Error: Incorrect version arguments")));
     }

     if (targetVersion === currentVersion) {
       return cb(new Error(chalk.red("Error: Target version is identical to current version")));
     }

     const systemManifest = JSON.parse(readFileSync("static/system.json"));

     if (!systemManifest) cb(Error(chalk.red("Manifest JSON not found")));

     console.log(`Updating version number to '${targetVersion}'`);

     packageJson.version = targetVersion;
     writeFileSync("package.json", JSON.stringify(packageJson, null, "\t"));

     systemManifest.version = targetVersion;
     systemManifest.download = getDownloadURL(targetVersion);
     writeFileSync("static/system.json", JSON.stringify(systemManifest, null, "\t"));

     return cb();
   } catch (err) {
     cb(err);
   }
 }

const execBuild = gulp.parallel(buildSource, pipeTemplates, pipeStatics);

export const clean = cleanDist;
export const build = gulp.series(clean, execBuild);

export const watch = gulp.series(buildWatch);
export const link = linkUserData;
export const bump = gulp.series(bumpVersion, changelog, clean, execBuild);
export const release = commitTagPush;
