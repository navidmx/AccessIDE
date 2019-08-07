import languageRegistry from './languageRegistry';
import nlp from './processing/nlp';
class CommandRunner {
    constructor() {
        // Starting language
        this.language = languageRegistry.getLanguages()[0];
    }
    runCommand(input) {
        // Process Language
        const processedCommands = nlp.processLine(input);
        console.log(processedCommands);
        console.log(this.language);
        let outputs = [];
        // Pipe command output
        for (const processedCommand of processedCommands) {
            switch (processedCommand.type) {
                case 'write':
                    outputs.push({
                        type: 'write',
                        contents: this.language.writer.write(processedCommand.contents)
                    });
                    break;
                case 'read':
                    outputs.push({
                        type: 'read',
                        contents: this.language.reader.readLine(processedCommand.contents)
                    });
                    break;
                case 'nav':
                    outputs.push({
                        type: 'nav',
                        contents: this.language.navigator.nav(processedCommand.contents)
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
export default new CommandRunner();