// check apiKey implement later
import { Response, Request , NextFunction } from "express";
import Config from "../config/Config";

class Middleware {

    public checkForAPIKey(req:Request, res:Response, next:NextFunction) {
        const apiKey = req.headers['x-api-key']
        if(!apiKey || apiKey != new Config().getAPIKey() ){
            res.status(403);
            res.send({
                "status": {
                    "code" : "403",
                    "message" : "invalid api key"
                }
            });
            return ;
        }
        next() ;
    }

    public enableCORS(req:Request, res:Response, next:NextFunction){
        res.header("Access-Control-Allow-Origin", '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
        next();
    }

}

export default new Middleware() ;