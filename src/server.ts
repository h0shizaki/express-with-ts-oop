import { Application } from 'express';
import App from './App';
import Config from './config/Config';
import DB from './config/DB';

class Server {
    private app : App ;
    private express : Application ;
    private config: Config ;


    constructor() {
        this.config = new Config();
        this.app = new App() ;
        this.express = this.app.express;
    }

    public async startServer() {
        await this.pingDatabase();
        const port: number = this.config.getPort() ;
        this.express.listen(port, () => {
            console.log(`Server is running on port ${port}!`)
        })
    }

    public async pingDatabase() {
        const db = DB ;
        const pool = db.getPool() ;
        const client = await pool.connect() ;
        const res = await client.query('SELECT NOW()')
        client.release();

        console.log(`Connect to database success ${res.rows[0]['now']}`)
        
    }
    
}

function main() {
    const server : Server = new Server();
    server.startServer();
}

main();
