class Config{
    private url = 'http://localhost:3000';
    
    public setURL(url: string){
        this.url = url;
    }

    public getURL(): string{
        return this.url;
    }
}

export default new Config();
