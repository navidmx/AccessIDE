export interface Write {
    createFunction(tabs : number, name : string, parameters : string[]) : string;
    createVariable(name : string, value : any) : string;
    createConstant(name : string, value : any) : string;
    createForLoop(tabs : number, start : number, end : number, step : number, flag : string) : string;
    createWhileLoop(tabs : number, condition : string) : string;
    createIfStatement(tabs : number, condition : string) : string;
    createElseIfStatement(tabs : number, condition : string) : string;
    createElseStatement(tabs : number) : string;
    write(input : string, tabs : number, line : number) : {
        cmd: string,
        audio: string
    };
}

export interface Read {
    readLine(line : string) : string;
}

export interface Nav {
    findFunction(line : string);
    nav(input : string) : string;
}
