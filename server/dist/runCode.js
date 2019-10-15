import fs from 'fs';
import childProcess from 'child_process';
class CodeRunner {
    setLanguage(l) {
        this.language = l;
    }
    run(code) {
        const fileName = `../file${new Date().getTime()}${this.language.extension}`;
        if (fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }
        fs.appendFileSync(fileName, code);
        const output = childProcess.execSync(`${this.language.exec} ` + fileName).toString('UTF-8');
        fs.unlinkSync(fileName);
        return {
            audio: 'ran code',
            cmd: output,
        };
    }
}
export default new CodeRunner();