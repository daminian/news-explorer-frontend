import React from 'react';

function Preloader() {

    return (
        <div className="preloader">
            <div className="preloader__circle"></div>
            <p className="preloader__text">Идет поиск новостей&hellip;</p>
        </div>
    )
}

export default Preloader;