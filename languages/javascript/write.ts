class JSWrite implements Write {
    createFunction(tabs: number, name: string, parameters: string[]): string {
        return `function ${name}(${parameters.join}) ${this.createBlock(tabs)}`;
    }

    createVariable(name: string, value: any): string {
        return `let ${name}${value ? ' = ' + value : ''};`;
    }

    createConstant(name: string, value: any): string {
        return `const ${name}${value ? ' = ' + value : ''};`;
    }

    createForLoop(tabs: number, start: number, end: number, step: number, flag: string): string {
        return `for(let ${flag} = ${start}; ${flag} ${start > end ? '>' : '<'} ${end}; ${flag} += ${step}) ${this.createBlock(tabs)}`;
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
    private createBlock(tabs: number): string {
        return `{\n${'\t'.repeat(tabs + 1)}\n${'\t'.repeat(tabs)}}\n`;
    }
}

export default new JSWrite();