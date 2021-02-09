import React from 'react';


function SearchForm({setSearch, search, handleSearchSubmit}) {

    const searchText = localStorage.getItem('searchText')
    const [isButtonDisabled, setButtonDisabled] = React.useState(true)

    function handleSearchChange(e) {
        setSearch(e.target.value)
        setButtonDisabled(false)
    }

    return (
           <form className="searchForm">
               <input className="searchForm__input" type="text" name="search" placeholder={searchText || "Введите тему новости"} onChange={handleSearchChange} value={search} required ></input>
               <button disabled={isButtonDisabled} className="searchForm__button" type="submit" onClick={handleSearchSubmit} >Искать</button>
           </form>
    )
}

export default SearchForm;