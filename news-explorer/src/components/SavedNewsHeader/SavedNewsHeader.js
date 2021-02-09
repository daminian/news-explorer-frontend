import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';

function SavedNewsHeader({cards}) {

    const user = useContext(CurrentUserContext);

    const arrayOfKeywords = cards.map((item) => item.keyword).sort();
    let num;
    let current = 0;
    const arrayOfObjKeywords = arrayOfKeywords.reduce((pv, item, idx, arr) => {
      if (item !== arrayOfKeywords[idx - 1]) {
        current = current + 1;
        num = 1;
        pv.push({ keyword: item, number: num });
      } else {
        num = num + 1;
        pv[current - 1].number = num;
      };
      return pv;
    }, []);
    
    const numberOfKeywords = arrayOfObjKeywords.length;
    
    arrayOfObjKeywords.sort(function (a, b) {
      if (a.number > b.number) {
        return -1;
      }
      if (a.number < b.number) {
        return 1;
      }
      return 0;
    });
    
    let phraseStart = '';
    let phraseSpan = '';
    switch (true) {
      case (numberOfKeywords === 1):
        phraseStart = 'По ключевому слову: ';
        phraseSpan = ` ${arrayOfObjKeywords[0].keyword}`;
        break;
      case (numberOfKeywords === 2):
        phraseStart = 'По ключевым словам: ';
        phraseSpan = `${arrayOfObjKeywords[0].keyword} и  ${arrayOfObjKeywords[1].keyword}`;
        break;
      case (numberOfKeywords === 3):
        phraseStart = 'По ключевым словам: ';
        phraseSpan = `${arrayOfObjKeywords[0].keyword}, ${arrayOfObjKeywords[1].keyword} и ${numberOfKeywords - 2}-ой другой`;
        break;
      case (numberOfKeywords > 3):
        phraseStart = 'По ключевым словам: ';
        phraseSpan = `${arrayOfObjKeywords[0].keyword}, ${arrayOfObjKeywords[1].keyword} и ${numberOfKeywords - 2}-м другим`;
        break;

      default:
        phraseStart = '';
        phraseSpan = '';
    }

    return (
        <section className="saved-news">
            <p className="saved-news__text">Сохранённые статьи</p>
            {
                cards.length === 1 && <h2 className="saved-news__header">{user.name}, у вас {cards.length} сохранённая статья</h2>
            }
            {
                cards.length <= 4 && <h2 className="saved-news__header">{user.name}, у вас {cards.length} сохранённых статьи</h2>
            }
            {
                cards.length > 5 && <h2 className="saved-news__header">{user.name}, у вас {cards.length} сохранённых статей</h2>
            }
            { <p className="saved-news__key-words">{phraseStart}<span className="saved-news__key-words_bold">{phraseSpan}</span></p>}
        </section>
    )
}

export default SavedNewsHeader;