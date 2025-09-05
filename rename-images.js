const fs = require('fs');
const path = require('path');

const WEBP_DIR = path.join(__dirname, 'downloads-webp');

// Convert CamelCase to spaces and remove trailing '1'
function cleanImageName(filename) {
    // Get name without extension
    const ext = path.extname(filename);
    let name = path.basename(filename, ext);
    
    // Remove trailing '1' if it exists
    if (name.endsWith('1')) {
        name = name.slice(0, -1);
    }
    
    // Add spaces between camelCase words
    // Handle special cases first
    name = name
        // Handle numbers (like "1969")
        .replace(/(\d+)([A-Z])/g, '$1 $2')
        // Handle uppercase sequences (like "C-3PO" or "BB8")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        // Handle normal camelCase
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Handle special Disney patterns
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        // Clean up any double spaces
        .replace(/\s+/g, ' ')
        .trim();
    
    return name + ext;
}

async function renameFiles() {
    let totalRenamed = 0;
    let totalSkipped = 0;
    
    try {
        const folders = await fs.promises.readdir(WEBP_DIR);
        
        for (const folder of folders) {
            const folderPath = path.join(WEBP_DIR, folder);
            const stat = await fs.promises.stat(folderPath);
            
            if (stat.isDirectory()) {
                console.log(`\nProcessing folder: ${folder}`);
                const files = await fs.promises.readdir(folderPath);
                
                for (const file of files) {
                    const oldPath = path.join(folderPath, file);
                    const newName = cleanImageName(file);
                    
                    if (newName !== file) {
                        const newPath = path.join(folderPath, newName);
                        
                        // Check if new filename already exists
                        if (fs.existsSync(newPath)) {
                            console.log(`  ⚠️  Skipped (exists): ${file} -> ${newName}`);
                            totalSkipped++;
                        } else {
                            await fs.promises.rename(oldPath, newPath);
                            console.log(`  ✓ Renamed: ${file} -> ${newName}`);
                            totalRenamed++;
                        }
                    }
                }
            }
        }
        
        console.log('\n✨ Renaming Complete!');
        console.log(`   Renamed: ${totalRenamed} files`);
        console.log(`   Skipped: ${totalSkipped} files`);
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

// Test the cleaning function with examples
console.log('Testing name cleaning:');
console.log('  CruellaDeVil1.webp ->', cleanImageName('CruellaDeVil1.webp'));
console.log('  WinterCruella1.webp ->', cleanImageName('WinterCruella1.webp'));
console.log('  BobCratchitMickey1.webp ->', cleanImageName('BobCratchitMickey1.webp'));
console.log('  1969IndianaJones1.webp ->', cleanImageName('1969IndianaJones1.webp'));
console.log('  C-3PO1.webp ->', cleanImageName('C-3PO1.webp'));
console.log('  BB81.webp ->', cleanImageName('BB81.webp'));
console.log('\nStarting rename process...');

renameFiles();