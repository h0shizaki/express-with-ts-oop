import VideoDaoImpl from "../dao/VideoDaoImpl";
import {Video, VideoBody} from "../entity/Video";
import VideoService from "./VideoService";

class VideoServiceImpl implements VideoService {
    async getVideos(): Promise<Video[]> {
        return await VideoDaoImpl.getVideos() ;
    }
    findById(id: number): Promise<Video | null> {
        throw new Error("Method not implemented.");
    }
    addVideo(vdo: VideoBody): Promise<number | null> {
        return VideoDaoImpl.addVideo(vdo) ;
        // throw new Error("Method not implemented.");
    }
    deleteVideo(id: number): Promise<number | null> {
        throw new Error("Method not implemented.");
    }
    updateVideo(vdo: Video): Promise<Video> {
        throw new Error("Method not implemented.");
    }
}

export default new VideoServiceImpl ;