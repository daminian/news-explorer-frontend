import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader.js';

function SavedNews({ handleDeleteClick, cards }) {
    
    return (
        <>
        <SavedNewsHeader cards={cards}/>
        <section className="saved-articles">
            {
                cards && cards.map((item) => (<NewsCard key={item._id} card={item} handleDeleteClick={handleDeleteClick} {...item} />))
            }
        </section>
        </>
    )
}

export default SavedNews;