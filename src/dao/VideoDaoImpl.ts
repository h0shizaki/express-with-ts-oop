import { Pool } from "pg";
import DB from "../config/DB";
import {Video, VideoBody} from "../entity/Video";
import VideoDao from "./VideoDao";

const pool : Pool = DB.getPool() ;

class VideoDaoImpl implements VideoDao {

    async getVideos(): Promise<Video[]> {
        const client = await pool.connect() ;
        const query = "SELECT * FROM video" ;
        let videos: Video[] = [] ;
        try{
            const res = await client.query(query) ;

            if(res.rowCount == 0 ){
                return [] ;
            }else{
                for(let i = 0 ; i < res.rowCount ; i++){
                    const temp = res.rows[i] ;
                    let video : Video = {
                        id: temp.id,
                        title : temp.title ,
                        duration : temp.duration ,
                        url_id: temp.url_id
                    }
                    videos.push(video);
                }      
            }       
        }catch(err){
            console.error(err);
        }finally{
            client.release();
        }
        return videos ;
    }
    findById(id: number): Promise<Video | null> {
        throw new Error("Method not implemented.");
    }
    async addVideo(vdo: VideoBody): Promise<number | null >  {
        try{
            const client = await pool.connect() ;
            const query = "INSERT INTO video(title,duration,url_id) VALUES($1,$2,$3)";
            const result = await client.query(query,[vdo.title , vdo.duration , vdo.url_id] ) ;
            client.release();
            return 1 ;
        }catch(err){
            console.error(err);
            return 0 ;
        }
        
    }

    deleteVideo(id: number): Promise<number | null> {
        throw new Error("Method not implemented.");
    }
    updateVideo(vdo: Video): Promise<Video> {
        throw new Error("Method not implemented.");
    }
}

export default new VideoDaoImpl() ;