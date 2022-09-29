import React from 'react';
import {baseUrlAuth, headers} from '../utils/constants';

const returnResult = (result) => {
    console.log(result);
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Упс... Что-то пошло не так: ${result.statusText}`);
};

//регистрации
export const register = (email, password) => {
    return fetch(`${baseUrlAuth}/signup`, {
        method: "POST",
        headers,
        body: JSON.stringify({email, password}),
    })
        .then(result => returnResult(result));
};

//авторизация
export const authorize = (email, password) => {
    return fetch(`${baseUrlAuth}/signin`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({email: email, password: password}),
    })
        .then(response => {
           return  returnResult(response)});
};

// проверка валидности токена и получения email для вставки в шапку сайта
export const getContent = (jwt) => {
    return fetch(`${baseUrlAuth}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
            ...headers,
        },
    })
        .then(response => returnResult(response));
};
