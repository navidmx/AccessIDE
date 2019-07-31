import { outputType } from './runCommand';

class NLP {

    processLine(input: string): { type: outputType, contents: string } {
        return {
            type: 'write',
            contents: ''
        };
    }
}

export default new NLP();