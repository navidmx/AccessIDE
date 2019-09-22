class PYWrite {
    write(cmd, tabs, line) {
        const includes = (src, str) => {
            return src.indexOf(str) !== -1;
        };
        if (includes(cmd, 'checkpoint')) {
            let index = cmd.indexOf('checkpoint');
            if (cmd.length > index + 10) {
                let line = cmd.substring(index + 11).split(' ');
                if (line[0] == 'named' || line[0] == 'called')
                    line.shift();
                return {
                    cmd: this.makeCheckpoint('checkpoint', this.toCamel(line.join(' '))),
                    audio: `Created checkpoint ${line.join(' ')}`
                };
            }
        }
        else if (includes(cmd, 'loop')) {
            let line = cmd.substring(cmd.indexOf('loop') + 5).split(' ');
            let counter = 'i', start = 0, end = 10, step = 1;
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
                step = parseInt(line[line.indexOf('step') + 1]);
            }
            return {
                cmd: this.createForLoop(tabs, start, end, step, counter),
                audio: `Created a for loop from ${start} to ${end}${step != 1 ? ` with step ${step}` : ''}`
            };
        }
        else if (includes(cmd, 'function')) {
            cmd = cmd.replace(/parameters?/g, '');
            let line = cmd.substring(cmd.indexOf('function') + 9).split(' ');
            let parameters = [];
            if (line[0] == 'named' || line[0] == 'called')
                line.shift();
            if (line.includes('with')) {
                parameters = line.splice(line.indexOf('with') + 1);
                console.log(parameters);
                line.pop();
            }
            return {
                cmd: this.createFunction(tabs, this.toCamel(line.join(' ')), parameters.filter(Boolean)),
                audio: `Created function ${line.join(' ')}${(parameters.length > 0) ? ` with parameter${parameters.length > 1 ? 's' : ''} ` + parameters.filter(Boolean).join(' ') : ''}`
            };
        }
        else if (/(constant|variable)/g.test(cmd)) {
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
                return {
                    cmd: this.createConstant(name, value),
                    audio: `Created a constant named ${name}${!!name ? ' with value ' + value : ''}`
                };
            }
            else {
                return {
                    cmd: this.createVariable(name, value),
                    audio: `Created a variable named ${name}${!!name ? ' with value ' + value : ''}`
                };
            }
        }
        else {
            return {
                cmd: '',
                audio: 'No writable object found'
            };
        }
    }
    createFunction(tabs, name, parameters, content) {
        return `def ${name}(${parameters.join(', ')}): ${this.createBlock(tabs, content)}`;
    }
    createVariable(name, value) {
        return `${name}${value ? ' = ' + value : ''}`;
    }
    createConstant(name, value) {
        return `const ${name.toUpperCase()}${value ? ' = ' + value : ''};`;
    }
    createForLoop(tabs, start, end, step, flag) {
        return `for ${flag} in range(${start}${', ' + end || ''}${', ' + step || ''}): ${this.createBlock(tabs)}`;
    }
    createWhileLoop(tabs, condition) {
        return `while ${condition}: ${this.createBlock(tabs)}`;
    }
    createIfStatement(tabs, condition) {
        return `if ${condition}: ${this.createBlock(tabs)}`;
    }
    createElseIfStatement(tabs, condition) {
        return `elif ${condition}: ${this.createBlock(tabs)}`;
    }
    createElseStatement(tabs) {
        return `else: ${this.createBlock(tabs)}`;
    }
    /* Helper function for creating code blocks */
    createBlock(tabs, contents) {
        return `\n${new String('\t').repeat(tabs + 1)}${contents || ''}\n${'\t'.repeat(tabs)}\n`;
    }
    createTokens(input) {
        // const keyWords = [
        //     'parameter'
        // ]
        return null;
    }
    toCamel(s) {
        return s.replace(/([ ]([a-z]|[0-9]))/ig, ($1) => {
            return $1.toUpperCase().replace(' ', '');
        });
    }
    makeCheckpoint(type, name) {
        let symbol = ' ~ ';
        let comment = '#' + symbol + type + ': "' + name + '"';
        return comment;
    }
}
export default new PYWrite();