import express = require("express");
import {query} from "express-validator";


// export function checkTitleAuthor(str: string): boolean | null {
//     const maxLength = {
//         title: 40,
//         author: 20,
//     };
//     if (str === 'title') {
//         !(str.trim().length < 1 || str.trim().length > maxLength.title);
//         return true;
//     } else if (str === 'author') {
//         !(str.trim().length < 1 || str.trim().length > maxLength.author);
//         return true
//     } else {
//         console.log('Некорректное значение поля');
//         return null; // Явное возвращение значения, если field не относится к title/author
//     }
// }



export function checkMinAgeRestriction(num: number): boolean | null {
     return (num >= 1 && num <= 18)
}