import { Nav } from "../language";

class JSNav implements Nav {
    findFunction() {
        throw new Error("Method not implemented.");
    }

}

export default new JSNav();
