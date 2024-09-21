import express = require('express');
import {checkAvailableResolution} from "../db/db";


// @ts-ignore
export function validationTitle(title): ErrorType | null {
type ErrorType = { message?: string | null, field?: string | null };
const errorsMessages: ErrorType[] = [];
if (typeof (title) != 'string' || (title.length < 1) || (title.length > 40)||(title == null)) {
    errorsMessages.push({message: 'Any<String>', field: "title"})
}
 return errorsMessages.length?errorsMessages[0]:null
}


//
// if (typeof (req.body.author) != 'string' || (req.body.author.length < 1) || (req.body.author.length > 20)||(req.body.author == null)) {
//     errorsMessages.push({message: 'Any<String>', field: "author"})
// }
// if ((req.body.minAgeRestruction) < 1 || (req.body.minAgeRestruction) > 18 ) {
//     errorsMessages.push({message: typeof req.body.minAgeRestruction, field: "minAgeRestruction"})
// }
// if (!checkAvailableResolution(req.body.availableResolutions)){
//     errorsMessages.push({message: typeof req.body.availableResolutions, field: "availableResolutions"})
// }
//
//
// if ((errorsMessages.length)) {
//     console.log('errorsMesages',errorsMessages)
//     res.status(400).json({errorsMesages: errorsMessages})
// }



