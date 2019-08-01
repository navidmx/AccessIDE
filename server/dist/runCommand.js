import nlp from './nlp';
class RunCommand {
    runCommand(input) {
        // Process Language
        const processedCommand = nlp.processLine(input);
        let output;
        // Pipe command output
        switch (processedCommand.type) {
            case 'write':
                output = {
                    type: 'write',
                    contents: this.language.writer.write(processedCommand.contents)
                };
                break;
            case 'read':
                output = {
                    type: 'read',
                    contents: this.language.reader.readLine(processedCommand.contents)
                };
                break;
            case 'nav':
                output = {
                    type: 'nav',
                    contents: this.language.navigator.nav(processedCommand.contents)
                };
                break;
        }
        // Write -> send code block
        // Read -> Send audio
        // Nav -> Send nav 
        return output;
    }
}
export default new RunCommand();