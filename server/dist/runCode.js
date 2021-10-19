import fs from 'fs';
import childProcess from 'child_process';
export class CodeRunner {
    setLanguage(l) {
        this.language = l;
    }
    run(code) {
        fs.appendFileSync('file.js', code);
        const output = childProcess.execSync('node file.js').toString('utf-8');
        return output;
    }
}