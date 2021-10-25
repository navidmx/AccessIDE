class Config {
    private port = process.env.NEXT_PUBLIC_NODE_ENV === "production" ? 80 : 3000;
    private url = process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT || this.port}` : 'http://localhost:3000';

    constructor()
    {
      console.log(this.url);
    }
    
    public setURL(url: string) {
        
    }

    public getURL(): string {
        return this.url;
    }
}

export default new Config();
