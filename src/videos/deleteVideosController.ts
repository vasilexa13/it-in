import {Request, Response} from 'express'
import {db, setDB} from '../db/db'
import {dataset1} from "../../__tests__/datasets";
import {app} from "../app";

export const deleteVideosController = (req: Request, res: Response<any /*OutputVideoType[]*/>) => {
    if (db.videos.length ===0){
        res.status(204).json(db)
    } else {
        res.status(204).json(setDB)
    }
}

