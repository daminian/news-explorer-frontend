import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import headerLogo from '../../images/header__logo.svg';
import headerLogoSavedNews from '../../images/header__logo_savedNews.svg';
import headerLogOut from '../../images/header__logout.svg';
import headerLogOutDark from '../../images/header__logo-dark.svg';
import { Link, useLocation } from "react-router-dom";


function Header({ loggedIn, handleRegister, handleLogOut, mobileView, handleMobileView, handleInfoClose, 
    popupRegisterOpen, onClose, popupLoginOpen }) {

    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    return (
        <>
            <header className={`header header_${location.pathname === '/saved-news' && "savedNews"}`}>
                <div className="header__field">
                    {
                        location.pathname === '/' &&
                        <img className="header__logo" src={headerLogo} alt="Логотип Исследователь новостей" ></img>
                    }
                    {
                        location.pathname === '/saved-news' &&
                        <img className="header__logo" src={headerLogoSavedNews} alt="Логотип Исследователь новостей" ></img>
                    }
                    
                    
                    {
                       window.innerWidth < 767 && (popupRegisterOpen || popupLoginOpen) ?

                        <button className="header__close" type="button" onClick={onClose}></button> :
                        <> 
                            <div className="header__info" onClick={handleMobileView}>
                                <div className={`header__item header__item_${location.pathname === '/saved-news' && "savedNews"}`}></div>
                                <div className={`header__item header__item_${location.pathname === '/saved-news' && "savedNews"}`}></div>
                            </div>
                        </>   
                    }
                

                    {
                        window.innerWidth > 767 &&

                        <nav className="header__nav">
                            <Link to="/" className={`header__auth header__auth_${location.pathname === '/' && "main"} header__auth_${location.pathname === '/saved-news' && "savedNewsPage"}`}>
                                Главная</Link>

                            {loggedIn && <Link to="/saved-news" className={`header__auth header__auth_savedNews 
                        header__auth_${location.pathname === '/saved-news' && "main"}
                        header__auth_${location.pathname === '/saved-news' && "savedNewsPage"}`}>Сохранённые статьи</Link>}
                            {
                                loggedIn ?
                                    <button className={`header__exit header__exit_${location.pathname === '/saved-news' && "savedNews"}`} onClick={handleLogOut}>
                                        <p className={`header__auth header__auth_loggedIn header__auth_${location.pathname === '/saved-news' && "savedNewsPage"}`}>{currentUser.name}</p>
                                        {
                                            location.pathname === '/' && <img className="header__logout" src={headerLogOut} alt="Иконка выхода из приложения" />
                                        }
                                        {
                                            location.pathname === '/saved-news' && <img className="header__logout" src={headerLogOutDark} alt="Иконка выхода из приложения" />
                                        }

                                    </button>
                                    :
                                    <button className="header__auth" onClick={handleRegister}>Авторизироваться</button>
                            }
                        </nav>
                    }
                </div>
            </header>
        </>
    )
}

export default Header;