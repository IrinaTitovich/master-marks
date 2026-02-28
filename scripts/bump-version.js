import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const arg = (process.argv[2] || "").toLowerCase().replace(/^\/+/, "");
const allowed = ["patch", "minor", "major"];
if (!allowed.includes(arg)) {
    console.error(
        "Использование: node scripts/bump-version.js <patch|minor|major>"
    );
    console.error("Примеры: node scripts/bump-version.js patch");
    process.exit(1);
}

const indexPath = join(__dirname, "..", "src", "pages", "Index.tsx");
let content = readFileSync(indexPath, "utf8");

const versionMatch = content.match(/v(\d+)\.(\d+)\.(\d+)/);
if (!versionMatch) {
    console.error("В футере не найдена версия в формате vX.Y.Z");
    process.exit(1);
}

let [, major, minor, patch] = versionMatch.map(Number);
if (arg === "patch") patch += 1;
else if (arg === "minor") {
    minor += 1;
    patch = 0;
} else if (arg === "major") {
    major += 1;
    minor = 0;
    patch = 0;
}

const newVersion = `v${major}.${minor}.${patch}`;
content = content.replace(/v\d+\.\d+\.\d+/, newVersion);
writeFileSync(indexPath, content);

console.log(`Версия обновлена: ${versionMatch[0]} → ${newVersion}`);