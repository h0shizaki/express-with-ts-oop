import {Video, VideoBody} from "../entity/Video";

interface VideoService {
    getVideos() : Promise<Video[]>;
    findById(id: number) : Promise<Video | null>;
    addVideo(vdo : VideoBody) : Promise<number | null>;
    deleteVideo(id: number) : Promise<number | null>;
    updateVideo(vdo : Video) : Promise<Video>;
}

export default VideoService ;