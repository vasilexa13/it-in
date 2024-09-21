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

// @ts-ignore
export function validationAuthor(author): ErrorType | null {
    type ErrorType = { message?: string | null, field?: string | null };
    const errorsMessages: ErrorType[] = [];
    if (typeof (author) != 'string' || (author.length < 1) || (author.length > 40)||(author == null)) {
        errorsMessages.push({message: 'Any<String>', field: "author"})
    }
    return errorsMessages.length?errorsMessages[0]:null
}


// @ts-ignore
export function validationMinAgeRestruction(minAgeRestruction): ErrorType | null {
    type ErrorType = { message?: string | null, field?: string | null };
    const errorsMessages: ErrorType[] = [];
    if ((minAgeRestruction) < 1 || (minAgeRestruction) > 18 ){
        errorsMessages.push({message: 'Any<String>', field: "minAgeRestruction"})
    }
    return errorsMessages.length?errorsMessages[0]:null
}

// @ts-ignore
export function validationAvailableResolutions(availableResolutions): ErrorType | null {
    type ErrorType = { message?: string | null, field?: string | null };
    const errorsMessages: ErrorType[] = [];
    if (!checkAvailableResolution(availableResolutions)){
        errorsMessages.push({message: 'Any<String>', field: "availableResolutions"})
    }
    return errorsMessages.length?errorsMessages[0]:null
}

// if (!checkAvailableResolution(req.body.availableResolutions)){
//     errorsMessages.push({message: typeof req.body.availableResolutions, field: "availableResolutions"})
// }
//
//
// if ((errorsMessages.length)) {
//     console.log('errorsMesages',errorsMessages)
//     res.status(400).json({errorsMesages: errorsMessages})
// }



