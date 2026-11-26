// Bundle the module into dist/<id>.zip (the folder layout Foundry expects:
// a single top-level directory named after the module id).
//
//   npm run build   (validate → pack → zip)
import { readFile, rm, mkdir, cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const module = JSON.parse(await readFile(join(root, "module.json"), "utf8"));
const INCLUDE = ["module.json", "README.md", "LICENSE", "LICENSE-CODE", "scripts", "styles", "lang", "icons", "assets", "packs"];

const dist = join(root, "dist");
const stage = join(dist, module.id);
await rm(dist, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const entry of INCLUDE) {
  if (existsSync(join(root, entry))) await cp(join(root, entry), join(stage, entry), { recursive: true });
}
// LevelDB lock/log files are runtime state, not content.
execFileSync("find", [stage, "(", "-name", "LOCK", "-o", "-name", "LOG", "-o", "-name", "LOG.old", ")", "-delete"]);
execFileSync("zip", ["-qr", `${module.id}.zip`, module.id], { cwd: dist });
console.log(`dist/${module.id}.zip (v${module.version})`);
