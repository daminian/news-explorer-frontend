import React, { useContext } from 'react';
import { CurrentCardContext } from '../../context/CurrentCardContext.js';

function SavedNewsHeader() {

    const cards = useContext(CurrentCardContext);

    return (
        <section className="saved-news">
            <p className="saved-news__text">Сохранённые статьи</p>
            {
                cards.length === 1 && <h2 className="saved-news__header">Грета, у вас {cards.length} сохранённая статья</h2>
            }
            {
                cards.length <= 4 && <h2 className="saved-news__header">Грета, у вас {cards.length} сохранённых статьи</h2>
            }
            {
                cards.length > 5 && <h2 className="saved-news__header">Грета, у вас {cards.length} сохранённых статей</h2>
            }
            <p className="saved-news__key-words">По ключевым словам: <span className="saved-news__key-words_bold">Природа,</span> 
            <span className="saved-news__key-words_bold">Тайга</span> и <span className="saved-news__key-words_bold">2-м другим</span></p>
        </section>
    )
}

export default SavedNewsHeader;