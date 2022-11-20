import "dotenv/config"

class Config {

    private port: number ;
    private apiKey: string ;
    constructor() {
        this.port = parseInt(<string>process.env.PORT,10) || 4000 ;
        this.apiKey = process.env.APIKey || "abc" ;
    }

    public getPort(): number {
        return this.port ;
    }

    public getAPIKey(): string {
        return this.apiKey ;
    }
}

export default Config ;
