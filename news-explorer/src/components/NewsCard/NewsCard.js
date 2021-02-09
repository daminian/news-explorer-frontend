import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

function NewsCard({ card, handleClick, handleDeleteClick, loggedIn, image, date, title, text, source, keyword, link }) {

    const location = useLocation();
    const [saveArticle, setSaveArticle] = useState(false);

    function onSaveButton() {
        handleClick(card)
        setSaveArticle(true)
    }

    function onDeleteButton() {
        console.log(card._id)
        handleDeleteClick(card._id)
    }

    return (

        <figure className="card">
            <img className="card__photo" src={image} alt="Фотография статьи" />
            {
                location.pathname === '/' &&
                <div className="card__tooltip">
                    <button className={`card__saved card__saved_${saveArticle && loggedIn ? "active" : "hidden"} 
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
                    <button className="card__delete" type="button" onClick={onDeleteButton}></button>
                    <div className="card__delete-info">
                            <p className="card__saved-text">Убрать из сохранённых</p>
                        </div>
                </div>
                <div className="card__theme">
            <p className="card__theme-text">{keyword}</p>
                        
                </div>
                </>
            }

            <div className="card__info">
                <p className="card__date">{date}</p>
                <a className="card__link" href={link} target="_blank" rel="noreferrer"><p className="card__title">{title}</p></a>
                <p className="card__text">{text}</p>
                
            </div>
            <p className="card__source">{source}</p>
        </figure>
    )
}

export default NewsCard;
