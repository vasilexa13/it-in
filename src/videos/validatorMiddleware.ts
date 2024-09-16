import express = require("express");
import {query} from "express-validator";

export function checkTitleAuthor(str: string): boolean | null {
    const maxLength = {
        title: 40,
        author: 20,
    };
    if (str === 'title') {
        return !(str.trim().length < 1 || str.trim().length > maxLength.title);
    } else if (str === 'author') {
        return !(str.trim().length < 1 || str.trim().length > maxLength.author);
    } else {
        console.log('Некорректное значение поля');
        return null; // Явное возвращение значения, если field не относится к title/author
    }
}

// @ts-ignore
export function checkMinAgeRestriction(num: number): boolean | null {
    let boolean = (num >= 1 || num <= 18);
}