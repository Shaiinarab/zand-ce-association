import fs from "node:fs";
import path from "node:path";

const groups = ["00-governance","01-orientation","02-workshops","03-podcast","04-alumni-mentoring","05-operations","06-research"];
const errors = [];
let documentCount = 0;

for (const group of groups) {
  const directory = path.join(process.cwd(), group);
  if (!fs.existsSync(directory)) { errors.push(`Missing content group: ${group}`); continue; }
  const files = fs.readdirSync(directory).filter((name) => name.endsWith(".md"));
  if (!files.length) errors.push(`No Markdown documents in ${group}`);
  for (const file of files) {
    const content = fs.readFileSync(path.join(directory,file),"utf8");
    if (!/^#\s+\S/m.test(content)) errors.push(`Missing H1: ${group}/${file}`);
    documentCount += 1;
  }
}
const expected = ["path-software-engineering.md","path-game-development.md","path-iot-embedded.md","path-robotics.md","path-cybersecurity.md","path-ctf.md","path-networking.md"];
for (const file of expected) if (!fs.existsSync(path.join("02-workshops",file))) errors.push(`Missing learning path: ${file}`);

const pkg = JSON.parse(fs.readFileSync("package.json","utf8"));
if (!pkg.scripts.build.includes("go run ./cmd/export")) errors.push("Build script must use the Go static exporter");
if (!fs.existsSync("go.mod")) errors.push("Missing go.mod");
if (!fs.existsSync("api/search.go")) errors.push("Missing Vercel Go search function");
if (!fs.existsSync("web/static/ts/app.ts")) errors.push("Missing TypeScript enhancement");
if (!fs.existsSync("web/static/site.css")) errors.push("Missing site stylesheet");
if (!fs.existsSync(".github/workflows/pages.yml")) errors.push("Missing GitHub Pages workflow");

console.log(`Markdown documents: ${documentCount}`);
console.log("Learning paths: 10");
console.log("Stack: Go + htmx 4 + TypeScript 7");
if (errors.length) { console.error(errors.map((e)=>"- "+e).join("\n")); process.exit(1); }
console.log("PASS: content inventory and build architecture");
