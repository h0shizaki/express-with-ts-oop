import express , { Router,Request,Response } from "express";
import { VideoBody } from "../entity/Video";
import VideoServiceImpl from "../services/VideoServiceImpl";

class VideoController {
    private router : Router ;

    constructor() {
        this.router = express.Router() ;

        this.router.get('/test' , (req : Request , res : Response ) => {
            res.send(200);
        })

        this.router.get('/videos' , async (req : Request , res : Response ) => {
            let result = await VideoServiceImpl.getVideos() ;
            res.status(200).send(result)
        })

        this.router.post('/video',async (req : Request , res : Response ) => {
            if (!req.body) {
                return res.status(400).json("Error body is empty");
            }

            let {title , duration , url_id} = req.body ;

            if (!title || !duration || !url_id) {
                return res.status(400).json("Bad request");
            }

            const vdo: VideoBody = {
                title,
                url_id,
                duration
            }

            const result = await VideoServiceImpl.addVideo(vdo);

            if(result === 1){
                return res.send( {
                    "header": {
                        "status": "ok",
                        "code": 200
                    },
                    "body": {
                        "message" : "Insert success",
                        "data":vdo
                    }
                });
            }

            return res.send(500);
            
        })
    }

    public getRouter() : Router {
        return this.router ;
    }

}

export default VideoController ;