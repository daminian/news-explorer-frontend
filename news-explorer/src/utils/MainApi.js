const BASE_URL = 'https://api.news-daminian.students.nomoreparties.space';

const checkResponce = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    })
        .then(checkResponce)
}

export const authorize = (email, password) => {

    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponce)

        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                return res;
            } else {
                return;
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(checkResponce)
        .then(data => data)
}

export const saveArticle = (card, token) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'POST',
        body: JSON.stringify({
            keyword: card.keyword,
            title: card.title,
            text: card.text,
            date: card.date,
            source: card.source,
            link: card.link,
            image: card.image
        }), 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
    })
        .then(checkResponce)
        .then(data => data)
}

export const getArticle = (token) => {
    return fetch(`${BASE_URL}/articles`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(checkResponce)
        .then(data => data)
}

export const deleteArticle = (card, token) => {
    return fetch(`${BASE_URL}/articles/${card}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(checkResponce)
        .then(data => data)
}