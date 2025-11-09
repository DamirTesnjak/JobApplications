import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed || {};
const output = `export const ENV = ${JSON.stringify(env, null, 2)};\n`;

const targetDir = path.resolve('src/environments');
const targetFile = path.join(targetDir, 'env.generated.ts');

// Ensure the directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Write the file
fs.writeFileSync(targetFile, output);
console.log('✅ Environment variables written to env.generated.ts');
