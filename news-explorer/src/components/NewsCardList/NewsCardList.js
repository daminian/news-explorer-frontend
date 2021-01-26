import React, { useContext, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard.js';
import { CurrentCardContext } from '../../context/CurrentCardContext.js';


function NewsCardList({ handleClick, loggedIn }) {

    const cards = useContext(CurrentCardContext);

    const [showMore, setShowMore] = useState(false)

    function shwoMoreCards() {
        setShowMore(true)
    }

    return (
        <>
            <section className="cards">
                <h2 className="cards__header">Результаты поиска</h2>
                <div className="cards__list">
                    {
                        cards && cards.slice(0, 3).map((item) => (
                        <NewsCard key={item.id} 
                        loggedIn={loggedIn} 
                        handleClick={handleClick}
                        {...item} />))
                    }
                    {
                        showMore && cards.slice(3).map((item) => (
                            <NewsCard key={item.id} 
                            loggedIn={loggedIn} 
                            handleClick={handleClick}
                            {...item} />))
                    }
                </div>
                {
                    cards.length > 3 && !showMore &&

                    <button className="cards__more" onClick={shwoMoreCards}>Показать еще</button>
                }

            </section>
        </>
    )
}

export default NewsCardList;

