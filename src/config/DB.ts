import { Pool } from 'pg';
import "dotenv/config"
class Database {
    private user: string ;
    private host: string ;
    private password: string ;
    private database: string ;
    private dbPort: string ;

    private pool : Pool ;

    constructor() {

        this.user = process.env.PGUSER || 'postgres' ;
        this.host = process.env.PGHOST || 'localhost' ;
        this.password = process.env.PGPASSWORD || '' ;
        this.database = process.env.PGDATABASE || 'mydb';
        this.dbPort = process.env.PGPORT || "5432" ;
        
        this.pool = new Pool({
            user: this.user ,
            host: this.host ,
            password: this.password ,
            database: this.database ,
            port: parseInt(this.dbPort)
        })
    }

    public getPool() : Pool {
        return this.pool ;
    }

}

export default new Database() ;