import { Nav } from "../language";
import { point } from "../language";
class PYNav implements Nav {
    nav(command: string, lines: string[]): {
        cmd: string,
        audio: string
    } {
        const checkpoints: point[] = [];
        const functions: point[] = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('// ~ checkpoint: ')) checkpoints.push({ name: lines[i].replace('// ~ checkpoint: ', ''), line: i + 1 });
            if (lines[i].includes('def')) {
                functions.push({ name: lines[i].split(' ')[1].split('(')[0], line: i + 1 });
            }
        }

        if (command.includes('checkpoint')) {
            const keyword = this.toCamel(command.substring(command.indexOf('checkpoint') + 11));
            for (const checkpoint of checkpoints) {
                if (checkpoint.name.includes(keyword)) {
                    return {
                        cmd: checkpoint.line.toString(),
                        audio: `Went to checkpoint ${keyword}`
                    };
                }
            }
        }
        if (command.includes('line')) {
            const lineNumber = parseInt(command.substring(command.indexOf('line') + 5));
            return {
                cmd: lineNumber.toString(),
                audio: `Went to line ${lineNumber}`
            };
        }
        if (command.includes('function')) {
            const keyword = this.toCamel(command.substring(command.indexOf('function') + 9));
            console.log(keyword)
            for (const func of functions) {
                console.log(func)
                if (func.name.includes(keyword)) {
                    return {
                        cmd: func.line.toString(),
                        audio: `Went to function ${keyword}`
                    };
                }
            }
        }
    }

    private toCamel(s: string) {
        return s.replace(/([ ]([a-z]|[0-9]))/ig, ($1) => {
            return $1.toUpperCase().replace(' ', '');
        });
    }
}

export default new PYNav();
