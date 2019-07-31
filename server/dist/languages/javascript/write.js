class JSWrite {
    createFunction(tabs, name, parameters) {
        return `function ${name}(${parameters.join}) ${this.createBlock(tabs)}`;
    }
    createVariable(name, value) {
        return `let ${name}${value ? ' = ' + value : ''};`;
    }
    createConstant(name, value) {
        return `const ${name}${value ? ' = ' + value : ''};`;
    }
    createForLoop(tabs, start, end, step, flag) {
        return `for(let ${flag} = ${start}; ${flag} ${start > end ? '>' : '<'} ${end}; ${flag} += ${step}) ${this.createBlock(tabs)}`;
    }
    createWhileLoop(tabs, condition) {
        return `while(${condition}) ${this.createBlock(tabs)}`;
    }
    createIfStatement(tabs, condition) {
        return `if (${condition}) ${this.createBlock(tabs)}`;
    }
    createElseIfStatement(tabs, condition) {
        return `else if (${condition}) ${this.createBlock(tabs)}`;
    }
    createElseStatement(tabs) {
        return `else ${this.createBlock(tabs)}`;
    }
    /* Helper function for creating code blocks */
    createBlock(tabs) {
        return `{\n${new String('\t').repeat(tabs + 1)}\n${'\t'.repeat(tabs)}}\n`;
    }
}
export default new JSWrite();