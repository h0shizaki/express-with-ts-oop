import express , { Router,Request,Response } from "express";

class VideoController {
    private router : Router ;

    constructor() {
        this.router = express.Router() ;

        this.router.get('/test' , (req : Request , res : Response ) => {
            res.send(200)
        })
    }

    public getRouter() : Router {
        return this.router ;
    }

}

export default VideoController ;