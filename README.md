# Disney Emoji Explorer

An interactive web interface to explore Disney Emoji Blitz character images organized by movie/series.

## Features

- 📁 Grid view of all Disney franchises with mosaic previews
- 🖼️ Browse individual character emojis within each folder
- 🔍 Real-time search functionality
- 💾 WebP format for optimized loading
- 📱 Responsive design for all devices
- 🔍 Lightbox for full-size viewing

## Live Demo

Visit: https://[your-username].github.io/disney-emoji

## Setup & Installation

### Prerequisites

- Node.js (v14+)
- Homebrew (macOS) or package manager for WebP tools

### Install Dependencies

```bash
# Install Node dependencies
npm install

# Install WebP tools (macOS)
brew install webp

# Install WebP tools (Ubuntu/Debian)
sudo apt-get install webp
```

## Usage

### 1. Download Images

First, populate the `urls.tsv` file with Disney emoji URLs (format: `category\tURL`), then:

```bash
# Download from TSV file
node download_from_tsv.js
```

### 2. Convert to WebP

Convert all downloaded images to WebP format for better performance:

```bash
node convert-to-webp.js
```

### 3. Generate Manifest

Create the image manifest file:

```bash
node generate-manifest-webp.js
```

### 4. Run Locally

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## Deploy to GitHub Pages

### 1. Create GitHub Repository

Create a new repository on GitHub (e.g., `disney-emoji`)

### 2. Initialize Git & Push

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/[your-username]/disney-emoji.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Click Save

Your site will be available at: `https://[your-username].github.io/disney-emoji`

## Project Structure

```
/
├── index.html              # Main HTML file
├── app.js                  # JavaScript application logic
├── style.css              # CSS styles
├── images-manifest.json   # Generated image catalog
├── downloads-webp/        # WebP converted images (included in repo)
├── downloads/             # Original images (gitignored)
└── scripts/
    ├── download_from_tsv.js    # Download from TSV
    ├── convert-to-webp.js      # Convert to WebP
    └── generate-manifest-webp.js # Generate manifest
```

## Image Processing

The project includes 828 character emojis from 112 Disney properties, all converted to WebP format for optimal web performance.

### Stats
- **Total Folders**: 112
- **Total Images**: 828
- **Format**: WebP (85% quality)
- **Average Size Reduction**: ~70% vs PNG

## Development

### Updating Images

1. Add new URLs to `urls.tsv`
2. Run download script
3. Convert to WebP
4. Regenerate manifest
5. Commit and push changes

### Customization

- Adjust WebP quality in `convert-to-webp.js` (line 12)
- Modify grid sizes in `style.css`
- Change folder preview layout in `app.js`

## Browser Support

- Chrome 23+
- Firefox 65+
- Safari 14.1+
- Edge 18+

## License

This project is for educational purposes. Disney characters and images are property of The Walt Disney Company.

## Credits

Created with assistance from Claude AI