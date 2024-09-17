import express, {NextFunction} from 'express'
import cors from 'cors'
import {db} from "./db/db";
import {SETTINGS} from "./settings";
import {getVideosController} from "./videos/getVideosController";
import {createVideoController} from "./videos/createVideoController";
import {deleteVideosController} from "./videos/deleteVideosController";
import  {checkAvailableResolutions} from "./db/db";
import bodyParser from "body-parser"
import {videosRouter} from "./videos";
import {setDB} from "./db/db";
import {BodyType} from "./videos/some";
import {query} from "express-validator";
import {checkMinAgeRestriction} from "./videos/validatorMiddleware";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})
app.get('/videos/:id', (req, res) => {
    const ID = +req.params.id;
    let findVideo:BodyType  = db.videos.find((video) => video.id === ID)
    if (findVideo){
        res.status(200).json(findVideo)
    } else {
        res.sendStatus(404)
    }
})
app.delete('/videos/:id', (req, res) => {
    // res.json({version: '123'})
    const index = db.videos.findIndex((el)=>(el.id===+req.params.id))
    console.log(index);

    if (index===-1){
        res.sendStatus(404)
    } else {
        db.videos.splice(index, 1);
        res.sendStatus(204)
    }
})
app.post('/videos',(req, res) => {
    let ID = Number(new Date())

    let createdDate = new Date();
    createdDate.setDate(createdDate.getDate() + 1); // Добавляем один день
    let futureDate: string = createdDate.toISOString(); // Получаем строку в формате ISO
    console.log(createdDate)
    console.log(futureDate)

    const newVideo:BodyType = {
        id: ID,
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded:false,
        minAgeRestriction:null,
        createdAt: createdDate.toISOString(),
        publicationDate: futureDate,
        availableResolutions : req.body.availableResolutions
    }

    db.videos.push(newVideo)
    res.status(201).json(newVideo)

    // res.sendStatus(400)
})
app.put('/videos/:id', (req, res) => {
    const ID = +req.params.id;
    let findVideo  = db.videos.find((video) => video.id === ID)
    console.log(findVideo)
    if (findVideo){
        findVideo.title = req.body.title
        findVideo.author = req.body.author
        findVideo.availableResolutions = req.body.availableResolutions
        if (checkAvailableResolutions(req.body.availableResolutions)){
            res.sendStatus(204)
            return
        } else
            res.sendStatus(400)
        return;
    } else {
        res.sendStatus(404)
        return;
    }
})

app.delete(SETTINGS.PATH.TESTING, deleteVideosController)
app.get(SETTINGS.PATH.VIDEOS, getVideosController)

// app.post(SETTINGS.PATH.VIDEOS, createVideoController)
// app.delete(SETTINGS.PATH.VIDEOS, deleteVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)

