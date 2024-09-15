import {Request, Response} from 'express'
import {Resolutions} from "../input-output-types/video-types";

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number
    createdAt: string
    publicationDate: string
    availableResolution: ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]

}

export type QueryType = {
    search?: string
}

export type OutputType = void /*| OutputErrorsType | OutputVideoType*/

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

}