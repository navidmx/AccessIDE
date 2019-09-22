import { Language } from "./languageRegistry";
import fs from "fs"
import child_process from 'child_process';


export class CodeRunner {
    language: Language;

    setLanguage(l: Language) {
        this.language = l;
    }

    run(code: String): String {
        fs.appendFileSync('file.js', code);
        const output = child_process.execSync('node file.js').toString('UTF-8');
        return output;
    }
}