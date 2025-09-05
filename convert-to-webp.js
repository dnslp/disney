const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const DOWNLOADS_DIR = path.join(__dirname, 'downloads');
const WEBP_DIR = path.join(__dirname, 'downloads-webp');

// Quality setting (1-100, higher is better quality but larger file)
const QUALITY = 85;

async function convertToWebP(inputPath, outputPath) {
    const command = `cwebp -q ${QUALITY} "${inputPath}" -o "${outputPath}"`;
    try {
        await execAsync(command);
        return true;
    } catch (error) {
        console.error(`Failed to convert ${inputPath}:`, error.message);
        return false;
    }
}

async function processDirectory(sourceDir, targetDir) {
    await fs.promises.mkdir(targetDir, { recursive: true });
    
    const items = await fs.promises.readdir(sourceDir);
    let converted = 0;
    let failed = 0;
    
    for (const item of items) {
        const sourcePath = path.join(sourceDir, item);
        const targetPath = path.join(targetDir, item);
        
        const stat = await fs.promises.stat(sourcePath);
        
        if (stat.isDirectory()) {
            const result = await processDirectory(sourcePath, targetPath);
            converted += result.converted;
            failed += result.failed;
        } else if (stat.isFile()) {
            const ext = path.extname(item).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const webpName = item.replace(/\.(png|jpg|jpeg)$/i, '.webp');
                const webpPath = path.join(targetDir, webpName);
                
                if (await convertToWebP(sourcePath, webpPath)) {
                    converted++;
                    process.stdout.write(`✓`);
                } else {
                    failed++;
                    process.stdout.write(`✗`);
                }
            }
        }
    }
    
    return { converted, failed };
}

async function checkCwebp() {
    try {
        await execAsync('cwebp -version');
        return true;
    } catch {
        return false;
    }
}

async function main() {
    console.log('🖼️  WebP Conversion Tool');
    console.log('========================\n');
    
    // Check if cwebp is installed
    if (!await checkCwebp()) {
        console.error('❌ cwebp is not installed!');
        console.log('\nTo install on macOS:');
        console.log('  brew install webp\n');
        console.log('To install on Ubuntu/Debian:');
        console.log('  sudo apt-get install webp\n');
        console.log('For other systems, visit: https://developers.google.com/speed/webp/download');
        process.exit(1);
    }
    
    console.log('✅ cwebp found\n');
    console.log(`Source: ${DOWNLOADS_DIR}`);
    console.log(`Target: ${WEBP_DIR}`);
    console.log(`Quality: ${QUALITY}%\n`);
    console.log('Converting images...\n');
    
    const startTime = Date.now();
    const result = await processDirectory(DOWNLOADS_DIR, WEBP_DIR);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    
    console.log('\n\n✨ Conversion Complete!');
    console.log(`   Converted: ${result.converted} images`);
    console.log(`   Failed: ${result.failed} images`);
    console.log(`   Duration: ${duration}s`);
    console.log(`   Output: ${WEBP_DIR}`);
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});