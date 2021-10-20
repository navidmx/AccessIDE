class Config {
    private port = process.env.NODE_ENV === "production" ? 80 : 3000;
    private url = `${process.env.URL}:${process.env.PORT || this.port}` || 'http://localhost:3000';

    public setURL(url: string) {
        this.url = url;
    }

    public getURL(): string {
        return this.url;
    }
}

export default new Config();
