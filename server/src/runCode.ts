import { Language } from './languageRegistry';
import fs from 'fs';
import childProcess from 'child_process';

class CodeRunner {
    language: Language;

    setLanguage(l: Language): void {
        this.language = l;
    }

    run(code: string): { audio: string; cmd: string } {
        const fileName = `../file${new Date().getTime()}${this.language.extension}`;
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }
        fs.appendFileSync(fileName, code);
        const output = childProcess.execSync(`${this.language.exec} ` + fileName).toString('utf-8');
        fs.unlinkSync(fileName);
        return {
            audio: 'ran code',
            cmd: output,
        };
    }
}

export default new CodeRunner();
