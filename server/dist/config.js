class Config {
    constructor() {
        this.url = 'http://localhost:3000';
    }
    setURL(url) {
        this.url = url;
    }
    getURL() {
        return this.url;
    }
}
export default new Config();