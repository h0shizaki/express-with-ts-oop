import {Video, VideoBody} from "../entity/Video";

interface VideoDao {
    getVideos() : Promise<Video[]>;
    findById(id: number) : Promise<Video | null>;
    addVideo(vdo : VideoBody) : Promise<number | null> ;
    deleteVideo(id: number) : Promise<number|null> ;
    updateVideo(vdo : Video) : Promise<Video| null>;
}

export default VideoDao ;