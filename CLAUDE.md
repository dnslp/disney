# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Disney Emoji Blitz image downloader that fetches character emoji images from Fandom wiki URLs. The project has two main download scripts that process URLs and download images into organized directories.

## Commands

```bash
# Install dependencies
npm install

# Download images from TSV file (urls.tsv)
node download_from_tsv.js

# Download images from hardcoded DATA object
node download_images.js
```

## Architecture

### Core Scripts

1. **download_from_tsv.js**: Reads URLs from `urls.tsv` (tab-separated: section name + URL), downloads images into `downloads/` with subdirectories per section.
   - Extracts proper filenames from MediaWiki/Fandom URLs
   - Handles filename sanitization and deduplication
   - Uses HEAD requests to determine file extension when unclear
   - Includes browser headers to bypass bot detection

2. **download_images.js**: Contains a hardcoded DATA object mapping categories to URLs, downloads into `downloads/` with similar organization.
   - Structured as nested object: category → gallery → URL array
   - Similar download and filename handling logic

### Key Implementation Details

- **URL Processing**: Both scripts handle complex Fandom/MediaWiki URLs (e.g., `/images/a/ab/Name.png/revision/latest?...`) by extracting the actual filename
- **Filename Cleaning**: Removes "EmojiBlitz" prefix, sanitizes special characters, ensures unique names with `-2`, `-3` suffixes
- **Extension Detection**: Falls back to HEAD request content-type when URL doesn't have clear extension
- **Headers**: Uses browser-like headers (User-Agent, referer, etc.) to bypass bot detection
- **Error Handling**: Gracefully continues on download failures with console warnings

### File Structure

```
/
├── download_from_tsv.js  # TSV-based downloader
├── download_images.js    # Hardcoded DATA downloader  
├── urls.tsv             # Tab-separated: section\tURL
├── package.json         # Dependencies: axios, mkdirp
└── downloads/           # Output directory with subdirectories per category
```

## Dependencies

- `axios`: HTTP client for downloading images
- `mkdirp`: Creates nested directories recursively