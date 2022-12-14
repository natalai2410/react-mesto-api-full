import React from 'react';
import {baseUrl} from '../utils/constants';


class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _returnResult(result) {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`Упс... Что-то пошло не так: ${result.statusText}`);
    }

    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: this._getHeaders(),
        })
            .then(result => {
                return this._returnResult(result);
            })
    }

    getUserInfo = () => {
        return fetch(`${this._baseUrl}users/me`, {
            headers: this._getHeaders(),
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    sendUserInfo = (name, job) => {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    addNewCard = (name, link) => {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    putLike = (cardId) => {
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getHeaders(),
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    deleteLike = (cardId) => {
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(result => {
                return this._returnResult(result);
            })
    };

    changeAvatar = (avatar) => {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: avatar,
            }),
        }).then(result => {
            return this._returnResult(result);
        });
    };
}

export const api = new Api({
    baseUrl: baseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});
