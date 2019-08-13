import { Write } from '../language';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { create } from 'domain';
import { string } from 'prop-types';

class JSWrite implements Write {
    write(input: string): string {
        return this.commandMake(input, 0);
    }

    createFunction(tabs: number, name: string, parameters: string[], content?: string): string {
        return `function ${name}(${parameters.join()}) ${this.createBlock(tabs, content)}`;
    }

    createVariable(name: string, value: any): string {
        return `let ${name}${value ? ' = ' + value : ''};`;
    }

    createConstant(name: string, value: any): string {
        return `const ${name}${value ? ' = ' + value : ''};`;
    }

    createForLoop(tabs: number, start: number, end: number, step: number, flag: string): string {
        flag = flag || 'i';
        step = step || 1;
        return `for(let ${flag || 'i'} = ${start}; ${flag} ${start > end ? '>' : '<'} ${end}; ${flag} += ${step}) ${this.createBlock(tabs)}`;
    }

    createWhileLoop(tabs: number, condition: string): string {
        return `while(${condition}) ${this.createBlock(tabs)}`;
    }

    createIfStatement(tabs: number, condition: string): string {
        return `if (${condition}) ${this.createBlock(tabs)}`;
    }

    createElseIfStatement(tabs: number, condition: string): string {
        return `else if (${condition}) ${this.createBlock(tabs)}`;
    }

    createElseStatement(tabs: number): string {
        return `else ${this.createBlock(tabs)}`;
    }

    /* Helper function for creating code blocks */
    private createBlock(tabs: number, contents?: string): string {
        return `{\n${new String('\t').repeat(tabs + 1)}${contents || ''}\n${'\t'.repeat(tabs)}}\n`;
    }

    private createTokens(input: string): { [key: string]: string } {
        // const keyWords = [
        //     'parameter'
        // ]
        return null;
    }

    commandMake(cmd: string, tabs: number): string {
        const includes = (src: string, str: string) => {
            return src.indexOf(str) !== -1;
        }

        if (includes(cmd, 'checkpoint')) {
            let index = cmd.indexOf('checkpoint');
            if (cmd.length > index + 10) {
                let line = cmd.substring(index + 11).split(' ');
                if (line[0] == 'named' || line[0] == 'called') line.shift();
                return this.makeCheckpoint('checkpoint', this.toCamel(line.join(' ')));
            }
        } else if (includes(cmd, 'loop')) {
            let line = cmd.substring(cmd.indexOf('loop') + 5).split(' ');
            let counter: string, start: number, end: number, step: number;
            if (includes(cmd, 'length')) {
                let index = line.indexOf('length');
                line.splice(parseInt(line[index]), 2);
                line.push(line[line.length - 1]);
            }
            if (line.includes('with')) {
                counter = line[line.indexOf('with') + 1];
            }
            if (line.includes('from')) {
                start = parseInt(line[line.indexOf('from') + 1]);
            }
            if (line.includes('to')) {
                end = parseInt(line[line.indexOf('to') + 1]);
            }
            if (line.includes('step')) {
                step = parseInt(line[line.indexOf(step.toString()) + 1]);
            }
            return this.createForLoop(tabs, start, end, step, counter)
        } else if (includes(cmd, 'function')) {
            cmd = cmd.replace(/(parameter|parameters)/g, '');
            let line = cmd.substring(cmd.indexOf('function') + 9).split(' ');
            let parameters = [];
            if (line[0] == 'named' || line[0] == 'called') line.shift();
            if (line.includes('with')) {
                parameters = line.splice(line.indexOf('with') + 1);
                line.pop();
            }
            return this.createFunction(tabs, this.toCamel(line.join(' ')), parameters.filter(Boolean));
        } else if (/(constant|variable)/g.test(cmd)) {
            let type, name, value;
            if (cmd.includes('constant')) {
                type = 'const';
                cmd = cmd.replace('variable', '');
            }
            cmd = cmd.replace(/(as|with|named|called)/g, '');
            let cmdArr = cmd.substring(cmd.search(/(variable|constant)/) + 9).split(' ');
            if (cmdArr.includes('value')) {
                cmd = cmdArr.join(' ');
                let index = cmd.indexOf('value');
                value = cmd.substring(index + 6);
                cmdArr = cmd.substring(0, index).split(' ');
            }
            name = this.toCamel(cmdArr.filter(Boolean).join(' '));
            if (type === 'const') {
                return this.createConstant(name, value);
            } else {
                return this.createVariable(name, value);
            }
        }
    }

    private toCamel(s) {
        return s.replace(/([ ]([a-z]|[0-9]))/ig, ($1) => {
            return $1.toUpperCase().replace(' ', '');
        });
    }

    private makeCheckpoint(type, name) {
        let symbol = ' ~ ';
        let comment = '//' + symbol + type + ': "' + name + '"';
        return comment;
    }
}

export default new JSWrite();