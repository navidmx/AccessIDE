import { Nav } from "../language";
import { point } from "../language";
class PYNav implements Nav {
    findFunction() {
        throw new Error("Method not implemented.");
    }

    nav(): {
        cmd: string,
        audio: string
    } {
        return null;
    }
}

export default new PYNav();
