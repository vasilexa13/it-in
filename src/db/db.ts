// import {VideoDBType} from './video-db-type'

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos: any[] // VideoDBType[]
    // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
    videos: [{'id':0, 'title':'title0'},{'id':2,'title':'title2'},{'id':3,'title':'title3'}]
    // videos: []
    // some: []
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = []
        // db.some = []
        return
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}


//функция поиска по БД
// export const findVideo(idIN) = async (req: Request, res: Response) => {
//     const ID = req.params.id
//     let videoID = db.find(db.id=>(db.id=== idIN ))
//
//         return videoID
//  }