import express, {Application ,Request , Response } from 'express';
import VideoController from './controller/VideoController';
import { logger } from './middleware/logging';
import Middleware from './middleware/auth';
class App {
    public express: Application ;
 
    constructor() {
        this.express = express() ;
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(express.json());
        this.express.use(Middleware.enableCORS);
        this.express.enable("trust proxy");
        this.express.use(logger);
        this.express.use(Middleware.checkForAPIKey);
        this.loadRoutes() ;
    }

    private loadRoutes() {
        const router = express.Router() ;
        router.get('/' , (req: Request , res: Response) => {
            return res.send(`${process.env.NODE_ENV}`);
        })
        
        const videoController : VideoController = new VideoController() ;
        router.use('/api', videoController.getRouter());

        router.use('*' , (req: Request , res : Response) => {
            return res.status(404).send('404 not found');
        })

        this.express.use(router);
    }
}

export default App ;