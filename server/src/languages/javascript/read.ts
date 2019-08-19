import { Read } from "../language";

class JSRead implements Read {
    readLine(line: string): string {
        return line;
    }
}

export default new JSRead();