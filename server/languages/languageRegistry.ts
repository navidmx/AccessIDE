import { Write, Read, Nav } from "./language";
import * as fs from 'fs';

export class LanguageRegistry {
    private languages: Language[];
    
    findLanguages(){
        let languageDir = __dirname + '/';
        let contents = fs.readdirSync(languageDir);
        contents.forEach((dir) => {
            if(fs.statSync(dir).isDirectory()){
                fs.existsSync(dir + '/config.json')
            }
        });
    }
}

interface Language {
    name: string; 
    language: string;
    extension: string;
    version: string;
    exec: string;
    display: Display;
    write: Write;
    read: Read;
    nav: Nav;
}

interface Display {
    name: String;
    version: String;
    runtime: String;
}