const opentype = require('opentype.js');
const fs = require('fs');

async function main() {
    try {
        const font = opentype.loadSync('Inter-Bold.ttf');
        const fontSize = 100;

        // Let's get "Syna" and "p" and "to" separately so we can easily address the "p"
        const pPath = font.getPath("p", 0, 0, fontSize);
        // Let's calculate typical kerning. Actually just getting one big path is easiest,
        // and using a mask!

        const path = font.getPath("Synapto", 0, 80, fontSize, { kerning: true });

        // We will output the path data strictly.
        console.log(path.toPathData());

        // Let's also find the bounding box of the 'p' exactly. Let's do a substring measure.
        const widthSyna = font.getAdvanceWidth("Syna", fontSize, { kerning: true });
        const widthSynap = font.getAdvanceWidth("Synap", fontSize, { kerning: true });
        const widthP = widthSynap - widthSyna;

        console.log(`p_start_x: ${widthSyna}`);
        console.log(`p_width: ${widthP}`);
        console.log(`full_width: ${font.getAdvanceWidth("Synapto", fontSize, { kerning: true })}`);

    } catch (e) {
        console.error(e);
    }
}
main();
