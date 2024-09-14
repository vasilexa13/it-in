import {Request, response, Response, Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {deleteVideosController} from './deleteVideosController'

import {db} from "../db/db";

export const videosRouter = Router()

const videoController = {
    getVideosController:getVideosController,
    createVideoController: createVideoController,
    deleteVideosController:deleteVideosController,
}

videosRouter.get('/', videoController.getVideosController)
videosRouter.post('/', videoController.createVideoController)
videosRouter.delete('/', videoController.deleteVideosController)
// videosRouter.delete('/:id', videoController.deleteVideosController)



// videosRouter.get('/:id', findVideoController)
// videosRouter.delete('/testing/all-data',()=>(console.log('DELETE')))

// videosRouter.delete('/:id', deleteVideoController)
// ...

// не забудьте добавить роут в апп