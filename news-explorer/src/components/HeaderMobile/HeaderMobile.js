import React from 'react';
import { useLocation, Link } from "react-router-dom";
import headerLogo from '../../images/header__logo.svg';
import headerLogoSavedNews from '../../images/header__logo_savedNews.svg';

function HeaderMobile({ handleRegister, isOpen, mobileView, handleInfoClose }) {

    const location = useLocation();

    function handleOverlay(evt) {
        const element = evt.target;
        if (element.classList.contains('header__mobile_opened')) {
            handleInfoClose();
        }
      }

    return ( 
        <>
            <div className={`header__mobile header__mobile_${isOpen ? "opened" : ""}`} onClick={handleOverlay}>
                <div className="header__container">
                    <div className={`header header_${location.pathname === '/saved-news' && "savedNews"} 
                        header header_${mobileView && "mobile"}`}>
                        <div className="header__field">
                            {
                                location.pathname === '/' || (location.pathname === '/saved-news' && mobileView) ?
                                <img className="header__logo" src={headerLogo} alt="Логотип News-Explorer" ></img> 
                                : ''
                            
                            }

                            {
                                location.pathname === '/saved-news'  && !mobileView ?
                                <img className="header__logo" src={headerLogoSavedNews} alt="Логотип News-Explorer" ></img>
                                : ''
                            }
                    
                            <button className="header__close" type="button" onClick={handleInfoClose}></button>
                        </div>
                    </div>

                    <ul className="header__list">
                        <li><Link to="/" className="header__list-item" onClick={handleInfoClose}>Главная</Link></li>
                        <li><Link to="/saved-news" className="header__list-item" onClick={handleInfoClose}>Сохраненные статьи</Link></li>
                    </ul>
                            
                    <button className="header__auth header__auth_mobile" onClick={handleRegister}>Авторизироваться</button>
                </div>
            </div>
        </>
    )
}

export default HeaderMobile;