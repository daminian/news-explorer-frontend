import React from 'react';


function SearchForm() {

    return (
        <>
           <form className="searchForm">
               <input className="searchForm__input" type="text" name="search" placeholder="Введите тему новости" required ></input>
               <button className="searchForm__button" type="submit">Искать</button>
           </form>
        </>
    )
}

export default SearchForm;