import Video from "../entity/Video";

interface VideoService {
    getVideos() : Array<Video>;
    findById(id: number) : Video;
    addVideo(vdo : Video) : Video;
    deleteVideo(id: number) : void;
    updateVideo(vdo : Video) : Video;
}