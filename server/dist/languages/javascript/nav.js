class JSNav {
    nav(command, lines) {
        const checkpoints = [];
        const functions = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('// ~ checkpoint: ')) {
                checkpoints.push({
                    name: lines[i].replace('// ~ checkpoint: ', ''),
                    row: i + 1,
                    col: lines[i].indexOf('checkpoint')
                });
            }
            if (lines[i].includes('function ')) {
                functions.push({
                    name: lines[i].split(' ')[1].split('(')[0],
                    row: i + 1,
                    col: lines[i].indexOf('function')
                });
            }
        }
        if (command.includes('checkpoint')) {
            const keyword = this.toCamel(command.substring(command.indexOf('checkpoint') + 11));
            for (const checkpoint of checkpoints) {
                if (checkpoint.name.includes(keyword)) {
                    return {
                        cmd: `${checkpoint.row},${checkpoint.col}`,
                        audio: `Now at checkpoint ${keyword}`
                    };
                }
            }
        }
        if (command.includes('line')) {
            const row = parseInt(command.substring(command.indexOf('line') + 5));
            const col = command.includes('end') ? lines[row - 1].length : 0;
            return {
                cmd: `${row},${col}`,
                audio: `Now at ${col != 0 ? 'end of' : ''} line ${row}`
            };
        }
        if (command.includes('function')) {
            const keyword = this.toCamel(command.substring(command.indexOf('function') + 9));
            for (const func of functions) {
                if (func.name.includes(keyword)) {
                    return {
                        cmd: `${func.row},${func.col}`,
                        audio: `Now at function ${keyword}`
                    };
                }
            }
        }
    }
    toCamel(s) {
        return s.replace(/([ ]([a-z]|[0-9]))/ig, ($1) => {
            return $1.toUpperCase().replace(' ', '');
        });
    }
}
export default new JSNav();