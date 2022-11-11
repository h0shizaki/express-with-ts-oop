import "dotenv/config"
import Database from "./DB";

class Config {

    private port: number ;
    private database: Database ;

    constructor() {
        this.port = parseInt(<string>process.env.PORT,10) || 4000 ;
        this.database = new Database() ;
    }


    public getPort(): number {
        return this.port ;
    }

    public getDatabase() : Database {
        return this.database ;
    }


}

export default Config ;
