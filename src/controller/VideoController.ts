import express , { Router,Request,Response } from "express";
import { VideoBody } from "../entity/Video";
import VideoServiceImpl from "../services/VideoServiceImpl";
import { writeErrorJson, writeResponseJson } from "../util";

class VideoController {
    private router : Router ;

    constructor() {
        this.router = express.Router() ;

        this.router.get('/test' , (req : Request , res : Response ) => {
            res.send(200);
        })

        this.router.get('/videos' , async (req : Request , res : Response ) => {
            let result = await VideoServiceImpl.getVideos() ;

            writeResponseJson(res, "Data found!", {"count":result.length , "videos": result}, 200);
            return ;
        })

        this.router.get('/video/:id(\\d+)' ,async (req : Request , res : Response) => {
            const id: number = parseInt(req.params.id) ;
            const result = await VideoServiceImpl.findById(id);

            if(result === null){
                return writeResponseJson(res, "Data not found", "",200);
            }else{
                return writeResponseJson(res, "Data found!", result, 200);
            }
        })

        this.router.post('/video',async (req : Request , res : Response ) => {
            if (!req.body) {
                return writeErrorJson(res, "Please provide the data", 400 );
            }

            let {title , duration , url_id} = req.body ;

            if (!title || !duration || !url_id) {
                // return res.status(400).json("Bad request");
                return writeErrorJson(res, "Please provide the data", 400 );
            }

            const vdo: VideoBody = {
                title,
                url_id,
                duration
            }

            const result = await VideoServiceImpl.addVideo(vdo);

            if(result === 1){
                writeResponseJson(res, "Insert success", vdo, 200);
                return ;
            }
            
            writeErrorJson(res,"Something went wrong");
            return ;
            
        })

        this.router.put('/video' , async function (req : Request , res : Response) {
            return writeErrorJson(res, "Not done yet", 403 );
        })

        this.router.delete('/video/:id(\\d+)' , async (req : Request , res : Response) => {
            const id: number = parseInt(req.params.id) ;
            const result = await VideoServiceImpl.deleteVideo(id);

            if(result === 1){
                return writeResponseJson(res, "Delete success", {"delete_id":id}, 200);
            }else if(result === null){
                return writeResponseJson(res, "No row affected", "",200);
            }else{
                return writeErrorJson(res,"Something went wrong"); 
            }
        })

    }

    public getRouter() : Router {
        return this.router ;
    }

}

export default VideoController ;