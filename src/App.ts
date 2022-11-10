import express, {Application ,Request , Response } from 'express';
import VideoController from './controller/VideoController';

class App {
    public express: Application ;

    constructor() {
        this.express = express() ;
        this.loadRoutes() ;
        this.express.use(express.urlencoded({extended:false}));
        this.express.use(express.json());
    }

    private loadRoutes() {
        const router = express.Router() ;
        router.get('/' , (req: Request , res: Response) => {
            res.send("Hello World");
        })
        
        const videoController : VideoController = new VideoController() ;
        router.use('/video', videoController.getRouter());

        this.express.use(router);
    }
}

export default App ;