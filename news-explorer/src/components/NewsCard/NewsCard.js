import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

function NewsCard({ card, handleClick, loggedIn, photo, date, title, text, source, theme, link }) {

    const [saveArticle, setSaveArticle] = useState(false);
    const location = useLocation();

    function onSaveButton() {
        handleClick(card)
        setSaveArticle(true)

        if (saveArticle) {
            setSaveArticle(false)
        }

    }

    return (

        <figure className="card">
            <img className="card__photo" src={photo} alt="" />
            {
                location.pathname === '/' &&
                <div className="card__tooltip">
                    <button disabled={!loggedIn} className={`card__saved card__saved_${saveArticle && loggedIn ? "active" : "hidden"} 
                card__saved_${saveArticle && !loggedIn && "not-loggedIn"}`}
                        type="button" onClick={onSaveButton}></button>
                        {
                            !loggedIn && <div className="card__saved-info">
                            <p className="card__saved-text">Войдите, чтобы сохранять статьи</p>
                        </div>
                        }
                        
                </div>
            }
            {
                location.pathname === '/saved-news' &&
                <>
                <div className="card__tooltip">
                    <button className="card__delete" type="button"></button>
                    <div className="card__delete-info">
                            <p className="card__saved-text">Убрать из сохранённых</p>
                        </div>
                </div>
                <div className="card__theme">
            <p className="card__theme-text">{theme}</p>
                        
                </div>
                </>
            }

            <div className="card__info">
                <p className="card__date">{date}</p>
                <a className="card__link" href={link}><p className="card__title">{title}</p></a>
                <p className="card__text">{text}</p>
                
            </div>
            <p className="card__source">{source}</p>
        </figure>
    )
}

export default NewsCard;
