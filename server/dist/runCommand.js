import nlp from './processing/nlp';
class CommandRunner {
    setLanguage(l) {
        this.language = l;
    }
    runCommand(input, tabs, line, editor) {
        // Process Language
        console.log(input);
        const processedCommands = nlp.processLine(input);
        console.log(processedCommands);
        let outputs = [];
        // Pipe command output
        for (const processedCommand of processedCommands) {
            switch (processedCommand.type) {
                case 'write':
                    outputs.push({
                        type: 'write',
                        contents: this.language.writer.default.write(processedCommand.contents, tabs, line)
                    });
                    break;
                case 'read':
                    outputs.push({
                        type: 'read',
                        contents: {
                            cmd: this.language.reader.default.readLine(processedCommand.contents),
                            audio: this.language.reader.default.readLine(processedCommand.contents)
                        }
                    });
                    break;
                case 'nav':
                    outputs.push({
                        type: 'nav',
                        contents: this.language.navigator.default.nav(processedCommand.contents, editor)
                    });
                    break;
                default:
                    outputs.push({
                        type: 'err',
                        contents: {
                            audio: `${(processedCommand.contents.length > 0) ? 'Command not recognized.' : ''}`,
                            cmd: processedCommand.contents
                        }
                    });
                    break;
            }
        }
        // Write -> send code block Read -> Send audio Nav -> Send nav
        return outputs;
    }
}
export default new CommandRunner();