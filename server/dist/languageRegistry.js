var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import { JsonDecoder } from 'ts.data.json';
export class LanguageRegistry {
    constructor() {
        this.languages = [];
    }
    findLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            const languageDir = __dirname + '/languages';
            let contents = fs.readdirSync(languageDir);
            contents = contents.map(d => languageDir + '/' + d);
            for (const dir of contents) {
                if (fs.existsSync(dir)) {
                    if (fs.statSync(dir).isDirectory()) {
                        if (fs.existsSync(dir + '/config.json')) {
                            const contents = JSON.parse(fs.readFileSync(dir + '/config.json', { encoding: 'utf-8' }));
                            const languageDecoder = JsonDecoder.object({
                                id: JsonDecoder.string,
                                syntax: JsonDecoder.string,
                                extension: JsonDecoder.string,
                                version: JsonDecoder.string,
                                exec: JsonDecoder.string,
                                display: JsonDecoder.object({
                                    name: JsonDecoder.string,
                                    version: JsonDecoder.string,
                                    runtime: JsonDecoder.string,
                                }, 'display'),
                                parsers: JsonDecoder.object({
                                    write: JsonDecoder.string,
                                    read: JsonDecoder.string,
                                    nav: JsonDecoder.string,
                                }, 'parser'),
                            }, 'language');
                            let languageInfo;
                            try {
                                languageInfo = yield languageDecoder.decodePromise(contents);
                            }
                            catch (e) {
                                console.log(e);
                            }
                            let language;
                            try {
                                language = {
                                    name: languageInfo.display.name,
                                    syntax: languageInfo.syntax,
                                    id: languageInfo.id,
                                    extension: languageInfo.extension,
                                    version: languageInfo.version,
                                    exec: languageInfo.exec,
                                    display: languageInfo.display,
                                    writer: yield import(dir + '/' + languageInfo.parsers.write),
                                    reader: yield import(dir + '/' + languageInfo.parsers.read),
                                    navigator: yield import(dir + '/' + languageInfo.parsers.nav),
                                };
                            }
                            catch (e) {
                                console.log('Language could not be loaded:');
                                console.log(e);
                            }
                            this.languages.push(language);
                        }
                    }
                }
            }
        });
    }
    getLanguages() {
        return this.languages;
    }
}
export default new LanguageRegistry();