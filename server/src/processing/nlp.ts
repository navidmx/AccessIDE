import {outputType} from '../runCommand';

class NLP {
    processLine(input : string) : Command[] {
        const commands : Command[] = [];
        const audioList = input
            .replace(/\w*(greater|less) then/, 'than')
            .split(' then ');

        audioList.forEach((c) => {
            c = this.cleanseLine(c);

            if (c.indexOf('go to') !== -1) {
                commands.push({type: 'nav', contents: c});
            }
            if (c.indexOf('read') !== -1) {
                commands.push({type: 'read', contents: c});
            }
            if (c.indexOf('create') !== -1) {
                commands.push({type: 'write', contents: c});
            }
        });

        return commands;
    }

    cleanseLine(input : string) : string {return input;}
}

interface Command {
    type : outputType,
    contents : string
}

export default new NLP();