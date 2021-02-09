import { BASE_URL,
        API_KEY,
        NUMBER_OF_DAYS_TO_SEARCH } from '../constants/Constants.js';

class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        

        const pastDate = new Date();
        const previousDate = pastDate.getDate() - NUMBER_OF_DAYS_TO_SEARCH;
        pastDate.setDate(previousDate)

        this._pastDate = pastDate.toISOString();
        this._nowDate = new Date();
        this._apiKey = API_KEY;
        this._language = 'ru'
        this._pageSize = 100;
         

    }

    getNews(kewWord) {
        return fetch(`${this._url}?q=${kewWord}&apiKey=${this._apiKey}&from=${this._pastDate}
        &to=${this._nowDate}&language=${this._language}&pageSize=${this._pageSize}`, {
            method: 'GET',        
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            } 
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
        })
    }
}

const NewsApi = new Api({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  })

export default NewsApi;