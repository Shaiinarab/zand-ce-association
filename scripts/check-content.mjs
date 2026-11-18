import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const groups = [
  "00-governance",
  "01-orientation",
  "02-workshops",
  "03-podcast",
  "04-alumni-mentoring",
  "05-operations",
  "06-research",
];
const ignored = new Set([".git", "node_modules", ".next", "out", ".vercel"]);
const failures = [];
const docs = [];

function listFiles(directory, prefix = "") {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const relative = path.posix.join(prefix, entry.name);
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolute, relative) : [relative];
  });
}

for (const group of groups) {
  const dir = path.join(root, group);
  if (!fs.existsSync(dir)) {
    failures.push(`missing group directory: ${group}`);
    continue;
  }
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md")).sort();
  if (files.length === 0) failures.push(`no markdown in ${group}`);
  for (const file of files) {
    const rel = path.posix.join(group, file);
    const content = fs.readFileSync(path.join(root, rel), "utf8");
    if (!/^#\s+\S/m.test(content)) failures.push(`missing top-level heading: ${rel}`);
    if (content.trim().length < 80) failures.push(`suspiciously short document: ${rel}`);
    docs.push(rel);
  }
}

const roadmap = fs.readFileSync(path.join(root, "00-governance/90-day-roadmap.md"), "utf8");
const gates = roadmap
  .split(/\r?\n/)
  .filter((line) => line.trim().startsWith("|"))
  .filter((line) => !/^\|\s*:?-{2,}/.test(line.trim()))
  .filter((line) => !line.includes("|بازه|"))
  .length;
if (gates < 5) failures.push(`expected at least 5 roadmap gates, found ${gates}`);

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const actualFiles = listFiles(root).filter((file) => file !== "manifest.json").sort();
const listedFiles = [...manifest.files].sort();
const missingFromManifest = actualFiles.filter((file) => !listedFiles.includes(file));
const missingFromRepository = listedFiles.filter((file) => !actualFiles.includes(file));
if (manifest.file_count_excluding_manifest !== actualFiles.length) {
  failures.push(`manifest file count is ${manifest.file_count_excluding_manifest}; actual count is ${actualFiles.length}`);
}
if (listedFiles.length !== actualFiles.length || missingFromManifest.length || missingFromRepository.length) {
  failures.push("manifest file list does not match the repository tree");
  for (const file of missingFromManifest) failures.push(`not listed in manifest: ${file}`);
  for (const file of missingFromRepository) failures.push(`manifest entry missing from repository: ${file}`);
}
if (new Set(listedFiles).size !== listedFiles.length) failures.push("manifest contains duplicate file paths");

const requiredFiles = [
  "app/programs/crypto-hype/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "02-workshops/workshop-03-last-drops.md",
  ".github/workflows/pages.yml",
  "public/Zand-CE-Creative-Playbook.pdf",
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing required file: ${file}`);
}
const homepage = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
if (!homepage.includes("/programs/crypto-hype/")) failures.push("homepage does not link to the crypto workshop");
const programPage = fs.existsSync(path.join(root, "app/programs/crypto-hype/page.tsx"))
  ? fs.readFileSync(path.join(root, "app/programs/crypto-hype/page.tsx"), "utf8")
  : "";
if (!programPage.includes("crypto-hype-last-drops")) failures.push("crypto program page does not link to the live workshop");
const workflow = fs.readFileSync(path.join(root, ".github/workflows/pages.yml"), "utf8");
for (const permission of ["pages: write", "id-token: write"]) {
  if (!workflow.includes(permission)) failures.push(`Pages workflow missing permission: ${permission}`);
}

const playbook = path.join(root, "public/Zand-CE-Creative-Playbook.pdf");
const playbookBytes = fs.existsSync(playbook) ? fs.statSync(playbook).size : 0;

console.log(`documents: ${docs.length}`);
console.log(`roadmap gates: ${gates}`);
console.log(`manifest files: ${manifest.file_count_excluding_manifest}`);
console.log(`playbook: ${playbookBytes} bytes`);

if (failures.length > 0) {
  console.error("\nFAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nPASS: content, routes, workflow and manifest are consistent");
