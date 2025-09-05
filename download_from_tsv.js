// download_from_tsv.js
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const TSV = path.resolve(__dirname, "urls.tsv");
const OUT = path.resolve(__dirname, "downloads");

// ---------- helpers ----------
const kebab = s =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

function extFromCT(ct = "") {
  ct = ct.split(";")[0].trim().toLowerCase();
  if (ct.includes("jpeg")) return "jpg";
  if (ct.includes("jpg"))  return "jpg";
  if (ct.includes("png"))  return "png";
  if (ct.includes("webp")) return "webp";
  if (ct.includes("gif"))  return "gif";
  return "png";
}

function cleanFilename(name) {
  // decode & sanitize first
  try { name = decodeURIComponent(name); } catch {}
  name = name.replace(/[?#].*$/, "");
  name = name.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_{2,}/g, "_");

  // strip "EmojiBlitz" anywhere (case-insensitive)
  name = name.replace(/EmojiBlitz/gi, "");

  // tidy underscores
  name = name.replace(/^_+|_+$/g, "");
  if (!name || name === "." || name === "..") name = "file.png";
  return name;
}

// Extract the *real* filename from MediaWiki/Fandom URLs
function filenameFromURL(u) {
  try {
    const url = new URL(u);
    const parts = url.pathname.split("/").filter(Boolean);
    // Typical: .../images/a/ab/SomeName.png/revision/latest?...
    const revIdx = parts.findIndex(p => p === "revision");
    const candidates = revIdx > 0 ? parts.slice(0, revIdx) : parts;
    for (let i = candidates.length - 1; i >= 0; i--) {
      const seg = candidates[i];
      if (/\.[a-z0-9]+$/i.test(seg)) {
        return cleanFilename(seg);
      }
    }
    return cleanFilename(parts[parts.length - 1] || "file.png");
  } catch {
    const bare = u.split("?")[0].split("#")[0];
    const last = bare.substring(bare.lastIndexOf("/") + 1) || "file.png";
    return cleanFilename(last);
  }
}

function ensureUnique(destPath) {
  if (!fs.existsSync(destPath)) return destPath;
  const dir = path.dirname(destPath);
  const base = path.basename(destPath);
  const dot = base.lastIndexOf(".");
  const stem = dot > 0 ? base.slice(0, dot) : base;
  const ext  = dot > 0 ? base.slice(dot) : "";
  let i = 2;
  while (true) {
    const p = path.join(dir, `${stem}-${i}${ext}`);
    if (!fs.existsSync(p)) return p;
    i++;
  }
}

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

// HEAD probe if URL lacks a reliable extension
async function headForExt(url, headers) {
  try {
    const res = await axios.head(url, {
      headers,
      maxRedirects: 5,
      validateStatus: s => s >= 200 && s < 400, // allow 3xx
    });
    return extFromCT(res.headers["content-type"]);
  } catch {
    return null;
  }
}

async function download(url, dest, headers) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
    headers,
    maxRedirects: 5,
    validateStatus: s => s >= 200 && s < 400,
  });
  await fs.promises.writeFile(dest, res.data);
}

// ---------- YOUR HEADERS (paste from "Copy as cURL") ----------
const HEADERS = {
  // Example based on your snippet; add cookie if you have it:
  "sec-ch-ua-platform": "\"macOS\"",
  "referer": "https://disneyemojiblitz.fandom.com/",
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
  "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
  "sec-ch-ua-mobile": "?0",
  // If your copied cURL includes a cookie line, include it here:
  // "cookie": "name=value; other=value; ..."
};
// --------------------------------------------------------------

// ---------- main ----------
(async () => {
  await ensureDir(OUT);
  const lines = (await fs.promises.readFile(TSV, "utf8"))
    .split(/\r?\n/)
    .filter(Boolean);

  for (const line of lines) {
    const [sectionRaw, url] = line.split("\t");
    if (!sectionRaw || !url) continue;

    const dir = path.join(OUT, kebab(sectionRaw));
    await ensureDir(dir);

    // derive filename from URL and clean
    let filename = filenameFromURL(url);

    // if extension is missing/iffy, infer via HEAD content-type
    const dot = filename.lastIndexOf(".");
    let ext = dot > 0 ? filename.slice(dot + 1).toLowerCase() : "";
    if (!ext || ext.includes("/")) {
      const ctExt = await headForExt(url, HEADERS);
      if (ctExt) {
        filename = (dot > 0 ? filename.slice(0, dot) : filename) + "." + ctExt;
      } else if (!ext) {
        filename += ".png";
      }
    }

    let dest = path.join(dir, filename);
    dest = ensureUnique(dest);

    try {
      await download(url, dest, HEADERS);
      console.log("Saved:", dest);
    } catch (e) {
      console.warn("Failed:", url, "-", e.message);
    }
  }

  console.log("\nDone ->", OUT);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
