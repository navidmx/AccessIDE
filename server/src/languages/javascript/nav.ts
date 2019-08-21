import { Nav } from "../language";

class JSNav implements Nav {
    nav(command: string, lines: string[]): string {
        const checkpoints: point[] = [];
        const functions: point[] = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('// ~')) checkpoints.push({ name: lines[i].replace('// ~', ''), line: i });
            if (lines[i].includes('function ')) checkpoints.push({ name: lines[i].split(' ')[1].split('(')[0], line: i });
        }

        if (command.includes('checkpoint')) {
            const keyword = command.substring(command.indexOf('checkpoint') + 11);
            
        }
        if (command.includes('line')) {

        }
        if (command.includes('function')) {

        }
        return "";
    }
}

interface point {
    name: string,
    line: number

}

export default new JSNav();
