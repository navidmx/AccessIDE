import { Language } from './languageRegistry';

class RunCommand {
    static language: Language;

    runCommand(input: string) {
        // Process Language

        // Pipe command output

        // Write -> send code block

        // Read -> Send audio

        // Nav -> Send nav command
    }
}

type outputType = "write" | "read" | "nav";

export interface OutputCommand {
    type: outputType;
    contents: string;
}

export default new RunCommand();