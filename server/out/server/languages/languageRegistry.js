import * as fs from 'fs';
export class LanguageRegistry {
    findLanguages() {
        let languageDir = __dirname + '/';
        let contents = fs.readdirSync(languageDir);
        contents.forEach((dir) => {
            if (fs.statSync(dir).isDirectory()) {
                fs.existsSync(dir + '/config.json');
            }
        });
    }
}
