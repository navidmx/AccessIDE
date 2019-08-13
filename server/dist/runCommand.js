import nlp from './processing/nlp';
class CommandRunner {
    setLanguage(l) {
        this.language = l;
    }
    runCommand(input) {
        // Process Language
        const processedCommands = nlp.processLine(input);
        console.log(processedCommands);
        let outputs = [];
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
                default:
                    outputs.push({
                        type: 'err',
                        contents: processedCommand.contents
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