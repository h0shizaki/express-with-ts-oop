import express, {Application ,Request , Response } from 'express';
import VideoController from './controller/VideoController';
import { logger } from './middleware/logging';

class App {
    public express: Application ;
 
    constructor() {
        this.express = express() ;
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(express.json());

        this.loadRoutes() ;
    }

    private loadRoutes() {
        const router = express.Router() ;
        router.get('/' , logger, (req: Request , res: Response) => {
            return res.send("Hello World");
        })
        
        const videoController : VideoController = new VideoController() ;
        router.use('/api', logger, videoController.getRouter());

        router.use('*', logger , (req: Request , res : Response) => {
            return res.status(404).send('404 not found');
        })

        this.express.use(router);
    }
}

export default App ;