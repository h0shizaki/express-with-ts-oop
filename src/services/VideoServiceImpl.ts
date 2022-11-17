import VideoDaoImpl from "../dao/VideoDaoImpl";
import {Video, VideoBody} from "../entity/Video";
import VideoService from "./VideoService";

class VideoServiceImpl implements VideoService {
    async getVideos(): Promise<Video[]> {
        return await VideoDaoImpl.getVideos() ;
    }
    async findById(id: number): Promise<Video | null> {
        return await VideoDaoImpl.findById(id);
    }
    async addVideo(vdo: VideoBody): Promise<number | null> {
        return await VideoDaoImpl.addVideo(vdo) ;
        // throw new Error("Method not implemented.");
    }
    async deleteVideo(id: number): Promise<number | null> {
        // throw new Error("Method not implemented.");
        return await VideoDaoImpl.deleteVideo(id);
    }
    async updateVideo(vdo: Video): Promise<Video|null> {
        return await VideoDaoImpl.updateVideo(vdo);
    }
}

export default new VideoServiceImpl ;