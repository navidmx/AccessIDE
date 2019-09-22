import { Read } from "../language";

class PYRead implements Read {
    readLine(line: string): string {
        return line;
    }
}

export default new PYRead();