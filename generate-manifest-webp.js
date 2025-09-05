const fs = require('fs');
const path = require('path');

const DOWNLOADS_DIR = path.join(__dirname, 'downloads-webp');
const OUTPUT_FILE = path.join(__dirname, 'images-manifest.json');

function formatFolderName(folderName) {
    return folderName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getImageFiles(dir) {
    const files = fs.readdirSync(dir);
    const images = [];
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isFile()) {
            const ext = path.extname(file).toLowerCase();
            if (['.webp', '.png', '.jpg', '.jpeg', '.gif'].includes(ext)) {
                images.push(file);
            }
        }
    }
    
    return images;
}

function generateManifest() {
    const manifest = {
        folders: [],
        generated: new Date().toISOString(),
        format: 'webp'
    };
    
    try {
        const folders = fs.readdirSync(DOWNLOADS_DIR);
        
        for (const folder of folders) {
            const folderPath = path.join(DOWNLOADS_DIR, folder);
            const stat = fs.statSync(folderPath);
            
            if (stat.isDirectory()) {
                const images = getImageFiles(folderPath);
                
                if (images.length > 0) {
                    manifest.folders.push({
                        name: folder,
                        displayName: formatFolderName(folder),
                        images: images,
                        count: images.length,
                        preview: images.slice(0, 4) // First 4 images for preview
                    });
                }
            }
        }
        
        // Sort folders alphabetically by display name
        manifest.folders.sort((a, b) => a.displayName.localeCompare(b.displayName));
        
        // Write manifest file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
        
        console.log(`✅ WebP manifest generated successfully!`);
        console.log(`   Found ${manifest.folders.length} folders`);
        console.log(`   Total images: ${manifest.folders.reduce((sum, f) => sum + f.count, 0)}`);
        console.log(`   Output: ${OUTPUT_FILE}`);
        
    } catch (error) {
        console.error('❌ Error generating manifest:', error);
        process.exit(1);
    }
}

// Run the script
generateManifest();