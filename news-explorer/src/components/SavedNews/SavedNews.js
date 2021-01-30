import React from 'react';
import NewsCard from '../NewsCard/NewsCard.js';
import { savedCards } from '../../utils/savedCards.js';

function SavedNews() {

    return (
        <section className="saved-articles">

            {
                savedCards && savedCards.map((item) => (<NewsCard key={item.id} {...item} />))
            }

        </section>
    )
}

export default SavedNews;