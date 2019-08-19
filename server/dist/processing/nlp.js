class NLP {
    processLine(input) {
        const commands = [];
        const audioList = input
            .trim()
            .toLowerCase()
            .replace(/\w*(greater|less) then/, 'than')
            .split(' then ');
        audioList.forEach((line) => {
            line = this.cleanseLine(line);
            const write = (/(make|new|create|write)/g);
            if (line.indexOf('go to') !== -1) {
                commands.push({ type: 'nav', contents: line });
            }
            else if (line.indexOf('read') !== -1) {
                commands.push({ type: 'read', contents: line });
            }
            else if (write.test(line)) {
                commands.push({ type: 'write', contents: line });
            }
            else {
                commands.push({ type: 'err', contents: line });
            }
        });
        return commands;
    }
    cleanseLine(input) { return input; }
}
export default new NLP();