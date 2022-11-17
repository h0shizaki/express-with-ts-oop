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
    async findById(id: number): Promise<Video | null> {
        try{
            const client = await pool.connect() ;
            const statement = "SELECT * FROM video WHERE video.id = $1";
            const result = await client.query(statement,[id]);
            const count: number = result.rowCount;
            
            client.release();
            if(count == 0) {
                return null ;
            }else{
                const raw_data = result.rows[0];
                let data : Video = {
                    id: raw_data.id,
                    title : raw_data.title ,
                    duration : raw_data.duration ,
                    url_id: raw_data.url_id
                }
                return data ;
            }

        }catch(err){
            console.error(err);
            throw err;
        }
    }

    async addVideo(vdo: VideoBody): Promise<number | null >  {
        try{
            const client = await pool.connect() ;
            const query = "INSERT INTO video(title,duration,url_id) VALUES($1,$2,$3)";
            await client.query(query,[vdo.title , vdo.duration , vdo.url_id] ) ;
            client.release();
            return 1 ;
        }catch(err){
            console.error(err);
            return 0 ;
        }
        
    }

    async deleteVideo(id: number): Promise<number | null> {
        try{
            const client = await pool.connect() ;

            //check data inside db
            const statement = "SELECT COUNT(id) FROM video WHERE video.id = $1";
            const result = await client.query(statement,[id]);
            const count: number = result.rows[0]['count'];

            if(count == 0) {
                return null ;
            }

            const query = "DELETE FROM video WHERE video.id = $1 ;" ;
            await client.query(query, [id]);
            client.release();
            return 1 ;
        }catch(err){
            console.error(err);
            return 0 ;
        }
    }

    async updateVideo(vdo: Video): Promise<Video | null> {
        try{
            const client = await pool.connect() ;
            const statement = "UPDATE video SET title = $1, duration = $2, url_id = $3 WHERE id = $4;";
            const result = await client.query(statement , [vdo.title , vdo.duration , vdo.url_id , vdo.id]);
            // console.log(result);

            client.release();
            if(result.rowCount == 0){
                return null ;
            }else{
                return vdo ;
            }
        }catch(err){
            throw err ;
        }
    }
}

export default new VideoDaoImpl() ;