import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputDirectory = resolve(projectRoot, "dist");
const pageNames = [
  "index.html",
  "404.html",
  "about.html",
  "governance.html",
  "meetings.html",
  "survey-results.html",
  "documents.html",
  "contact.html",
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const pageName of pageNames) {
  await cp(resolve(projectRoot, pageName), resolve(outputDirectory, pageName));
}

for (const directoryName of ["assets", "images"]) {
  await cp(resolve(projectRoot, directoryName), resolve(outputDirectory, directoryName), {
    recursive: true,
  });
}

const deployedFiles = await readdir(outputDirectory, { recursive: true });
console.log(`Prepared ${deployedFiles.length} files in dist/.`);