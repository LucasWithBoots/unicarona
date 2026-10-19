// Gera a versão web em dist/: o app fica em /app/ e a raiz mostra
// o app dentro de uma moldura de celular e o processo do TCC (web/showcase.html).
import { execSync } from "node:child_process";
import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

const SITE_URL = (process.env.SITE_URL ?? "https://uni-carona.expo.app").replace(/\/$/, "");

execSync("npx expo export --platform web --output-dir dist --clear", { stdio: "inherit" });

mkdirSync("dist/app", { recursive: true });
renameSync("dist/index.html", "dist/app/index.html");

const showcase = readFileSync("web/showcase.html", "utf8").replaceAll("%SITE_URL%", SITE_URL);
writeFileSync("dist/index.html", showcase);
copyFileSync("assets/images/icon.png", "dist/icon.png");
if (existsSync("web/og.png")) copyFileSync("web/og.png", "dist/og.png");
cpSync("web/tcc", "dist/tcc", { recursive: true });

console.log(`\nVersão web pronta em dist/ (SITE_URL=${SITE_URL})`);
