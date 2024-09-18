import express, {NextFunction} from 'express'
import cors from 'cors'
import {checkAvailableResolution, db} from "./db/db";
import {SETTINGS} from "./settings";
import {getVideosController} from "./videos/getVideosController";
import {createVideoController} from "./videos/createVideoController";
import {deleteVideosController} from "./videos/deleteVideosController";
import  {availableResolutionsData} from "./db/db";
import {BodyType} from "./videos/some";
import {query} from "express-validator";

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
    const createdAt = new Date()
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);

    //ругается на тип при вызове toISOString
    // console.log(currentDate)
    // console.log(futureDate)

    if (typeof (req.body.title)!='string'|| ((req.body.title.length<1)||(req.body.title.length>40))){
        res.sendStatus(400)
    }
    if (typeof (req.body.author)!='string'|| ((req.body.author.length<1)||(req.body.author.length>20))){
        res.sendStatus(400)
    }
    if (!checkAvailableResolution(req.body.availableResolutions)){
        res.sendStatus(400)
    }
    const newVideo:BodyType = {
        id: ID,
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded:false,
        minAgeRestriction:null,
        createdAt:createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions : req.body.availableResolutions
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
})
app.put('/videos/:id', (req, res) => {
    const ID = +req.params.id;
    let findVideo  = db.videos.find((video) => video.id === ID)
    console.log(findVideo)
    if ((req.body.title!=null)||(req.body.author!=null)){
        res.sendStatus(400)
    }
    if (typeof (req.body.title)!='string'|| ((req.body.title.length<1)||(req.body.title.length>40))){
        res.sendStatus(400)
    }
    if (typeof (req.body.author)!='string'|| ((req.body.author.length<1)||(req.body.author.length>20))){
        res.sendStatus(400)
    }
    // if (!checkAvailableResolution(req.body.availableResolutions)){
    //     res.sendStatus(400)
    // }
    if ((req.body.minAgeRestruction)<1||(req.body.minAgeRestruction)>18){
        res.sendStatus(400)
    }
    if (findVideo){
        findVideo.title = req.body.title
        findVideo.author = req.body.author
        findVideo.canBeDownloaded = false
        findVideo.publicationDate =new Date()
        findVideo.availableResolutions = req.body.availableResolutions
            res.sendStatus(204)

    } else {
        res.sendStatus(404)
        return;
    }
})

app.delete(SETTINGS.PATH.TESTING, deleteVideosController)
app.get(SETTINGS.PATH.VIDEOS, getVideosController)


