import React from 'react';
import {baseUrl} from '../utils/constants';

const returnResult = (result) => {
    if (result.ok) {
        return result.json();
    }
    return Promise.reject(`Упс... Что-то пошло не так: ${result.statusText}`);
};

//регистрации
export const register = (email, password) => {
    return fetch(`${baseUrl}signup`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
        .then(result => returnResult(result));
};

//авторизация
export const authorize = (email, password) => {
    return fetch(`${baseUrl}signin`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
    })
        .then(response => {
            return returnResult(response)
        });
};

// проверка валидности токена и получения email для вставки в шапку сайта
export const getContent = (jwt) => {
    return fetch(`${baseUrl}users/me`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        },
    })
        .then(response => returnResult(response));
};
