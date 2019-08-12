import { Read } from "../language";

class JSRead implements Read {
    readLine(line: string): string {
        return "";
    }
}

export default new JSRead();