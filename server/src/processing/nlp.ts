import {outputType} from '../runCommand';

class NLP {
    private corrections = new Map([
        [/:00/g, ''],
        [/\?/g, ''],
        [/(for|4|full) (luke|loop)/g, 'for loop'],
        [/with (jay|jerry)/g, 'with j'],
        [/\w*(greater|less) then/, 'than'],
        [/check (wood|board|point)/g, 'checkpoint'],
        [/(parameter|parameters) (at|and|an|end)/g, 'parameter n'],
        [/log (in|at|and|an|end)/g, 'log n'],
        [/variable (end|an|and)/g, 'variable n'],
        [/,/g, ''],
        [/(zero)/g, '0'],
        [/(one)/g, '1'],
        [/(two)/g, '2'],
        [/(three)/g, '3'],
        [/(four)/g, '4'],
        [/(five)/g, '5'],
        [/(six)/g, '6'],
        [/(seven)/g, '7'],
        [/(eight)/g, '8'],
        [/(nine)/g, '9']
    ]);

    processLine(input : string) : Command[] {
        const commands : Command[] = [];
        input = this.cleanseLine(input);
        const audioList = input.split(' then ');
        audioList.forEach((line) => {
            if (line.indexOf('go to') !== -1) {
                commands.push({type: 'nav', contents: line});
            } else if (line.indexOf('read') !== -1) {
                commands.push({type: 'read', contents: line});
            } else if (/(make|new|create|write)/.test(line)) {
                commands.push({type: 'write', contents: line});
            } else {
                commands.push({type: 'err', contents: line});
            }
        });
        return commands;
    }

    cleanseLine(input : string) : string {
        input = input.trim().toLowerCase();
        for (let [find, replace] of this.corrections) {
            input = input.replace(find, replace);
        }
        return input;
    }
}

interface Command {
    type : outputType,
    contents : string
}

export default new NLP();