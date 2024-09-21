import express, {NextFunction, response} from 'express'
import cors from 'cors'
import {checkAvailableResolution, db} from "./db/db";
import {SETTINGS} from "./settings";
import {getVideosController} from "./videos/getVideosController";
import {createVideoController} from "./videos/createVideoController";
import {deleteVideosController} from "./videos/deleteVideosController";
import  {availableResolutionsData} from "./db/db";
import {BodyType} from "./videos/some";
import {body, query} from "express-validator";
import {type} from "node:os";
import {types} from "node:util";
import {
    validationAuthor,
    validationAvailableResolutions,
    validationMinAgeRestruction,
    validationTitle
} from "./videos/validation";

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

    // let responceData = {
    //     id:ID,//
    //     author:findVideo.author,
    //     title:findVideo.title,//
    //     canBeDownloaded:findVideo.canBeDownloaded,
    //     minAgeRestriction:findVideo.minAgeRestriction,
    //     createdAt:findVideo.createdAt,//
    //     publicationDate:findVideo.publicationDate,
    //     availableResolutions: findVideo.availableResolutions,//
    // }

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

// @ts-ignore
app.post('/videos',(req, res) => {
    let ID = Number(new Date())
    const createdAt = new Date()
    const publicationDate = new Date();
    publicationDate.setDate(createdAt.getDate() + 1);



    let errorsMessages = []

    const resValidationTitle = validationTitle(req.body.title)
    if (resValidationTitle){
        errorsMessages.push(resValidationTitle)
     // return    res.status(400).json(resValidationTitle)
    }

    const resValidationAuthor = validationAuthor(req.body.author)
    if (resValidationAuthor){
        errorsMessages.push(resValidationAuthor)
        // return    res.status(400).json(resValidationAuthor)
    }

    const resValidationMinAgeRestruction = validationMinAgeRestruction(req.body.minAgeRestruction)
    if (resValidationMinAgeRestruction){
        errorsMessages.push(resValidationMinAgeRestruction)
        // return    res.status(400).json(resValidationMinAgeRestruction)
    }

    const resValidationAvailableResolutions = validationAvailableResolutions(req.body.availableResolutions)
    if (resValidationMinAgeRestruction){
        errorsMessages.push(resValidationAvailableResolutions)
        // return    res.status(400).json(resValidationAvailableResolutions)
    }

    if (errorsMessages.length){
        res.status(400).json({errorsMessages})
    }




    //наворотил такое    //++++++++++++++++++++++++++++++++++++++++++
    let avaliableData = {
        canBeDownloaded:undefined,
        publicationDate:undefined,
        availableResolutions:undefined,
        minAgeRestriction:undefined
    }
    if (req.body.canBeDownloaded) {
        avaliableData.canBeDownloaded =   req.body.canBeDownloaded
    }
    if (req.body.publicationDate) {
        avaliableData.publicationDate =   req.body.publicationDate
    }
    if (req.body.availableResolutions) {
        avaliableData.availableResolutions =   req.body.availableResolutions
    }
    if (req.body.minAgeRestriction){
        avaliableData.minAgeRestriction=   req.body.minAgeRestriction
    }
//++++++++++++++++++++++++++++++++++++++++++++++++++++

    const newVideo = {
        id: ID,
        title : req.body.title,
        author : req.body.author,
        canBeDownloaded:avaliableData.canBeDownloaded||false,
        minAgeRestriction:avaliableData.minAgeRestriction||null,
        createdAt:createdAt.toISOString(),
        publicationDate: publicationDate.toISOString(),
        availableResolutions : avaliableData.availableResolutions
    }
    db.videos.push(newVideo)
    res.status(201).json(newVideo)
})
app.put('/videos/:id',    (req, res) => {
        const ID = +req.params.id;
        let findVideo = db.videos.find((video) => video.id === ID)

        type ErrorType = { message: string, field: string }
        const errorsMessages: ErrorType[] = []


    let avaliableData = {
        canBeDownloaded:undefined,
        publicationDate:undefined,
        availableResolutions:undefined,
        minAgeRestriction:undefined
    }

    if (req.body.canBeDownloaded) {
        avaliableData.canBeDownloaded =   req.body.canBeDownloaded
    }
    if (req.body.publicationDate) {
        avaliableData.publicationDate =   req.body.publicationDate
    }
    if (req.body.availableResolutions) {
        avaliableData.availableResolutions =   req.body.availableResolutions
    }
    if (req.body.minAgeRestriction){
        avaliableData.minAgeRestriction=   req.body.minAgeRestriction
    }


        if (req.body.author == null) {
            errorsMessages.push({message: typeof findVideo.author, field: "author"})
        }
        if ((req.body.title == null)) {
            errorsMessages.push({message: typeof findVideo.title, field: "title"})
        }
        if (typeof (req.body.title) != 'string' || ((req.body.title.length < 1) || (req.body.title.length > 40))) {
            errorsMessages.push({message: typeof findVideo.title, field: "title"})
        }
        if (typeof (req.body.author) != 'string' || ((req.body.author.length < 1) || (req.body.author.length > 20))) {
            errorsMessages.push({message: typeof findVideo.author, field: "author"})
        }
        // if (!checkAvailableResolution(req.body.availableResolutions)){
        //     res.sendStatus(400)
        // }

        if (req.body.minAgeRestriction){
            if ((req.body.minAgeRestruction) < 1 || (req.body.minAgeRestruction) > 18 ) {
                errorsMessages.push({message: typeof findVideo.minAgeRestruction, field: "minAgeRestruction"})
            }
        }

        console.error()
        if (errorsMessages.length) {
            res.status(400).json({errorsMessages})
        }

        if (findVideo) {
            findVideo.title = req.body.title
            findVideo.author = req.body.author
            if (avaliableData.canBeDownloaded!=null){
                findVideo.canBeDownloaded = req.body.canBeDownloaded
            }
            if (avaliableData.publicationDate!=null){
                findVideo.publicationDate = req.body.publicationDate
            }
            if (avaliableData.availableResolutions!=null){
                findVideo.availableResolutions = req.body.availableResolutions
            }
            if (avaliableData.minAgeRestriction!=null){
                findVideo.minAgeRestriction = req.body.minAgeRestriction
            }
            res.sendStatus(204)

        } else {
            res.sendStatus(404)
            return;
        }
    })


app.delete(SETTINGS.PATH.TESTING, deleteVideosController)
app.get(SETTINGS.PATH.VIDEOS, getVideosController)


