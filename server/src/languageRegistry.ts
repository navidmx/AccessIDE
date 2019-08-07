import { Write, Read, Nav } from "./languages/language";
import fs from 'fs';
import { JsonDecoder } from 'ts.data.json';


export class LanguageRegistry {
    private languages: Language[] = [];

    async findLanguages() {
        let languageDir = __dirname + '\/languages';
        let contents = fs.readdirSync(languageDir);
        contents = contents.map(d => languageDir + '\/' + d);
        await contents.forEach(async (dir) => {
            if (fs.statSync(dir).isDirectory()) {
                if (fs.existsSync(dir + '\/config.json')) {
                    const contents = JSON.parse(fs.readFileSync(dir + '\/config.json', { encoding: 'UTF-8' }));
                    const languageDecoder = JsonDecoder.object<JSONConfig>({
                        id: JsonDecoder.string,
                        syntax: JsonDecoder.string,
                        extension: JsonDecoder.string,
                        version: JsonDecoder.string,
                        exec: JsonDecoder.string,
                        display: JsonDecoder.object<Display>({
                            name: JsonDecoder.string,
                            version: JsonDecoder.string,
                            runtime: JsonDecoder.string
                        }, 'display'),
                        parsers: JsonDecoder.object<Parsers>({
                            write: JsonDecoder.string,
                            read: JsonDecoder.string,
                            nav: JsonDecoder.string
                        }, 'parser')
                    }, 'language');
                    let languageInfo: JSONConfig;
                    try {
                        languageInfo = await languageDecoder.decodePromise(contents);
                    } catch (e) {
                        console.log(e);
                    }
                    let language: Language;
                    try {
                        language = {
                            name: languageInfo.display.name,
                            syntax: languageInfo.syntax,
                            id: languageInfo.id,
                            extension: languageInfo.extension,
                            version: languageInfo.version,
                            exec: languageInfo.exec,
                            display: languageInfo.display,
                            writer: await import(dir + '\/' + languageInfo.parsers.write),
                            reader: await import(dir + '\/' + languageInfo.parsers.read),
                            navigator: await import(dir + '\/' + languageInfo.parsers.nav)
                        }
                    } catch (e) {
                        console.log('Language could not be loaded:');
                        console.log(e);
                    }
                    this.languages.push(language);
                };
            }
        });
    }

    getLanguages() {
        return this.languages;
    }
}

export default new LanguageRegistry();

export interface JSONConfig {
    id: string;
    syntax: string;
    extension: string;
    version: string;
    exec: string;
    display: {
        name: string;
        version: string;
        runtime: string;
    };
    parsers: {
        write: string,
        read: string,
        nav: string
    }
}

export interface Language {
    name: string;
    id: string;
    syntax: string;
    extension: string;
    version: string;
    exec: string;
    display: Display;
    writer: Write;
    reader: Read;
    navigator: Nav;
}

interface Display {
    name: string;
    version: string;
    runtime: string;
}

interface Parsers {
    write: string,
    read: string,
    nav: string
}