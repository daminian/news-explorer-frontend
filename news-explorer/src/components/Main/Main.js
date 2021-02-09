import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js';

function Main({setSearch, search, handleSearchSubmit}) {

    return (
                <main className="main">
                     <div className="main__container">
                         <h1 className="main__header">Что творится в мире?</h1>
                         <p className="main__text">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                         <SearchForm 
                             search={search}
                             setSearch={setSearch}
                             handleSearchSubmit={handleSearchSubmit}
                         />
                     </div>
                </main>
            )
}

export default Main;