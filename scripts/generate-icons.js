const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [192, 512];

async function generateIcons() {
    const inputSvg = path.join(__dirname, '../public/icons/eazycal-icon.svg');
    const outputDir = path.join(__dirname, '../public/icons');

    try {
        // Ensure the output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Generate PNGs for each size
        for (const size of sizes) {
            await sharp(inputSvg)
                .resize(size, size)
                .png()
                .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
            
            console.log(`Generated ${size}x${size} icon`);
        }

        console.log('All icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons(); 