import { Nav } from "../language";

class PYNav implements Nav {
    findFunction() {
        throw new Error("Method not implemented.");
    }

    nav(): string{
        return "";
    }
}

export default new PYNav();
