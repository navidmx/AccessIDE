import { Write, Read, Nav } from '../language';

class PythonWrite implements Write {
    write(input: string) {
        throw new Error("Method not implemented.");
    }
    createFunction(tabs: number, name: string, parameters: string[]): string {
        throw new Error("Method not implemented.");
    }

    createVariable(name: string, value: any): string {
        throw new Error("Method not implemented.");
    }

    createConstant(name: string, value: any): string {
        throw new Error("Method not implemented.");
    }

    createForLoop(tabs: number, start: number, end: number, step: number, flag: string): string {
        throw new Error("Method not implemented.");
    }

    createWhileLoop(tabs: number, condition: string): string {
        throw new Error("Method not implemented.");
    }

    createIfStatement(tabs: number, condition: string): string {
        throw new Error("Method not implemented.");
    }

    createElseIfStatement(tabs: number, condition: string): string {
        throw new Error("Method not implemented.");
    }

    createElseStatement(tabs: number): string {
        throw new Error("Method not implemented.");
    }
}

export default new PythonWrite();