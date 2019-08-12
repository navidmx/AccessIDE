import { Read } from "../language";

class PYRead implements Read {
    readLine(line: string): string {
        return "";
    }
}

export default new PYRead();