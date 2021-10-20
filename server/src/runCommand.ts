import { Language } from './languageRegistry';
import nlp from './processing/nlp';
import CodeRunner from './runCode';

class CommandRunner {
    language: Language;

    setLanguage(l: Language): void {
        this.language = l;
    }

    runCommand(input: string, tabs: number, line: number, editor: string[]): OutputCommand[] {
        // Process Language
        console.log(input);
        const processedCommands = nlp.processLine(input);
        console.log(processedCommands);
        const outputs: OutputCommand[] = [];

        // Pipe command output
        for (const processedCommand of processedCommands) {
            switch (processedCommand.type) {
                case 'write':
                    outputs.push({
                        type: 'write',
                        contents: this.language.writer.default.write(processedCommand.contents, tabs, line),
                    });
                    break;
                case 'read':
                    outputs.push({
                        type: 'read',
                        contents: {
                            cmd: this.language.reader.default.readLine(processedCommand.contents),
                            audio: this.language.reader.default.readLine(processedCommand.contents),
                        },
                    });
                    break;
                case 'nav':
                    outputs.push({
                        type: 'nav',
                        contents: this.language.navigator.default.nav(processedCommand.contents, editor),
                    });
                    break;
                case 'run':
                    outputs.push({
                        type: 'run',
                        contents: CodeRunner.run(editor.reduce((acc: string, curr: string) => acc + '\r' + curr)),
                    });
                    break;
                default:
                    outputs.push({
                        type: 'err',
                        contents: {
                            audio: `${processedCommand.contents.length > 0 ? 'Command not recognized.' : ''}`,
                            cmd: processedCommand.contents,
                        },
                    });
                    break;
            }
        }
        // Write -> send code block Read -> Send audio Nav -> Send nav
        return outputs;
    }
}

export type outputType = 'write' | 'read' | 'nav' | 'run' | 'err';

export interface OutputCommand {
    type: outputType;
    contents: {
        cmd: string;
        audio: string;
    };
}

export default new CommandRunner();
