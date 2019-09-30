import fs from "fs";
import child_process from 'child_process';
export class CodeRunner {
    setLanguage(l) {
        this.language = l;
    }
    run(code) {
        fs.appendFileSync('file.js', code);
        const output = child_process.execSync('node file.js').toString('UTF-8');
        return output;
    }
}