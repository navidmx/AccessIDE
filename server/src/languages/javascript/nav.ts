import { Nav } from "../language";

class JSNav implements Nav {
    findFunction() {
        throw new Error("Method not implemented.");
    }

    nav(): string {
        return "";
    }
}

export default new JSNav();
