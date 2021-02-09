import React, { useContext, useState } from 'react';
import NewsCard from '../NewsCard/NewsCard.js';
import Preloader from '../Preloader/Preloader.js';
import NewsNotFound from '../NewsNotFound/NewsNotFound.js';
import ErrorRequest from '../ErrorRequest/ErrorRequest.js';
import { Route } from 'react-router-dom';
import { CurrentCardContext } from '../../context/CurrentCardContext.js';


function NewsCardList({ handleClick, loggedIn, load, errReq, newsNotFound }) {

    const cards = useContext(CurrentCardContext);
    const [numberOfCards, setNumberOfCards] = useState(3);

    function showMoreCards() {
        if (cards.length > numberOfCards) {
            setNumberOfCards(numberOfCards + 3);
        }
    }

    return (
        <>
            <section className="cards">
                {
                    load && <Preloader />
                }
                {
                    newsNotFound && <NewsNotFound />
                }
                {
                    errReq && <ErrorRequest />
                }
                { cards && !load && !errReq && !newsNotFound &&
                <>
                    <Route exact path='/'>
                        <h2 className="cards__header">Результаты поиска</h2>
                    </Route>
                    <div className="cards__list">
                    {
                        cards && cards.map((item, i) => (
                            i < numberOfCards &&
                        <NewsCard key={item.id} 
                        loggedIn={loggedIn} 
                        handleClick={handleClick}
                        card = {item}
                        {...item} />))
                    }
                </div>
                </>}
                {
                    cards && cards.length > numberOfCards ?

                    <button className="cards__more" onClick={showMoreCards}>Показать еще</button>

                    : null
                }

            </section>
        </>
    )
}

export default NewsCardList;

