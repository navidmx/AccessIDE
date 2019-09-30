import { Language } from './languageRegistry';
import fs from 'fs';
import childProcess from 'child_process';

export class CodeRunner {
    language: Language;

    setLanguage(l: Language) {
        this.language = l;
    }

    run(code: string): string {
        fs.appendFileSync('file.js', code);
        const output = childProcess.execSync('node file.js').toString('UTF-8');
        return output;
    }
}
