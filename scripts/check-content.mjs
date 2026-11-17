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

const failures = [];
const docs = [];

for (const group of groups) {
  const dir = path.join(root, group);
  if (!fs.existsSync(dir)) {
    failures.push(`missing group directory: ${group}`);
    continue;
  }
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".md")).sort();
  if (files.length === 0) failures.push(`no markdown in ${group}`);
  for (const file of files) {
    const rel = path.join(group, file);
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    if (!/^#\s+\S/m.test(text)) failures.push(`missing top-level heading: ${rel}`);
    if (text.trim().length < 80) failures.push(`suspiciously short document: ${rel}`);
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
const expected = docs.length + 1;
if (manifest.file_count_excluding_manifest < expected) {
  failures.push(
    `manifest counts ${manifest.file_count_excluding_manifest}, expected at least ${expected}`,
  );
}

const playbook = path.join(root, "public/Zand-CE-Creative-Playbook.pdf");
if (!fs.existsSync(playbook)) failures.push("missing creative playbook PDF");

console.log(`documents: ${docs.length}`);
console.log(`roadmap gates: ${gates}`);
console.log(`manifest files: ${manifest.file_count_excluding_manifest}`);
console.log(`playbook: ${fs.statSync(playbook).size} bytes`);

if (failures.length > 0) {
  console.error("\nFAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nPASS: content model, roadmap and manifest agree");
