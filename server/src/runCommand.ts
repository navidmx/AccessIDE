import languageRegistry, { Language } from './languageRegistry';
import nlp from './processing/nlp';

class CommandRunner {
    language: Language;

    setLanguage(l: Language) {
        this.language = l;
    }

    runCommand(input: string): OutputCommand[] {
        // Process Language
        const processedCommands = nlp.processLine(input);
        console.log(this.language.writer.default.write);
        console.log(processedCommands);
        let outputs: OutputCommand[] = [];
        // Pipe command output
        for (const processedCommand of processedCommands) {
            switch (processedCommand.type) {
                case 'write':
                    outputs.push({
                        type: 'write',
                        contents: this.language.writer.default.write(processedCommand.contents)
                    });
                    break;
                case 'read':
                    outputs.push({
                        type: 'read',
                        contents: this.language.reader.default.readLine(processedCommand.contents)
                    });
                    break;
                case 'nav':
                    outputs.push({
                        type: 'nav',
                        contents: this.language.navigator.default.nav(processedCommand.contents)
                    });
                    break;
            }
        }
        // Write -> send code block

        // Read -> Send audio

        // Nav -> Send nav 
        return outputs;
    }
}

export type outputType = "write" | "read" | "nav";

export interface OutputCommand {
    type: outputType;
    contents: string;
}

export default new CommandRunner();