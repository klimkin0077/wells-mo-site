import { execFile } from "node:child_process";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const DIST_DIR = path.resolve("dist/public");
const SITE_URL = "https://wells-mo.ru";
const HOST = "127.0.0.1";
const PORT = 4173;
const CHROMIUM_COMMANDS = ["chromium", "chromium-browser", "google-chrome", "/usr/bin/chromium"];

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

const ROUTES = [
  "/",
  "/cleaning/",
  "/repair/",
  "/seam-sealing/",
  "/stapling/",
  "/bottom-filter/",
  "/disinfection/",
  "/chistka-kolodcev/",
  "/remont-kolodcev/",
  "/gidroizolyaciya-shvov/",
  "/skobirovanie-kolodca/",
  "/uglublenie-kolodcev/",
  "/kopka-kolodcev/",
  "/septik-iz-zhb-kolec/",
  "/drenazhnyy-kolodec/",
  "/vodoprovod-iz-kolodca-v-dom/",
  "/price/",
  "/ceny/",
  "/nashi-raboty/",
  "/o-nas/",
  "/contacts/",
  "/kontakty/",
  "/goroda/odincovo/",
  "/goroda/odintsovo/",
  "/goroda/krasnogorsk/",
  "/goroda/istra/",
  "/goroda/dmitrov/",
  "/goroda/nahabino/",
  "/goroda/dedovsk/",
  "/goroda/zvenigorod/",
  "/goroda/novaya-riga/",
  "/goroda/rublevka/",
  "/goroda/barvikha/",
  "/goroda/pavlovskaya-sloboda/",
];

function resolveFilePath(requestPath) {
  const pathname = decodeURIComponent(new URL(requestPath, `http://${HOST}:${PORT}`).pathname);
  const safePath = pathname.replace(/^\/+/, "");
  const directPath = path.join(DIST_DIR, safePath);

  return fs
    .stat(directPath)
    .then((stats) => {
      if (stats.isDirectory()) {
        return path.join(directPath, "index.html");
      }

      return directPath;
    })
    .catch(() => path.join(DIST_DIR, "index.html"));
}

function startPreviewServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const filePath = await resolveFilePath(req.url || "/");
        const contentType = MIME_TYPES[path.extname(filePath)] || "text/html; charset=utf-8";
        res.writeHead(200, { "Content-Type": contentType });
        createReadStream(filePath).pipe(res);
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(String(error));
      }
    });

    server.on("error", reject);
    server.listen(PORT, HOST, () => resolve(server));
  });
}

async function ensureDirForRoute(routePath) {
  if (routePath === "/") {
    return DIST_DIR;
  }

  const targetDir = path.join(DIST_DIR, routePath.replace(/^\/+|\/+$/g, ""));
  await fs.mkdir(targetDir, { recursive: true });
  return targetDir;
}

async function findChromiumCommand() {
  for (const command of CHROMIUM_COMMANDS) {
    try {
      await execFileAsync(command, ["--version"]);
      return command;
    } catch {
      // try next candidate
    }
  }

  throw new Error("Chromium executable was not found for prerender.");
}

async function dumpRouteHtml(chromiumCommand, routePath) {
  const targetUrl = new URL(routePath, `http://${HOST}:${PORT}`).toString();
  const { stdout } = await execFileAsync(chromiumCommand, [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--virtual-time-budget=8000",
    "--run-all-compositor-stages-before-draw",
    "--dump-dom",
    targetUrl,
  ], {
    maxBuffer: 50 * 1024 * 1024,
  });

  return stdout.replaceAll(`http://${HOST}:${PORT}`, SITE_URL).trimEnd() + "\n";
}

async function writePrerenderedRoute(routePath, html) {
  const targetDir = await ensureDirForRoute(routePath);
  const targetFile = routePath === "/" ? path.join(DIST_DIR, "index.html") : path.join(targetDir, "index.html");
  await fs.writeFile(targetFile, html, "utf8");
}

async function main() {
  const server = await startPreviewServer();

  try {
    const chromiumCommand = await findChromiumCommand();

    for (const routePath of ROUTES) {
      const html = await dumpRouteHtml(chromiumCommand, routePath);
      await writePrerenderedRoute(routePath, html);
      console.log(`Prerendered ${routePath}`);
    }
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
