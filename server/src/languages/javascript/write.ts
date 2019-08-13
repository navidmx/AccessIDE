import { Write } from '../language';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import { create } from 'domain';

class JSWrite implements Write {

    


    write(input: string): string {
        return '' + this.createFunction(0, 'testFunction', [], input);
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
    private createBlock(tabs: number, contents?: string): string {
        return `{\n${new String('\t').repeat(tabs + 1)}${contents || ''}\n${'\t'.repeat(tabs)}}\n`;
    }

    private createTokens(input: string): { [key: string]: string } {
        // const keyWords = [
        //     'parameter'
        // ]
        return null;
    }

    commandMake(cmd) {
        
    }
}

export default new JSWrite();