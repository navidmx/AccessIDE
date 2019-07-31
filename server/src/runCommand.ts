import { Language } from './languageRegistry';
import NLP from './nlp';
import nlp from './nlp';
import { write } from 'fs';

class RunCommand {
    language: Language;

    runCommand(input: string): OutputCommand {
        // Process Language
        const processedCommand = nlp.processLine(input);

        let output: OutputCommand;
        // Pipe command output
        switch(processedCommand.type){
            case 'write':
                output = {
                    type: 'write',
                    contents: this.language.writer.write(processedCommand.contents)
                }
                break;
            case 'read':
                output = {
                    type: 'read',
                    contents: this.language.reader.readLine(processedCommand.contents)
                }
                break;
            case 'nav':
                output = {
                    type: 'nav',
                    contents: this.language.navigator.nav(processedCommand.contents)
                }
                break;
        }
        // Write -> send code block

        // Read -> Send audio

        // Nav -> Send nav 
        return output;
    }
}

export type outputType = "write" | "read" | "nav";

export interface OutputCommand {
    type: outputType;
    contents: string;
}

export default new RunCommand();