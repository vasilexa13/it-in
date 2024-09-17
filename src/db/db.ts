// import {VideoDBType} from './video-db-type'

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos: any[] // VideoDBType[]
    // some: any[]
}

export const db: DBType = { // создаём базу данных (пока это просто переменная)
    videos: [{
        'id':0,
        'title':'title0',
        "author": "author0",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2024-09-16T19:12:24.094Z",
        "publicationDate": "2024-09-16T19:12:24.094Z",
        "availableResolutions": [
            "P144"
        ]
    },
        {
            'id':1,
            'title':'title1',
            "author": "author1",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2024-09-16T19:12:24.094Z",
            "publicationDate": "2024-09-16T19:12:24.094Z",
            "availableResolutions": [
                "P144","P240"
            ]
        },
        {
            'id':3,
            'title':'title3',
            "author": "author3",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2024-09-16T19:12:24.094Z",
            "publicationDate": "2024-09-16T19:12:24.094Z",
            "availableResolutions": [
                "P144","P240","P1140"
            ]
        }]
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

export const availableResolutionsData = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]






