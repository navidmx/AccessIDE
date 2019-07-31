import * as fs from 'fs';
export class LanguageRegistry {
    findLanguages() {
        let languageDir = __dirname + '/languages';
        let contents = fs.readdirSync(languageDir);
        contents = contents.map(d => languageDir + '/' + d);
        console.log(contents);
        contents.forEach((dir) => {
            if (fs.statSync(dir).isDirectory()) {
                if (fs.existsSync(dir + '/config.json')) {
                    console.log(dir);
                    const contents = fs.readFileSync(dir + '/config.json', { encoding: 'UTF-8' });
                    const languageInfo = JSON.parse(contents);
                    console.log(languageInfo);
                }
                ;
            }
        });
    }
}
export default new LanguageRegistry();