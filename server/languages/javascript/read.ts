import { Read } from "../language";

class JSRead implements Read{
    readLine(line: string) {
        throw new Error("Method not implemented.");
    }
}

export default new JSRead();