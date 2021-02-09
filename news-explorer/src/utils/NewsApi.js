class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
        

        const pastDate = new Date();
        const previousDate = pastDate.getDate() -7;
        pastDate.setDate(previousDate)

        this._pastDate = pastDate;
        this._nowDate = new Date();
        this._apiKey = '3122b2b13ecb4079af54fa1a64edc783';
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
    url: 'http://newsapi.org/v2/everything',
    headers: {
      'Content-Type': 'application/json',
    }
  })

export default NewsApi;