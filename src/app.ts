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

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})
app.get('/videos/:id', (req, res) => {
    const ID = +req.params.id;
    let findVideo  = db.videos.find((video) => video.id === ID)
    if (findVideo){
        res.status(200).json(findVideo)
    } else {
        res.status(404)
        res.end()
    }
})
app.delete('/videos/:id', (req, res) => {
    for (let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1);
            return res.sendStatus(204); // Успешно удалено
        }
    }
    // Если здесь, значит ничего не найдено
    return res.sendStatus(404); // Не найдено
});
app.post('/videos', (req, res) => {
    const newVideo = {
        title : req.body.title,
        author : req.body.author,
        availableResolutions : req.body.title.availableResolutions
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
    })
app.put('/videos/:id', (req, res) => {
    const ID = +req.params.id;
    let findVideo  = db.videos.find((video) => video.id === ID)
    if (findVideo){
        findVideo.title = req.body.title
        findVideo.author = req.body.author
        findVideo.availableResolutions = req.body.availableResolutions
        if (checkAvailableResolutions(req.body.availableResolutions)){
            res.sendStatus(204)
        } else
            res.sendStatus(400)
    } else {
        res.sendStatus(404)
    }
})

app.delete(SETTINGS.PATH.TESTING, deleteVideosController)
app.get(SETTINGS.PATH.VIDEOS, getVideosController)
app.post(SETTINGS.PATH.VIDEOS, createVideoController)

// app.delete(SETTINGS.PATH.VIDEOS, deleteVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)

