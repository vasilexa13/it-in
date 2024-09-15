import {config} from 'dotenv'
config() // добавление переменных из файла .env в process.env

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        TESTING:'/testing/all-data',
        VIDEOS: '/videos',
    },
}

export const availableResolutionsData = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]




// const x = SETTINGS.PATH.VIDEO