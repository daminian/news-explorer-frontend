import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';

function Main() {

    return (
        <>
           <main className="main">
               <h1 className="main__header">Что творится в мире?</h1>
               <p className="main__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
               <SearchForm />
           </main>
        </>
    )
}

export default Main;